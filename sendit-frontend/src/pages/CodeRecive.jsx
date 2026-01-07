import { useState } from "react";
import api from "../services/api";
import { formatCode } from "../utils/formatCode";

function CodeReceive() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleReceive = async () => {
    const res = await api.post("/api/code/receive", { code });
    setResult(formatCode(res.data.content));
  };

  return (
    <div className="page">
      <h2>📥 Receive Code</h2>

      <input
        placeholder="Enter 4 digit code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleReceive}>Get Code</button>

      {result && (
        <>
          <textarea rows="14" value={result} readOnly />
          <button onClick={() => navigator.clipboard.writeText(result)}>
            📋 Copy Code
          </button>
        </>
      )}
    </div>
  );
}

export default CodeReceive;
