import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModel";
import { Link, useNavigate } from "react-router-dom";
import Mascot from "./Mascot";
import { FiCode, FiDownload, FiFileText, FiClock, FiLock, FiLogOut, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import "./styles/Navbar.css";


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => {
            navigate("/");
            setMobileMenuOpen(false);
          }}>
          <div className="brand-mascot">
            <Mascot size="small" />
          </div>
          <h3>SENDIT</h3>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          <Link className="nav-link" to="/code/send" onClick={() => setMobileMenuOpen(false)}>
            <FiCode /> Send Code
          </Link>

          <Link className="nav-link" to="/code/receive" onClick={() => setMobileMenuOpen(false)}>
            <FiDownload /> Receive Code
          </Link>

          <Link className="nav-link" to="/about" onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>
  {user && (
    <>
      <Link
        className="nav-link"
        onClick={() => {
          navigate("/my-files");
          setMobileMenuOpen(false);
        }}
      >
        <FiFileText /> My Files
      </Link>

      <Link className="nav-link" to="/code/history" onClick={() => setMobileMenuOpen(false)}>
        <FiClock /> Code History
      </Link>
    </>
  )}
           
            <div className="navbar-auth">
              {user ? (
                <div className="user-menu">
                  <span className="user-name">{user.name}</span>
                  <button
                    className="nav-btn btn-logout"
                    onClick={handleLogout}
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              ) : (
                <button
                  className="nav-btn btn-login"
                  onClick={() => {
                    setOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <FiLock /> Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={open} closeModal={() => setOpen(false)} />
    </>
  );
}

export default Navbar;
