import { useState } from "react";
import api from "../services/api";
import { formatCode } from "../utils/multiLanguageFormatter";
import SyntaxHighlighter from "../components/SyntaxHighlighter";

function CodeReceive() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReceive = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/code/receive", { code });
      const language = res.data.language || "auto-detect";
      setLanguage(language);
      
      // Format code using language-aware formatter
      const formatted = await formatCode(res.data.content, language);
      setResult(formatted);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to receive code";
      setError(errorMsg);
      setResult("");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="page">
      <h2>📥 Receive Code</h2>

      {error && (
        <div style={{ 
          padding: "1rem", 
          marginBottom: "1rem", 
          backgroundColor: "#fee", 
          color: "#c00", 
          borderRadius: "0.5rem",
          border: "1px solid #fcc"
        }}>
          {error}
        </div>
      )}

      <input
        placeholder="Enter 4 digit code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={loading}
      />

      <button onClick={handleReceive} disabled={loading || !code.trim()}>
        {loading ? "Loading..." : "Get Code"}
      </button>

      {result && (
        <>
          <SyntaxHighlighter 
            code={result} 
            language={language}
            showLanguageLabel={true}
          />
          <button onClick={() => navigator.clipboard.writeText(result)}>
            📋 Copy Code
          </button>
        </>
      )}
    </div>
  );
}

export default CodeReceive;
