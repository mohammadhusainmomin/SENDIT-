import { useState } from "react";
import { FiActivity, FiClock, FiFile, FiHash, FiHardDrive } from "react-icons/fi";
import FileUpload from "../components/FileUpload";
import SEO from "../components/SEO";
import { formatFileSize } from "../utils/formatFileSize";

function Send() {
  const [uploadState, setUploadState] = useState({
    files: [],
    code: "",
    loading: false,
    uploadProgress: 0,
    totalSize: 0,
    totalExpiryMinutes: 0,
    expiresInHours: "0",
    expiresInMinutes: "10",
  });

  const hasFiles = uploadState.files.length > 0;
  const hasCompletedUpload = Boolean(uploadState.code);
  const progressValue = hasCompletedUpload ? 100 : uploadState.uploadProgress;

  return (
    <div className="page-shell">
      <SEO
        title="Send Files Online | SendIt File Sharing"
        description="Upload and send files online with SendIt using temporary access codes and a fast secure file sharing flow."
        keywords="send files online, sendit send files, secure file upload, file sharing platform, temporary access code"
        url="https://senditsystem.netlify.app/send"
      />

      <section className="page-section">
        <div className="work-grid">
          <div className="work-main">
            <div>
              <span className="si-chip">Secure Transfer</span>
              <h1 className="si-title" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Dispatch Your Data.
              </h1>
            </div>
            <FileUpload onStateChange={setUploadState} />
          </div>

          <aside className="work-sidebar">
            <div className="si-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>Active Uploads</h3>
                <span className="si-chip" style={{ padding: "0.4rem 0.7rem" }}>
                  {uploadState.loading ? "Live" : hasCompletedUpload ? "Done" : "Idle"}
                </span>
              </div>

              <div className="upload-status-list" style={{ marginTop: "1.25rem" }}>
                {hasFiles ? (
                  uploadState.files.map((file, index) => (
                    <div className="upload-status-item" key={`${file.name}-${index}`}>
                      <strong>{file.name}</strong>
                      <div className="si-footer-copy">
                        {formatFileSize(file.size)} {" • "}
                        {hasCompletedUpload
                          ? "Uploaded"
                          : uploadState.loading
                          ? `${uploadState.uploadProgress}% in progress`
                          : "Queued"}
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progressValue}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="upload-status-item">
                    <strong>No files selected yet</strong>
                    <div className="si-footer-copy">
                      Files you pick in the upload area will appear here with real size and live progress.
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--si-border)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.9rem" }}>
                  <div className="upload-status-item" style={{ padding: "1rem" }}>
                    <div className="si-meta-label"><FiFile style={{ marginRight: "0.35rem" }} /> Files</div>
                    <strong>{uploadState.files.length}</strong>
                  </div>
                  <div className="upload-status-item" style={{ padding: "1rem" }}>
                    <div className="si-meta-label"><FiHardDrive style={{ marginRight: "0.35rem" }} /> Total Size</div>
                    <strong>{hasFiles ? formatFileSize(uploadState.totalSize) : "0 B"}</strong>
                  </div>
                  <div className="upload-status-item" style={{ padding: "1rem" }}>
                    <div className="si-meta-label"><FiClock style={{ marginRight: "0.35rem" }} /> Expiry</div>
                    <strong>
                      {uploadState.totalExpiryMinutes > 0
                        ? `${uploadState.totalExpiryMinutes} min`
                        : `${uploadState.expiresInHours}h ${uploadState.expiresInMinutes}m`}
                    </strong>
                  </div>
                  <div className="upload-status-item" style={{ padding: "1rem" }}>
                    <div className="si-meta-label"><FiActivity style={{ marginRight: "0.35rem" }} /> Progress</div>
                    <strong>{progressValue}%</strong>
                  </div>
                </div>
              </div>

              {uploadState.code && (
                <div className="upload-status-item" style={{ marginTop: "1rem" }}>
                  <div className="si-meta-label"><FiHash style={{ marginRight: "0.35rem" }} /> Share Code</div>
                  <strong style={{ letterSpacing: "0.25em" }}>{uploadState.code}</strong>
                </div>
              )}
            </div>

            <div
              className="promo-card"
              style={{
                padding: "1.5rem",
                minHeight: "280px",
                background: "linear-gradient(180deg, rgba(13,110,253,0.92), rgba(0,87,205,0.96))",
                color: "#fff",
              }}
            >
              <div className="si-meta-label" style={{ color: "rgba(255,255,255,0.72)" }}>Live Summary</div>
              <h3 style={{ color: "#fff", marginTop: "0.6rem" }}>
                {hasCompletedUpload ? "Dispatch completed." : hasFiles ? "Ready for dispatch." : "Waiting for files."}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>
                {hasCompletedUpload
                  ? `Your files are uploaded and the real share code ${uploadState.code} is ready to use.`
                  : hasFiles
                  ? `${uploadState.files.length} selected file(s) totaling ${formatFileSize(uploadState.totalSize)} are ready to upload.`
                  : "Select files from the left panel and this card will update with real upload state."}
              </p>
              {uploadState.loading && (
                <div className="progress-track" style={{ marginTop: "1rem", background: "rgba(255,255,255,0.18)" }}>
                  <div className="progress-fill" style={{ width: `${uploadState.uploadProgress}%`, background: "#fff" }} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Send;
