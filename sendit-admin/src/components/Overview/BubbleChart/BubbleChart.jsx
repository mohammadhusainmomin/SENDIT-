import { useState } from "react";
import "./BubbleChart.css";

function toPercent(value, total) {
  if (!total) return 0;
  return Number(((value / total) * 100).toFixed(1));
}

function BubbleChart({ stats }) {
  const [activeType, setActiveType] = useState(null);

  const files = Number(stats?.totalFiles || 0);
  const codes = Number(stats?.totalCodes || 0);
  const total = files + codes;

  const filePercent = toPercent(files, total);
  const codePercent = toPercent(codes, total);

  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const fileArc = (filePercent / 100) * circumference;
  const codeArc = (codePercent / 100) * circumference;

  return (
    <section
      className="bubble-chart-container"
      aria-label="Share distribution summary"
    >
    

      <div className="distribution-layout" role="group" aria-label="Distribution overview">
        <figure
          className="donut-wrap"
          role="img"
          aria-label={`Files ${filePercent} percent, Codes ${codePercent} percent`}
        >
          <svg className="donut-chart" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r={radius} className="ring-track" />
            <circle
              cx="110"
              cy="110"
              r={radius}
              className={`ring-segment files ${activeType === "codes" ? "muted" : ""}`}
              style={{
                strokeDasharray: `${fileArc} ${circumference}`,
              }}
              transform="rotate(-90 110 110)"
              onMouseEnter={() => setActiveType("files")}
              onMouseLeave={() => setActiveType(null)}
            />
            <circle
              cx="110"
              cy="110"
              r={radius}
              className={`ring-segment codes ${activeType === "files" ? "muted" : ""}`}
              style={{
                strokeDasharray: `${codeArc} ${circumference}`,
                strokeDashoffset: -fileArc,
              }}
              transform="rotate(-90 110 110)"
              onMouseEnter={() => setActiveType("codes")}
              onMouseLeave={() => setActiveType(null)}
            />
          </svg>
          <div className="donut-center">
            <span className="center-value">{total.toLocaleString()}</span>
            <span className="center-label">Total Shares</span>
          </div>
          <figcaption className="sr-only">
            Donut chart showing the ratio between file sharing and code sharing.
          </figcaption>
        </figure>

        <div className="distribution-cards" role="list" aria-label="Distribution details">
          <article
            className={`dist-card files ${activeType === "files" ? "active" : ""}`}
            onMouseEnter={() => setActiveType("files")}
            onMouseLeave={() => setActiveType(null)}
            role="listitem"
            aria-label={`File sharing ${files} total, ${filePercent} percent`}
          >
            <div className="dist-head">
              <span className="dot files-dot"></span>
              <span className="dist-title">File Sharing</span>
            </div>
            <dl className="dist-meta">
              <dt className="sr-only">File sharing count</dt>
              <dd className="dist-value">{files.toLocaleString()}</dd>
              <dt className="sr-only">File sharing percentage</dt>
              <dd className="dist-percent">{filePercent}%</dd>
            </dl>
          </article>

          <article
            className={`dist-card codes ${activeType === "codes" ? "active" : ""}`}
            onMouseEnter={() => setActiveType("codes")}
            onMouseLeave={() => setActiveType(null)}
            role="listitem"
            aria-label={`Code sharing ${codes} total, ${codePercent} percent`}
          >
            <div className="dist-head">
              <span className="dot codes-dot"></span>
              <span className="dist-title">Code Sharing</span>
            </div>
            <dl className="dist-meta">
              <dt className="sr-only">Code sharing count</dt>
              <dd className="dist-value">{codes.toLocaleString()}</dd>
              <dt className="sr-only">Code sharing percentage</dt>
              <dd className="dist-percent">{codePercent}%</dd>
            </dl>
          </article>
        </div>
      </div>

      <div
        className="ratio-track"
        role="progressbar"
        aria-label="Share ratio by type"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(filePercent)}
        aria-valuetext={`Files ${filePercent} percent, Codes ${codePercent} percent`}
      >
        <span className="ratio-fill files-fill" style={{ width: `${filePercent}%` }}></span>
        <span className="ratio-fill codes-fill" style={{ width: `${codePercent}%` }}></span>
      </div>
    </section>
  );
}

export default BubbleChart;
