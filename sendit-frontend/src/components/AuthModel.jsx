import { useState, useContext, useEffect } from "react";
import GoogleLoginBtn from "./GoogleLoginBtn";
import ForgotPassword from "./ForgotPassword";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../services/api";
import "./styles/AuthModel.css";

function AuthModal({ isOpen, closeModal }) {
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [step, setStep] = useState("form"); // form | otp
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { success, error: showError } = useToast();

  // 🔹 Reset modal state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode("login");
      setStep("form");
      setForm({ name: "", email: "", password: "" });
      setOtp("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /* ================= LOGIN / REGISTER ================= */
  const handleSubmit = async () => {
    if (!form.email) {
      setError("Email is required");
      return;
    }

    if (mode === "login" && !form.password) {
      setError("Password is required");
      return;
    }

    if (mode === "register" && (!form.name || !form.password)) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 🔹 LOGIN
      if (mode === "login") {
        const res = await api.post("/api/auth/login", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        login(res.data.user);
        success("Login successful! Welcome back 🎉");
        closeModal();
        return;
      }

      // 🔹 REGISTER → SEND OTP
      await api.post("/api/auth/register-init", {
        email: form.email,
      });

      success("OTP sent to your email! ✓");
      setStep("otp");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/api/auth/verify-otp", {
        name: form.name,
        email: form.email,
        password: form.password,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      success("Account created successfully! 🎉");
      closeModal();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid OTP";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setStep("form");
    setForm({ name: "", email: "", password: "" });
    setOtp("");
    setError("");
    setLoading(false);
  };

  /* ================= UI ================= */
  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="modal-close-btn" onClick={closeModal}>✕</button>

        {/* ================= FORGOT PASSWORD ================= */}
        {mode === "forgot" ? (
          <ForgotPassword closeModal={closeModal} />
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-icon">🔐</div>
              <h3>
                {mode === "login"
                  ? "Welcome Back"
                  : step === "form"
                  ? "Create Account"
                  : "Verify OTP"}
              </h3>
            </div>

            {/* ================= FORM ================= */}
            {step === "form" && (
              <form
                className="auth-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {error && <div className="error-message">{error}</div>}

                {mode === "register" && (
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>

                <button className="btn-auth-submit" disabled={loading}>
                  {loading
                    ? "Please wait..."
                    : mode === "login"
                    ? "Sign In"
                    : "Send OTP"}
                </button>
              </form>
            )}

            {/* ================= OTP ================= */}
            {step === "otp" && (
              <div className="auth-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button
                  className="btn-auth-submit"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Create Account"}
                </button>
              </div>
            )}

            {/* ================= GOOGLE LOGIN ================= */}
            {step === "form" && (
              <>
                <div className="auth-divider">
                  <span>or</span>
                </div>
                <GoogleLoginBtn closeModal={closeModal} />
              </>
            )}

            {/* ================= TOGGLES ================= */}
            <div className="auth-toggle">
              <p>
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  className="toggle-link"
                  onClick={() =>
                    switchMode(mode === "login" ? "register" : "login")
                  }
                >
                  {mode === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>

              {mode === "login" && (
                <button
                  className="toggle-link"
                  onClick={() => switchMode("forgot")}
                >
                  Forgot Password?
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
