import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiChevronDown, FiClock, FiFileText, FiLock, FiLogOut, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModel";

const primaryLinks = [
  { to: "/", label: "Home" },
  { to: "/send", label: "Send File" },
  { to: "/receive", label: "Receive File" },
  { to: "/code/send", label: "Send Code" },
  { to: "/code/receive", label: "Receive Code" },
  { to: "/about", label: "About Us" },
];

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="si-navbar">
        <div className="si-navbar-inner">
          <div className="si-brand" onClick={() => { navigate("/"); closeMenu(); }}>
            
            <div>
              <div className="si-brand-wordmark">SendIt</div>
              <div className="si-meta-label">Secure Motion</div>
            </div>
          </div>

          <nav className="si-nav-links">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `si-nav-link${isActive ? " active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="si-nav-actions">
            <button className="si-theme-toggle" onClick={toggleTheme} type="button" aria-label="Toggle theme">
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>

            {user ? (
              <>
                <div className="si-user-menu-wrap">
                  <button
                    className="si-user-menu-trigger"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    type="button"
                  >
                    <span className="si-nav-user">{user.name}</span>
                    <FiChevronDown className={userMenuOpen ? "is-open" : ""} />
                  </button>

                  {userMenuOpen && (
                    <div className="si-user-dropdown">
                      <NavLink
                        to="/my-files"
                        className={({ isActive }) =>
                          `si-user-dropdown-link${isActive ? " active" : ""}`
                        }
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiFileText /> My Files
                      </NavLink>
                      <NavLink
                        to="/code/history"
                        className={({ isActive }) =>
                          `si-user-dropdown-link${isActive ? " active" : ""}`
                        }
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiClock /> My Codes
                      </NavLink>
                    </div>
                  )}
                </div>
                <button className="si-button-ghost" onClick={handleLogout} type="button">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <button className="si-button-ghost si-auth-login" onClick={() => setOpen(true)} type="button">
                  <FiLock /> Login
                </button>
                <button className="si-button si-auth-start" onClick={() => navigate("/send")} type="button">
                  Get Started <FiArrowUpRight />
                </button>
              </>
            )}

            <button
              className="si-theme-toggle si-mobile-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type="button"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="si-mobile-menu">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `si-nav-link${isActive ? " active" : ""}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
            {user && (
              <>
                <NavLink to="/my-files" className="si-nav-link" onClick={closeMenu}>My Files</NavLink>
                <NavLink to="/code/history" className="si-nav-link" onClick={closeMenu}>Code History</NavLink>
              </>
            )}
            <button className="si-button-ghost" onClick={toggleTheme} type="button">
              {theme === "light" ? <FiMoon /> : <FiSun />} {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            {user ? (
              <button className="si-button-ghost" onClick={handleLogout} type="button">
                <FiLogOut /> Logout
              </button>
            ) : (
              <>
                <button className="si-button-ghost si-auth-login" onClick={() => { setOpen(true); closeMenu(); }} type="button">
                  <FiLock /> Login
                </button>
                <button className="si-button si-auth-start" onClick={() => { navigate("/send"); closeMenu(); }} type="button">
                  Get Started <FiArrowUpRight />
                </button>
              </>
            )}
          </div>
        )}
      </header>

      <AuthModal isOpen={open} closeModal={() => setOpen(false)} />
    </>
  );
}

export default Navbar;
