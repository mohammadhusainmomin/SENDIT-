import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiClock, FiGrid, FiHash, FiLock, FiShield, FiZap } from "react-icons/fi";
import { FileTransferIllustration } from "../components/Illustrations";
import SEO from "../components/SEO";

function Home() {
  const navigate = useNavigate();

  const homeStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "SendIt",
      description: "File sharing and code sharing platform with temporary access codes, expiry options, and simple receive steps.",
      url: "https://senditsystem.netlify.app",
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does SendIt work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A sender uploads a file or shares code, gets a temporary code, and the receiver uses that code on the matching receive page.",
          },
        },
        {
          "@type": "Question",
          name: "Who is SendIt useful for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SendIt is useful for students, teams, clients, and developers who need a short-lived sharing workflow.",
          },
        },
      ],
    },
  ];

  return (
    <div className="page-shell">
      <SEO
        title="SendIt - File Sharing and Code Sharing with Temporary Access Codes"
        description="SendIt helps you send files online and share code snippets with temporary access codes, expiry controls, and a simple receive flow."
        keywords="sendit, file sharing app, share files online, code sharing platform, temporary access code, send files with code"
        url="https://senditsystem.netlify.app"
        structuredData={homeStructuredData}
      />

      <section className="page-section">
        <div className="hero-layout">
          <div>
            <span className="si-chip">Temporary Sharing Utility</span>
            <h1 className="si-title" style={{ marginTop: "1rem", marginBottom: "1.4rem" }}>
              Share Files and Code
              <br />
              <span className="si-gradient-text">Without Long Public Links.</span>
            </h1>
            <p className="si-subtitle">
              SendIt is a browser-based tool for people who want a simple way to send files or code snippets. Upload, choose an expiry window, share the temporary code, and let the receiver collect the content from the matching page.
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
                <div className="si-meta-label">Access</div>
                <h3 style={{ marginTop: "0.45rem" }}>Temporary Code</h3>
              </div>
              <div className="si-stat-card">
                <div className="si-meta-label">Control</div>
                <h3 style={{ marginTop: "0.45rem" }}>Expiry Options</h3>
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
          <span className="si-chip">What You Can Do</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Built to be easy to understand.</h2>
        </div>

        <div className="feature-bento">
          <div className="si-card span-3">
            <FiLock className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Temporary Access Workflow</h3>
            <p className="si-subtitle" style={{ fontSize: "1rem", maxWidth: "unset" }}>
              Instead of sharing a long public URL, SendIt uses a short code and a dedicated receive step that keeps the process simple for both sides.
            </p>
          </div>

          <div className="si-card span-3" style={{ background: "linear-gradient(135deg, var(--si-primary-deep), var(--si-primary))", color: "#fff" }}>
            <FiHash size={34} />
            <h3 style={{ marginTop: "1rem", color: "#fff" }}>Short Code Sharing</h3>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.8 }}>
              Receivers only need the code and the correct page, which makes the flow approachable for classmates, teammates, and non-technical users.
            </p>
            <div style={{ marginTop: "1.2rem", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "0.45em" }}>1 2 3 4</div>
          </div>

          <div className="si-card span-2">
            <FiGrid className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Simple for New Users</h3>
            <p>Pick files, choose expiry, copy the code, and the receiver uses that same code to download or view the shared item.</p>
          </div>

          <div className="si-card span-4">
            <FiZap className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Useful for everyday sharing</h3>
            <div className="si-stats-row" style={{ marginTop: "1rem" }}>
              <div>
                <div className="si-meta-label">Students</div>
                <h3>Assignments</h3>
              </div>
              <div>
                <div className="si-meta-label">Teams</div>
                <h3>Quick handoff</h3>
              </div>
              <div>
                <div className="si-meta-label">Developers</div>
                <h3>Code snippets</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="si-panel status-strip">
          <div>
            <div className="si-meta-label">How It Works</div>
            <h3 style={{ marginTop: "0.4rem" }}>Start in a few simple steps</h3>
            <p className="si-footer-copy">Choose send or receive, use the temporary code, and finish the transfer without extra account friction for basic use.</p>
          </div>
          <div className="si-nav-link active" style={{ justifySelf: "start" }}>Temporary code-based sharing</div>
          <div style={{ textAlign: "right" }}>
            <div className="si-meta-label">Focus</div>
            <h3>Files + snippets</h3>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">Helpful Guidance</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Best practices before you share.</h2>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <FiClock className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>1. Choose an expiry</h3>
            <p>Shared content is designed to be temporary. This helps keep old transfers from staying available forever.</p>
          </div>
          <div className="si-card span-2">
            <FiShield className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>2. Share only with intended people</h3>
            <p>Send the access code through the channel you trust, such as chat, email, or direct message.</p>
          </div>
          <div className="si-card span-2">
            <FiArrowRight className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>3. Use the right receive page</h3>
            <p>Receivers can use the matching file or code receive page, which reduces confusion and makes retrieval predictable.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">More Information</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Explore the pages that explain SendIt.</h2>
          <p className="si-subtitle" style={{ marginTop: "1rem" }}>
            If you are reviewing the site for trust, policy, or product clarity, these pages explain what SendIt does, how temporary sharing works, what the service limits are, and how to contact the team. This additional content helps first-time visitors understand the platform before they upload or receive any files.
          </p>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <h3>About the Project</h3>
            <p className="si-subtitle" style={{ fontSize: "1rem", maxWidth: "unset" }}>
              Learn who built SendIt, what problem it solves, and why the product focuses on temporary file and code sharing instead of permanent storage.
            </p>
            <Link className="inline-resource-link" to="/about">Read About Us</Link>
          </div>
          <div className="si-card span-2">
            <h3>Features and Use Cases</h3>
            <p className="si-subtitle" style={{ fontSize: "1rem", maxWidth: "unset" }}>
              Explore file sharing, code sharing, expiry controls, and common situations where short-lived access codes are useful in study and work.
            </p>
            <Link className="inline-resource-link" to="/features">Explore Features</Link>
          </div>
          <div className="si-card span-2">
            <h3>Guide, FAQ, and Support</h3>
            <p className="si-subtitle" style={{ fontSize: "1rem", maxWidth: "unset" }}>
              Visit the guide, FAQ, and contact pages for help, legal disclosures, privacy information, and support details if you have questions about the service.
            </p>
            <div className="home-resource-stack">
              <Link className="inline-resource-link" to="/guide">Open Guide</Link>
              <Link className="inline-resource-link" to="/faq">Read FAQ</Link>
              <Link className="inline-resource-link" to="/contact">Contact SendIt</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
