import SectionHeader from "../SectionHeader/SectionHeader";
import DataTable from "../DataTable/DataTable";
import { formatTime } from "../../utils/formatters";
import "./CodesPage.css";

function CodesPage({ codes, totalCount, hasMore, isLoading, onLoadMore }) {
  const columns = [
    {
      key: "code",
      label: "Code",
      className: "code-cell",
    },
    {
      key: "senderName",
      label: "Sender",
      render: (row) => row.senderName || row.senderEmail || "Unknown",
    },
    {
      key: "receiverName",
      label: "Receiver",
      render: (row) =>
        row.receiverName ||
        row.receiverEmail ||
        (row.receiverType === "guest" ? "Guest User" : "-"),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className={`status-badge status-${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "sentAt",
      label: "Sent",
      className: "time-cell",
      render: (row) => formatTime(row.sentAt),
    },
  ];

  return (
    <div className="tab-content">
      <SectionHeader
        title="Text Code Sharing History"
        count={totalCount ?? codes.length}
        countLabel="Total codes"
      />
      <DataTable
        columns={columns}
        data={codes}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={onLoadMore}
      />
    </div>
  );
}

export default CodesPage;
