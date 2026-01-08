import FileUpload from "../components/FileUpload";
import { UploadIllustration } from "../components/Illustrations";
import SEO from "../components/SEO";
import "../styles/Send.css";

function Send() {
  return (
    <div className="send-container">
      <SEO
        title="Send File - SendIt Secure File Sharing"
        description="Upload and send your files securely. Get a 4-digit access code to share. Files auto-delete for security."
        url="https://sendit.example.com/send"
      />
      <div className="send-content">
        <section className="send-header">
          <div className="header-icon">📤</div>
          <h2>Send File</h2>
          <p>Share any file with just a 4-digit code</p>
        </section>

        <section className="send-form-section">
          <div className="form-illustration">
            <UploadIllustration />
          </div>
          <FileUpload />
        </section>

        <section className="send-info">
          <h3>Why Choose SENDIT?</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">⚡</span>
              <h4>Fast Upload</h4>
              <p>Optimized for speed on any connection</p>
            </div>
            <div className="info-item">
              <span className="info-icon">🔐</span>
              <h4>Secure</h4>
              <p>Code-based access only. No links to share.</p>
            </div>
            <div className="info-item">
              <span className="info-icon">🗑️</span>
              <h4>Auto Delete</h4>
              <p>Files automatically deleted after 10 minutes</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📦</span>
              <h4>Any File Type</h4>
              <p>Images, documents, videos, archives, etc.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Send;
