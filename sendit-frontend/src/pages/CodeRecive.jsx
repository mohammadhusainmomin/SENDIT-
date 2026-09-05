import { useRef, useState } from "react";
import { FiCode, FiCopy, FiDownload, FiRefreshCw } from "react-icons/fi";
import api from "../services/api";
import { formatCode } from "../utils/multiLanguageFormatter";
import SyntaxHighlighter from "../components/SyntaxHighlighter";
import SEO from "../components/SEO";
import { useToast } from "../context/ToastContext";

function CodeReceive() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { success: showSuccess, error: showError } = useToast();

  const performReceive = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/code/receive", { code });
      const lang = res.data.language || "auto-detect";
      setLanguage(lang);
      const formatted = await formatCode(res.data.content, lang);
      setResult(formatted);
      showSuccess("Code retrieved successfully");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to receive code";
      setError(errorMsg);
      showError(errorMsg);
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  const handleReceive = () => {
    if (!code.trim() || code.length < 4) {
      showError("Please enter a valid 4-digit code");
      return;
    }
    performReceive();
  };

  const handleReset = () => {
    setCode("");
    setResult("");
    setLanguage("");
    setError("");
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      showSuccess("Code copied to clipboard");
    });
  };

  return (
    <div className="page-shell">
      <SEO
        title="Receive Code | SendIt Snippet Retrieval"
        description="Enter a 4-digit code to retrieve a shared code snippet on SendIt."
        url="https://senditsystem.in/code/receive"
      />

      <section className="page-section">
        <header style={{ marginBottom: "2rem" }}>
          <span className="si-chip">Receive Code</span>
          <h1 className="si-title" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            Retrieve a Shared Snippet.
          </h1>
          <p className="si-subtitle">
            Enter the 4-digit access code the sender gave you to retrieve the
            shared code snippet.
          </p>
        </header>

        <div className="work-grid">
          <div className="work-main">
            <div className="si-card" style={{ padding: "1.5rem" }}>
              <div className="code-input-hero">
                <input
                  type="text"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="Enter 4-digit code"
                  disabled={loading || Boolean(result)}
                  maxLength={4}
                />
                <button
                  className="si-button"
                  onClick={handleReceive}
                  disabled={loading || code.length !== 4 || Boolean(result)}
                  type="button"
                >
                  <FiDownload />
                  {loading ? "Retrieving…" : "Retrieve Code"}
                </button>
              </div>
              <div className="si-footer-copy" style={{ marginTop: "1rem" }}>
                Enter the sender's 4-digit code to fetch the shared snippet
                before it expires.
              </div>
            </div>

            {error && !result && (
              <div
                className="si-card"
                style={{
                  padding: "1rem 1.5rem",
                  borderColor: "rgba(220,38,38,0.3)",
                  color: "var(--si-text-soft)",
                }}
              >
                {error}
              </div>
            )}

            {result && (
              <div className="si-card" style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span className="si-chip">
                      <FiCode /> {language || "Code"}
                    </span>
                    <div className="si-meta-label">Retrieved</div>
                  </div>
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    <button
                      className="si-button-secondary"
                      onClick={handleCopy}
                      type="button"
                    >
                      <FiCopy /> Copy
                    </button>
                    <button
                      className="si-button-secondary"
                      onClick={handleReset}
                      type="button"
                    >
                      <FiRefreshCw /> New Code
                    </button>
                  </div>
                </div>
                <SyntaxHighlighter
                  code={result}
                  language={language}
                  showLanguageLabel
                />
              </div>
            )}
          </div>

          <aside className="work-sidebar">
            <div className="si-card" style={{ padding: "1.5rem" }}>
              <h3>How it works</h3>
              <div className="muted-list" style={{ marginTop: "1rem" }}>
                <div className="muted-list-item">
                  <span className="si-chip">1</span>
                  <span>Get the 4-digit code from the sender.</span>
                </div>
                <div className="muted-list-item">
                  <span className="si-chip">2</span>
                  <span>Enter the code in the input box.</span>
                </div>
                <div className="muted-list-item">
                  <span className="si-chip">3</span>
                  <span>View or copy the code snippet.</span>
                </div>
              </div>
            </div>

            <div className="si-card" style={{ padding: "1.5rem" }}>
              <h3>Retrieval notes</h3>
              <div className="muted-list" style={{ marginTop: "1rem" }}>
                <div className="muted-list-item">No login required</div>
                <div className="muted-list-item">
                  Codes expire based on sender settings
                </div>
                <div className="muted-list-item">
                  Snippet is decrypted and formatted on retrieval
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CodeReceive;
