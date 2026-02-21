import { useState } from "react";
import { FiCopy, FiRefreshCw } from "react-icons/fi";
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
    success("Code copied to clipboard!");
  };

  const handleReset = () => {
    setCodeText("");
    setShareCode("");
    setTotalExpiryMinutes(0);
    setExpiresInHours("0");
    setExpiresInMinutes("10");
  };

  if (shareCode) {
    return (
      <div className="code-result-compact">
        <div className="result-card-compact">
          <div className="result-header">
            <h3>✨ Code Ready!</h3>
            <button
              onClick={handleReset}
              className="btn-close-result"
              title="Close"
            >
              <FiRefreshCw />
            </button>
          </div>

          <div className="result-body">
            <div className="result-main-info">
              <div className="code-display-wrapper">
                <p className="access-code">{shareCode}</p>
                <button
                  onClick={handleCopyCode}
                  className="btn-copy-compact"
                  title="Copy code"
                >
                  <FiCopy />
                </button>
              </div>

              {totalExpiryMinutes > 0 && (
                <CountdownTimer
                  expiresInMinutes={totalExpiryMinutes}
                  onExpire={() => {
                    showError("Code has expired!");
                    handleReset();
                  }}
                />
              )}
            </div>

          </div>

          <div className="result-footer">
            <button
              onClick={handleReset}
              className="btn-send-another-compact"
            >
              <FiRefreshCw /> Share Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="code-send-container">
      <h3>Share Code</h3>

      <textarea
        rows="12"
        placeholder="Paste any code here..."
        value={codeText}
        onChange={(e) => setCodeText(e.target.value)}
        disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
        disabled={!codeText.trim() || loading || isMaxTimeExceeded()}
      >
        {loading ? "Encrypting..." : "🚀 Encrypt & Share"}
      </button>
    </div>
  );
}

export default CodeSend;
