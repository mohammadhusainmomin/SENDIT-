import StatCard from "../../StatCard/StatCard";
import { FiGrid, FiMessageSquare, FiActivity } from "react-icons/fi";
import "./SecondaryStatsGrid.css";

function SecondaryStatsGrid({ stats }) {
  return (
    <div className="stats-grid-secondary">
      <StatCard
        title="Last 30 Days - Users"
        value={stats.recentUsers}
        icon={<FiGrid />}
        color="#ec4899"
      />
      <StatCard
        title="Last 30 Days - Files"
        value={stats.recentFiles}
        icon={<FiMessageSquare />}
        color="#06b6d4"
      />
      <StatCard
        title="Last 30 Days - Codes"
        value={stats.recentCodes}
        icon={<FiActivity />}
        color="#f97316"
      />
    </div>
  );
}

export default SecondaryStatsGrid;
