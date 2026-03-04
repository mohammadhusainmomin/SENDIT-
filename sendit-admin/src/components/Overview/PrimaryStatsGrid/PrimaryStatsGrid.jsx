import StatCard from "../../StatCard/StatCard";
import { FiUsers, FiFile, FiCode, FiCheck } from "react-icons/fi";
import "./PrimaryStatsGrid.css";

function PrimaryStatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stagger-1">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FiUsers />}
          color="#3b82f6"
        />
      </div>
      <div className="stagger-2">
        <StatCard
          title="Total Files Shared"
          value={stats.totalFiles}
          icon={<FiFile />}
          color="#10b981"
        />
      </div>
      <div className="stagger-3">
        <StatCard
          title="Total Codes Shared"
          value={stats.totalCodes}
          icon={<FiCode />}
          color="#f59e0b"
        />
      </div>
      <div className="stagger-4">
        <StatCard
          title="Files Received"
          value={stats.filesReceived}
          icon={<FiCheck />}
          color="#8b5cf6"
        />
      </div>
    </div>
  );
}

export default PrimaryStatsGrid;
