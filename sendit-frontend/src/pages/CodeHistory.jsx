import { useEffect, useState } from "react";
import api from "../services/api";

function CodeHistory() {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    api.get("/api/code/my").then((res) => setCodes(res.data));
  }, []);

  return (
    <div className="page">
      <h2>📜 My Code History</h2>

      {codes.map((c) => (
        <pre key={c._id}>{c.content}</pre>
      ))}
    </div>
  );
}

export default CodeHistory;
