import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DropRooms from "./DropRooms";
import DropSubmit from "./DropSubmit";
import api from "../services/api";

jest.mock("../components/SEO", () => () => null);
jest.mock("react-router-dom", () => {
  const navigate = jest.fn();
  return {
    useNavigate: () => navigate,
    useParams: () => ({ code: "ABCD23" }),
  };
});
jest.mock("../services/api", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({ user: { name: "Test User", email: "mohammadmsn@gmail.com" } }),
}));
jest.mock("../context/ToastContext", () => {
  const success = jest.fn();
  const error = jest.fn();
  return { useToast: () => ({ success, error }) };
});

describe("Drop Rooms create form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.get.mockResolvedValue({ data: { rooms: [] } });
    api.post.mockResolvedValue({
      data: {
        room: {
          _id: "room-1",
          code: "ABCD23",
          title: "Internship Documents",
          requiredFiles: [],
          expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          status: "open",
          submissionsCount: 0,
        },
      },
    });
  });

  test("creates a room when all fields are valid", async () => {
    render(<DropRooms />);

    expect(screen.getAllByText("Document name")).toHaveLength(2);
    expect(screen.getAllByText("File type")).toHaveLength(2);
    expect(screen.getAllByText("Max size (MB)")).toHaveLength(2);
    const documentName = screen.getByLabelText("Document 1 name");
    fireEvent.change(documentName, { target: { value: "Passport" } });
    expect(documentName.value).toBe("Passport");
    fireEvent.change(screen.getByPlaceholderText("Internship Documents"), {
      target: { value: "Internship Documents" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create room/i }));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith(
      "/drop-rooms",
      expect.objectContaining({
        title: "Internship Documents",
        expiresIn: 1440,
        requiredFiles: [
          { label: "Passport", required: true, fileType: "image", maxFileSizeMB: 5 },
          { label: "Certificate", required: true, fileType: "pdf", maxFileSizeMB: 10 },
        ],
      }),
    ));
  });

  test("does not create a room when its name is missing", async () => {
    render(<DropRooms />);

    fireEvent.click(screen.getByRole("button", { name: /create room/i }));

    expect(await screen.findByText("Room name is required")).toBeTruthy();
    expect(api.post).not.toHaveBeenCalled();
  });
});

describe("Drop Room submission form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.get.mockResolvedValue({
      data: {
        room: {
          code: "ABCD23",
          title: "Identity Documents",
          description: "",
          instructions: "",
          expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          status: "open",
          requiredFiles: [
            { label: "ID Photo", required: true, fileType: "image", maxFileSizeMB: 5 },
          ],
        },
      },
    });
    api.post.mockImplementation((url) => Promise.resolve({
      data: url.endsWith("/status")
        ? { alreadySubmitted: false }
        : {
            submissionId: "submission-1",
            status: "complete",
            uploadedSlots: ["ID Photo"],
            submittedAt: new Date().toISOString(),
          },
    }));
  });

  test("looks up a room and submits the requested document", async () => {
    render(<DropSubmit />);

    expect(await screen.findByRole("heading", { name: "Identity Documents" })).toBeTruthy();
    const emailInput = screen.getByLabelText(/Email/);
    await waitFor(() => expect(emailInput.value).toBe("mohammadmsn@gmail.com"));
    expect(emailInput.readOnly).toBe(true);
    fireEvent.change(screen.getByLabelText(/Your name/), {
      target: { value: "Test Submitter" },
    });
    const file = new File(["image"], "identity.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText("Upload ID Photo"), {
      target: { files: [file] },
    });
    await waitFor(() => expect(screen.getByRole("button", { name: /submit documents/i }).disabled).toBe(false));
    fireEvent.click(screen.getByRole("button", { name: /submit documents/i }));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith(
      "/drop-rooms/public/ABCD23/submissions",
      expect.any(FormData),
    ));
    const formData = api.post.mock.calls.find(([url]) =>
      url === "/drop-rooms/public/ABCD23/submissions",
    )[1];
    expect(formData.get("submitterName")).toBe("Test Submitter");
    expect(formData.get("submitterEmail")).toBe("mohammadmsn@gmail.com");
    expect(formData.get("fileLabels")).toBe("ID Photo");
    expect(await screen.findByRole("heading", { name: "Submission received" })).toBeTruthy();
  });

  test("shows previous uploads and prevents a second submission for the same email", async () => {
    api.post.mockImplementation((url) => Promise.resolve({
      data: url.endsWith("/status")
        ? {
            alreadySubmitted: true,
            submission: {
              status: "complete",
              submittedAt: new Date().toISOString(),
              uploadedSlots: ["ID Photo"],
            },
          }
        : {},
    }));
    render(<DropSubmit />);

    expect(await screen.findByRole("heading", { name: "Identity Documents" })).toBeTruthy();
    await waitFor(() => expect(screen.getByLabelText(/Email/).value).toBe("mohammadmsn@gmail.com"));

    expect(await screen.findByText("Already submitted with this email")).toBeTruthy();
    expect(screen.getByText("Uploaded")).toBeTruthy();
    expect(screen.queryByLabelText("Upload ID Photo")).toBeNull();
    expect(screen.queryByRole("button", { name: /submit documents/i })).toBeNull();
    expect(api.post).toHaveBeenCalledWith(
      "/drop-rooms/public/ABCD23/submissions/status",
      { submitterEmail: "mohammadmsn@gmail.com" },
    );
  });
});
