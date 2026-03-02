import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import "./components/styles/NavIcon.css";
import "./components/styles/Sidebar.css";
import Mascot from "./components/Mascot";
import { FiGrid, FiFile, FiCode, FiUsers, FiTrendingUp, FiCheck, FiMessageSquare, FiActivity } from "react-icons/fi";


const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        onLogin(email);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left side - Illustration */}
        <div className="login-visual">
          <div className="mascot-wrapper">
            <Mascot size="large" />
          </div>
          <div className="visual-text">
            <h2>Welcome to SendIt Admin</h2>
            <p>Manage your file and code sharing platform with ease</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-card">
          <div className="login-header">
            <div className="brand-icon">📤</div>
            <h1 className="login-title">SendIt</h1>
            <p className="login-subtitle">Admin Access</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sendit.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              <span className="button-icon">→</span>
              {loading ? "Logging in..." : "Access Dashboard"}
            </button>
          </form>

          <div className="login-footer">
            <p>🔒 Secure admin access to SendIt platform</p>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="login-bg-decoration decoration-1"></div>
      <div className="login-bg-decoration decoration-2"></div>
      <div className="login-bg-decoration decoration-3"></div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [codes, setCodes] = useState([]);
  const [fileHistory, setFileHistory] = useState([]);
  const [codeHistory, setCodeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const animateElements = document.querySelectorAll(
      ".stat-card, .chart-section",
    );
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedTab, loading, stats]);

  useEffect(() => {
    fetchDashboardData();
    // Only refresh every 30 seconds if backend is connected
    const interval = setInterval(() => {
      if (backendConnected) {
        fetchDashboardData();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [backendConnected]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data from backend
      const [
        statsRes,
        trendRes,
        activityRes,
        usersRes,
        fileHistoryRes,
        codeHistoryRes,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`),
        fetch(`${API_BASE_URL}/admin/trend`),
        fetch(`${API_BASE_URL}/admin/activity?limit=15`),
        fetch(`${API_BASE_URL}/admin/users?limit=10`),
        fetch(`${API_BASE_URL}/admin/file-history?limit=10&page=1`),
        fetch(`${API_BASE_URL}/admin/code-history?limit=10&page=1`),
      ]);

      // Check if all responses are ok
      if (
        !statsRes.ok ||
        !trendRes.ok ||
        !activityRes.ok ||
        !usersRes.ok ||
        !fileHistoryRes.ok ||
        !codeHistoryRes.ok
      ) {
        throw new Error("One or more API endpoints failed");
      }

      const statsData = await statsRes.json();
      const trendData = await trendRes.json();
      const activityData = await activityRes.json();
      const usersData = await usersRes.json();
      const fileHistoryData = await fileHistoryRes.json();
      const codeHistoryData = await codeHistoryRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (trendData.success) setMonthlyData(trendData.data);
      if (activityData.success) setRecentActivity(activityData.activity);
      if (usersData.success) setUsers(usersData.users);
      if (fileHistoryData.success) setFileHistory(fileHistoryData.history);
      if (codeHistoryData.success) setCodeHistory(codeHistoryData.history);

      setLoading(false);
      setBackendConnected(true);
    } catch (error) {
      console.error("Error fetching from API:", error);
      setBackendConnected(false);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="header-title">
            <h1>SendIt Admin Dashboard</h1>
            <p className="header-subtitle">Complete system management</p>
          </div>
        </div>
      </header>

      <div className="dashboard-wrapper">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          user={user}
          backendConnected={backendConnected}
          onLogout={onLogout}
          navigationItems={[
            {
              id: "overview",
              icon: <FiGrid  />,
              label: "Overview"
            },
            {
              id: "files",
              icon: <FiFile  />,
              label: "Files"
            },
            {
              id: "codes",
              icon: <FiCode  />,
              label: "Codes"
            },
            {
              id: "users",
              icon: <FiUsers  />,
              label: "Users"
            },
            {
              id: "activity",
              icon: <FiTrendingUp />,
              label: "Activity"
            },
          ]}
        />

        <main className="dashboard-content">
          {!backendConnected ? (
            <div className="error-container">
              <div className="error-box">
                <div className="error-icon">⚠️</div>
                <h2>Backend Connection Error</h2>
                <p>Unable to connect to the API server.</p>
                <p className="error-hint">
                  Please ensure the backend service is running and accessible.
                </p>
                <button onClick={fetchDashboardData} className="retry-button">
                  Retry Connection
                </button>
              </div>
            </div>
          ) : loading && !stats ? (
            <div className="loading">Loading dashboard...</div>
          ) : (
            <>
              {selectedTab === "overview" && (
                <OverviewTab stats={stats} monthlyData={monthlyData} />
              )}
              {selectedTab === "files" && <FilesTab files={fileHistory} />}
              {selectedTab === "codes" && <CodesTab codes={codeHistory} />}
              {selectedTab === "users" && <UsersTab users={users} />}
              {selectedTab === "activity" && (
                <ActivityTab recentActivity={recentActivity} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function OverviewTab({ stats, monthlyData }) {
  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="tab-content">
      <div className="stats-grid">
        <div className="stagger-1">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FiUsers />}
            color="#3b82f6"
          />
        </div>
        <div className="stagger-2">
          <StatCard
            title="Total Files Shared"
            value={stats.totalFiles}
            icon={<FiFile />}
            color="#10b981"
          />
        </div>
        <div className="stagger-3">
          <StatCard
            title="Total Codes Shared"
            value={stats.totalCodes}
            icon={<FiCode />}
            color="#f59e0b"
          />
        </div>
        <div className="stagger-4">
          <StatCard
            title="Files Received"
            value={stats.filesReceived}
            icon={<FiCheck />}
            color="#8b5cf6"
          />
        </div>
      </div>

      <div className="stats-grid-secondary">
        <StatCard
          title="Last 30 Days - Users"
          value={stats.recentUsers}
          icon={<FiGrid />}
          color="#ec4899"
        />
        <StatCard
          title="Last 30 Days - Files"
          value={stats.recentFiles}
          icon={<FiMessageSquare />}
          color="#06b6d4"
        />
        <StatCard
          title="Last 30 Days - Codes"
          value={stats.recentCodes}
          icon={<FiActivity />}
          color="#f97316"
        />
      </div>

      <div className="chart-section">
        <h2>Authentication Breakdown</h2>
        <div className="auth-breakdown">
          <div className="auth-item">
            <div className="auth-icon">📧</div>
            <div className="auth-details">
              <span className="auth-label">Local Auth</span>
              <span className="auth-value">
                {stats.authBreakdown?.local || 0} users
              </span>
            </div>
          </div>
          <div className="auth-item">
            <div className="auth-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="22"
                height="22"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.1 4 9.2 8.6 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.3 0 10.1-2 13.5-5.3l-6.2-5.1C29.3 35.1 26.8 36 24 36c-5.4 0-9.9-3.3-11.5-8l-6.6 5.1C9.2 39.4 16.1 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1 3-3.3 5.4-6.1 6.6l6.2 5.1C38.5 36.1 44 30.6 44 24c0-1.3-.1-2.5-.4-3.5z"
                />
              </svg>
            </div>
            <div className="auth-details">
              <span className="auth-label">Google Auth</span>
              <span className="auth-value">
                {stats.authBreakdown?.google || 0} users
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Monthly Activity Trend</h2>
        <div className="chart-container">
          <LineChart data={monthlyData} />
        </div>
      </div>

      <div className="chart-section">
        <h2>Activity Distribution</h2>
        <div className="chart-container">
          <BubbleChart stats={stats} />
        </div>
      </div>
    </div>
  );
}

function FilesTab({ files }) {
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>File Sharing History</h2>
        <p className="section-count">Total files: {files.length}</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>File Name</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Sent</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id}>
                <td className="code-cell">{file.code}</td>
                <td className="filename-cell" title={file.originalName}>
                  {file.originalName}
                </td>
                <td>{file.senderName || file.senderEmail || "Guest"}</td>
                <td>{file.receiverName || file.receiverEmail || "-"}</td>
                <td>
                  <span
                    className={`status-badge status-${file.status.toLowerCase()}`}
                  >
                    {file.status}
                  </span>
                </td>
                <td className="time-cell">{formatTime(file.sentAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CodesTab({ codes }) {
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Text Code Sharing History</h2>
        <p className="section-count">Total codes: {codes.length}</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Preview</th>
              <th>Sent</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code._id}>
                <td className="code-cell">{code.code}</td>
                <td>{code.senderName || code.senderEmail || "Unknown"}</td>
                <td>{code.receiverName || code.receiverEmail || "-"}</td>
                <td>
                  <span
                    className={`status-badge status-${code.status.toLowerCase()}`}
                  >
                    {code.status}
                  </span>
                </td>
                <td className="preview-cell" title={code.contentPreview}>
                  {code.contentPreview}
                </td>
                <td className="time-cell">{formatTime(code.sentAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersTab({ users }) {
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>User Management</h2>
        <p className="section-count">Total users: {users.length}</p>
      </div>

      <div className="users-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="user-info">
                <h3>{user.name || "Anonymous"}</h3>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
            <div className="user-auth">
              <span className={`auth-badge ${user.authProvider}`}>
                {user.authProvider === "google" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="16"
                      height="16"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.1 4 9.2 8.6 6.3 14.7z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.3 0 10.1-2 13.5-5.3l-6.2-5.1C29.3 35.1 26.8 36 24 36c-5.4 0-9.9-3.3-11.5-8l-6.6 5.1C9.2 39.4 16.1 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.6 20.5H42V20H24v8h11.3c-1 3-3.3 5.4-6.1 6.6l6.2 5.1C38.5 36.1 44 30.6 44 24c0-1.3-.1-2.5-.4-3.5z"
                      />
                    </svg>
                    Google
                  </>
                ) : (
                  <>📧 Local</>
                )}
              </span>
            </div>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-label">Files Sent</span>
                <span className="stat-value">{user.stats?.filesSent || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Files Received</span>
                <span className="stat-value">
                  {user.stats?.filesReceived || 0}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Codes Sent</span>
                <span className="stat-value">{user.stats?.codesSent || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Codes Received</span>
                <span className="stat-value">
                  {user.stats?.codesReceived || 0}
                </span>
              </div>
            </div>
            <div className="user-footer">
              <small>{formatDate(user.createdAt)}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTab({ recentActivity }) {
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('activity-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [recentActivity]);

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Recent Activity</h2>
        <p className="section-count">
          Latest {recentActivity.length} activities
        </p>
      </div>

      <div className="activity-timeline">
        {recentActivity.map((activity, index) => (
          <div
            key={activity.id}
            className="activity-item"
            style={{ '--stagger-delay': `${index * 0.1}s` }}
          >
            <div className="activity-marker"></div>
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-type">
                  {activity.type === "file" ? "📁" : "📝"} {activity.type}
                </span>
                <span className="activity-time">
                  {formatTime(activity.date)}
                </span>
              </div>
              <p className="activity-details">
                <strong>{activity.sender}</strong> sent to{" "}
                <strong>{activity.receiver}</strong>
              </p>
              {activity.fileName && (
                <p className="activity-file">{activity.fileName}</p>
              )}
              {activity.preview && (
                <p className="activity-preview">{activity.preview}</p>
              )}
              <span
                className={`status-badge status-${activity.status.toLowerCase()}`}
              >
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-header">
        <div className="stat-icon" style={{ color }}>
          {typeof icon === 'string' ? <span>{icon}</span> : icon}
        </div>
        <h3>{title}</h3>
      </div>
      <p className="stat-value" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function LineChart({ data }) {
  if (!data || data.length === 0) return <div>No data available</div>;

  const maxValue = Math.max(...data.map((d) => d.total || 0), 1);

  return (
    <div className="line-chart">
      <div className="chart-lines">
        {data.map((item, index) => (
          <div key={index} className="chart-column" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="column-tooltip">
              <div className="tooltip-row">
                <span className="tooltip-label">Files:</span>
                <span className="tooltip-value">{item.files}</span>
              </div>
              <div className="tooltip-row">
                <span className="tooltip-label">Codes:</span>
                <span className="tooltip-value">{item.codes}</span>
              </div>
              <div className="tooltip-row tooltip-total">
                <span className="tooltip-label">Total:</span>
                <span className="tooltip-value">{item.total}</span>
              </div>
            </div>
            <div className="column-bars">
              <div
                className="bar bar-files"
                style={{ height: `${(item.files / maxValue) * 180}px` }}
                title={`Files: ${item.files}`}
              />
              <div
                className="bar bar-codes"
                style={{ height: `${(item.codes / maxValue) * 180}px` }}
                title={`Codes: ${item.codes}`}
              />
            </div>
            <span className="column-label">{item.month}</span>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <span className="legend-item-inline">
          <span className="legend-box files"></span>Files ({data.reduce((sum, d) => sum + (d.files || 0), 0)})
        </span>
        <span className="legend-item-inline">
          <span className="legend-box codes"></span>Codes ({data.reduce((sum, d) => sum + (d.codes || 0), 0)})
        </span>
      </div>
    </div>
  );
}

function BubbleChart({ stats }) {
  const [hoveredType, setHoveredType] = useState(null);
  const total = stats.totalFiles + stats.totalCodes;
  const filePercent = total > 0 ? (stats.totalFiles / total) * 100 : 0;
  const codePercent = total > 0 ? (stats.totalCodes / total) * 100 : 0;

  // Generate bubbles array with different sizes
  const generateBubbles = (count, type) => {
    const bubbles = [];
    const maxBubbles = 12;
    const bubblesCount = Math.min(maxBubbles, Math.ceil((count / total) * maxBubbles));

    for (let i = 0; i < bubblesCount; i++) {
      bubbles.push({
        id: `${type}-${i}`,
        type: type,
        size: 20 + Math.random() * 30,
        delay: Math.random() * 0.3,
        duration: 3 + Math.random() * 1.5,
      });
    }
    return bubbles;
  };

  const fileBubbles = generateBubbles(stats.totalFiles, 'files');
  const codeBubbles = generateBubbles(stats.totalCodes, 'codes');
  const allBubbles = [...fileBubbles, ...codeBubbles];

  return (
    <div className="bubble-chart-container animate-scale-in">
      <div className="bubbles-wrapper" role="img" aria-label={`Activity Distribution: ${stats.totalFiles} files (${Math.round(filePercent)}%) and ${stats.totalCodes} codes (${Math.round(codePercent)}%)`}>
        <svg className="bubbles-canvas" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="presentation">
          {/* Animated gradient defs */}
          <defs>
            <linearGradient id="fileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated bubbles */}
          {allBubbles.map((bubble, index) => {
            const startX = bubble.type === 'files' ? 100 : 300;
            const startY = 150;
            const endX = startX + (Math.random() - 0.5) * 80;
            const endY = startY - 60 - Math.random() * 100;

            return (
              <g key={bubble.id} className="bubble-group">
                <circle
                  className={`bubble ${bubble.type} ${hoveredType === bubble.type ? 'bubble-active' : ''}`}
                  cx={startX}
                  cy={startY}
                  r={bubble.size}
                  fill={bubble.type === 'files' ? 'url(#fileGradient)' : 'url(#codeGradient)'}
                  filter="url(#glow)"
                  style={{
                    animation: `floatBubble ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
                    cursor: 'pointer',
                    opacity: 0.85,
                    '--startX': startX,
                    '--endX': endX,
                    '--startY': startY,
                    '--endY': endY,
                  }}
                  onMouseEnter={() => setHoveredType(bubble.type)}
                  onMouseLeave={() => setHoveredType(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Stats overlay */}
        <div className="bubble-stats">
          <div className="stats-center">
            <div className="total-count">{total}</div>
            <div className="total-label">Total Actions</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bubble-legend" role="region" aria-label="Activity distribution legend">
        <div
          className={`legend-card ${hoveredType === 'files' ? 'legend-active' : ''}`}
          onMouseEnter={() => setHoveredType('files')}
          onMouseLeave={() => setHoveredType(null)}
          role="button"
          tabIndex="0"
          aria-label={`Files Shared: ${stats.totalFiles} files, ${Math.round(filePercent)}% of total`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setHoveredType('files');
            }
          }}
        >
          <div className="card-header">
            <div className="card-icon files-icon">📁</div>
            <div className="card-title">Files Shared</div>
          </div>
          <div className="card-stats">
            <div className="stat-number">{stats.totalFiles}</div>
            <div className="stat-percent">{Math.round(filePercent)}%</div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill files-fill"
              style={{ width: `${filePercent}%` }}
            ></div>
          </div>
        </div>

        <div
          className={`legend-card ${hoveredType === 'codes' ? 'legend-active' : ''}`}
          onMouseEnter={() => setHoveredType('codes')}
          onMouseLeave={() => setHoveredType(null)}
          role="button"
          tabIndex="0"
          aria-label={`Codes Shared: ${stats.totalCodes} codes, ${Math.round(codePercent)}% of total`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setHoveredType('codes');
            }
          }}
        >
          <div className="card-header">
            <div className="card-icon codes-icon">💻</div>
            <div className="card-title">Codes Shared</div>
          </div>
          <div className="card-stats">
            <div className="stat-number">{stats.totalCodes}</div>
            <div className="stat-percent">{Math.round(codePercent)}%</div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill codes-fill"
              style={{ width: `${codePercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(date) {
  const now = new Date();
  const time = new Date(date);
  const diff = Math.floor((now - time) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("adminUser");
    if (savedEmail) {
      setUserEmail(savedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem("adminUser", email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("adminUser");
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard user={userEmail} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
