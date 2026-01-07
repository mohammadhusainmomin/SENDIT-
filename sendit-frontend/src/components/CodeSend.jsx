import { useState } from "react";
import api from "../services/api";
import { formatCode } from "../utils/formatCode";

function CodeSend() {
  const [codeText, setCodeText] = useState("");
  const [shareCode, setShareCode] = useState("");

  const handleSend = async () => {
    const formatted = formatCode(codeText);

    const res = await api.post("/api/code/send", {
      content: formatted
    });

    setShareCode(res.data.code);
  };

  return (
    <div>
      <h3>Share Code</h3>

      <textarea
        rows="12"
        placeholder="Paste any code here..."
        value={codeText}
        onChange={(e) => setCodeText(e.target.value)}
      />

      <button onClick={handleSend}>Generate Code</button>

      {shareCode && (
        <p>
          Share Code: <b>{shareCode}</b>
        </p>
      )}
    </div>
  );
}

export default CodeSend;
