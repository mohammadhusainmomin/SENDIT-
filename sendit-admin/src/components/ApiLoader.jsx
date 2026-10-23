import { FiArrowUpRight } from "react-icons/fi";
import "./ApiLoader.css";

export default function ApiLoader({ label = "Loading data", compact = false }) {
  return (
    <div
      className={`api-loader${compact ? " api-loader--compact" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="api-loader-mark" aria-hidden="true">
        <span className="api-loader-ring" />
        <FiArrowUpRight />
      </span>
      <span className="api-loader-copy">
        <strong>{label}</strong>
        {!compact && <span>Syncing your SendIt dashboard</span>}
      </span>
      <span className="api-loader-dots" aria-hidden="true"><i /><i /><i /></span>
    </div>
  );
}
