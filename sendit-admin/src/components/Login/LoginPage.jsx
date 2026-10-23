import { useState } from "react";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiShield } from "react-icons/fi";
import Mascot from "../Mascot";
import "./LoginPage.css";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = {};
      }

      if (!response.ok || !data.success || !data.token) {
        if (response.status === 401) {
          setError(data.message || "Invalid email or password.");
        } else if (response.status === 429) {
          setError(data.message || "Too many login attempts. Please wait and try again.");
        } else if (response.status >= 500) {
          setError(data.message || "The admin service is temporarily unavailable.");
        } else {
          setError(data.message || `Login failed (HTTP ${response.status}). Check the admin API configuration.`);
        }
        return;
      }

      onLogin(data.admin || normalizedEmail, data.token);
    } catch {
      setError(`Cannot connect to the admin API at ${API_BASE_URL}. Check that the backend is running and VITE_API_URL is correct.`);
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
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
