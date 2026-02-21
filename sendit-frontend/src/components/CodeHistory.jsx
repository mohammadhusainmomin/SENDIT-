import { useEffect, useState } from "react";
import { FiBook, FiCopy, FiUser, FiCalendar, FiClock, FiTrash2 } from "react-icons/fi";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import Mascot from "./Mascot";
import "../styles/CodeHistory.css";

function CodeHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/code/history");
      if (res.data.success) {
        setHistory(res.data.history);
      }
    } catch (err) {
      error("Failed to load code history");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async (preview) => {
    try {
      await navigator.clipboard.writeText(preview);
      success("Code preview copied!");
    } catch (err) {
      error("Failed to copy code");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatTime = (date) => {
    const now = new Date();
    const time = new Date(date);
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "received":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "expired":
        return "#ef4444";
      case "deleted":
        return "#6b7280";
      default:
        return "var(--primary-main)";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "received":
        return "✅ Received";
      case "pending":
        return "⏳ Pending";
      case "expired":
        return "⏰ Expired";
      case "deleted":
        return "🗑️ Deleted";
      default:
        return status;
    }
  };

  return (
    <div className="code-history-container">
      <div className="code-history-content">
        <section className="code-history-header">
          <div className="header-icon"><FiBook /></div>
          <h2>Code History</h2>
          <p>Track all your shared code transfers</p>
        </section>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your code history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="empty-state">
            <Mascot size="medium" />
            <h3>No code history yet</h3>
            <p>Start sharing code to build your history</p>
          </div>
        ) : (
          <section className="code-history-list">
            {history.map((item) => (
              <div key={item._id} className="history-item">
                <div className="history-item-header">
                  <div className="history-timestamp">
                    <FiCalendar style={{ marginRight: "0.4rem" }} />
                    {formatDate(item.sentAt)} ({formatTime(item.sentAt)})
                  </div>
                  <div className="history-badge" style={{ backgroundColor: getStatusColor(item.status) }}>
                    {getStatusLabel(item.status)}
                  </div>
                </div>

                <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
                  <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}>
                    {/* Sender Info */}
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <FiUser style={{ color: "var(--primary-main)", marginTop: "0.2rem" }} />
                      <div>
                        <p style={{ margin: "0", fontSize: "0.85rem", color: "var(--text-light)" }}>Sent by</p>
                        <p style={{ margin: "0.25rem 0 0 0", fontWeight: "600", color: "var(--text-primary)" }}>
                          {item.senderName || item.senderEmail || "Guest"}
                        </p>
                      </div>
                    </div>

                    {/* Receiver Info */}
                    {item.status === "received" && (
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <FiUser style={{ color: "#10b981", marginTop: "0.2rem" }} />
                        <div>
                          <p style={{ margin: "0", fontSize: "0.85rem", color: "var(--text-light)" }}>Received by</p>
                          <p style={{ margin: "0.25rem 0 0 0", fontWeight: "600", color: "var(--text-primary)" }}>
                            {item.receiverName || item.receiverEmail || "Guest"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Expiration Info */}
                    {item.expiresAt && !item.isExpired && (
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <FiClock style={{ color: "var(--warning-color)", marginTop: "0.2rem" }} />
                        <div>
                          <p style={{ margin: "0", fontSize: "0.85rem", color: "var(--text-light)" }}>Expires</p>
                          <p style={{ margin: "0.25rem 0 0 0", fontWeight: "600", color: "var(--text-primary)" }}>
                            {formatDate(item.expiresAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Deleted Info */}
                    {item.isContentDeleted && (
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <FiTrash2 style={{ color: "var(--error-color)", marginTop: "0.2rem" }} />
                        <div>
                          <p style={{ margin: "0", fontSize: "0.85rem", color: "var(--text-light)" }}>Content deleted</p>
                          <p style={{ margin: "0.25rem 0 0 0", fontWeight: "600", color: "var(--text-primary)" }}>
                            {formatDate(item.deletedAt)} (Reason: {item.deletionReason})
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <pre className="history-code-preview">
                  {item.contentPreview}
                </pre>

                <div className="history-actions">
                  <button
                    onClick={() => handleCopyCode(item.contentPreview)}
                    className="btn-copy-small"
                  >
                    <FiCopy /> Copy Preview
                  </button>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                    Code: <span style={{ fontWeight: "600", color: "var(--primary-main)" }}>{item.code}</span>
                  </div>
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
