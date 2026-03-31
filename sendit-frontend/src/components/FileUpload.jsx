import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiCopy, FiFile, FiRefreshCw, FiSend, FiUploadCloud } from "react-icons/fi";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import { formatFileSize } from "../utils/formatFileSize";
import CountdownTimer from "./CountdownTimer";
import TimeStepper from "./TimeStepper";

function FileUpload({ onStateChange }) {
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expiresInHours, setExpiresInHours] = useState("0");
  const [expiresInMinutes, setExpiresInMinutes] = useState("10");
  const [totalExpiryMinutes, setTotalExpiryMinutes] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);
  const { success, error: showError } = useToast();

  const calculateTotalMinutes = () => {
    const hours = parseInt(expiresInHours, 10) || 0;
    const minutes = parseInt(expiresInMinutes, 10) || 0;
    return hours * 60 + minutes;
  };

  const isMaxTimeExceeded = () => calculateTotalMinutes() > 1440;
  const totalSize = files.reduce((total, file) => total + file.size, 0);

  useEffect(() => {
    if (!onStateChange) return;

    onStateChange({
      files,
      code,
      loading,
      uploadProgress,
      totalSize,
      totalExpiryMinutes,
      expiresInHours,
      expiresInMinutes,
    });
  }, [
    code,
    expiresInHours,
    expiresInMinutes,
    files,
    loading,
    onStateChange,
    totalExpiryMinutes,
    totalSize,
    uploadProgress,
  ]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setCode("");
    }
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

      const token = localStorage.getItem("token");
      const expiresIn = calculateTotalMinutes();
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await api.post(
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

      setCode(response.data.code);
      setTotalExpiryMinutes(expiresIn);
      setUploadProgress(0);
      success(`${files.length} file(s) uploaded successfully`);
    } catch (err) {
      showError(err.response?.data?.message || "Upload failed. Please try again.");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setCode("");
    setCopied(false);
    setUploadProgress(0);
    setTotalExpiryMinutes(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  };

  const shareOnWhatsApp = () => {
    const message = `SendIt access code: ${code}\nFiles: ${files.length}\nOpen SendIt and enter this 4-digit code to download.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (code) {
    return (
      <div className="si-card" style={{ padding: "1.5rem" }}>
        <div className="code-display-redesign">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}>
            <span className="si-chip" style={{ padding: "0.45rem 0.8rem" }}>
              <FiCheck /> Ready
            </span>
          </div>

          <div className="upload-list-preview">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="upload-preview-item">
                <span style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <FiFile className="inline-icon" />
                  {file.name}
                </span>
                <span className="si-footer-copy">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="si-meta-label text-center-redesign">Share this code</div>
            <div className="big-share-code">{code}</div>
          </div>

          {totalExpiryMinutes > 0 && (
            <CountdownTimer
              expiresInMinutes={totalExpiryMinutes}
              onExpire={() => {
                showError("Code has expired");
                handleReset();
              }}
            />
          )}

          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button className="si-button-secondary" onClick={copyToClipboard} type="button">
              {copied ? <FiCheck /> : <FiCopy />} {copied ? "Copied" : "Copy Code"}
            </button>
            <button className="si-button-secondary" onClick={shareOnWhatsApp} type="button">
              <FaWhatsapp /> WhatsApp
            </button>
            <button className="si-button" onClick={handleReset} type="button">
              <FiRefreshCw /> Send More
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="si-grid">
      <div className="upload-dropzone">
        <label className="upload-dropzone-inner" htmlFor="sendit-upload-input">
          <input
            ref={inputRef}
            id="sendit-upload-input"
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={loading}
            style={{ display: "none" }}
          />

          <div>
            <div
              style={{
                width: "84px",
                height: "84px",
                margin: "0 auto 1rem",
                borderRadius: "999px",
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.9)",
              }}
            >
              <FiUploadCloud className="inline-icon" size={36} />
            </div>
            <h3>Drop your files here</h3>
            <p className="si-footer-copy">
              Or browse files on your device. Current backend supports working file upload with share code generation.
            </p>
            <div className="si-meta-label" style={{ marginTop: "1rem" }}>
              Support for multiple files up to backend limits
            </div>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="si-card" style={{ padding: "1.3rem" }}>
          <div className="upload-list-preview">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="upload-preview-item">
                <span style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <FiFile className="inline-icon" />
                  {file.name}
                </span>
                <span className="si-footer-copy">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
          <div className="si-footer-copy" style={{ marginTop: "0.9rem" }}>
            Total size: {formatFileSize(totalSize)}
          </div>
        </div>
      )}

      <div className="si-card" style={{ padding: "1.5rem" }}>
        <div className="wheel-panel">
          <div className="wheel-column">
            <div className="si-meta-label">Hours</div>
            <div className="wheel-value">
              <strong>{String(expiresInHours).padStart(2, "0")}</strong>
              <TimeStepper label="" value={expiresInHours} onChange={setExpiresInHours} max={24} step={1} disabled={loading} />
            </div>
          </div>

          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--si-primary)" }}>:</div>

          <div className="wheel-column">
            <div className="si-meta-label">Minutes</div>
            <div className="wheel-value">
              <strong>{String(expiresInMinutes).padStart(2, "0")}</strong>
              <TimeStepper label="" value={expiresInMinutes} onChange={setExpiresInMinutes} max={55} step={5} disabled={loading} />
            </div>
          </div>
        </div>

        {calculateTotalMinutes() > 0 && !isMaxTimeExceeded() && (
          <div className="si-footer-copy" style={{ marginTop: "1rem" }}>
            Share code valid for {calculateTotalMinutes()} minute(s)
          </div>
        )}
      </div>

      <div className="action-block">
        <div className="si-meta-label" style={{ color: "rgba(255,255,255,0.72)" }}>Ready to dispatch?</div>
        <h3 style={{ color: "#fff", marginTop: "0.5rem" }}>Secure link code will be generated instantly.</h3>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <button className="si-button-secondary" onClick={handleSend} disabled={files.length === 0 || loading || isMaxTimeExceeded()} type="button">
            <FiSend /> {loading ? `Uploading ${uploadProgress}%` : "Initialize Dispatch"}
          </button>
          {files.length > 0 && (
            <button className="si-button-ghost" onClick={handleReset} type="button" style={{ color: "#fff" }}>
              <FiRefreshCw /> Reset
            </button>
          )}
        </div>
        {loading && uploadProgress > 0 && (
          <div className="progress-track" style={{ marginTop: "1rem", background: "rgba(255,255,255,0.18)" }}>
            <div className="progress-fill" style={{ width: `${uploadProgress}%`, background: "#fff" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
