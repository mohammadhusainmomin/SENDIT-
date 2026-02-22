import { useState, useEffect } from 'react'
import './App.css'
import Mascot from './components/Mascot'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      if (data.success) {
        onLogin(email)
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
              {loading ? 'Logging in...' : 'Access Dashboard'}
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
  )
}

function Dashboard({ user, onLogout }) {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [monthlyData, setMonthlyData] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [users, setUsers] = useState([])
  const [files, setFiles] = useState([])
  const [codes, setCodes] = useState([])
  const [fileHistory, setFileHistory] = useState([])
  const [codeHistory, setCodeHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [backendConnected, setBackendConnected] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    // Only refresh every 30 seconds if backend is connected
    const interval = setInterval(() => {
      if (backendConnected) {
        fetchDashboardData()
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [backendConnected])

  const fetchDashboardData = async () => {
    try {
      // Fetch all data from backend
      const [statsRes, trendRes, activityRes, usersRes, fileHistoryRes, codeHistoryRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`),
        fetch(`${API_BASE_URL}/admin/trend`),
        fetch(`${API_BASE_URL}/admin/activity?limit=15`),
        fetch(`${API_BASE_URL}/admin/users?limit=10`),
        fetch(`${API_BASE_URL}/admin/file-history?limit=10&page=1`),
        fetch(`${API_BASE_URL}/admin/code-history?limit=10&page=1`)
      ])

      // Check if all responses are ok
      if (!statsRes.ok || !trendRes.ok || !activityRes.ok || !usersRes.ok || !fileHistoryRes.ok || !codeHistoryRes.ok) {
        throw new Error('One or more API endpoints failed')
      }

      const statsData = await statsRes.json()
      const trendData = await trendRes.json()
      const activityData = await activityRes.json()
      const usersData = await usersRes.json()
      const fileHistoryData = await fileHistoryRes.json()
      const codeHistoryData = await codeHistoryRes.json()

      if (statsData.success) setStats(statsData.stats)
      if (trendData.success) setMonthlyData(trendData.data)
      if (activityData.success) setRecentActivity(activityData.activity)
      if (usersData.success) setUsers(usersData.users)
      if (fileHistoryData.success) setFileHistory(fileHistoryData.history)
      if (codeHistoryData.success) setCodeHistory(codeHistoryData.history)

      setLoading(false)
      setBackendConnected(true)
    } catch (error) {
      console.error('Error fetching from API:', error)
      setBackendConnected(false)
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>SendIt Admin Dashboard</h1>
            <p className="header-subtitle">Complete system management</p>
          </div>
          <div className="user-section">
            <div className={`connection-status ${backendConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {backendConnected ? 'Backend Online' : 'Backend Offline'}
            </div>
            <span className="user-email">{user}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-item ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`nav-item ${selectedTab === 'files' ? 'active' : ''}`}
          onClick={() => setSelectedTab('files')}
        >
          📁 Files
        </button>
        <button 
          className={`nav-item ${selectedTab === 'codes' ? 'active' : ''}`}
          onClick={() => setSelectedTab('codes')}
        >
          📝 Codes
        </button>
        <button 
          className={`nav-item ${selectedTab === 'users' ? 'active' : ''}`}
          onClick={() => setSelectedTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={`nav-item ${selectedTab === 'activity' ? 'active' : ''}`}
          onClick={() => setSelectedTab('activity')}
        >
          📈 Activity
        </button>
      </nav>

      <main className="dashboard-content">
        {!backendConnected ? (
          <div className="error-container">
            <div className="error-box">
              <div className="error-icon">⚠️</div>
              <h2>Backend Connection Error</h2>
              <p>Unable to connect to the API server.</p>
              <p className="error-hint">Please ensure the backend service is running and accessible.</p>
              <p className="error-hint-2">If the problem persists, please contact the system administrator.</p>
              <button onClick={fetchDashboardData} className="retry-button">
                Retry Connection
              </button>
            </div>
          </div>
        ) : loading && !stats ? (
          <div className="loading">Loading dashboard...</div>
        ) : (
          <>
            {selectedTab === 'overview' && <OverviewTab stats={stats} monthlyData={monthlyData} />}
            {selectedTab === 'files' && <FilesTab files={fileHistory} />}
            {selectedTab === 'codes' && <CodesTab codes={codeHistory} />}
            {selectedTab === 'users' && <UsersTab users={users} />}
            {selectedTab === 'activity' && <ActivityTab recentActivity={recentActivity} />}
          </>
        )}
      </main>
    </div>
  )
}

function OverviewTab({ stats, monthlyData }) {
  if (!stats) return <div>Loading stats...</div>

  return (
    <div className="tab-content">
      <div className="stats-grid">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers}
          icon="👥"
          color="#3b82f6"
        />
        <StatCard 
          title="Total Files Shared" 
          value={stats.totalFiles}
          icon="📁"
          color="#10b981"
        />
        <StatCard 
          title="Total Codes Shared" 
          value={stats.totalCodes}
          icon="📝"
          color="#f59e0b"
        />
        <StatCard 
          title="Files Received" 
          value={stats.filesReceived}
          icon="✅"
          color="#8b5cf6"
        />
      </div>

      <div className="stats-grid-secondary">
        <StatCard 
          title="Last 30 Days - Users" 
          value={stats.recentUsers}
          icon="📊"
          color="#ec4899"
        />
        <StatCard 
          title="Last 30 Days - Files" 
          value={stats.recentFiles}
          icon="📥"
          color="#06b6d4"
        />
        <StatCard 
          title="Last 30 Days - Codes" 
          value={stats.recentCodes}
          icon="📤"
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
              <span className="auth-value">{stats.authBreakdown?.local || 0} users</span>
            </div>
          </div>
          <div className="auth-item">
            <div className="auth-icon">🔐</div>
            <div className="auth-details">
              <span className="auth-label">Google Auth</span>
              <span className="auth-value">{stats.authBreakdown?.google || 0} users</span>
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
          <PieChart stats={stats} />
        </div>
      </div>
    </div>
  )
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
                <td className="filename-cell" title={file.originalName}>{file.originalName}</td>
                <td>{file.senderName || file.senderEmail || 'Guest'}</td>
                <td>{file.receiverName || file.receiverEmail || '-'}</td>
                <td>
                  <span className={`status-badge status-${file.status.toLowerCase()}`}>
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


  )
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
                <td>{code.senderName || code.senderEmail || 'Unknown'}</td>
                <td>{code.receiverName || code.receiverEmail || '-'}</td>
                <td>
                  <span className={`status-badge status-${code.status.toLowerCase()}`}>
                    {code.status}
                  </span>
                </td>
                <td className="preview-cell" title={code.contentPreview}>{code.contentPreview}</td>
                <td className="time-cell">{formatTime(code.sentAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
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
              <div className="user-avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
              <div className="user-info">
                <h3>{user.name || 'Anonymous'}</h3>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
            <div className="user-auth">
              <span className={`auth-badge ${user.authProvider}`}>
                {user.authProvider === 'google' ? '🔐 Google' : '📧 Local'}
              </span>
            </div>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-label">Files Sent</span>
                <span className="stat-value">{user.stats?.filesSent || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Files Received</span>
                <span className="stat-value">{user.stats?.filesReceived || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Codes Sent</span>
                <span className="stat-value">{user.stats?.codesSent || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Codes Received</span>
                <span className="stat-value">{user.stats?.codesReceived || 0}</span>
              </div>
            </div>
            <div className="user-footer">
              <small>{formatDate(user.createdAt)}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityTab({ recentActivity }) {
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Recent Activity</h2>
        <p className="section-count">Latest {recentActivity.length} activities</p>
      </div>

      <div className="activity-timeline">
        {recentActivity.map((activity, index) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-marker"></div>
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-type">{activity.type === 'file' ? '📁' : '📝'} {activity.type}</span>
                <span className="activity-time">{formatTime(activity.date)}</span>
              </div>
              <p className="activity-details">
                <strong>{activity.sender}</strong> sent to <strong>{activity.receiver}</strong>
              </p>
              {activity.fileName && <p className="activity-file">{activity.fileName}</p>}
              {activity.preview && <p className="activity-preview">{activity.preview}</p>}
              <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p className="stat-value" style={{ color }}>{value}</p>
    </div>
  )
}

function LineChart({ data }) {
  if (!data || data.length === 0) return <div>No data</div>

  const maxValue = Math.max(...data.map(d => d.total))
  const width = 100 / data.length

  return (
    <div className="line-chart">
      <div className="chart-lines">
        {data.map((item, index) => (
          <div key={index} className="chart-column">
            <div className="column-bars">
              <div 
                className="bar bar-files"
                style={{ height: `${(item.files / maxValue) * 150}px` }}
                title={`Files: ${item.files}`}
              />
              <div 
                className="bar bar-codes"
                style={{ height: `${(item.codes / maxValue) * 150}px` }}
                title={`Codes: ${item.codes}`}
              />
            </div>
            <span className="column-label">{item.month}</span>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <span><span className="legend-box files"></span>Files</span>
        <span><span className="legend-box codes"></span>Codes</span>
      </div>
    </div>
  )
}

function PieChart({ stats }) {
  const total = stats.totalFiles + stats.totalCodes
  const filePercent = total > 0 ? (stats.totalFiles / total) * 100 : 0
  const codePercent = total > 0 ? (stats.totalCodes / total) * 100 : 0

  const filesDeg = (stats.totalFiles / (stats.totalFiles + stats.totalCodes || 1)) * 360
  const codesDeg = (stats.totalCodes / (stats.totalFiles + stats.totalCodes || 1)) * 360

  return (
    <div className="pie-chart-container">
      <svg className="pie-chart" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#10b981"
          strokeWidth="40"
          strokeDasharray={`${(filePercent / 100) * 502.65} 502.65`}
          transform="rotate(-90 100 100)"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="40"
          strokeDasharray={`${(codePercent / 100) * 502.65} 502.65`}
          strokeDashoffset={-((filePercent / 100) * 502.65)}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="pie-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
          <span>Files ({Math.round(filePercent)}%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
          <span>Codes ({Math.round(codePercent)}%)</span>
        </div>
      </div>
    </div>
  )
}

function formatTime(date) {
  const now = new Date()
  const time = new Date(date)
  const diff = Math.floor((now - time) / 1000)

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('adminUser')
    if (savedEmail) {
      setUserEmail(savedEmail)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (email) => {
    setUserEmail(email)
    setIsLoggedIn(true)
    localStorage.setItem('adminUser', email)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
    localStorage.removeItem('adminUser')
  }

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard user={userEmail} onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
