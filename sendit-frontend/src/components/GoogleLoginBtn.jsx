import { GoogleLogin } from "@react-oauth/google";
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
        "/api/auth/google",
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
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => showError("Google Login Failed")}
      useOneTap={false}
    />
  );
}

export default GoogleLoginBtn;
