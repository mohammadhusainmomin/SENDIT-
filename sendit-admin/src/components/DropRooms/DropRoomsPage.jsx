import SectionHeader from "../SectionHeader/SectionHeader";
import DataTable from "../DataTable/DataTable";
import { formatDate, formatTime } from "../../utils/formatters";
import "./DropRoomsPage.css";

function DropRoomsPage({ rooms, totalCount, hasMore, isLoading, onLoadMore }) {
  const columns = [
    {
      key: "code",
      label: "Code",
      className: "code-cell",
    },
    {
      key: "title",
      label: "Room",
      className: "filename-cell",
      title: (row) => row.title,
    },
    {
      key: "organizerName",
      label: "Organizer",
      render: (row) => row.organizerName || row.organizerEmail || "Unknown",
      title: (row) => row.organizerEmail,
    },
    {
      key: "submissionsCount",
      label: "Submissions",
      render: (row) => `${row.submissionsCount || 0} / ${row.filesCount || 0} files`,
    },
    {
      key: "requiredFilesCount",
      label: "Required",
      render: (row) => `${row.requiredFilesCount || 0} docs`,
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
      key: "expiresAt",
      label: "Expires",
      className: "time-cell",
      render: (row) => formatDate(row.expiresAt),
    },
    {
      key: "createdAt",
      label: "Created",
      className: "time-cell",
      render: (row) => formatTime(row.createdAt),
    },
  ];

  return (
    <div className="tab-content drop-rooms-page">
      <SectionHeader
        title="Drop Rooms"
        count={totalCount ?? rooms.length}
        countLabel="Total rooms"
      />
      <DataTable
        columns={columns}
        data={rooms}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={onLoadMore}
        emptyMessage="No drop rooms found"
      />
    </div>
  );
}

export default DropRoomsPage;
