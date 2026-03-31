import { FiActivity, FiLogOut } from "react-icons/fi";
import Mascot from "./Mascot";
import NavIcon from "./NavIcon";

function Sidebar({
  isOpen,
  onToggle,
  selectedTab,
  onTabChange,
  user,
  backendConnected,
  onLogout,
  navigationItems = [],
}) {
  return (
    <aside className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header-section">
        <div className="sidebar-brand-section" onClick={onToggle} style={{ cursor: "pointer" }}>
          <div className="sidebar-mascot-wrapper">
            <Mascot size="small" />
          </div>
          {isOpen && (
            <div className="sidebar-brand-copy">
              <span className="sidebar-brand-text">SendIt</span>
              <span className="sidebar-brand-subtext">Admin control layer</span>
            </div>
          )}
        </div>
        <button
          className="sidebar-close-btn"
          onClick={onToggle}
          aria-label="Close sidebar"
          title="Close"
        >
          x
        </button>
      </div>

      {isOpen && <div className="sidebar-section-label">Command center</div>}

      <nav className="sidebar-nav-section">
        {navigationItems.map((item) => (
          <NavIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={selectedTab === item.id}
            isCollapsed={!isOpen}
            onClick={() => onTabChange(item.id)}
            title={item.label}
          />
        ))}
      </nav>

      <div className="sidebar-footer-section">
        <div
          className={`sidebar-status-item ${backendConnected ? "connected" : "disconnected"}`}
          title={backendConnected ? "Backend connected" : "Backend disconnected"}
        >
          <div className={`status-badge ${backendConnected ? "connected" : "disconnected"}`}>
            <span className="status-pulse" />
            {isOpen ? (
              <span className="status-label">
                {backendConnected ? "System online" : "Connection issue"}
              </span>
            ) : (
              <FiActivity />
            )}
          </div>
        </div>

        <div className="sidebar-user-item">
          <div className="user-avatar-badge">{user?.charAt(0).toUpperCase()}</div>
          {isOpen && (
            <div className="sidebar-user-copy">
              <span className="user-role-text">Administrator</span>
              <span className="user-email-text">{user}</span>
            </div>
          )}
        </div>

        <button className="sidebar-logout-btn" onClick={onLogout} title="Logout">
          <span className="logout-icon">
            <FiLogOut />
          </span>
          {isOpen && <span className="logout-text">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
