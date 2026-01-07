import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModel";
import { Link, useNavigate } from "react-router-dom";
import Mascot from "./Mascot";
import "./styles/Navbar.css";


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => navigate("/")}>
          <div className="brand-mascot">
            <Mascot size="small" />
          </div>
          <h3>SENDIT</h3>
        </div>
<div className="navbar-menu">
  {user && (
    <>
      <button
        className="nav-btn nav-link"
        onClick={() => navigate("/my-files")}
      >
        📋 My Files
      </button>

      <Link className="nav-link" to="/code/send">
        💻 Send Code
      </Link>

      <Link className="nav-link" to="/code/receive">
        📥 Receive Code
      </Link>

      <Link className="nav-link" to="/code/history">
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
                  onClick={() => setOpen(true)}
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
