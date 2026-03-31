import { useState } from "react";
import { FiCheckCircle, FiCopy, FiDownload, FiTerminal } from "react-icons/fi";
import api from "../services/api";
import SEO from "./SEO";
import { useToast } from "../context/ToastContext";
import { formatCode } from "../utils/formatCode";

function CodeReceive() {
  const [code, setCode] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleReceive = async () => {
    if (!code.trim()) {
      error("Please enter the 4-digit code");
      return;
    }

    if (code.length !== 4 || Number.isNaN(Number(code))) {
      error("Code must be exactly 4 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/code/receive", { code });
      setContent(formatCode(response.data.content));
      success("Code retrieved successfully");
    } catch (err) {
      if (err.response?.status === 404) {
        error("Invalid code. Please check and try again");
      } else if (err.response?.status === 410) {
        error("This code has expired. Please ask for a new code");
      } else {
        error(err.response?.data?.message || "Failed to retrieve code");
      }
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      error("Failed to copy code");
    }
  };

  const handleReset = () => {
    setCode("");
    setContent("");
    setCopied(false);
  };

  return (
    <div className="page-shell">
      <SEO
        title="Receive Code - SendIt Code Viewer"
        description="Receive code snippets securely using the SendIt 4-digit access code."
        url="https://senditsystem.netlify.app/code/receive"
      />

      <section className="page-section">
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span className="si-chip">Secure Decryption</span>
          <h1 className="si-title" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            Access Your Shared Code
          </h1>
          <p className="si-subtitle" style={{ margin: "0 auto" }}>
            Enter the current 4-digit snippet code used by your backend and retrieve the formatted code in a clean read-only viewer.
          </p>
        </div>

        <div style={{ maxWidth: "1120px", margin: "2rem auto 0" }} className="work-grid">
          <div className="work-main">
            <div className="si-card" style={{ padding: "1.5rem" }}>
              <div className="code-input-hero">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="Enter 4-digit code"
                  maxLength={4}
                  disabled={loading}
                />
                <button className="si-button" onClick={handleReceive} disabled={loading || code.length !== 4} type="button">
                  <FiTerminal /> {loading ? "Retrieving..." : "Retrieve"}
                </button>
              </div>
            </div>

            <div className="code-editor-shell">
              <div className="viewer-toolbar">
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <div className="editor-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="si-chip">Read Only</span>
                  <span className="si-footer-copy">Retrieved-Snippet.js</span>
                  <span className="si-footer-copy">Secure sandbox rendering</span>
                </div>
                {content && (
                  <button className="si-button-secondary" onClick={handleCopyCode} type="button">
                    {copied ? <FiCheckCircle /> : <FiCopy />} {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </div>
              <div className="viewer-canvas" style={{ margin: "0 1.4rem 1.4rem" }}>
                <pre>{content || "// Retrieved snippet will appear here..."}</pre>
              </div>
            </div>
          </div>

          <aside className="work-sidebar">
            <div className="si-card" style={{ padding: "1.5rem" }}>
              <h3>Ephemeral Access</h3>
              <p className="si-footer-copy">
                The code viewer stays aligned with the temporary access model already implemented on your backend.
              </p>
              <div className="muted-list" style={{ marginTop: "1rem" }}>
                <div className="muted-list-item">Language detection via formatting utility</div>
                <div className="muted-list-item">4-digit code compatibility preserved</div>
                <div className="muted-list-item">No editor mutation after retrieval</div>
              </div>
            </div>

            <button className="si-button-secondary" onClick={handleReset} type="button">
              <FiDownload /> Reset View
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CodeReceive;
