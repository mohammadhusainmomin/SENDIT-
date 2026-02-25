import { useState } from "react";
import { FiDownload, FiBox, FiFile, FiArrowDown } from "react-icons/fi";
import "./styles/CodeInput.css";
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
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const files = response.data.files || [];
      setFilesList(files);

      // If only one file, download automatically
      if (files.length === 1) {
        handleDownloadFile(0);
      } else if (files.length > 1) {
        setShowFileList(true);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
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

  const handleDownloadFile = async (fileIndex) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/receive",
        { code, fileIndex },
        {
          responseType: "blob",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const disposition = response.headers["content-disposition"];
      let fileName = "downloaded-file";

      if (disposition) {
        // More robust filename extraction
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          fileName = matches[1].replace(/['"]/g, '');
          fileName = decodeURIComponent(fileName);
        }
      }

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      showSuccess("File downloaded successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      showError("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCode(value);
  };

  const handleReset = () => {
    setCode("");
    setFilesList([]);
    setShowFileList(false);
  };

  return (
    <div className="code-input-container">
      <div className="code-input-wrapper">
        <label htmlFor="access-code" className="code-label">
          Access Code
        </label>
        <input
          id="access-code"
          type="text"
          inputMode="numeric"
          placeholder=" "
          value={code}
          onChange={handleCodeChange}
          disabled={loading || showFileList}
          maxLength="4"
          className="code-input"
        />
      </div>

      {!showFileList ? (
        <>
          <div className="button-group">
            <button
              className="btn-download"
              onClick={handleGetFiles}
              disabled={code.length !== 4 || loading}
            >
              <FiDownload />
              {loading ? "Retrieving..." : "Get Files"}
            </button>
          </div>

          <div className="code-info">
            <p>Enter the 4-digit code your friend sent you</p>
          </div>
        </>
      ) : (
        <div className="files-selection-container">
          <h3 className="files-selection-title">
            <FiBox /> {filesList.length} File{filesList.length !== 1 ? "s" : ""} Available
          </h3>

          <div className="files-selection-list">
            {filesList.map((file, index) => (
              <button
                key={index}
                className="file-download-btn"
                onClick={() => handleDownloadFile(index)}
                disabled={loading}
              >
                <span className="file-icon"><FiFile /></span>
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  {file.size && (
                    <span className="file-size">{formatFileSize(file.size)}</span>
                  )}
                </div>
                <span className="download-icon"><FiArrowDown /></span>
              </button>
            ))}
          </div>

          <button
            className="btn-reset"
            onClick={handleReset}
            disabled={loading}
          >
            Try Another Code
          </button>
        </div>
      )}
    </div>
  );
}

export default CodeInput;
