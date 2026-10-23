import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiX,
} from "react-icons/fi";
import "./styles/ExpirySelector.css";

const PRESETS = [
  { label: "15 minutes", hours: 0, minutes: 15 },
  { label: "1 hour", hours: 1, minutes: 0 },
  { label: "6 hours", hours: 6, minutes: 0 },
  { label: "24 hours", hours: 24, minutes: 0 },
];

function formatDuration(hours, minutes) {
  if (hours === 0) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  if (minutes === 0) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  return `${hours}h ${minutes}m`;
}

function getExpiryPreview(hours, minutes) {
  const expiry = new Date(Date.now() + (hours * 60 + minutes) * 60 * 1000);
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(expiry);
  const isToday = new Date().toDateString() === expiry.toDateString();
  const date = isToday
    ? "Today"
    : new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      }).format(expiry);

  return `${date}, ${time}`;
}

function ExpirySelector({
  hours,
  minutes,
  selected,
  onChange,
  disabled = false,
}) {
  const [customOpen, setCustomOpen] = useState(false);
  const [draftHours, setDraftHours] = useState("2");
  const [draftMinutes, setDraftMinutes] = useState("30");
  const selectedHours = Number(hours) || 0;
  const selectedMinutes = Number(minutes) || 0;
  const selectedTotal = selectedHours * 60 + selectedMinutes;
  const isCustom = selected && !PRESETS.some(
    (preset) => preset.hours * 60 + preset.minutes === selectedTotal,
  );
  const draftTotal = (Number(draftHours) || 0) * 60 + (Number(draftMinutes) || 0);

  useEffect(() => {
    if (!customOpen) return;

    if (selectedTotal > 0) {
      setDraftHours(String(selectedHours));
      setDraftMinutes(String(selectedMinutes));
    } else {
      setDraftHours("2");
      setDraftMinutes("30");
    }
  }, [customOpen, selectedHours, selectedMinutes, selectedTotal]);

  useEffect(() => {
    if (!customOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setCustomOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [customOpen]);

  const updateDraft = (unit, value) => {
    const parsed = Number.parseInt(value, 10);
    const nextValue = Number.isFinite(parsed) ? Math.max(0, parsed) : 0;

    if (unit === "hours") {
      const boundedHours = Math.min(24, nextValue);
      setDraftHours(String(boundedHours));
      if (boundedHours === 24) setDraftMinutes("0");
      return;
    }

    const boundedMinutes = Math.min(55, Math.floor(nextValue / 5) * 5);
    setDraftMinutes(String(Number(draftHours) === 24 ? 0 : boundedMinutes));
  };

  const handlePreset = (preset) => {
    onChange(String(preset.hours), String(preset.minutes));
  };

  const handleCustomConfirm = () => {
    if (draftTotal <= 0 || draftTotal > 24 * 60) return;
    onChange(draftHours, draftMinutes);
    setCustomOpen(false);
  };

  return (
    <div className="expiry-selector">
      <div className="expiry-selector-heading">
        <div>
          <span className="expiry-selector-eyebrow">Expiry</span>
          <h3>How long should the code work?</h3>
        </div>
        <span className="expiry-selector-badge" aria-live="polite">
          {selected ? formatDuration(selectedHours, selectedMinutes) : "Not set"}
        </span>
      </div>

      <div className="expiry-preset-grid" role="group" aria-label="Expiry duration">
        {PRESETS.map((preset) => {
          const isSelected =
            selected &&
            selectedTotal === preset.hours * 60 + preset.minutes;

          return (
            <button
              key={preset.label}
              type="button"
              className={`expiry-preset${isSelected ? " is-selected" : ""}`}
              onClick={() => handlePreset(preset)}
              disabled={disabled}
              aria-pressed={Boolean(isSelected)}
            >
              <FiClock aria-hidden="true" />
              <span>{preset.label}</span>
              {isSelected ? <FiCheck className="expiry-preset-check" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>

      <button
        className={`expiry-custom-trigger${isCustom ? " is-selected" : ""}`}
        type="button"
        onClick={() => setCustomOpen(true)}
        disabled={disabled}
      >
        <FiCalendar aria-hidden="true" />
        <span>{isCustom ? `Custom · ${formatDuration(selectedHours, selectedMinutes)}` : "Custom expiry"}</span>
        <FiChevronRight aria-hidden="true" />
      </button>

      <p className="expiry-selector-hint">
        <FiClock aria-hidden="true" />
        The receiver can use the code until the selected expiry time.
      </p>

      {customOpen ? (
        <div
          className="expiry-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCustomOpen(false);
          }}
        >
          <section
            className="expiry-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="expiry-dialog-title"
          >
            <div className="expiry-dialog-heading">
              <div>
                <h3 id="expiry-dialog-title">Custom expiry</h3>
                <p>Set how long the code should work</p>
              </div>
              <button
                type="button"
                className="expiry-dialog-close"
                aria-label="Close custom expiry"
                onClick={() => setCustomOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="expiry-custom-fields">
              <label>
                <span>Hours</span>
                <div className="expiry-stepper">
                  <button
                    type="button"
                    aria-label="Decrease hours"
                    onClick={() => updateDraft("hours", String((Number(draftHours) || 0) - 1))}
                  >
                    −
                  </button>
                  <input
                    aria-label="Hours"
                    type="number"
                    min="0"
                    max="24"
                    value={draftHours}
                    onChange={(event) => updateDraft("hours", event.target.value)}
                  />
                  <button
                    type="button"
                    aria-label="Increase hours"
                    onClick={() => updateDraft("hours", String((Number(draftHours) || 0) + 1))}
                  >
                    +
                  </button>
                </div>
              </label>
              <label>
                <span>Minutes</span>
                <div className="expiry-stepper">
                  <button
                    type="button"
                    aria-label="Decrease minutes"
                    onClick={() => updateDraft("minutes", String((Number(draftMinutes) || 0) - 5))}
                  >
                    −
                  </button>
                  <input
                    aria-label="Minutes"
                    type="number"
                    min="0"
                    max="55"
                    step="5"
                    value={draftMinutes}
                    disabled={Number(draftHours) === 24}
                    onChange={(event) => updateDraft("minutes", event.target.value)}
                  />
                  <button
                    type="button"
                    aria-label="Increase minutes"
                    disabled={Number(draftHours) === 24}
                    onClick={() => updateDraft("minutes", String((Number(draftMinutes) || 0) + 5))}
                  >
                    +
                  </button>
                </div>
              </label>
            </div>

            <div className="expiry-preview" aria-live="polite">
              <FiClock aria-hidden="true" />
              <span>
                Expires: <strong>{draftTotal > 0 ? getExpiryPreview(Number(draftHours), Number(draftMinutes)) : "Choose a duration"}</strong>
              </span>
            </div>

            <button
              className="expiry-dialog-confirm"
              type="button"
              onClick={handleCustomConfirm}
              disabled={draftTotal <= 0 || draftTotal > 24 * 60}
            >
              Set Expiry
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default ExpirySelector;
