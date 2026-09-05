import { useState } from "react";
import {
  FiClock,
  FiDownload,
  FiFile,
  FiFolder,
  FiHash,
  FiLayers,
  FiPackage,
} from "react-icons/fi";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import { formatFileSize } from "../utils/formatFileSize";
  
function CodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [showFileList, setShowFileList] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const [activeDownloadIndex, setActiveDownloadIndex] = useState(null);
  const { success: showSuccess, error: showError } = useToast();

  const totalBundleSize = filesList.reduce((total, file) => total + (file.size || 0), 0);

  const getFileExtension = (fileName = "") => {
    const nameParts = fileName.split(".").filter(Boolean);

    if (nameParts.length <= 1) {
      return "FILE";
    }

    return nameParts[nameParts.length - 1].slice(0, 4).toUpperCase();
  };

  const performGetFiles = async () => {
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
      setExpiresAt(response.data.expiresAt || "");
      setShowFileList(false);
      setActiveDownloadIndex(null);

      if (files.length === 1) {
        await handleDownloadFile(0, files);
      } else if (files.length > 1) {
        setShowFileList(true);
      } else {
        showError("No files found for this code.");
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

  const handleGetFiles = () => {
    if (code.length !== 4) {
      showError("Please enter a valid 4-digit code");
      return;
    }

    performGetFiles();
  };

  const handleDownloadFile = async (fileIndex, providedFiles = filesList) => {
    try {
      setLoading(true);
      setActiveDownloadIndex(fileIndex);
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
      if (err.response?.status === 410) {
        showError("This code has expired. Please ask for a new code");
      } else if (err.response?.status === 404) {
        showError("Requested file was not found");
      } else {
        showError("Download failed. Please try again.");
      }
    } finally {
      setLoading(false);
      setActiveDownloadIndex(null);
    }
  };

  const handleReset = () => {
    setCode("");
    setFilesList([]);
    setExpiresAt("");
    setShowFileList(false);
    setActiveDownloadIndex(null);
  };

  return (
    <>
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
          Enter the sender's 4-digit code to fetch the current file bundle before it expires.
        </div>
      </div>

      {showFileList && (
        <div className="si-card receive-bundle-card" style={{ padding: "1.5rem" }}>
          <div className="receive-bundle-header">
            <div className="receive-bundle-title">
              <div className="receive-bundle-icon">
                <FiFolder className="inline-icon" />
              </div>
              <div>
                <div className="si-meta-label">Bundle Ready</div>
                <h3 style={{ margin: 0 }}>{filesList.length} Files Available</h3>
              </div>
            </div>
            <div className="receive-bundle-code">
              <span className="si-meta-label">Access Code</span>
              <strong>{code}</strong>
            </div>
          </div>

          <div className="receive-bundle-summary">
            <div className="receive-bundle-stat">
              <span className="si-meta-label">
                <FiLayers /> Files
              </span>
              <strong>{filesList.length}</strong>
            </div>
            <div className="receive-bundle-stat">
              <span className="si-meta-label">
                <FiPackage /> Total Size
              </span>
              <strong>{formatFileSize(totalBundleSize)}</strong>
            </div>
            <div className="receive-bundle-stat">
              <span className="si-meta-label">
                <FiClock /> Valid Until
              </span>
              <strong>{expiresAt ? new Date(expiresAt).toLocaleString() : "Temporary"}</strong>
            </div>
          </div>

          <div className="download-file-list receive-download-grid" style={{ marginTop: "1rem" }}>
            {filesList.map((file, index) => (
              <div key={`${file.name}-${index}`} className="download-file-item receive-file-card">
                <div className="receive-file-main">
                  <div className="receive-file-badge">{getFileExtension(file.name)}</div>
                  <div className="receive-file-copy">
                    <div className="receive-file-heading">
                      <FiFile className="inline-icon" />
                      <strong>{file.name}</strong>
                    </div>
                    <div className="receive-file-meta">
                      <span className="receive-file-meta-chip">
                        <FiHash /> File {index + 1}
                      </span>
                      {file.size ? (
                        <span className="receive-file-meta-chip">
                          <FiPackage /> {formatFileSize(file.size)}
                        </span>
                      ) : null}
                      {file.mimeType ? <span className="si-footer-copy">{file.mimeType}</span> : null}
                    </div>
                  </div>
                </div>

                <button
                  className="si-button-secondary receive-download-button"
                  onClick={() => handleDownloadFile(index)}
                  disabled={loading}
                  type="button"
                >
                  <FiDownload />
                  {loading && activeDownloadIndex === index ? "Downloading..." : "Download File"}
                </button>
              </div>
            ))}
          </div>

          <button
            className="si-button-secondary receive-bundle-reset"
            onClick={handleReset}
            type="button"
            style={{ marginTop: "1rem" }}
          >
            Try Another Code
          </button>
        </div>
      )}
      </div>
    </>
  );
}

export default CodeInput;
