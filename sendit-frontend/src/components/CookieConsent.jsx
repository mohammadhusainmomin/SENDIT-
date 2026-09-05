import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "sendit-cookie-consent";

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedChoice = localStorage.getItem(STORAGE_KEY);
    if (!savedChoice) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent("sendit-consent", { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent banner">
      <div className="cookie-banner__content">
        <strong>Cookie Notice</strong>
        <p>
          SendIt uses essential cookies for login state and basic site functionality. Optional analytics loads only after you choose Accept. The
          <Link to="/privacy"> Privacy Policy</Link> explains how these tools work.
        </p>
      </div>
      <div className="cookie-banner__actions">
        <button className="si-button-secondary cookie-banner__button" type="button" onClick={() => handleChoice("rejected")}>
          Reject Optional
        </button>
        <button className="si-button cookie-banner__button" type="button" onClick={() => handleChoice("accepted")}>
          Accept
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
