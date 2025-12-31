import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Mascot from "../components/Mascot";
import "../styles/MyFiles.css";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

function MyFiles() {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("sent");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (!token) return;

    const fetchFiles = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/files/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [token]);

  const sentFiles = files.filter((file) => file.senderId === user?._id);

  const receivedFiles = files.filter((file) => file.receiverId === user?._id);

  const displayFiles = activeTab === "sent" ? sentFiles : receivedFiles;

  const formatDate = (dateString) => {
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
      <div className="my-files-content">
        {/* Header */}
        <section className="files-header">
          <div className="header-icon">📋</div>
          <h2>My Files</h2>
          <p>View your sent and received files</p>
        </section>

        {/* Tab Navigation */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "sent" ? "active" : ""}`}
            onClick={() => setActiveTab("sent")}
          >
            <span>📤</span>
            Sent ({sentFiles.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "received" ? "active" : ""}`}
            onClick={() => setActiveTab("received")}
          >
            <span>📥</span>
            Received ({receivedFiles.length})
          </button>
        </div>

        {/* Files Content */}
        <section className="files-section">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your files...</p>
            </div>
          ) : displayFiles.length === 0 ? (
            <div className="empty-state">
              <Mascot size="medium" />
              <h3>No files yet</h3>
              <p>
                {activeTab === "sent"
                  ? "Files you send will appear here"
                  : "Files you receive will appear here"}
              </p>
            </div>
          ) : (
            <div className="files-grid">
              {displayFiles.map((file) => (
                <div key={file._id} className="file-card">
                  <div className="file-card-header">
                    <div className="file-type-icon">📄</div>
                    <span className="file-status-badge">
                      {activeTab === "sent" ? "Sent" : "Received"}
                    </span>
                  </div>

                  <div className="file-card-content">
                    <h4 className="file-name">{file.originalName}</h4>

                    <div className="file-meta">
                      <div className="meta-item">
                        <span className="meta-label">Code</span>
                        <span className="meta-value">{file.code}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Date</span>
                        <span className="meta-value">
                          {formatDate(file.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="file-card-footer">
                    <button
                      className="btn-copy-code"
                      onClick={() => {
                        navigator.clipboard.writeText(file.code);
                        success("✓ Code copied to clipboard!");
                      }}
                      title="Copy code"
                    >
                      📋 {file.code}
                    </button>

                    <button
                      className="btn-download-history"
                      onClick={async () => {
                        try {
                          const res = await api.get(
                            `/api/files/download/${file._id}`,
                            {
                              responseType: "blob",
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          const blob = new Blob([res.data], {
                            type: res.headers["content-type"],
                          });

                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = file.originalName;
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                          window.URL.revokeObjectURL(url);
                        } catch (err) {
                          showError("Download failed. Please try again.");
                        }
                      }}
                    >
                      ⬇️ Download
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
