import { useState } from "react";
import { FiArrowDown, FiDownload, FiFile, FiFolder } from "react-icons/fi";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import { formatFileSize } from "../utils/formatFileSize";

function CodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [showFileList, setShowFileList] = useState(false);
  const { success: showSuccess, error: showError } = useToast();

  const handleGetFiles = async () => {
    if (code.length !== 4) {
      showError("Please enter a valid 4-digit code");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/receive",
        { code },
        { headers: { ...(token && { Authorization: `Bearer ${token}` }) } }
      );

      const files = response.data.files || [];
      setFilesList(files);

      if (files.length === 1) {
        handleDownloadFile(0, files);
      } else if (files.length > 1) {
        setShowFileList(true);
      }
    } catch (err) {
      if (err.response?.status === 410) {
        showError("This code has expired. Please ask for a new code");
      } else {
        showError("Invalid code or download failed. Please try again.");
      }
      setFilesList([]);
      setShowFileList(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFile = async (fileIndex, providedFiles = filesList) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/receive",
        { code, fileIndex },
        {
          responseType: "blob",
          headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        }
      );

      const disposition = response.headers["content-disposition"];
      const xFilename = response.headers["x-filename"];
      let fileName = providedFiles[fileIndex]?.name || "downloaded-file";

      if (xFilename) {
        try {
          fileName = decodeURIComponent(xFilename);
        } catch (e) {}
      } else if (disposition) {
        const filenameStarRegex = /filename\*=UTF-8''([^;]*)/i;
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const starMatches = filenameStarRegex.exec(disposition);
        const matches = filenameRegex.exec(disposition);

        if (starMatches && starMatches[1]) {
          fileName = decodeURIComponent(starMatches[1]);
        } else if (matches && matches[1]) {
          fileName = matches[1].replace(/['"]/g, "");
        }
      }

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
      showSuccess("File downloaded successfully");
    } catch (err) {
      showError("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setFilesList([]);
    setShowFileList(false);
  };

  return (
    <div className="si-grid">
      <div className="si-card" style={{ padding: "1.5rem" }}>
        <div className="code-input-hero">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="Enter 4-digit code"
            disabled={loading || showFileList}
            maxLength={4}
          />
          <button className="si-button" onClick={handleGetFiles} disabled={loading || code.length !== 4} type="button">
            <FiDownload /> {loading ? "Retrieving..." : "Retrieve"}
          </button>
        </div>
        <div className="si-footer-copy" style={{ marginTop: "1rem" }}>
          Enter the sender's 4-digit code. The current backend API is unchanged, so this remains fully working.
        </div>
      </div>

      {showFileList && (
        <div className="si-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <FiFolder className="inline-icon" />
            <h3 style={{ margin: 0 }}>{filesList.length} Files Available</h3>
          </div>

          <div className="download-file-list" style={{ marginTop: "1rem" }}>
            {filesList.map((file, index) => (
              <button
                key={`${file.name}-${index}`}
                className="download-file-item"
                onClick={() => handleDownloadFile(index)}
                disabled={loading}
                type="button"
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.7rem", color: "var(--si-text)" }}>
                  <FiFile className="inline-icon" />
                  <span>
                    <strong style={{ display: "block" }}>{file.name}</strong>
                    {file.size ? <span className="si-footer-copy">{formatFileSize(file.size)}</span> : null}
                  </span>
                </span>
                <FiArrowDown className="inline-icon" />
              </button>
            ))}
          </div>

          <button className="si-button-secondary" onClick={handleReset} type="button" style={{ marginTop: "1rem" }}>
            Try Another Code
          </button>
        </div>
      )}
    </div>
  );
}

export default CodeInput;
