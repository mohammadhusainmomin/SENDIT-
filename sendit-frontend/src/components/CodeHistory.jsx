import { useEffect, useState } from "react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

function CodeHistory() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/code/my");
      setCodes(res.data);
    } catch (err) {
      error("Failed to load code history");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      success("Code copied!");
    } catch (err) {
      error("Failed to copy code");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const truncateCode = (code, length = 100) => {
    return code.length > length ? code.substring(0, length) + "..." : code;
  };

  return (
    <div className="code-history-container">
      <div className="code-history-content">
        <section className="code-history-header">
          <div className="header-icon">📚</div>
          <h2>Code History</h2>
          <p>Your shared and received codes</p>
        </section>

        {loading ? (
          <div className="loading-state">
            <p>Loading your history...</p>
          </div>
        ) : codes.length === 0 ? (
          <div className="empty-state">
            <p>No code history yet</p>
            <p className="empty-hint">Start by sharing some code!</p>
          </div>
        ) : (
          <section className="code-history-list">
            {codes.map((codeItem) => (
              <div key={codeItem._id} className="history-item">
                <div className="history-item-header">
                  <div className="history-timestamp">
                    {formatDate(codeItem.createdAt)}
                  </div>
                  <div className="history-badge">
                    {codeItem.senderId ? "Sent" : "Received"}
                  </div>
                </div>
                <pre className="history-code-preview">
                  {truncateCode(codeItem.content)}
                </pre>
                <div className="history-actions">
                  <button
                    onClick={() => handleCopyCode(codeItem.content)}
                    className="btn-copy-small"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default CodeHistory;
