import PrimaryStatsGrid from "./PrimaryStatsGrid/PrimaryStatsGrid";
import SecondaryStatsGrid from "./SecondaryStatsGrid/SecondaryStatsGrid";
import AuthBreakdownSection from "./AuthBreakdownSection/AuthBreakdownSection";
import MonthlyTrendSection from "./MonthlyTrendSection/MonthlyTrendSection";
import ActivityDistributionSection from "./ActivityDistributionSection/ActivityDistributionSection";
import "./OverviewPage.css";

function OverviewPage({ stats, monthlyData }) {
  if (!stats) return <div className="loading-state">Loading stats...</div>;

  return (
    <div className="tab-content">
      <PrimaryStatsGrid stats={stats} />
      <SecondaryStatsGrid stats={stats} />
      <AuthBreakdownSection stats={stats} />
      <MonthlyTrendSection monthlyData={monthlyData} />
      <ActivityDistributionSection stats={stats} />
    </div>
  );
}

export default OverviewPage;
