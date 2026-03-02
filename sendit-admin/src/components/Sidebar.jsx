import NavIcon from "./NavIcon";
import Mascot from "./Mascot";
import { FiLogOut } from "react-icons/fi";

function Sidebar({
  isOpen,
  onToggle,
  selectedTab,
  onTabChange,
  user,
  onLogout,
  navigationItems = [],
}) {
  return (
    <aside className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header-section">
        <div
          className="sidebar-brand-section"
          onClick={onToggle}
          style={{ cursor: "pointer" }}
        >
          <div className="sidebar-mascot-wrapper">
            <Mascot size="small" />
          </div>
          {isOpen && <span className="sidebar-brand-text">SendIt</span>}
        </div>
        <button
          className="sidebar-close-btn"
          onClick={onToggle}
          aria-label="Close sidebar"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Navigation Items */}
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

      {/* Sidebar Footer */}
      <div className="sidebar-footer-section">
        {/* User Profile */}
        <div className="sidebar-user-item">
          <div className="user-avatar-badge">
            {user?.charAt(0).toUpperCase()}
          </div>
          {isOpen && <span className="user-email-text">{user}</span>}
        </div>

        {/* Logout Button */}
        <button
          className="sidebar-logout-btn"
          onClick={onLogout}
          title="Logout"
        >
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
