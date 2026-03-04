import SectionHeader from "../SectionHeader/SectionHeader";
import DataTable from "../DataTable/DataTable";
import { formatTime } from "../../utils/formatters";
import "./FilesPage.css";

function FilesPage({ files, totalCount, hasMore, isLoading, onLoadMore }) {
  const columns = [
    {
      key: "code",
      label: "Code",
      className: "code-cell",
    },
    {
      key: "originalName",
      label: "File Name",
      className: "filename-cell",
      title: (row) => row.originalName,
    },
    {
      key: "senderName",
      label: "Sender",
      render: (row) => row.senderName || row.senderEmail || "Guest",
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
        title="File Sharing History"
        count={totalCount ?? files.length}
        countLabel="Total files"
      />
      <DataTable
        columns={columns}
        data={files}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={onLoadMore}
      />
    </div>
  );
}

export default FilesPage;
