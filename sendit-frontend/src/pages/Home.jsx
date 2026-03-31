import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiGrid, FiHash, FiLock, FiZap } from "react-icons/fi";
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
              A refined file and code sharing experience built on the current SendIt workflow,
              with temporary access codes, clear transfer steps, and fast retrieval.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <button className="si-button" onClick={() => navigate("/send")} type="button">
                Start Sending <FiArrowRight />
              </button>
              <button className="si-button-secondary" onClick={() => navigate("/code/receive")} type="button">
                Enter Code
              </button>
            </div>

            <div className="si-stats-row">
              <div className="si-stat-card">
                <div className="si-meta-label">Latency Floor</div>
                <h3 style={{ marginTop: "0.45rem" }}>0.02s</h3>
              </div>
              <div className="si-stat-card">
                <div className="si-meta-label">Encryption</div>
                <h3 style={{ marginTop: "0.45rem" }}>AES-256</h3>
              </div>
              <div className="si-stat-card">
                <div className="si-meta-label">Share Flow</div>
                <h3 style={{ marginTop: "0.45rem" }}>Code Based</h3>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-core">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHiAKWfv_aUxG5RZjDRjN5v3tLpNZ_yenN_zcdHRuAR6uMV6nQoAZTyYcnSAqL-PLS-N0CKbEu7PesDaHfP0FMUFlAjkVdrC2Easkjmt0qUEHp5kFG2F4oO6A7pzA_KtyyDj_fHnnONakswjXRFsGuFOB9efWujT7eBUwQsgV0535jTHyWuPMAoVIPed2DknoImzCCzoU5uD-e0sYfh4kyyBYT2exsOjnYddtEpSAu7l2oqGasa91gEBCkeF8mJzST0uKhCnGoey4C"
                alt="3D Abstract Core"
                className="hero-visual-image"
              />
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
            <h3 style={{ marginTop: "1rem" }}>Visual Handshake</h3>
            <p>Prepared for scan-based handoff flows and fast receive-side access.</p>
          </div>

          <div className="si-card span-4">
            <FiZap className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Node.js Performance Core</h3>
            <div className="si-stats-row" style={{ marginTop: "1rem" }}>
              <div>
                <div className="si-meta-label">Latency</div>
                <h3>0.02s</h3>
              </div>
              <div>
                <div className="si-meta-label">Uptime SLA</div>
                <h3>99.9%</h3>
              </div>
              <div>
                <div className="si-meta-label">Current Stack</div>
                <h3>React + Node</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="si-panel status-strip">
          <div>
            <div className="si-meta-label">Live Status</div>
            <h3 style={{ marginTop: "0.4rem" }}>Global Delivery Pulse</h3>
            <p className="si-footer-copy">Network status: operational. File routes and code retrieval UI are ready.</p>
          </div>
          <div className="si-nav-link active" style={{ justifySelf: "start" }}>2.4k Active Users</div>
          <div style={{ textAlign: "right" }}>
            <div className="si-meta-label">Today</div>
            <h3>14,209 TB</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
