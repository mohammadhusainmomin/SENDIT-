import { useContext, useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiChevronDown, FiClock, FiFileText, FiInbox, FiLock, FiLogOut, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModel";

const primaryLinks = [
  { to: "/send", label: "Send File" },
  { to: "/receive", label: "Receive File" },
  { to: "/code/send", label: "Send Code" },
  { to: "/code/receive", label: "Receive Code" },
  { to: "/drop-rooms", label: "Drop Rooms" },
];

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const userMenuRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-wrapper">
          {/* Brand */}
          <div className="navbar-brand" onClick={() => { navigate("/"); closeMenu(); }}>
          
            <div className="brand-text">
              <div className="brand-name">SendIt</div>
              <div className="brand-tagline">Share Securely</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="navbar-nav">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `navbar-nav-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            <button 
              className="navbar-action-btn navbar-theme-toggle" 
              onClick={toggleTheme} 
              type="button" 
              aria-label="Toggle theme"
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>

            {user ? (
              <>
                {/* User Menu */}
                <div className="navbar-user-menu" ref={userMenuRef}>
                  <button
                    className="navbar-user-trigger"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    type="button"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="user-avatar">{user.name?.charAt(0).toUpperCase() || "U"}</div>
                    <span className="user-name">{user.name?.split(" ")[0]}</span>
                    <FiChevronDown size={16} className={`chevron-icon ${userMenuOpen ? "open" : ""}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="navbar-dropdown">
                      <NavLink
                        to="/my-files"
                        className={({ isActive }) =>
                          `navbar-dropdown-item ${isActive ? "active" : ""}`
                        }
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiFileText size={16} />
                        <span>My Files</span>
                      </NavLink>
                      <NavLink
                        to="/code/history"
                        className={({ isActive }) =>
                          `navbar-dropdown-item ${isActive ? "active" : ""}`
                        }
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiClock size={16} />
                        <span>My Codes</span>
                      </NavLink>
                      <NavLink
                        to="/drop-rooms"
                        className={({ isActive }) =>
                          `navbar-dropdown-item ${isActive ? "active" : ""}`
                        }
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiInbox size={16} />
                        <span>Drop Rooms</span>
                      </NavLink>
                      <div className="navbar-dropdown-divider"></div>
                      <button 
                        className="navbar-dropdown-item logout" 
                        onClick={handleLogout}
                        type="button"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button 
                  className="navbar-action-btn navbar-login-btn" 
                  onClick={() => setOpen(true)} 
                  type="button"
                >
                  <FiLock size={16} />
                  <span>Login</span>
                </button>
                <button 
                  className="navbar-action-btn navbar-cta-btn" 
                  onClick={() => navigate("/send")} 
                  type="button"
                >
                  Get Started
                  <FiArrowUpRight size={16} />
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-menu">
            <nav className="mobile-nav">
              {primaryLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {user && (
              <div className="mobile-user-section">
                <div className="mobile-user-header">
                  <div className="mobile-user-avatar">{user.name?.charAt(0).toUpperCase() || "U"}</div>
                  <div className="mobile-user-info">
                    <div className="mobile-user-name">{user.name}</div>
                    <div className="mobile-user-email">{user.email || "User"}</div>
                  </div>
                </div>
                <NavLink to="/my-files" className="mobile-user-link" onClick={closeMenu}>
                  <FiFileText size={16} /> My Files
                </NavLink>
                <NavLink to="/code/history" className="mobile-user-link" onClick={closeMenu}>
                  <FiClock size={16} /> My Codes
                </NavLink>
                <NavLink to="/drop-rooms" className="mobile-user-link" onClick={closeMenu}>
                  <FiInbox size={16} /> Drop Rooms
                </NavLink>
                <button className="mobile-user-link logout" onClick={handleLogout} type="button">
                  <FiLogOut size={16} /> Logout
                </button>
              </div>
            )}

            <div className="mobile-actions">
              <button 
                className="mobile-theme-toggle" 
                onClick={toggleTheme} 
                type="button"
              >
                {theme === "light" ? (
                  <>
                    <FiMoon size={16} /> Dark Mode
                  </>
                ) : (
                  <>
                    <FiSun size={16} /> Light Mode
                  </>
                )}
              </button>
              {!user && (
                <>
                  <button 
                    className="mobile-login-btn" 
                    onClick={() => { setOpen(true); closeMenu(); }} 
                    type="button"
                  >
                    <FiLock size={16} /> Login
                  </button>
                  <button 
                    className="mobile-cta-btn" 
                    onClick={() => { navigate("/send"); closeMenu(); }} 
                    type="button"
                  >
                    Get Started <FiArrowUpRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={open} closeModal={() => setOpen(false)} />
    </>
  );
}

export default Navbar;
