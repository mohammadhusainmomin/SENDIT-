import { useEffect, useState } from "react";
import Mascot from "../components/Mascot";
import SEO from "../components/SEO";
import {
  FiUploadCloud,
  FiDownload,
  FiCode,
  FiCopy,
} from "react-icons/fi";
import "../styles/MyFiles.css";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

function CodeHistory() {
  const [codes, setCodes] = useState([]);
  const [activeTab, setActiveTab] = useState("sent");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (!token) return;

    const fetchCodes = async () => {
      try {
        setLoading(true);

        const endpoint =
          activeTab === "sent"
            ? "/code/sent"
            : "/code/received";

        const res = await api.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCodes(res.data.history || []);
      } catch (err) {
        console.error("Failed to fetch code history", err);
        showError("Failed to load code history");
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, [token, activeTab, showError]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="my-files-container">
      <SEO
        title="My Codes - SendIt Code History"
        description="View your sent and received codes."
        url="https://senditsystem.netlify.app/code-history"
      />

      <div className="my-files-content">
        {/* Header */}
        <section className="files-header">
          <div className="header-icon">
            <FiCode />
          </div>
          <h2>My Codes</h2>
          <p>View your sent and received codes</p>
        </section>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "sent" ? "active" : ""}`}
            onClick={() => setActiveTab("sent")}
          >
            <FiUploadCloud />
            Sent Codes
          </button>

          <button
            className={`tab-btn ${activeTab === "received" ? "active" : ""}`}
            onClick={() => setActiveTab("received")}
          >
            <FiDownload />
            Received Codes
          </button>
        </div>

        {/* Content */}
        <section className="files-section">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your codes...</p>
            </div>
          ) : codes.length === 0 ? (
            <div className="empty-state">
              <Mascot size="medium" />
              <h3>
                {activeTab === "sent"
                  ? "No sent codes yet"
                  : "No received codes yet"}
              </h3>
              <p>
                {activeTab === "sent"
                  ? "Codes you send will appear here"
                  : "Codes you receive will appear here"}
              </p>
            </div>
          ) : (
            <div className="files-grid">
              {codes.map((code) => (
                <div key={code._id} className="file-card">
                  <div className="file-card-header">
                    <div className="file-type-icon">
                      <FiCode />
                    </div>
                    <span className="file-status-badge">
                      {activeTab === "sent" ? "Sent" : "Received"}
                    </span>
                  </div>

                  <div className="file-card-content">
                    <h4 className="file-name">
                      Share Code: {code.code}
                    </h4>

                    <div className="file-meta">
                      <div className="meta-item">
                        <span className="meta-label">
                          {activeTab === "sent"
                            ? "Receiver"
                            : "Sender"}
                        </span>
                        <span className="meta-value">
                          {activeTab === "sent"
                            ? code.receiverName || "Guest User"
                            : code.senderName || "Guest User"}
                        </span>
                      </div>

                      <div className="meta-item">
                        <span className="meta-label">Preview</span>
                        <span className="meta-value">
                          {code.contentPreview}
                        </span>
                      </div>

                      <div className="meta-item">
                        <span className="meta-label">Date</span>
                        <span className="meta-value">
                          {formatDate(
                            code.receivedAt || code.sentAt
                          )}
                        </span>
                      </div>

                      <div className="meta-item">
                        <span className="meta-label">Status</span>
                        <span className="meta-value">
                          {code.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="file-card-footer">
                    <button
                      className="btn-copy-code"
                      onClick={() => {
                        navigator.clipboard.writeText(code.code);
                        success("✓ Code copied!");
                      }}
                    >
                      <FiCopy /> Copy Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CodeHistory;
