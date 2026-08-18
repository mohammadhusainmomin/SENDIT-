import { useEffect, useRef, useState } from "react";
import {
  FiCode,
  FiCopy,
  FiRefreshCw,
  FiTrash2,
  FiUser,
  FiZap,
} from "react-icons/fi";
import api from "../services/api";
import CountdownTimer from "../components/CountdownTimer";
import { MobileAdGate } from "../components/AdUnits";
import SEO from "../components/SEO";
import ScrollValuePicker from "../components/ScrollValuePicker";
import LanguageSelector from "../components/LanguageSelector";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatCode } from "../utils/multiLanguageFormatter";
import { detectLanguage } from "../utils/detectLanguage";

function CodeShare() {
  const [rawCode, setRawCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("auto-detect");
  const [detectedLanguage, setDetectedLanguage] = useState("plaintext");
  const [shareCode, setShareCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalExpiryMinutes, setTotalExpiryMinutes] = useState(0);
  const [expiresInHours, setExpiresInHours] = useState("0");
  const [expiresInMinutes, setExpiresInMinutes] = useState("0");
  const [showAdGate, setShowAdGate] = useState(false);
  const formatTimeoutRef = useRef(null);
  const { success, error } = useToast();
  const { user } = useAuth();
  const hourOptions = Array.from({ length: 25 }, (_, index) => index);
  const minuteOptions = Array.from({ length: 12 }, (_, index) => index * 5);

  useEffect(() => {
    if (formatTimeoutRef.current) {
      clearTimeout(formatTimeoutRef.current);
    }

    if (!rawCode.trim()) {
      setFormattedCode("");
      setDetectedLanguage("plaintext");
      return;
    }

    formatTimeoutRef.current = setTimeout(async () => {
      try {
        // Auto-detect language if not manually selected
        let languageToUse = selectedLanguage;
        if (selectedLanguage === "auto-detect") {
          const detected = detectLanguage(rawCode);
          setDetectedLanguage(detected);
          languageToUse = detected;
        } else {
          setDetectedLanguage(selectedLanguage);
        }

        // Format code using language-aware formatter (with Prettier support)
        const formatted = await formatCode(rawCode, languageToUse);
        setFormattedCode(formatted);
      } catch (err) {
        console.error("Formatting error:", err);
        setFormattedCode(rawCode);
      }
    }, 400);

    return () => clearTimeout(formatTimeoutRef.current);
  }, [rawCode, selectedLanguage]);

  const calculateTotalMinutes = () => {
    const hours = parseInt(expiresInHours, 10) || 0;
    const minutes = parseInt(expiresInMinutes, 10) || 0;
    return hours * 60 + minutes;
  };

  const selectedDurationLabel = [
    parseInt(expiresInHours, 10) ? `${parseInt(expiresInHours, 10)}h` : null,
    parseInt(expiresInMinutes, 10)
      ? `${parseInt(expiresInMinutes, 10)}m`
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  const isMaxTimeExceeded = () => calculateTotalMinutes() > 1440;

  const performSend = async () => {
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

      // Determine the language to send to backend
      let languageToSend = selectedLanguage;
      if (selectedLanguage === "auto-detect") {
        languageToSend = detectedLanguage || "auto-detect";
      }

      const response = await api.post("/code/send", {
        content: formattedCode || rawCode,
        language: languageToSend,
        expiresIn,
      });

      setShareCode(response.data.code);
      setTotalExpiryMinutes(expiresIn);
      setExpiresAt(response.data.expiresAt || "");
      success(`Code encrypted and ready: ${response.data.code}`);
    } catch (err) {
      error(err.response?.data?.message || "Failed to generate code");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    setShowAdGate(true);
  };

  const handleAdContinue = () => {
    setShowAdGate(false);
    performSend();
  };

  const handleReset = () => {
    setRawCode("");
    setFormattedCode("");
    setSelectedLanguage("auto-detect");
    setDetectedLanguage("plaintext");
    setShareCode("");
    setExpiresAt("");
    setTotalExpiryMinutes(0);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(shareCode);
    success("Code copied to clipboard");
  };

  return (
    <div className="page-shell">
      <SEO
        title="Send Code - SendIt Secure Snippet Sharing"
        description="Paste code, format it, and generate a secure access code using SendIt."
        url="https://senditsystem.netlify.app/code/send"
      />

      <section className="page-section">
        <header style={{ marginBottom: "2rem" }}>
          <span className="si-chip">Precision Logistics for Developers</span>
          <h1
            className="si-title"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Secure Snippet Sharing.
          </h1>
          <p className="si-subtitle">
            Paste your code, let SendIt format it, choose an expiry, and
            generate the working share code from your existing backend.
          </p>
          {!user && (
            <div
              className="si-nav-link active"
              style={{ marginTop: "1rem", width: "fit-content" }}
            >
              <FiUser /> Guest Mode Enabled
            </div>
          )}
        </header>

        <div className="work-grid">
          <div className="work-main">
            <div className="code-editor-shell">
              <div className="editor-toolbar">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                  }}
                >
                  <div className="editor-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span
                    className="si-chip"
                    style={{ padding: "0.4rem 0.7rem" }}
                  >
                    <FiCode /> Live Editor
                  </span>
                </div>
                <span className="si-footer-copy">
                  Auto format preview below
                </span>
              </div>
              <div style={{ padding: "0 1.4rem 1.4rem" }}>
                <textarea
                  rows={16}
                  value={rawCode}
                  onChange={(e) => setRawCode(e.target.value)}
                  placeholder="Paste any JavaScript, Python, HTML, CSS, TypeScript, or backend code here..."
                  style={{
                    minHeight: "360px",
                    margin: 0,
                    borderRadius: "1.5rem",
                    background: "#11181f",
                    color: "#dce6f2",
                    fontFamily: '"Courier New", monospace',
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
              </div>
            </div>

            {formattedCode && (
              <div className="code-editor-shell">
                <div className="editor-toolbar">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                    }}
                  >
                    <div className="editor-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="si-chip">Formatted Preview</span>
                  </div>
                  <span className="si-footer-copy">
                    This version is sent to Reciver
                  </span>
                </div>
                <div
                  className="viewer-canvas"
                  style={{ margin: "0 1.4rem 1.4rem" }}
                >
                  <pre>{formattedCode}</pre>
                </div>
              </div>
            )}
          </div>

          <aside className="work-sidebar">
            <div className="settings-card si-card">
              <h3>Settings</h3>

              <LanguageSelector
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                disabled={loading}
              />

              <div className="wheel-panel" style={{ marginTop: "1rem" }}>
                <div className="wheel-column">
                  <div className="wheel-value">
                    <ScrollValuePicker
                      label="Hours"
                      options={hourOptions}
                      value={expiresInHours}
                      onChange={setExpiresInHours}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--si-primary)",
                  }}
                >
                  :
                </div>
                <div className="wheel-column">
                  <div className="wheel-value">
                    <ScrollValuePicker
                      label="Minutes"
                      options={minuteOptions}
                      value={expiresInMinutes}
                      onChange={setExpiresInMinutes}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
              <div className="expiry-summary-card">
                <div>
                  <div className="si-meta-label">Selected Window</div>
                  <strong>{selectedDurationLabel || "Choose expiry"}</strong>
                </div>
                <span className="expiry-summary-note">
                  {calculateTotalMinutes() > 0
                    ? `${calculateTotalMinutes()} minute access window`
                    : "Temporary access helps keep code private"}
                </span>
              </div>
            </div>

            <button
              className="si-button"
              onClick={handleSend}
              disabled={
                loading ||
                !rawCode.trim() ||
                calculateTotalMinutes() === 0 ||
                isMaxTimeExceeded()
              }
              type="button"
            >
              <FiZap /> {loading ? "Generating..." : "Generate Share Code"}
            </button>
            <MobileAdGate
              open={showAdGate}
              onContinue={handleAdContinue}
              title="Sponsored Message"
            />

            {rawCode && !shareCode && (
              <button
                className="si-button-secondary"
                onClick={handleReset}
                type="button"
              >
                <FiTrash2 /> Clear Editor
              </button>
            )}

            {shareCode && (
              <div className="si-card" style={{ padding: "1.5rem" }}>
                <div className="si-meta-label text-center-redesign">
                  Your Share Code
                </div>
                <div className="big-share-code">{shareCode}</div>

                {totalExpiryMinutes > 0 && (
                  <CountdownTimer
                    expiresAt={expiresAt}
                    expiresInMinutes={totalExpiryMinutes}
                    onExpire={() => {
                      error("Code has expired");
                      handleReset();
                    }}
                  />
                )}

                <div
                  style={{ display: "grid", gap: "0.8rem", marginTop: "1rem" }}
                >
                  <button
                    className="si-button-secondary"
                    onClick={handleCopyCode}
                    type="button"
                  >
                    <FiCopy /> Copy Code
                  </button>
                  <button
                    className="si-button-secondary"
                    onClick={handleReset}
                    type="button"
                  >
                    <FiRefreshCw /> Share Another
                  </button>
                </div>
              </div>
            )}

            <div className="info-note">
              <strong>Enterprise Compliance</strong>
              <p className="si-footer-copy" style={{ marginTop: "0.5rem" }}>
                Snippets remain temporary and respect your expiry policy. UI
                changed, backend logic preserved.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CodeShare;
