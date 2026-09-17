import { useEffect, useRef, useState } from "react";
import "./styles/AdInterstitial.css";

const COUNTDOWN_SECONDS = 5;

/**
 * AdInterstitial — full-screen transfer preparation overlay
 * with a 5-second countdown before the Continue button unlocks.
 *
 * Props:
 *   onContinue {function} — called exactly once when the user clicks Continue
 *   title      {string}   — short label shown above the ad, e.g. "Sending your file…"
 */
function AdInterstitial({ onContinue, title = "Just a moment…" }) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const firedRef = useRef(false);          // guard against double-fire
  const onContinueRef = useRef(onContinue); // stable ref — never stale

  // Keep the ref fresh without causing effect re-runs
  useEffect(() => {
    onContinueRef.current = onContinue;
  }, [onContinue]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const handleContinue = () => {
    if (firedRef.current) return; // prevent double-fire
    firedRef.current = true;
    onContinueRef.current();
  };

  const ready = secondsLeft <= 0;

  return (
    <div className="adi-backdrop" role="dialog" aria-modal="true" aria-label="Advertisement — please wait">
      <div className="adi-modal si-card">
        {/* Header */}
        <div className="adi-header">
          <span className="si-chip">SendIt</span>
          <p className="adi-title">{title}</p>
        </div>

        <div className="adi-ad-shell" aria-label="Transfer preparation">
          <p>Your transfer is being prepared. Please wait for the action to become available.</p>
        </div>

        {/* Footer */}
        <div className="adi-footer">
          {!ready && (
            <p className="adi-countdown" aria-live="polite" aria-atomic="true">
              Please wait&nbsp;<strong>{secondsLeft}</strong>&nbsp;second{secondsLeft !== 1 ? "s" : ""}…
            </p>
          )}

          <button
            className={"si-button adi-continue-btn" + (ready ? " adi-ready" : "")}
            onClick={handleContinue}
            disabled={!ready}
            type="button"
            aria-label={ready ? "Continue" : "Continue in " + secondsLeft + " seconds"}
          >
            {ready ? "Continue \u2192" : "Continue in " + secondsLeft + "s"}
          </button>

          <p className="adi-note">
            SendIt is free for everyday temporary transfers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdInterstitial;
