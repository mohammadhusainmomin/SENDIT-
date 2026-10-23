import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TestData from "./TestData";

jest.mock("../components/SEO", () => () => null);
const mockError = jest.fn();
jest.mock("../context/ToastContext", () => ({
  useToast: () => ({ error: mockError }),
}));

beforeEach(() => {
  mockError.mockClear();
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

test("renders plain code samples for each requested language", () => {
  const { container } = render(<TestData />);

  expect(screen.getByRole("heading", { name: "Code test data" })).toBeTruthy();
  ["React JavaScript", "Python", "C", "HTML", "Java"].forEach((language) => {
    expect(screen.getByRole("heading", { name: language })).toBeTruthy();
  });
  expect(container.querySelectorAll("pre code")).toHaveLength(5);
  expect(screen.getByText(/function Welcome/)).toBeTruthy();
  expect(screen.getByText(/def total/)).toBeTruthy();
  expect(screen.getAllByRole("button", { name: /^Copy .* code$/ })).toHaveLength(5);
});

test("copies the selected sample and confirms the copy", async () => {
  render(<TestData />);

  fireEvent.click(screen.getByRole("button", { name: "Copy Python code" }));

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("def total(values):"),
    );
  });
  expect(await screen.findByRole("button", { name: "Copied Python code" })).toBeTruthy();
  expect(mockError).not.toHaveBeenCalled();
});

test("shows an error when clipboard access fails", async () => {
  navigator.clipboard.writeText.mockRejectedValueOnce(new Error("Clipboard denied"));
  render(<TestData />);

  fireEvent.click(screen.getByRole("button", { name: "Copy C code" }));

  await waitFor(() => {
    expect(mockError).toHaveBeenCalledWith(
      "Could not copy C code. Check clipboard permissions and try again.",
    );
  });
});
