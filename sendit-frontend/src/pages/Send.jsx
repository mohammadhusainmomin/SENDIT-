import { useState } from "react";
import { FiClock, FiFile, FiHash, FiHardDrive } from "react-icons/fi";
import FileUpload from "../components/FileUpload";
import SEO from "../components/SEO";
import ExpirySelector from "../components/ExpirySelector";
import { formatFileSize } from "../utils/formatFileSize";

function Send() {
  const [expiresInHours, setExpiresInHours] = useState("0");
  const [expiresInMinutes, setExpiresInMinutes] = useState("0");
  const [expirySelected, setExpirySelected] = useState(false);
  const [uploadState, setUploadState] = useState({
    files: [],
    code: "",
    loading: false,
    uploadProgress: 0,
    totalSize: 0,
    totalExpiryMinutes: 0,
  });
  const hasFiles = uploadState.files.length > 0;
  const hasCompletedUpload = Boolean(uploadState.code);

  return (
    <div className="page-shell">
      <SEO
        title="Send Files Online | SendIt File Sharing"
        description="Upload and send files online with SendIt using temporary access codes and a fast secure file sharing flow."
        keywords="send files online, sendit send files, secure file upload, file sharing platform, temporary access code"
        url="https://senditsystem.in/send"
      />

      <section className="page-section">
        <div className="send-easy-layout">
          <div className="send-easy-main">
            <div className="si-card send-easy-intro">
              <span className="si-chip">Send Files</span>
              <h1
                className="si-title"
                style={{ marginTop: "1rem", marginBottom: "0.8rem" }}
              >
                Send files in a simple way.
              </h1>
              <p className="si-subtitle">
                Select file, choose expiry time, and share the generated 4-digit
                code with the receiver.
              </p>

              {/* Issue 5: aria-hidden so screen readers don't announce these as interactive;
                  CSS will be updated to remove the button-like background fill */}
              <div className="send-easy-steps" aria-hidden="true">
                <div className="send-step-card send-step-indicator">
                  <div className="si-meta-label">Step 1</div>
                  <strong>Choose files</strong>
                </div>
                <div className="send-step-card send-step-indicator">
                  <div className="si-meta-label">Step 2</div>
                  <strong>Set expiry</strong>
                </div>
                <div className="send-step-card send-step-indicator">
                  <div className="si-meta-label">Step 3</div>
                  <strong>Share code</strong>
                </div>
              </div>
              {/* Screen-reader-only progress description */}
              <p className="sr-only">To send a file: first choose files, then set the expiry time, then share the generated code.</p>
            </div>

            <FileUpload
              expiresInHours={expiresInHours}
              expiresInMinutes={expiresInMinutes}
              expirySelected={expirySelected}
              onExpiresInHoursChange={setExpiresInHours}
              onExpiresInMinutesChange={setExpiresInMinutes}
              onExpirySelectedChange={setExpirySelected}
              onStateChange={setUploadState}
            />
          </div>

          <aside className="send-easy-sidebar">
            <div className="si-card send-summary-card">
              <h3 style={{ marginTop: 0 }}>Quick Summary</h3>

              <div className="send-summary-grid">
                <div className="send-summary-item">
                  <div className="si-meta-label">
                    <FiFile style={{ marginRight: "0.35rem" }} /> Files
                  </div>
                  <strong>{uploadState.files.length}</strong>
                </div>
                <div className="send-summary-item">
                  <div className="si-meta-label">
                    <FiHardDrive style={{ marginRight: "0.35rem" }} /> Total
                    Size
                  </div>
                  <strong>
                    {hasFiles ? formatFileSize(uploadState.totalSize) : "0 B"}
                  </strong>
                </div>
                <div className="send-summary-item">
                  <div className="si-meta-label">
                    <FiClock style={{ marginRight: "0.35rem" }} /> Expiry
                  </div>
                  <strong>
                    {uploadState.totalExpiryMinutes > 0
                      ? `${uploadState.totalExpiryMinutes} min`
                      : `${expiresInHours}h ${expiresInMinutes}m`}
                  </strong>
                </div>
                <div className="send-summary-item">
                  <div className="si-meta-label">
                    <FiHash style={{ marginRight: "0.35rem" }} /> Status
                  </div>
                  <strong>
                    {uploadState.loading
                      ? `Uploading ${uploadState.uploadProgress}%`
                      : hasCompletedUpload
                        ? "Code Ready"
                        : "Waiting"}
                  </strong>
                </div>
              </div>

              {uploadState.code ? (
                <div className="send-summary-code">
                  <div className="si-meta-label">Share Code</div>
                  <div className="send-summary-code-value">
                    {uploadState.code}
                  </div>
                  <div className="si-footer-copy">
                    Send this code to the receiver.
                  </div>
                </div>
              ) : (
                <div className="send-summary-note">
                  <strong>Receiver flow:</strong>
                  <span className="si-footer-copy">
                    After upload, share the code. The receiver opens the receive
                    page and downloads the file bundle.
                  </span>
                </div>
              )}
            </div>

            <div className="si-card send-control-card send-sidebar-expiry-card">
              <ExpirySelector
                hours={expiresInHours}
                minutes={expiresInMinutes}
                selected={expirySelected}
                disabled={uploadState.loading || hasCompletedUpload}
                onChange={(nextHours, nextMinutes) => {
                  setExpiresInHours(nextHours);
                  setExpiresInMinutes(nextMinutes);
                  setExpirySelected(true);
                }}
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Send;
