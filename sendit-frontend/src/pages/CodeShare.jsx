import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { formatCode } from "../utils/formatCode";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { FiCode, FiSend, FiTrash2,  FiCopy, FiRefreshCw,  } from "react-icons/fi";
import SEO from "../components/SEO";
import CountdownTimer from "../components/CountdownTimer";

function CodeShare() {
  const [rawCode, setRawCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalExpiryMinutes, setTotalExpiryMinutes] = useState(0);
  const [expiresInHours, setExpiresInHours] = useState("0");
  const [expiresInMinutes, setExpiresInMinutes] = useState("10");
  const formatTimeoutRef = useRef(null);
  const { success, error } = useToast();
  const { user } = useAuth();

  // Generate hour options (0-24)
  const hourOptions = Array.from({ length: 25 }, (_, i) => i);

  // Generate minute options (0, 5, 10, 15, ..., 55)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  const calculateTotalMinutes = () => {
    const hours = parseInt(expiresInHours) || 0;
    const minutes = parseInt(expiresInMinutes) || 0;
    return hours * 60 + minutes;
  };

  const isMaxTimeExceeded = () => {
    const totalMinutes = calculateTotalMinutes();
    return totalMinutes > 1440; // 1 day = 1440 minutes
  };

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

    if (calculateTotalMinutes() === 0) {
      error("Please set an expiration time");
      return;
    }

    if (isMaxTimeExceeded()) {
      error("Maximum expiration time is 1 day (24 hours)");
      return;
    }

    setLoading(true);
    try {
      const expiresIn = calculateTotalMinutes();
      const res = await api.post("/code/send", {
        content: formattedCode || rawCode,
        expiresIn
      });

      setShareCode(res.data.code);
      setTotalExpiryMinutes(expiresIn);
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
    setTotalExpiryMinutes(0);
  };

  const getDisplayTime = () => {
    const totalMinutes = calculateTotalMinutes();
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    if (minutes === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="code-share-container">
      <SEO
        title="Share Code Online - SendIt Code Snippet Sharing"
        description="Share code snippets securely with syntax highlighting. Send code for free with 4-digit access codes. Supports multiple languages."
        keywords="share code online, code snippet sharing, secure code sharing, syntax highlighting sharing"
        url="https://senditsystem.netlify.app/code/send"
      />
      <div className="code-share-content">
        <section className="code-share-header">
          <div className="header-icon"><FiCode /></div>
          <h2>Share Code</h2>
          <p>Paste any code here - it will be automatically formatted</p>
          {!user && <p className="guest-badge">👤 Guest Mode - No login required</p>}
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

          <div className="expiration-time-selector">
            <label>Code expires in:</label>
            <div className="time-selectors">
              <div className="time-group">
                <label htmlFor="code-hours-select">Hours</label>
                <select
                  id="code-hours-select"
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
                <label htmlFor="code-minutes-select">Minutes</label>
                <select
                  id="code-minutes-select"
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

            {calculateTotalMinutes() > 0 && !isMaxTimeExceeded() && (
              <p className="time-display">Total: {getDisplayTime()}</p>
            )}
          </div>

          <div className="button-group">
            <button
              onClick={handleSend}
              disabled={loading || !rawCode.trim() || isMaxTimeExceeded()}
              className="btn-primary"
            >
              <FiSend /> {loading ? "Generating..." : "Generate Share Code"}
            </button>
            {rawCode && (
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                <FiTrash2 /> Clear
              </button>
            )}
          
          </div>
        </section>

        {shareCode && (
          <section className="code-result">
            <div className="result-card">
              <div className="result-header">
                <h3>✨ Your Share Code</h3>
                <button
                  onClick={handleReset}
                  className="btn-close-result"
                  title="Close"
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="result-body">
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
                      error("Code has expired!");
                      handleReset();
                    }}
                  />
                )}
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
          </section>
        )}
      </div>
    </div>
  );
}

export default CodeShare;
