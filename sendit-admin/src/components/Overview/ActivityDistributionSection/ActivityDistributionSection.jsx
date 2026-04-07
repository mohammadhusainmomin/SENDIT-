import BubbleChart from "../BubbleChart/BubbleChart";
import "./ActivityDistributionSection.css";

function ActivityDistributionSection({ stats }) {
  const files = Number(stats?.totalFiles || 0);
  const codes = Number(stats?.totalCodes || 0);
  const total = files + codes;

  return (
    <section className="chart-section distribution-section-shell" aria-labelledby="activity-distribution-title">
      <div className="distribution-section-head">
        <div>
          <p className="distribution-kicker">Overview Snapshot</p>
          <h2 id="activity-distribution-title">Activity Distribution</h2>
          <p className="distribution-support-copy">
            Compare how much of the current platform activity comes from file transfers versus code sharing.
          </p>
        </div>

        <div className="distribution-summary-pills" aria-label="Distribution totals">
          <div className="distribution-pill">
            <span>Total</span>
            <strong>{total.toLocaleString()}</strong>
          </div>
          <div className="distribution-pill">
            <span>Files</span>
            <strong>{files.toLocaleString()}</strong>
          </div>
          <div className="distribution-pill">
            <span>Codes</span>
            <strong>{codes.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <BubbleChart stats={stats} />
      </div>
    </section>
  );
}

export default ActivityDistributionSection;
