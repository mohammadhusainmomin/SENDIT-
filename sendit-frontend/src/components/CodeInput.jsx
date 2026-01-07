import { useState } from "react";
import "./styles/CodeInput.css";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

function CodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { success: showSuccess, error: showError } = useToast();

  const handleDownload = async () => {
    if (code.length !== 4) {
      showError("Please enter a valid 4-digit code");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        showError("Please login to receive file");
        return;
      }

      const response = await api.post(
        "/api/receive",
        { code },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const disposition = response.headers["content-disposition"];
      let fileName = "downloaded-file";

      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1]);
        }
      }

      // Create blob with correct MIME type
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      showSuccess("✓ File downloaded successfully!");
      setCode("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      showError("Invalid code or file expired. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCode(value);
  };

  return (
    <div className="code-input-container">
      <div className="code-input-wrapper">
        <label htmlFor="access-code" className="code-label">
          Access Code
        </label>
        <input
          id="access-code"
          type="text"
          inputMode="numeric"
          placeholder=" "
          value={code}
          onChange={handleCodeChange}
          disabled={loading}
          maxLength="4"
          className="code-input"
        />
      </div>

      <button
        className="btn-download"
        onClick={handleDownload}
        disabled={code.length !== 4 || loading}
      >
        <span>📥</span>
        {loading ? "Downloading..." : "Download File"}
      </button>

      <div className="code-info">
        <p>Enter the 4-digit code your friend sent you</p>
      </div>
    </div>
  );
}

export default CodeInput;
