import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiCopy, FiRefreshCw, FiSend, FiUploadCloud } from "react-icons/fi";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import CountdownTimer from "./CountdownTimer";

function FileUpload({
  expiresInHours,
  expiresInMinutes,
  onExpiresInHoursChange,
  onExpiresInMinutesChange,
  onStateChange,
}) {
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
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
      expiresAt,
      loading,
      uploadProgress,
      totalSize,
      totalExpiryMinutes,
    });
  }, [
    code,
    expiresAt,
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
      setExpiresAt("");
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
      setExpiresAt(response.data.expiresAt || "");
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
    setExpiresAt("");
    setCopied(false);
    setUploadProgress(0);
    setTotalExpiryMinutes(0);
    onExpiresInHoursChange("0");
    onExpiresInMinutesChange("10");
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

        

          <div>
            <div className="si-meta-label text-center-redesign">Share this code</div>
            <div className="big-share-code">{code}</div>
          </div>

          {totalExpiryMinutes > 0 && (
            <CountdownTimer
              expiresAt={expiresAt}
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
    <div className="send-upload-flow">
      <div className="upload-dropzone send-upload-dropzone">
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
            <div className="send-upload-icon-shell">
              <FiUploadCloud className="inline-icon" size={36} />
            </div>
            <h3>Drop files here or click to browse</h3>
            <p className="si-footer-copy">
              You can upload one file or multiple files together.
            </p>
            <div className="send-upload-helper">
              Files stay private and are shared with a temporary 4-digit code.
            </div>
          </div>
        </label>

        {files.length > 0 ? (
          <div className="upload-list-preview" style={{ marginTop: "0.85rem" }}>
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="upload-preview-item">
                <span>
                  <strong style={{ display: "block" }}>{file.name}</strong>
                  <span className="si-footer-copy">{Math.round(file.size / 1024)} KB</span>
                </span>
                <span className="si-chip" style={{ padding: "0.35rem 0.65rem" }}>
                  Ready
                </span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="send-upload-actions">
          <div className="si-footer-copy send-upload-note">
            Pick the expiry from the right panel, then upload to get the share code.
          </div>
          <button
            className="si-button expiry-send-button send-upload-button"
            onClick={handleSend}
            disabled={files.length === 0 || loading || isMaxTimeExceeded()}
            type="button"
          >
            <FiSend /> {loading ? `Uploading ${uploadProgress}%` : "Upload and Get Code"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
