import { useState } from "react";
import { FiDownload, FiCopy, FiCheckCircle } from "react-icons/fi";
import SEO from "./SEO";
import api from "../services/api";
import { formatCode } from "../utils/formatCode";
import { useToast } from "../context/ToastContext";
import "./styles/CodeReceive.css";

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

    if (code.length !== 4 || isNaN(code)) {
      error("Code must be exactly 4 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/code/receive", { code });
      const formattedCode = formatCode(res.data.content);
      setContent(formattedCode);
      success("Code decrypted & received successfully!");
    } catch (err) {
      if (err.response?.status === 404) {
        error("Invalid code. Please check and try again");
      } else if (err.response?.status === 410) {
        error("This code has expired. Please ask for a new code");
      } else {
        const errorMsg = err.response?.data?.message || "Failed to retrieve code";
        error(errorMsg);
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
      success("Code copied to clipboard!");

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      error("Failed to copy code");
    }
  };

  const handleReset = () => {
    setCode("");
    setContent("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleReceive();
    }
  };

  return (
    <div className="code-receive-container">
      <SEO
        title="Receive Code Online - SendIt Code Download"
        description="Receive code snippets securely using a 4-digit access code. Get shared code instantly with syntax highlighting."
        keywords="receive code online, download code, secure code sharing, code snippet retrieval"
        url="https://senditsystem.netlify.app/code/receive"
      />
      <div className="code-receive-content">
        <section className="code-receive-header">
          <div className="header-icon"><FiDownload /></div>
          <h2>Receive Code</h2>
          <p>Enter the 4-digit code to retrieve the code</p>
        </section>

        <section className="code-receive-form">
          <div className="input-wrapper">
            <input
              placeholder="Enter 4-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              onKeyPress={handleKeyPress}
              maxLength="4"
              className="code-input"
              disabled={loading || !!content}
            />
            {code && (
              <span className="input-counter">{code.length}/4</span>
            )}
          </div>

          <div className="button-group-code-receive">
            <button
              onClick={handleReceive}
              disabled={loading || code.length !== 4}
              className="btn-primary"
            >
              {loading ? "Retrieving..." : "Get Code"}
            </button>
            {content && (
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                Reset
              </button>
            )}
          </div>
        </section>

        {content && (
          <section className="code-output">
            <h3><FiCopy /> Received Code (Formatted)</h3>
            <textarea
              rows="12"
              value={content}
              readOnly
              className="code-textarea-output"
            />
            <button
              onClick={handleCopyCode}
              className={`btn-copy-large ${copied ? 'copied' : ''}`}
            >
              {copied ? <><FiCheckCircle /> Copied!</> : <><FiCopy /> Copy Code</>}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

export default CodeReceive;
