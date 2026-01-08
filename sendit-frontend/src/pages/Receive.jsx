import CodeInput from "../components/CodeInput";
import { DownloadIllustration } from "../components/Illustrations";
import SEO from "../components/SEO";
import "../styles/Receive.css";

function Receive() {
  return (
    <div className="receive-container">
      <SEO
        title="Receive File - SendIt"
        description="Receive files securely using a 4-digit access code. Fast, secure, and no account required."
        url="https://sendit.example.com/receive"
      />
      <div className="receive-content">
        <section className="receive-header">
          <div className="header-icon">📥</div>
          <h2>Receive File</h2>
          <p>Enter the 4-digit code to download</p>
        </section>

        <section className="receive-form-section">
          <div className="form-illustration">
            <DownloadIllustration />
          </div>
          <CodeInput />
        </section>

        <section className="receive-info">
          <h3>How to Receive</h3>
          <div className="steps">
            <div className="receive-step">
              <div className="step-badge">1</div>
              <h4>Get the Code</h4>
              <p>Ask your friend for the 4-digit access code</p>
            </div>
            <div className="step-divider"></div>
            <div className="receive-step">
              <div className="step-badge">2</div>
              <h4>Enter Code</h4>
              <p>Type the code into the input field below</p>
            </div>
            <div className="step-divider"></div>
            <div className="receive-step">
              <div className="step-badge">3</div>
              <h4>Download</h4>
              <p>Click download and the file will be saved</p>
            </div>
          </div>
        </section>

        <section className="receive-notes">
          <div className="note-item">
            <span className="note-icon">🔐</span>
            <p>Only available to logged-in users</p>
          </div>
          <div className="note-item">
            <span className="note-icon">⏰</span>
            <p>Codes expire after 10 minutes</p>
          </div>
          <div className="note-item">
            <span className="note-icon">🔄</span>
            <p>Each code can be used multiple times until expired</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Receive;
