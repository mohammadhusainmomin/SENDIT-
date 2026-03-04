import BubbleChart from "../BubbleChart/BubbleChart";
import "./ActivityDistributionSection.css";

function ActivityDistributionSection({ stats }) {
  return (
    <section className="chart-section" aria-labelledby="activity-distribution-title">
      <h2 id="activity-distribution-title">Activity Distribution</h2>
      <div className="chart-container">
        <BubbleChart stats={stats} />
      </div>
    </section>
  );
}

export default ActivityDistributionSection;
