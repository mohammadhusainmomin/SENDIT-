import { useState, useContext, useEffect } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import GoogleLoginBtn from "./GoogleLoginBtn";
import ForgotPassword from "./ForgotPassword";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api, { updateCachedToken } from "../services/api";
import "./styles/AuthModel.css";

function AuthModal({ isOpen, closeModal }) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (!isOpen) return;

    setMode("login");
    setStep("form");
    setForm({ name: "", email: "", password: "" });
    setOtp("");
    setError("");
    setFieldErrors({});
    setShowPassword(false);
    setLoading(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizeEmail = (email) => email.trim().toLowerCase();
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordError = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Use at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Add one uppercase letter";
    if (!/[a-z]/.test(password)) return "Add one lowercase letter";
    if (!/\d/.test(password)) return "Add one number";
    return "";
  };

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: "" }));
    setError("");
  };

  const validateForm = () => {
    const nextErrors = {};
    const email = normalizeEmail(form.email);

    if (mode === "register") {
      const name = form.name.trim();
      if (!name) nextErrors.name = "Name is required";
      else if (name.length < 2) nextErrors.name = "Enter at least 2 characters";
      else if (!/^[a-zA-Z\s.'-]+$/.test(name)) nextErrors.name = "Use letters and spaces only";
    }

    if (!email) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email";

    if (mode === "login") {
      if (!form.password) nextErrors.password = "Password is required";
    } else {
      const passwordError = getPasswordError(form.password);
      if (passwordError) nextErrors.password = passwordError;
    }

    setFieldErrors(nextErrors);
    setError("");
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});
      const email = normalizeEmail(form.email);

      if (mode === "login") {
        const res = await api.post("/auth/login", {
          email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        updateCachedToken(res.data.token);
        login(res.data.user);
        success("Login successful! Welcome back");
        closeModal();
        return;
      }

      await api.post("/auth/register-init", { email });
      setForm((current) => ({ ...current, email }));
      success("OTP sent to your email!");
      setStep("otp");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const cleanOtp = otp.trim();

    if (!/^\d{6}$/.test(cleanOtp)) {
      setFieldErrors({ otp: "Enter the 6-digit OTP" });
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});

      const res = await api.post("/auth/verify-otp", {
        name: form.name.trim(),
        email: normalizeEmail(form.email),
        password: form.password,
        otp: cleanOtp,
      });

      updateCachedToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      success("Account created successfully!");
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
    setFieldErrors({});
    setShowPassword(false);
    setLoading(false);
  };

  const title =
    mode === "login" ? "Welcome Back" : step === "form" ? "Create Account" : "Verify OTP";

  const subtitle =
    mode === "login"
      ? "Access your SendIt history and drop rooms."
      : step === "form"
      ? "Create an account with email verification."
      : `We sent a 6-digit OTP to ${form.email}`;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="modal-close-btn" onClick={closeModal} aria-label="Close">
          <FiX className="close-icon-model" />
        </button>

        {mode === "forgot" ? (
          <ForgotPassword closeModal={closeModal} onBackToLogin={() => switchMode("login")} />
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-icon">
                <FiShield />
              </div>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>

            {step === "form" && (
              <form
                className="auth-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {error && (
                  <div className="error-message">
                    <FiAlertTriangle /> {error}
                  </div>
                )}

                {mode === "register" && (
                  <div className="form-group">
                    <label htmlFor="auth-name">Name</label>
                    <div className={`auth-input-shell ${fieldErrors.name ? "has-error" : ""}`}>
                      <FiUser />
                      <input
                        id="auth-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                    </div>
                    {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="auth-email">Email</label>
                  <div className={`auth-input-shell ${fieldErrors.email ? "has-error" : ""}`}>
                    <FiMail />
                    <input
                      id="auth-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="auth-password">Password</label>
                  <div className={`auth-input-shell ${fieldErrors.password ? "has-error" : ""}`}>
                    <FiLock />
                    <input
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => updateForm("password", e.target.value)}
                      placeholder={mode === "login" ? "Enter your password" : "Create a strong password"}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
                  {mode === "register" && (
                    <span className="field-hint">
                      Minimum 8 characters with uppercase, lowercase, and a number.
                    </span>
                  )}
                </div>

                <button className="btn-auth-submit" disabled={loading}>
                  <FiArrowRight />
                  {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Send OTP"}
                </button>
              </form>
            )}

            {step === "otp" && (
              <div className="auth-form">
                {error && (
                  <div className="error-message">
                    <FiAlertTriangle /> {error}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="auth-otp">Enter OTP</label>
                  <div className={`auth-input-shell ${fieldErrors.otp ? "has-error" : ""}`}>
                    <FiLock />
                    <input
                      id="auth-otp"
                      type="text"
                      inputMode="numeric"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                        setFieldErrors((current) => ({ ...current, otp: "" }));
                      }}
                      placeholder="6-digit code"
                      maxLength={6}
                    />
                  </div>
                  {fieldErrors.otp && <span className="field-error">{fieldErrors.otp}</span>}
                </div>

                <button className="btn-auth-submit" onClick={handleVerifyOtp} disabled={loading}>
                  <FiArrowRight />
                  {loading ? "Verifying..." : "Verify & Create Account"}
                </button>

                <button
                  type="button"
                  className="text-link-btn auth-secondary-action"
                  onClick={() => setStep("form")}
                  disabled={loading}
                >
                  Edit account details
                </button>
              </div>
            )}

            {step === "form" && (
              <>
                <div className="auth-divider">
                  <span>or</span>
                </div>
                <GoogleLoginBtn closeModal={closeModal} />
              </>
            )}

            <div className="auth-toggle">
              <p>
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  className="text-link-btn"
                  onClick={() => switchMode(mode === "login" ? "register" : "login")}
                >
                  {mode === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>

              {mode === "login" && (
                <button type="button" className="text-link-btn" onClick={() => switchMode("forgot")}>
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
