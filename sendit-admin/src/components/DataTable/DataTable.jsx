import { useRef } from "react";
import "./DataTable.css";

function DataTable({
  columns,
  data,
  rowKey = "_id",
  hasMore = false,
  isLoading = false,
  onLoadMore,
  emptyMessage = "No records found",
}) {
  const loadingTriggerActive = useRef(false);

  const handleScroll = (event) => {
    if (!hasMore || isLoading || !onLoadMore) return;

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 120;

    if (nearBottom && !loadingTriggerActive.current) {
      loadingTriggerActive.current = true;
      onLoadMore();
      setTimeout(() => {
        loadingTriggerActive.current = false;
      }, 250);
    }
  };

  return (
    <div className="table-container" onScroll={handleScroll}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && !isLoading && (
            <tr>
              <td colSpan={columns.length} className="table-empty-message">
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={column.className || ""}
                  title={column.title ? column.title(row) : undefined}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-loading-state">
        {isLoading && <span>Loading more...</span>}
        {!hasMore && data.length > 0 && <span>All records loaded</span>}
      </div>
    </div>
  );
}

export default DataTable;
