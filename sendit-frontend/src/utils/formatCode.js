import api from "../services/api";
import { formatCode as formatWithLanguage } from "./multiLanguageFormatter";

export const formatCode = async (code, language = "auto-detect") => {
  if (!code || !code.trim()) {
    return code;
  }

  const normalizedLanguage = (language || "auto-detect").toLowerCase();

  if (normalizedLanguage === "python") {
    try {
      const response = await api.post("/code/format", {
        content: code,
        language: normalizedLanguage,
      });

      if (response?.data?.formattedContent) {
        return response.data.formattedContent;
      }
    } catch (error) {
      console.warn("Python backend formatting failed, falling back to frontend formatter.", error);
    }
  }

  return formatWithLanguage(code, normalizedLanguage);
};
