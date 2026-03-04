import { useState } from "react";
import Mascot from "../Mascot";
import "./LoginPage.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
        onLogin(email);
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
        {/* Left side - Illustration */}
        <div className="login-visual">
          <div className="mascot-wrapper">
            <Mascot size="large" />
          </div>
          <div className="visual-text">
            <h2>Welcome to SendIt Admin</h2>
            <p>Manage your file and code sharing platform with ease</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-card">
          <div className="login-header">
            <div className="brand-icon">📤</div>
            <h1 className="login-title">SendIt</h1>
            <p className="login-subtitle">Admin Access</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
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
                <span className="input-icon">🔐</span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              <span className="button-icon">→</span>
              {loading ? "Logging in..." : "Access Dashboard"}
            </button>
          </form>

          <div className="login-footer">
            <p>🔒 Secure admin access to SendIt platform</p>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="login-bg-decoration decoration-1"></div>
      <div className="login-bg-decoration decoration-2"></div>
      <div className="login-bg-decoration decoration-3"></div>
    </div>
  );
}

export default LoginPage;
