import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModel";
import { Link, useNavigate } from "react-router-dom";
import Mascot from "./Mascot";
import "./styles/Navbar.css";


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <span></span>
          <span></span>
          <span></span>
        </button>

<div className={`navbar-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
  {user && (
    <>
      <button
        className="nav-btn nav-link"
        onClick={() => {
          navigate("/my-files");
          setMobileMenuOpen(false);
        }}
      >
        📋 My Files
      </button>

      <Link className="nav-link" to="/code/send" onClick={() => setMobileMenuOpen(false)}>
        💻 Send Code
      </Link>

      <Link className="nav-link" to="/code/receive" onClick={() => setMobileMenuOpen(false)}>
        📥 Receive Code
      </Link>

      <Link className="nav-link" to="/code/history" onClick={() => setMobileMenuOpen(false)}>
        📜 Code History
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
                    Logout
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
                  🔐 Login / Register
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
