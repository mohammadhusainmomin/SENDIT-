/**
 * NavIcon Component
 * Professional reusable navigation icon component
 * Displays icon with optional label in sidebar navigation
 */

function NavIcon({ icon, label, isActive, isCollapsed, onClick, title }) {
  return (
    <button
      className={`nav-icon ${isActive ? "active" : ""} ${isCollapsed ? "collapsed" : ""}`}
      onClick={onClick}
      title={title || label}
      aria-label={label}
    >
      <span className="nav-icon-symbol">{icon}</span>
      {!isCollapsed && <span className="nav-icon-label">{label}</span>}
      {isActive && <span className="nav-icon-indicator" />}
    </button>
  );
}

export default NavIcon;
