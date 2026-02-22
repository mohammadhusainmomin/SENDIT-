import { useState } from "react";
import { FiCopy, FiRefreshCw, FiCheck } from "react-icons/fi";
import api from "../services/api";
import { formatCode } from "../utils/formatCode";
import CountdownTimer from "./CountdownTimer";
import { useToast } from "../context/ToastContext";
import "./styles/CodeSend.css";

function CodeSend() {
  const [codeText, setCodeText] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [expiresInHours, setExpiresInHours] = useState("0");
  const [expiresInMinutes, setExpiresInMinutes] = useState("10");
  const [totalExpiryMinutes, setTotalExpiryMinutes] = useState(0);
  const [copied, setCopied] = useState(false);
  const { success, error: showError } = useToast();

  const hourOptions = Array.from({ length: 25 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  const calculateTotalMinutes = () => {
    const hours = parseInt(expiresInHours) || 0;
    const minutes = parseInt(expiresInMinutes) || 0;
    return hours * 60 + minutes;
  };

  const isMaxTimeExceeded = () => {
    const totalMinutes = calculateTotalMinutes();
    return totalMinutes > 1440;
  };

  const handleSend = async () => {
    if (!codeText.trim()) {
      showError("Please paste some code first");
      return;
    }

    if (calculateTotalMinutes() === 0) {
      showError("Please set an expiration time");
      return;
    }

    if (isMaxTimeExceeded()) {
      showError("Maximum expiration time is 1 day (24 hours)");
      return;
    }

    try {
      setLoading(true);
      const formatted = formatCode(codeText);
      const expiresIn = calculateTotalMinutes();

      const res = await api.post("/code/send", {
        content: formatted,
        expiresIn,
      });

      setShareCode(res.data.code);
      setTotalExpiryMinutes(expiresIn);
      setCopied(false);
      success("Code encrypted & ready! Scan or share the code.");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to generate code";
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(shareCode);
    setCopied(true);
    success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCodeText("");
    setShareCode("");
    setTotalExpiryMinutes(0);
    setExpiresInHours("0");
    setExpiresInMinutes("10");
    setCopied(false);
  };

  return (
    <div className="code-send-layout">
      {/* Left Side - Code Input */}
      <div className="code-input-section">
        <div className="input-header">
          <h3>Share Code</h3>
          <p className="input-subtitle">Paste your code to encrypt and share</p>
        </div>

        <textarea
          rows="12"
          placeholder="Paste your code here..."
          value={codeText}
          onChange={(e) => setCodeText(e.target.value)}
          disabled={loading || shareCode}
          className="code-textarea"
        />

        <div className="expiration-time-container">
          <label>Code expires in:</label>
          <div className="time-selectors">
            <div className="time-group">
              <label htmlFor="hours-select">Hours</label>
              <select
                id="hours-select"
                value={expiresInHours}
                onChange={(e) => setExpiresInHours(e.target.value)}
                disabled={loading || shareCode}
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>

            <div className="time-group">
              <label htmlFor="minutes-select">Minutes</label>
              <select
                id="minutes-select"
                value={expiresInMinutes}
                onChange={(e) => setExpiresInMinutes(e.target.value)}
                disabled={loading || shareCode}
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isMaxTimeExceeded() && (
            <p className="time-warning">⚠️ Maximum time is 1 day (24 hours)</p>
          )}
        </div>

        <button
          className="btn-send"
          onClick={handleSend}
          disabled={!codeText.trim() || loading || isMaxTimeExceeded() || shareCode}
        >
          {loading ? "Encrypting..." : "🚀 Encrypt & Share"}
        </button>
      </div>

      {/* Right Side - Code Display */}
      <div className={`code-display-section ${shareCode ? "active" : ""}`}>
        {shareCode ? (
          <div className="code-display-card">
            <div className="display-header">
              <div className="status-badge">✨ Ready</div>
            </div>

            <div className="display-body">
              <p className="display-label">Share this code</p>
              <div className="code-box">
                <div className="code-digits">{shareCode}</div>
                <button
                  onClick={handleCopyCode}
                  className={`btn-copy-large ${copied ? "copied" : ""}`}
                  title="Copy code"
                >
                  {copied ? (
                    <>
                      <FiCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy /> Copy
                    </>
                  )}
                </button>
              </div>

              {totalExpiryMinutes > 0 && (
                <div className="timer-display">
                  <CountdownTimer
                    expiresInMinutes={totalExpiryMinutes}
                    onExpire={() => {
                      showError("Code has expired!");
                      handleReset();
                    }}
                  />
                </div>
              )}

              <p className="display-hint">Share this code with someone to receive their code and decrypt the message</p>
            </div>

            <div className="display-footer">
              <button
                onClick={handleReset}
                className="btn-send-another"
              >
                <FiRefreshCw /> Share Another
              </button>
            </div>
          </div>
        ) : (
          <div className="code-display-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">🔐</div>
              <p className="placeholder-text">Paste code on the left</p>
              <p className="placeholder-subtext">Your 4-digit code will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeSend;
