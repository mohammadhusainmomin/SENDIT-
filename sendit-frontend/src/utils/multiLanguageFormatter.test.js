import { formatCode, repairPythonIndentation } from "./multiLanguageFormatter";

jest.mock("@wasm-fmt/ruff_fmt", () => ({
  format: jest.fn((source) => {
    if (/(^|\n) {1,3}name=/.test(source)) {
      throw new Error("Invalid Python indentation");
    }
    return source;
  }),
}));

const malformedPython = [
  "def total(values):",
  "    result=0",
  "    for value in values:",
  "        result+=value",
  "    return result",
  "",
  "print(total([3,5,8]))",
  "",
  "def num(values):",
  "     you=0",
  "     for i in range(n):",
  '   name="lala"',
].join("\n");

describe("Python formatting", () => {
  test("repairs inconsistent indentation without shifting top-level code", () => {
    expect(repairPythonIndentation(malformedPython)).toBe([
      "def total(values):",
      "    result=0",
      "    for value in values:",
      "        result+=value",
      "    return result",
      "",
      "print(total([3,5,8]))",
      "",
      "def num(values):",
      "    you=0",
      "    for i in range(n):",
      '        name="lala"',
    ].join("\n"));
  });

  test("formats malformed Python after repairing its indentation", async () => {
    await expect(formatCode(malformedPython, "python")).resolves.toBe(
      repairPythonIndentation(malformedPython),
    );
  });

});
