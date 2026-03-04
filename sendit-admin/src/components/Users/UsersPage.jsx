import { useRef } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./UsersPage.css";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function UsersPage({ users, totalCount, hasMore, isLoading, onLoadMore }) {
  const loadingTriggerActive = useRef(false);

  const handleScroll = (event) => {
    if (!hasMore || isLoading || !onLoadMore) return;

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 160;

    if (nearBottom && !loadingTriggerActive.current) {
      loadingTriggerActive.current = true;
      onLoadMore();
      setTimeout(() => {
        loadingTriggerActive.current = false;
      }, 250);
    }
  };

  return (
    <div className="tab-content">
      <SectionHeader
        title="User Management"
        count={totalCount ?? users.length}
        countLabel="Total users"
      />

      <div className="users-scroll-container" onScroll={handleScroll}>
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
                    <>Local</>
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
        <div className="users-loading-state">
          {isLoading && <span>Loading more users...</span>}
          {!hasMore && users.length > 0 && <span>All users loaded</span>}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
