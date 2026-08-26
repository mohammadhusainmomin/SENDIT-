import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiFolder,
  FiInbox,
  FiPlus,
  FiRefreshCw,
  FiSend,
  FiX,
} from "react-icons/fi";
import SEO from "../components/SEO";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatFileSize } from "../utils/formatFileSize";
import "../styles/DropRooms.css";

const INITIAL_FORM = {
  title: "",
  description: "",
  instructions: "",
  days: "1",
  hours: "0",
  maxFileSizeMB: "10",
};

const INITIAL_REQUIRED_FILES = ["Resume", "ID Proof", "Certificate"];

function formatDate(value) {
  if (!value) return "No deadline";

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(minutes = 0) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  return [
    days ? `${days}d` : null,
    hours ? `${hours}h` : null,
    mins ? `${mins}m` : null,
  ]
    .filter(Boolean)
    .join(" ") || "0m";
}

function DropRooms() {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [form, setForm] = useState(INITIAL_FORM);
  const [requiredFiles, setRequiredFiles] = useState(INITIAL_REQUIRED_FILES);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [creating, setCreating] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState("");
  const [downloadingAll, setDownloadingAll] = useState(false);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room._id === selectedRoomId),
    [rooms, selectedRoomId],
  );

  const totalExpiryMinutes =
    (Number.parseInt(form.days, 10) || 0) * 1440 +
    (Number.parseInt(form.hours, 10) || 0) * 60;

  const fetchRooms = useCallback(async () => {
    if (!user) return;

    try {
      setLoadingRooms(true);
      const response = await api.get("/drop-rooms");
      const nextRooms = response.data.rooms || [];
      setRooms(nextRooms);
      setSelectedRoomId((currentRoomId) => currentRoomId || nextRooms[0]?._id || "");
    } catch (err) {
      error(err.response?.data?.message || "Failed to load drop rooms");
    } finally {
      setLoadingRooms(false);
    }
  }, [error, user]);

  const fetchRoomDetails = useCallback(async (roomId) => {
    if (!roomId) return;

    try {
      setLoadingDetails(true);
      const response = await api.get(`/drop-rooms/${roomId}`);
      setRoomDetails(response.data);
    } catch (err) {
      error(err.response?.data?.message || "Failed to load submissions");
    } finally {
      setLoadingDetails(false);
    }
  }, [error]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    fetchRoomDetails(selectedRoomId);
  }, [fetchRoomDetails, selectedRoomId]);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateRequiredFile = (index, value) => {
    setRequiredFiles((prev) => prev.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const addRequiredFile = () => {
    setRequiredFiles((prev) => [...prev, ""]);
  };

  const removeRequiredFile = (index) => {
    setRequiredFiles((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleCreateRoom = async (event) => {
    event.preventDefault();

    const documents = requiredFiles.map((item) => item.trim()).filter(Boolean);
    if (!form.title.trim()) {
      error("Room title is required");
      return;
    }

    if (documents.length === 0) {
      error("Add at least one required document");
      return;
    }

    if (totalExpiryMinutes <= 0 || totalExpiryMinutes > 7 * 24 * 60) {
      error("Choose a deadline between 1 hour and 7 days");
      return;
    }

    try {
      setCreating(true);
      const response = await api.post("/drop-rooms", {
        title: form.title,
        description: form.description,
        instructions: form.instructions,
        expiresIn: totalExpiryMinutes,
        maxFileSizeMB: Number.parseInt(form.maxFileSizeMB, 10) || 10,
        requiredFiles: documents.map((label) => ({ label, required: true })),
      });

      const newRoom = response.data.room;
      success(`Drop room ready: ${newRoom.code}`);
      setForm(INITIAL_FORM);
      setRequiredFiles(INITIAL_REQUIRED_FILES);
      await fetchRooms();
      setSelectedRoomId(newRoom._id);
    } catch (err) {
      error(err.response?.data?.message || "Failed to create room");
    } finally {
      setCreating(false);
    }
  };

  const copyRoomCode = async (room) => {
    await navigator.clipboard.writeText(room.code);
    success("Room code copied");
  };

  const copyRoomLink = async (room) => {
    await navigator.clipboard.writeText(`${window.location.origin}/drop/${room.code}`);
    success("Drop room link copied");
  };

  const closeRoom = async (roomId) => {
    try {
      await api.post(`/drop-rooms/${roomId}/close`);
      success("Drop room closed");
      await fetchRooms();
      await fetchRoomDetails(roomId);
    } catch (err) {
      error(err.response?.data?.message || "Failed to close room");
    }
  };

  const downloadSubmissionFile = async (submission, fileIndex) => {
    const fileId = `${submission._id}-${fileIndex}`;

    try {
      setDownloadingFileId(fileId);
      const response = await api.get(
        `/drop-rooms/${selectedRoomId}/submissions/${submission._id}/files/${fileIndex}`,
        { responseType: "blob" },
      );

      const xFilename = response.headers["x-filename"];
      let fileName = submission.files[fileIndex]?.originalName || "submission-file";

      if (xFilename) {
        try {
          fileName = decodeURIComponent(xFilename);
        } catch (decodeError) {}
      }

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
      success("File downloaded");
    } catch (err) {
      error(err.response?.data?.message || "Download failed");
    } finally {
      setDownloadingFileId("");
    }
  };

  const downloadAllFiles = async () => {
    if (!selectedRoomId) return;

    try {
      setDownloadingAll(true);
      const response = await api.get(
        `/drop-rooms/${selectedRoomId}/download-all`,
        { responseType: "blob" },
      );

      const xFilename = response.headers["x-filename"];
      let fileName = `DropRoom_Submissions.zip`;

      if (xFilename) {
        try {
          fileName = decodeURIComponent(xFilename);
        } catch (decodeError) {}
      }

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/zip",
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
      success("All files downloaded");
    } catch (err) {
      error(err.response?.data?.message || "Failed to download all files");
    } finally {
      setDownloadingAll(false);
    }
  };

  if (!user) {
    return (
      <div className="page-shell">
        <SEO
          title="Drop Rooms - SendIt"
          description="Create temporary rooms to collect required documents with SendIt."
          url="https://senditsystem.in/drop-rooms"
        />
        <section className="page-section">
          <div className="drop-login-card si-card">
            <span className="si-chip">Drop Rooms</span>
            <h1 className="si-title">Login required</h1>
            <p className="si-subtitle">
              Use the login button in the navbar to create and manage document collection rooms.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <SEO
        title="Drop Rooms - SendIt Document Collection"
        description="Create temporary SendIt rooms for structured document collection."
        url="https://senditsystem.in/drop-rooms"
      />

      <section className="page-section">
        <div className="drop-hero">
          <div>
            <span className="si-chip">Structured Collection</span>
            <h1 className="si-title">Drop Rooms</h1>
            <p className="si-subtitle">
              Create one room code, collect required documents, and review clean submissions from your dashboard.
            </p>
          </div>
          <a className="si-button-secondary drop-public-link" href="/drop">
            <FiExternalLink /> Submit to a room
          </a>
        </div>

        <div className="drop-layout">
          <form className="si-card drop-create-card" onSubmit={handleCreateRoom}>
            <div className="drop-section-title">
              <FiPlus />
              <div>
                <h2>Create Room</h2>
                <p>Make a checklist-based upload room.</p>
              </div>
            </div>

            <label className="drop-field">
              <span>Room name</span>
              <input
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                placeholder="Internship Documents"
                maxLength={80}
              />
            </label>

            <label className="drop-field">
              <span>Short description</span>
              <input
                value={form.description}
                onChange={(event) => updateForm("description", event.target.value)}
                placeholder="May intake document collection"
                maxLength={160}
              />
            </label>

            <label className="drop-field">
              <span>Instructions</span>
              <textarea
                value={form.instructions}
                onChange={(event) => updateForm("instructions", event.target.value)}
                placeholder="Upload clear PDFs or images."
                rows={3}
                maxLength={400}
              />
            </label>

            <div className="drop-field">
              <span>Required documents</span>
              <div className="drop-required-list">
                {requiredFiles.map((item, index) => (
                  <div className="drop-required-row" key={`${index}-${item}`}>
                    <input
                      value={item}
                      onChange={(event) => updateRequiredFile(index, event.target.value)}
                      placeholder="Document name"
                      maxLength={50}
                    />
                    <button
                      className="si-button-secondary drop-icon-button"
                      type="button"
                      onClick={() => removeRequiredFile(index)}
                      aria-label="Remove document"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
              <button className="si-button-secondary drop-add-button" type="button" onClick={addRequiredFile}>
                <FiPlus /> Add document
              </button>
            </div>

            <div className="drop-form-grid">
              <label className="drop-field">
                <span>Days</span>
                <select value={form.days} onChange={(event) => updateForm("days", event.target.value)}>
                  {Array.from({ length: 8 }, (_, index) => (
                    <option key={index} value={index}>{index}</option>
                  ))}
                </select>
              </label>

              <label className="drop-field">
                <span>Hours</span>
                <select value={form.hours} onChange={(event) => updateForm("hours", event.target.value)}>
                  {Array.from({ length: 24 }, (_, index) => (
                    <option key={index} value={index}>{index}</option>
                  ))}
                </select>
              </label>

              <label className="drop-field">
                <span>Max MB/file</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={form.maxFileSizeMB}
                  onChange={(event) => updateForm("maxFileSizeMB", event.target.value)}
                />
              </label>
            </div>

            <div className="drop-create-footer">
              <div>
                <span className="si-meta-label">Room window</span>
                <strong>{formatDuration(totalExpiryMinutes)}</strong>
              </div>
              <button className="si-button" type="submit" disabled={creating}>
                <FiSend /> {creating ? "Creating..." : "Create Room"}
              </button>
            </div>
          </form>

          <div className="drop-dashboard">
            <div className="si-card drop-panel-card">
              <div className="drop-section-title">
                <FiInbox />
                <div>
                  <h2>Your Rooms</h2>
                  <p>{loadingRooms ? "Loading rooms..." : `${rooms.length} rooms`}</p>
                </div>
              </div>

              {rooms.length === 0 ? (
                <div className="drop-empty-state">
                  <FiFolder />
                  <strong>No rooms yet</strong>
                  <span>Create your first room to start collecting documents.</span>
                </div>
              ) : (
                <div className="drop-room-list">
                  {rooms.map((room) => (
                    <button
                      key={room._id}
                      className={`drop-room-item ${selectedRoomId === room._id ? "active" : ""}`}
                      type="button"
                      onClick={() => setSelectedRoomId(room._id)}
                    >
                      <span>
                        <strong>{room.title}</strong>
                        <small>{room.code} | {formatDate(room.expiresAt)}</small>
                      </span>
                      <span className={`drop-status ${room.status}`}>{room.status}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedRoom && (
              <div className="si-card drop-panel-card">
                <div className="drop-room-toolbar">
                  <div>
                    <span className="si-meta-label">Selected room</span>
                    <h2>{selectedRoom.title}</h2>
                  </div>
                  <span className={`drop-status ${selectedRoom.status}`}>{selectedRoom.status}</span>
                </div>

                <div className="drop-room-code-box">
                  <div>
                    <span className="si-meta-label">Room Code</span>
                    <strong>{selectedRoom.code}</strong>
                  </div>
                  <button className="si-button-secondary" type="button" onClick={() => copyRoomCode(selectedRoom)}>
                    <FiCopy /> Code
                  </button>
                  <button className="si-button-secondary" type="button" onClick={() => copyRoomLink(selectedRoom)}>
                    <FiExternalLink /> Link
                  </button>
                </div>

                <div className="drop-stats-grid">
                  <div>
                    <span className="si-meta-label"><FiClock /> Deadline</span>
                    <strong>{formatDate(selectedRoom.expiresAt)}</strong>
                  </div>
                  <div>
                    <span className="si-meta-label"><FiFileText /> Documents</span>
                    <strong>{selectedRoom.requiredFiles.length}</strong>
                  </div>
                  <div>
                    <span className="si-meta-label"><FiInbox /> Submissions</span>
                    <strong>{selectedRoom.submissionsCount}</strong>
                  </div>
                </div>

                <div className="drop-document-chips">
                  {selectedRoom.requiredFiles.map((file) => (
                    <span key={file.label}>{file.label}</span>
                  ))}
                </div>

                <div className="drop-actions-row">
                  <button className="si-button-secondary" type="button" onClick={() => fetchRoomDetails(selectedRoom._id)}>
                    <FiRefreshCw /> Refresh
                  </button>
                  {selectedRoom.status === "open" && (
                    <button className="si-button-secondary danger" type="button" onClick={() => closeRoom(selectedRoom._id)}>
                      <FiX /> Close Room
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="si-card drop-panel-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div className="drop-section-title" style={{ margin: 0 }}>
                  <FiFileText />
                  <div>
                    <h2>Submissions</h2>
                    <p>{loadingDetails ? "Loading..." : `${roomDetails?.submissions?.length || 0} received`}</p>
                  </div>
                </div>
                
                {roomDetails?.submissions?.length > 0 && (
                  <button 
                    className="si-button" 
                    type="button" 
                    onClick={downloadAllFiles}
                    disabled={downloadingAll}
                  >
                    <FiDownload /> {downloadingAll ? "Zipping..." : "Download All (ZIP)"}
                  </button>
                )}
              </div>

              {!roomDetails?.submissions?.length ? (
                <div className="drop-empty-state">
                  <FiInbox />
                  <strong>No submissions</strong>
                  <span>Shared room links will appear here after upload.</span>
                </div>
              ) : (
                <div className="drop-submission-list">
                  {roomDetails.submissions.map((submission) => (
                    <div className="drop-submission-card" key={submission._id}>
                      <div className="drop-submission-head">
                        <div>
                          <h3>{submission.submitterName}</h3>
                          <p>{submission.submitterEmail || "No email"} | {formatDate(submission.submittedAt)}</p>
                        </div>
                        <span className={`drop-status ${submission.status}`}>
                          {submission.status === "complete" ? <FiCheckCircle /> : null}
                          {submission.status}
                        </span>
                      </div>

                      {submission.missingSlots?.length > 0 && (
                        <div className="drop-missing-row">
                          Missing: {submission.missingSlots.join(", ")}
                        </div>
                      )}

                      <div className="drop-submission-files">
                        {submission.files.map((file, fileIndex) => (
                          <div className="drop-file-row" key={`${submission._id}-${fileIndex}`}>
                            <div>
                              <strong>{file.slotLabel}</strong>
                              <span>{file.originalName} | {formatFileSize(file.size || 0)}</span>
                            </div>
                            <button
                              className="si-button-secondary"
                              type="button"
                              onClick={() => downloadSubmissionFile(submission, fileIndex)}
                              disabled={downloadingFileId === `${submission._id}-${fileIndex}`}
                            >
                              <FiDownload />
                              {downloadingFileId === `${submission._id}-${fileIndex}` ? "Downloading..." : "Download"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DropRooms;
