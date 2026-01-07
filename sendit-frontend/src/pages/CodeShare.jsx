import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { formatCode } from "../utils/formatCode";
import { useToast } from "../context/ToastContext";

function CodeShare() {
  const [rawCode, setRawCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const formatTimeoutRef = useRef(null);
  const { success, error } = useToast();

  // Format code with debounce as user types
  useEffect(() => {
    if (formatTimeoutRef.current) {
      clearTimeout(formatTimeoutRef.current);
    }

    if (!rawCode.trim()) {
      setFormattedCode("");
      return;
    }

    formatTimeoutRef.current = setTimeout(() => {
      try {
        const formatted = formatCode(rawCode);
        setFormattedCode(formatted);
      } catch (err) {
        console.error("Format error:", err);
        setFormattedCode(rawCode);
      }
    }, 500);

    return () => {
      if (formatTimeoutRef.current) {
        clearTimeout(formatTimeoutRef.current);
      }
    };
  }, [rawCode]);

  const handleSend = async () => {
    if (!rawCode.trim()) {
      error("Please paste some code first");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/code/send", {
        content: formattedCode || rawCode
      });

      setShareCode(res.data.code);
      success(`✨ Code encrypted & ready! Share: ${res.data.code}`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to generate code";
      error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(shareCode);
    success("Code copied to clipboard!");
  };

  const handleReset = () => {
    setRawCode("");
    setFormattedCode("");
    setShareCode("");
    setShowPreview(false);
  };

  return (
    <div className="code-share-container">
      <div className="code-share-content">
        <section className="code-share-header">
          <div className="header-icon">📤</div>
          <h2>Share Code</h2>
          <p>Paste any code here - it will be automatically formatted</p>
        </section>

        <section className="code-share-form">
          <div className="form-input-area">
            <div className="textarea-wrapper">
              <label className="textarea-label">📝 Original Code</label>
              <textarea
                rows="14"
                placeholder="Paste any code here (JavaScript, Python, Java, HTML, CSS, etc.)"
                value={rawCode}
                onChange={(e) => setRawCode(e.target.value)}
                className="code-textarea"
              />
            </div>

            {formattedCode && (
              <div className="textarea-wrapper formatted-preview">
                <label className="textarea-label">
                  ✨ Formatted Code
                  <span className="preview-note">(This will be sent)</span>
                </label>
                <textarea
                  rows="14"
                  value={formattedCode}
                  readOnly
                  className="code-textarea code-textarea-formatted"
                />
              </div>
            )}
          </div>

          <div className="button-group">
            <button
              onClick={handleSend}
              disabled={loading || !rawCode.trim()}
              className="btn-primary"
            >
              {loading ? "Generating..." : "Generate Share Code"}
            </button>
            {rawCode && (
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                Clear
              </button>
            )}
            {formattedCode && (
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary"
              >
                {showPreview ? "Hide Preview" : "Full Preview"}
              </button>
            )}
          </div>
        </section>

        {shareCode && (
          <section className="code-result">
            <div className="result-card">
              <h3>✨ Your Share Code</h3>
              <div className="code-display">
                <p className="code-text">{shareCode}</p>
                <button
                  onClick={handleCopyCode}
                  className="btn-copy"
                  title="Copy code"
                >
                  📋 Copy
                </button>
              </div>
              <p className="code-note">⏰ This code expires in 10 minutes</p>
              <button
                onClick={handleReset}
                className="btn-text"
              >
                Share Another Code
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default CodeShare;
