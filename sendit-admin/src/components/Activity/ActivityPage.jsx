import { useEffect, useRef } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./ActivityPage.css";

function formatTime(date) {
  const now = new Date();
  const time = new Date(date);
  const diff = Math.floor((now - time) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function ActivityPage({
  recentActivity,
  totalCount,
  hasMore,
  isLoading,
  onLoadMore,
}) {
  const loadingTriggerActive = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("activity-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const activityItems = document.querySelectorAll(".activity-item");
    activityItems.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [recentActivity]);

  const handleScroll = (event) => {
    if (!hasMore || isLoading || !onLoadMore) return;

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 180;

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
        title="Recent Activity"
        count={totalCount ?? recentActivity.length}
        countLabel="Latest activities"
      />

      <div className="activity-scroll-container" onScroll={handleScroll}>
        <div className="activity-timeline">
          {recentActivity.map((activity, index) => (
            <div
              key={`${activity.type}-${activity.id}-${index}`}
              className="activity-item"
              style={{ "--stagger-delay": `${index * 0.1}s` }}
            >
              <div className="activity-marker"></div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-type">
                    {activity.type === "file" ? "File Share" : "Code Share"}
                  </span>
                  <span className="activity-time">{formatTime(activity.date)}</span>
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
        <div className="activity-loading-state">
          {isLoading && <span>Loading more activity...</span>}
          {!hasMore && recentActivity.length > 0 && <span>All activities loaded</span>}
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
