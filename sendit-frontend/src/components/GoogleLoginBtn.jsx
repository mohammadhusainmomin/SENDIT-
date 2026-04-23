import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

function GoogleLoginBtn({ closeModal }) {
  const { login } = useContext(AuthContext);
  const { success, error: showError } = useToast();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post(
        "/auth/google",
        {
          credential: credentialResponse.credential
        }
      );

      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      success("✓ Login successful!");
      closeModal();

    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err.response?.data || err.message);
      showError("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="google-login-btn-container">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => showError("Google Login Failed")}
          useOneTap={false}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginBtn;
