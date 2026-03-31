import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./AdminRedesign.css";
import Sidebar from "./components/Sidebar";
import "./components/styles/NavIcon.css";
import "./components/styles/Sidebar.css";
import LoginPage from "./components/Login/LoginPage";
import OverviewPage from "./components/Overview/OverviewPage";
import FilesPage from "./components/Files/FilesPage";
import CodesPage from "./components/Codes/CodesPage";
import UsersPage from "./components/Users/UsersPage";
import ActivityPage from "./components/Activity/ActivityPage";
import { FiActivity, FiCode, FiFile, FiGrid, FiServer, FiTrendingUp, FiUsers } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const PAGE_LIMIT = 10;
const INITIAL_PAGINATION = { total: null, page: 0, pages: 0, hasMore: true };
const ADMIN_TAB_KEY = "adminSelectedTab";
const VALID_TABS = new Set(["overview", "files", "codes", "users", "activity"]);

function parsePagination(raw, fallbackPage) {
  if (!raw) {
    return {
      total: null,
      page: fallbackPage,
      pages: fallbackPage,
      hasMore: false,
    };
  }

  const page = raw.page ?? fallbackPage;
  const pages = raw.pages ?? page;
  const hasMore = typeof raw.hasMore === "boolean" ? raw.hasMore : page < pages;

  return {
    total: typeof raw.total === "number" ? raw.total : null,
    page,
    pages,
    hasMore,
  };
}

function Dashboard({ user, onLogout }) {
  const [selectedTab, setSelectedTab] = useState(() => {
    const savedTab = localStorage.getItem(ADMIN_TAB_KEY);
    return VALID_TABS.has(savedTab) ? savedTab : "overview";
  });
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [users, setUsers] = useState([]);
  const [fileHistory, setFileHistory] = useState([]);
  const [codeHistory, setCodeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [usersPagination, setUsersPagination] = useState(INITIAL_PAGINATION);
  const [filesPagination, setFilesPagination] = useState(INITIAL_PAGINATION);
  const [codesPagination, setCodesPagination] = useState(INITIAL_PAGINATION);
  const [activityPagination, setActivityPagination] = useState(INITIAL_PAGINATION);

  const [usersLoading, setUsersLoading] = useState(false);
  const [filesLoading, setFilesLoading] = useState(false);
  const [codesLoading, setCodesLoading] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);

  const usersFetchingRef = useRef(false);
  const filesFetchingRef = useRef(false);
  const codesFetchingRef = useRef(false);
  const activityFetchingRef = useRef(false);

  useEffect(() => {
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

    const animateElements = document.querySelectorAll(".stat-card, .chart-section");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedTab, loading, stats]);

  useEffect(() => {
    fetchOverviewData();
    const interval = setInterval(() => {
      if (backendConnected) {
        fetchOverviewData();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [backendConnected]);

  useEffect(() => {
    if (selectedTab === "users" && users.length === 0) {
      fetchUsersData(1);
    } else if (selectedTab === "files" && fileHistory.length === 0) {
      fetchFilesData(1);
    } else if (selectedTab === "codes" && codeHistory.length === 0) {
      fetchCodesData(1);
    } else if (selectedTab === "activity" && recentActivity.length === 0) {
      fetchActivityData(1);
    }
  }, [selectedTab]);

  useEffect(() => {
    localStorage.setItem(ADMIN_TAB_KEY, selectedTab);
  }, [selectedTab]);

  const fetchOverviewData = async () => {
    try {
      const [statsRes, trendRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`),
        fetch(`${API_BASE_URL}/admin/trend`),
      ]);

      if (!statsRes.ok || !trendRes.ok) {
        throw new Error("Failed to fetch overview data");
      }

      const statsData = await statsRes.json();
      const trendData = await trendRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (trendData.success) setMonthlyData(trendData.data);

      setLoading(false);
      setBackendConnected(true);
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setBackendConnected(false);
      setLoading(false);
    }
  };

  const fetchUsersData = async (page = 1) => {
    if (usersFetchingRef.current) return;
    usersFetchingRef.current = true;
    setUsersLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users?limit=${PAGE_LIMIT}&page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      if (data.success) {
        const nextUsers = data.users || [];
        setUsers((prev) => (page === 1 ? nextUsers : [...prev, ...nextUsers]));
        setUsersPagination(parsePagination(data.pagination, page));
      }
      setBackendConnected(true);
    } catch (error) {
      console.error("Error fetching users:", error);
      setBackendConnected(false);
    } finally {
      usersFetchingRef.current = false;
      setUsersLoading(false);
    }
  };

  const fetchFilesData = async (page = 1) => {
    if (filesFetchingRef.current) return;
    filesFetchingRef.current = true;
    setFilesLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/file-history?limit=${PAGE_LIMIT}&page=${page}`,
      );
      if (!response.ok) throw new Error("Failed to fetch files");

      const data = await response.json();
      if (data.success) {
        const nextHistory = data.history || [];
        setFileHistory((prev) => (page === 1 ? nextHistory : [...prev, ...nextHistory]));
        setFilesPagination(parsePagination(data.pagination, page));
      }
      setBackendConnected(true);
    } catch (error) {
      console.error("Error fetching files:", error);
      setBackendConnected(false);
    } finally {
      filesFetchingRef.current = false;
      setFilesLoading(false);
    }
  };

  const fetchCodesData = async (page = 1) => {
    if (codesFetchingRef.current) return;
    codesFetchingRef.current = true;
    setCodesLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/code-history?limit=${PAGE_LIMIT}&page=${page}`,
      );
      if (!response.ok) throw new Error("Failed to fetch codes");

      const data = await response.json();
      if (data.success) {
        const nextHistory = data.history || [];
        setCodeHistory((prev) => (page === 1 ? nextHistory : [...prev, ...nextHistory]));
        setCodesPagination(parsePagination(data.pagination, page));
      }
      setBackendConnected(true);
    } catch (error) {
      console.error("Error fetching codes:", error);
      setBackendConnected(false);
    } finally {
      codesFetchingRef.current = false;
      setCodesLoading(false);
    }
  };

  const fetchActivityData = async (page = 1) => {
    if (activityFetchingRef.current) return;
    activityFetchingRef.current = true;
    setActivityLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/activity?limit=${PAGE_LIMIT}&page=${page}`,
      );
      if (!response.ok) throw new Error("Failed to fetch activity");

      const data = await response.json();
      if (data.success) {
        const nextActivity = data.activity || [];
        setRecentActivity((prev) => (page === 1 ? nextActivity : [...prev, ...nextActivity]));
        setActivityPagination(parsePagination(data.pagination, page));
      }
      setBackendConnected(true);
    } catch (error) {
      console.error("Error fetching activity:", error);
      setBackendConnected(false);
    } finally {
      activityFetchingRef.current = false;
      setActivityLoading(false);
    }
  };

  const loadMoreUsers = () => {
    if (usersLoading || !usersPagination.hasMore) return;
    fetchUsersData(usersPagination.page + 1);
  };

  const loadMoreFiles = () => {
    if (filesLoading || !filesPagination.hasMore) return;
    fetchFilesData(filesPagination.page + 1);
  };

  const loadMoreCodes = () => {
    if (codesLoading || !codesPagination.hasMore) return;
    fetchCodesData(codesPagination.page + 1);
  };

  const loadMoreActivity = () => {
    if (activityLoading || !activityPagination.hasMore) return;
    fetchActivityData(activityPagination.page + 1);
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
            <span />
            <span />
            <span />
          </button>

          <div className="header-title">
            <h1>SendIt Admin Dashboard</h1>
            <p className="header-subtitle">
              Operational overview for files, codes, users, and platform activity
            </p>
          </div>

          <div className="user-section">
            <div className={`connection-status ${backendConnected ? "connected" : "disconnected"}`}>
              <span className="status-dot" />
              <span>{backendConnected ? "Backend Connected" : "Backend Disconnected"}</span>
            </div>
            <div className="admin-pill">
              <FiServer />
              <span>{user}</span>
            </div>
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
            { id: "overview", icon: <FiGrid />, label: "Overview" },
            { id: "files", icon: <FiFile />, label: "Files" },
            { id: "codes", icon: <FiCode />, label: "Codes" },
            { id: "users", icon: <FiUsers />, label: "Users" },
            { id: "activity", icon: <FiTrendingUp />, label: "Activity" },
          ]}
        />

        <main className="dashboard-content">
          {!backendConnected ? (
            <div className="error-container">
              <div className="error-box">
                <div className="error-icon"><FiActivity /></div>
                <h2>Backend Connection Error</h2>
                <p>Unable to connect to the API server.</p>
                <p className="error-hint">
                  Please ensure the backend service is running and accessible.
                </p>
                <button onClick={fetchOverviewData} className="retry-button">
                  Retry Connection
                </button>
              </div>
            </div>
          ) : loading && !stats ? (
            <div className="loading">Loading dashboard...</div>
          ) : (
            <>
              {selectedTab === "overview" && (
                <OverviewPage stats={stats} monthlyData={monthlyData} />
              )}
              {selectedTab === "files" && (
                <FilesPage
                  files={fileHistory}
                  totalCount={filesPagination.total}
                  hasMore={filesPagination.hasMore}
                  isLoading={filesLoading}
                  onLoadMore={loadMoreFiles}
                />
              )}
              {selectedTab === "codes" && (
                <CodesPage
                  codes={codeHistory}
                  totalCount={codesPagination.total}
                  hasMore={codesPagination.hasMore}
                  isLoading={codesLoading}
                  onLoadMore={loadMoreCodes}
                />
              )}
              {selectedTab === "users" && (
                <UsersPage
                  users={users}
                  totalCount={usersPagination.total}
                  hasMore={usersPagination.hasMore}
                  isLoading={usersLoading}
                  onLoadMore={loadMoreUsers}
                />
              )}
              {selectedTab === "activity" && (
                <ActivityPage
                  recentActivity={recentActivity}
                  totalCount={activityPagination.total}
                  hasMore={activityPagination.hasMore}
                  isLoading={activityLoading}
                  onLoadMore={loadMoreActivity}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
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

  return !isLoggedIn ? (
    <LoginPage onLogin={handleLogin} />
  ) : (
    <Dashboard user={userEmail} onLogout={handleLogout} />
  );
}

export default App;
