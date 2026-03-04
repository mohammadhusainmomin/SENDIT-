import "./StatCard.css";

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-header">
        <div className="stat-icon" style={{ color }}>
          {typeof icon === "string" ? <span>{icon}</span> : icon}
        </div>
        <h3>{title}</h3>
      </div>
      <p className="stat-value" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

export default StatCard;
