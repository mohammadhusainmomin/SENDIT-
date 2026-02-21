import { useState } from "react";
import "./styles/FileUpload.css";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import { formatFileSize } from "../utils/formatFileSize";
import { FaWhatsapp } from "react-icons/fa";
import { FiUploadCloud, FiFile, FiRefreshCw, FiSend, FiCopy, FiCheck,  } from "react-icons/fi";
import CountdownTimer from "./CountdownTimer";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [expiresInHours, setExpiresInHours] = useState("0");
  const [expiresInMinutes, setExpiresInMinutes] = useState("10");
  const [totalExpiryMinutes, setTotalExpiryMinutes] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { success, error: showError } = useToast();

  // Generate hour options (0-24)
  const hourOptions = Array.from({ length: 25 }, (_, i) => i);

  // Generate minute options (0, 5, 10, 15, ..., 55)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  const calculateTotalMinutes = () => {
    const hours = parseInt(expiresInHours) || 0;
    const minutes = parseInt(expiresInMinutes) || 0;
    return hours * 60 + minutes;
  };

  const isMaxTimeExceeded = () => {
    const totalMinutes = calculateTotalMinutes();
    return totalMinutes > 1440; // 1 day = 1440 minutes
  };

  const handleSend = async () => {
    if (files.length === 0) {
      showError("Please select at least one file");
      return;
    }

    if (calculateTotalMinutes() === 0) {
      showError("Please set an expiration time");
      return;
    }

    if (isMaxTimeExceeded()) {
      showError("Maximum expiration time is 1 day (24 hours)");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);
      setError("");

      const token = localStorage.getItem("token");
      const expiresIn = calculateTotalMinutes();

      // Create FormData with all files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await api.post(
        `${token ? "/send-auth" : "/send"}?expiresIn=${expiresIn}`,
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setCode(res.data.code);
      setTotalExpiryMinutes(expiresIn);
      setUploadProgress(0);
      success(`🎉 ${files.length} file(s) uploaded successfully!`);
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      showError("Upload failed. Please try again.");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setError("");
      setCode("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    success("✓ Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const totalMinutes = calculateTotalMinutes();
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let timeText = "";
    if (hours > 0) timeText += `${hours}h `;
    if (minutes > 0) timeText += `${minutes}m`;

    const message = `📁 SENDIT – Fast & Secure File Share

🔐 Access Code:
👉 ${code}

📦 Files: ${files.length} file${files.length !== 1 ? "s" : ""}
⏰ Valid for: ${timeText || "just now"}

🌐 Download your files here:
https://senditsystem.netlify.app/

🔒 Secure • No links • One-time access`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleReset = () => {
    setFiles([]);
    setCode("");
    setError("");
    setCopied(false);
  };

  const getDisplayTime = () => {
    const totalMinutes = calculateTotalMinutes();
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    if (minutes === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <div className="file-upload-container">
        {!code ? (
          <>
            <div className="upload-area">
              <label className="file-input-label">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  disabled={loading}
                  className="file-input-hidden"
                />
                <div className="upload-box">
                  {files.length > 0 ? (
                    <div className="file-preview">
                      <div className="file-icon"><FiFile /></div>
                      <p className="file-name">
                        {files.length === 1 ? files[0].name : `${files.length} files selected`}
                      </p>
                      <p className="file-size">
                        {formatFileSize(files.reduce((total, f) => total + f.size, 0))}
                      </p>
                      <button
                        type="button"
                        className="btn-change-file"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(".file-input-hidden").click();
                        }}
                      >
                        <FiRefreshCw /> Change Files
                      </button>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <div className="upload-icon"><FiUploadCloud /></div>
                      <p className="upload-text">
                        Click to select files or drag and drop
                      </p>
                      <p className="upload-hint">
                        Select one or multiple files, up to 500MB each
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="expiration-time-container">
              <label>File expires in:</label>
              <div className="time-selectors">
                <div className="time-group">
                  <label htmlFor="hours-select">Hours</label>
                  <select
                    id="hours-select"
                    value={expiresInHours}
                    onChange={(e) => setExpiresInHours(e.target.value)}
                    disabled={loading}
                  >
                    {hourOptions.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="time-group">
                  <label htmlFor="minutes-select">Minutes</label>
                  <select
                    id="minutes-select"
                    value={expiresInMinutes}
                    onChange={(e) => setExpiresInMinutes(e.target.value)}
                    disabled={loading}
                  >
                    {minuteOptions.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isMaxTimeExceeded() && (
                <p className="time-warning">⚠️ Maximum time is 1 day (24 hours)</p>
              )}

              {calculateTotalMinutes() > 0 && !isMaxTimeExceeded() && (
                <p className="time-display">Total: {getDisplayTime()}</p>
              )}
            </div>

            <div className="button-container">
              <button
                className="btn-send"
                onClick={handleSend}
                disabled={files.length === 0 || loading || isMaxTimeExceeded()}
              >
                <FiSend />
                {loading ? `Uploading... ${uploadProgress}%` : `Send ${files.length === 1 ? "File" : "Files"}`}
              </button>
              {loading && uploadProgress > 0 && (
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="code-success-container">
            <div className="success-icon"><FiCheck /></div>
            <h3>Woohoo! Files Uploaded!</h3>

            <div className="files-list">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <span className="file-item-icon"><FiFile /></span>
                  <span className="file-item-name">{file.name}</span>
                </div>
              ))}
            </div>

            <div className="code-display">
              <p className="code-label">Share this code:</p>
              <div className="code-box">
                <span className="access-code">{code}</span>

                <button
                  className="btn-copy"
                  onClick={copyToClipboard}
                  title="Copy code"
                >
                  {copied ? <FiCheck /> : <FiCopy />} {copied ? "Copied" : "Copy"}
                </button>

                <button
                  className="btn-whatsapp"
                  onClick={shareOnWhatsApp}
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp
                </button>
              </div>
            </div>

            {totalExpiryMinutes > 0 && (
              <CountdownTimer
                expiresInMinutes={totalExpiryMinutes}
                onExpire={() => {
                  showError("Code has expired!");
                  handleReset();
                }}
              />
            )}

            <div className="button-group">
              <button className="btn-send-another" onClick={handleReset}>
                <FiRefreshCw /> Send More Files
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FileUpload;
