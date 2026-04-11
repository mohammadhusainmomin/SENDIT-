import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiGrid, FiHash, FiLock, FiZap } from "react-icons/fi";
import { FileTransferIllustration } from "../components/Illustrations";
import SEO from "../components/SEO";

function Home() {
  const navigate = useNavigate();

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SendIt",
    description: "Secure file sharing and code sharing platform with temporary access codes.",
    url: "https://senditsystem.netlify.app",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
  };

  return (
    <div className="page-shell">
      <SEO
        title="SendIt - Secure File Sharing and Code Sharing Platform"
        description="Send files online and share code snippets with temporary access codes using SendIt, a secure file sharing and code sharing platform."
        keywords="sendit, sendit file sharing, secure file sharing, send files online, code sharing platform, temporary access code"
        url="https://senditsystem.netlify.app"
        structuredData={homeStructuredData}
      />

      <section className="page-section">
        <div className="hero-layout">
          <div>
            <span className="si-chip">Kinetic Infrastructure</span>
            <h1 className="si-title" style={{ marginTop: "1rem", marginBottom: "1.4rem" }}>
              Secure Motion for <br />
              <span className="si-gradient-text">Digital Assets.</span>
            </h1>
            <p className="si-subtitle">
              Send files or code with a short temporary code, clear steps, and a simple receive flow that even a new user can follow quickly.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <button className="si-button" onClick={() => navigate("/send")} type="button">
                Send Files <FiArrowRight />
              </button>
              <button className="si-button-secondary" onClick={() => navigate("/receive")} type="button">
                Receive File
              </button>
            </div>

            <div className="si-stats-row">
              <div className="si-stat-card">
                <div className="si-meta-label">Steps</div>
                <h3 style={{ marginTop: "0.35rem" }}>Send -&gt; Share -&gt; Receive</h3>
              </div>
              <div className="si-stat-card">
                <div className="si-meta-label">Security</div>
                <h3 style={{ marginTop: "0.45rem" }}>AES-256</h3>
              </div>
              <div className="si-stat-card">
                <div className="si-meta-label">Access</div>
                <h3 style={{ marginTop: "0.45rem" }}>4-Digit Code</h3>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-core">
              <div className="hero-visual-illustration" aria-label="Animated file transfer illustration" role="img">
                <FileTransferIllustration />
              </div>
            </div>
            <div className="hero-floating-card">
              <div className="hero-floating-top">
                <span className="si-chip">Transfer Snapshot</span>
                <span className="hero-floating-status">Online</span>
              </div>
              <div className="hero-floating-metrics">
                <div>
                  <div className="si-meta-label">Active Flow</div>
                  <strong>File + Code</strong>
                </div>
                <div>
                  <div className="si-meta-label">Expiry Mode</div>
                  <strong>Time-Limited</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">Precision Logistics</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Engineered for absolute trust.</h2>
        </div>

        <div className="feature-bento">
          <div className="si-card span-3">
            <FiLock className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>AES-256 Encryption</h3>
            <p className="si-subtitle" style={{ fontSize: "1rem", maxWidth: "unset" }}>
              File and snippet transfer routed through the current backend workflow with a cleaner, more focused UI.
            </p>
          </div>

          <div className="si-card span-3" style={{ background: "linear-gradient(135deg, var(--si-primary-deep), var(--si-primary))", color: "#fff" }}>
            <FiHash size={34} />
            <h3 style={{ marginTop: "1rem", color: "#fff" }}>4-Digit Fluid Auth</h3>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.8 }}>
              Temporary access codes keep sharing simple for both sender and receiver without exposing long public links.
            </p>
            <div style={{ marginTop: "1.2rem", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "0.45em" }}>1 2 3 4</div>
          </div>

          <div className="si-card span-2">
            <FiGrid className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Simple For New Users</h3>
            <p>Pick files, choose expiry, copy the code, and the receiver downloads with the same short code.</p>
          </div>

          <div className="si-card span-4">
            <FiZap className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Node.js Performance Core</h3>
            <div className="si-stats-row" style={{ marginTop: "1rem" }}>
              <div>
                <div className="si-meta-label">Flow</div>
                <h3>Easy Start</h3>
              </div>
              <div>
                <div className="si-meta-label">Expiry</div>
                <h3>User Controlled</h3>
              </div>
              <div>
                <div className="si-meta-label">Retrieval</div>
                <h3>Fast + Secure</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="si-panel status-strip">
          <div>
            <div className="si-meta-label">Live Status</div>
            <h3 style={{ marginTop: "0.4rem" }}>Start In Seconds</h3>
            <p className="si-footer-copy">Choose send or receive, use the temporary code, and finish the transfer without extra setup.</p>
          </div>
          <div className="si-nav-link active" style={{ justifySelf: "start" }}>Quick code-based sharing</div>
          <div style={{ textAlign: "right" }}>
            <div className="si-meta-label">Use Case</div>
            <h3>Files + Code</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
