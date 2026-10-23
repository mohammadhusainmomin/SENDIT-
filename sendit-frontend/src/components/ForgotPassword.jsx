import { useState } from "react";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import "./styles/ForgotPassword.css";

function ForgotPassword({ closeModal, onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { success, error: showError } = useToast();

  const normalizeEmail = (email) => email.trim().toLowerCase();
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordError = (password) => {
    if (!password) return "New password is required";
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

  const validateEmailStep = () => {
    const email = normalizeEmail(form.email);
    const nextErrors = {};

    if (!email) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email";

    setFieldErrors(nextErrors);
    setError("");
    return Object.keys(nextErrors).length === 0;
  };

  const validateResetStep = () => {
    const nextErrors = {};
    const passwordError = getPasswordError(form.newPassword);

    if (!/^\d{6}$/.test(form.otp.trim())) nextErrors.otp = "Enter the 6-digit OTP";
    if (passwordError) nextErrors.newPassword = passwordError;
    if (!form.confirmPassword) nextErrors.confirmPassword = "Confirm your password";
    else if (form.newPassword !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(nextErrors);
    setError("");
    return Object.keys(nextErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!validateEmailStep()) return;

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});
      const email = normalizeEmail(form.email);

      await api.post("/auth/forgot-password", { email });
      setForm((current) => ({ ...current, email }));
      success("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send OTP";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!validateResetStep()) return;

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});

      await api.post("/auth/reset-password", {
        email: normalizeEmail(form.email),
        otp: form.otp.trim(),
        newPassword: form.newPassword,
      });

      success("Password reset successful!");
      closeModal();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to reset password";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep(1);
    setError("");
    setFieldErrors({});
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setForm((current) => ({
      ...current,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <div className="forgot-password-icon">
          <FiShield />
        </div>
        <h3>Reset Password</h3>
        <p>{step === 1 ? "Enter your registered email to receive an OTP." : "Create a new password for your account."}</p>
      </div>

      <div className="forgot-stepper" aria-label="Password reset progress">
        <span className={step >= 1 ? "active" : ""}>Email</span>
        <span className={step >= 2 ? "active" : ""}>Reset</span>
      </div>

      {error && (
        <div className="forgot-password-error">
          <FiAlertTriangle />
          <span>{error}</span>
        </div>
      )}

      {step === 1 && (
        <form
          className="forgot-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            sendOtp();
          }}
        >
          <div className="form-group">
            <label htmlFor="forgot-email">Email Address</label>
            <div className={`auth-input-shell ${fieldErrors.email ? "has-error" : ""}`}>
              <FiMail />
              <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
            </div>
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>

          <button type="submit" className="btn-forgot-submit" disabled={loading}>
            <FiArrowRight />
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <button type="button" className="btn-forgot-back" onClick={onBackToLogin} disabled={loading}>
            <FiArrowLeft /> Back to Login
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          className="forgot-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            resetPassword();
          }}
        >
          <div className="form-group">
            <label htmlFor="forgot-otp">OTP Code</label>
            <div className={`auth-input-shell ${fieldErrors.otp ? "has-error" : ""}`}>
              <FiLock />
              <input
                id="forgot-otp"
                type="text"
                inputMode="numeric"
                placeholder="6-digit OTP"
                value={form.otp}
                onChange={(e) => updateForm("otp", e.target.value.replace(/\D/g, "").slice(0, 6))}
                disabled={loading}
                maxLength={6}
              />
            </div>
            {fieldErrors.otp && <span className="field-error">{fieldErrors.otp}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className={`auth-input-shell ${fieldErrors.newPassword ? "has-error" : ""}`}>
              <FiLock />
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.newPassword}
                onChange={(e) => updateForm("newPassword", e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowNewPassword((current) => !current)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                title={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {fieldErrors.newPassword && <span className="field-error">{fieldErrors.newPassword}</span>}
            <span className="field-hint">Minimum 8 characters with uppercase, lowercase, and a number.</span>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={`auth-input-shell ${fieldErrors.confirmPassword ? "has-error" : ""}`}>
              <FiLock />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat new password"
                value={form.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-forgot-submit" disabled={loading}>
            <FiArrowRight />
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button type="button" className="btn-forgot-back" onClick={goBack} disabled={loading}>
            <FiArrowLeft /> Back to Email
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
