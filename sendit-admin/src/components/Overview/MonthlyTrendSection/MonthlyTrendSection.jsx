import LineChart from "../LineChart/LineChart";
import "./MonthlyTrendSection.css";

function MonthlyTrendSection({ monthlyData }) {
  return (
    <div className="chart-section">
      <h2>Monthly Activity Trend</h2>
      <div className="chart-container">
        <LineChart data={monthlyData} />
      </div>
    </div>
  );
}

export default MonthlyTrendSection;
