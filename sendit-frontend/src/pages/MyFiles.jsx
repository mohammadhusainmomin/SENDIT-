import { useEffect, useState } from "react";
import Mascot from "../components/Mascot";
import SEO from "../components/SEO";
import {
  FiFileText,
  FiUploadCloud,
  FiFile,
  FiCopy,
} from "react-icons/fi";
import "../styles/MyFiles.css";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

function MyFiles() {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("sent");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (!token) return;

    const fetchFiles = async () => {
      try {
        setLoading(true);

        const endpoint =
          activeTab === "sent"
            ? "/files/sent"
            : "/files/received";

        const res = await api.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFiles(res.data.history || []);
      } catch (err) {
        console.error("Failed to fetch history", err);
        showError("Failed to load file history");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
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
        title="My Files - SendIt File History"
        description="View your sent and received files."
        url="https://senditsystem.netlify.app/my-files"
      />

      <div className="my-files-content">
        {/* Header */}
        <section className="files-header">
          <div className="header-icon">
            <FiFileText />
          </div>
          <h2>My Files</h2>
          <p>View your sent and received files</p>
        </section>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "sent" ? "active" : ""}`}
            onClick={() => setActiveTab("sent")}
          >
            <FiUploadCloud />
            Sent Files
          </button>

          <button
            className={`tab-btn ${activeTab === "received" ? "active" : ""}`}
            onClick={() => setActiveTab("received")}
          >
           
            Received Files
          </button>
        </div>

        {/* Content */}
        <section className="files-section">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="empty-state">
              <Mascot size="medium" />
              <h3>
                {activeTab === "sent"
                  ? "No sent files yet"
                  : "No received files yet"}
              </h3>
              <p>
                {activeTab === "sent"
                  ? "Files you send will appear here"
                  : "Files you receive will appear here"}
              </p>
            </div>
          ) : (
            <div className="files-grid">
              {files.map((file) => (
                <div key={file._id} className="file-card">
                  <div className="file-card-header">
                    <div className="file-type-icon">
                      <FiFile />
                    </div>
                    <span className="file-status-badge">
                      {activeTab === "sent" ? "Sent" : "Received"}
                    </span>
                  </div>

                  <div className="file-card-content">
                    <h4 className="file-name">
                      {file.originalName}
                    </h4>

                    <div className="file-meta">
                      <div className="meta-item">
                        <span className="meta-label">Code</span>
                        <span className="meta-value">{file.code}</span>
                      </div>

                      <div className="meta-item">
                        <span className="meta-label">
                          {activeTab === "sent"
                            ? "Receiver"
                            : "Sender"}
                        </span>
                        <span className="meta-value">
                          {activeTab === "sent"
                            ? file.receiverName || "Guest User"
                            : file.senderName || "Guest User"}
                        </span>
                      </div>

                      <div className="meta-item">
                        <span className="meta-label">Date</span>
                        <span className="meta-value">
                          {formatDate(
                            file.receivedAt ||
                              file.sentAt
                          )}
                        </span>
                      </div>

                      <div className="meta-item">
                        <span className="meta-label">Status</span>
                        <span className="meta-value">
                          {file.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="file-card-footer">
                    <button
                      className="btn-copy-code"
                      onClick={() => {
                        navigator.clipboard.writeText(file.code);
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

export default MyFiles;
