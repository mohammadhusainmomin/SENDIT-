import { useState } from "react";
import { FiArrowRight, FiLock, FiMail, FiShield } from "react-icons/fi";
import Mascot from "../Mascot";
import "./LoginPage.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        onLogin(email, data.token);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-visual">
          <div className="login-visual-card">
            <div className="login-visual-copy">
              <span className="login-kicker">SENDIT CONTROL LAYER</span>
              <h2>Admin command center for the SendIt platform.</h2>
              <p>
                Review platform activity, monitor sharing flows, and manage operational
                visibility from a cleaner secure workspace.
              </p>
            </div>

            <div className="login-pill-row">
              <span className="login-info-pill">Controlled access</span>
              <span className="login-info-pill">Live records</span>
              <span className="login-info-pill">Protected admin entry</span>
            </div>

            <div className="mascot-wrapper">
              <Mascot size="large" />
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="brand-icon">
              <FiShield />
            </div>
            <h1 className="login-title">SendIt</h1>
            <p className="login-subtitle">Admin Access</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FiMail />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sendit.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FiLock />
                </span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              <span className="button-icon">
                <FiArrowRight />
              </span>
              {loading ? "Logging in..." : "Access Dashboard"}
            </button>
          </form>

          <div className="login-footer">
            <p>Secure admin access to the SendIt platform</p>
          </div>
        </div>
      </div>

      <div className="login-bg-decoration decoration-1"></div>
      <div className="login-bg-decoration decoration-2"></div>
      <div className="login-bg-decoration decoration-3"></div>
    </div>
  );
}

export default LoginPage;
