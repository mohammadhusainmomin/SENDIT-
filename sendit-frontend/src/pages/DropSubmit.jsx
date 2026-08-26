import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiCheckCircle, FiFile, FiInbox, FiSearch, FiSend, FiUploadCloud } from "react-icons/fi";
import SEO from "../components/SEO";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import { formatFileSize } from "../utils/formatFileSize";
import "../styles/DropRooms.css";

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

function DropSubmit() {
  const { code: codeParam } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [roomCode, setRoomCode] = useState(codeParam || "");
  const [room, setRoom] = useState(null);
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [filesByLabel, setFilesByLabel] = useState({});
  const [lookupLoading, setLookupLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const lookupRoom = useCallback(async (codeToLookup) => {
    const normalizedCode = codeToLookup.trim().toUpperCase();
    if (!normalizedCode) {
      error("Enter a room code");
      return;
    }

    try {
      setLookupLoading(true);
      const response = await api.get(`/drop-rooms/public/${normalizedCode}`);
      setRoom(response.data.room);
      setFilesByLabel({});
      setReceipt(null);
      setRoomCode(normalizedCode);

      if (codeParam !== normalizedCode) {
        navigate(`/drop/${normalizedCode}`, { replace: true });
      }
    } catch (err) {
      setRoom(null);
      error(err.response?.data?.message || "Drop room not found");
    } finally {
      setLookupLoading(false);
    }
  }, [codeParam, error, navigate]);

  useEffect(() => {
    if (codeParam) {
      lookupRoom(codeParam);
    }
  }, [codeParam, lookupRoom]);

  const setFileForLabel = (label, file) => {
    setFilesByLabel((prev) => ({
      ...prev,
      [label]: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!room) {
      error("Load a drop room first");
      return;
    }

    if (!submitterName.trim()) {
      error("Name is required");
      return;
    }

    const missingRequired = room.requiredFiles
      .filter((item) => item.required && !filesByLabel[item.label])
      .map((item) => item.label);

    if (missingRequired.length > 0) {
      error(`Missing: ${missingRequired.join(", ")}`);
      return;
    }

    const formData = new FormData();
    formData.append("submitterName", submitterName);
    formData.append("submitterEmail", submitterEmail);

    room.requiredFiles.forEach((item) => {
      const file = filesByLabel[item.label];
      if (file) {
        formData.append("documents", file);
        formData.append("fileLabels", item.label);
      }
    });

    try {
      setSubmitting(true);
      const response = await api.post(`/drop-rooms/public/${room.code}/submissions`, formData);
      setReceipt(response.data);
      success("Documents submitted");
    } catch (err) {
      error(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const resetSubmission = () => {
    setSubmitterName("");
    setSubmitterEmail("");
    setFilesByLabel({});
    setReceipt(null);
  };

  return (
    <div className="page-shell">
      <SEO
        title="Submit Documents - SendIt Drop Room"
        description="Submit documents to a SendIt Drop Room."
        url="https://senditsystem.in/drop"
      />

      <section className="page-section">
        <div className="drop-submit-hero">
          <span className="si-chip">Document Drop</span>
          <h1 className="si-title">Submit to a Drop Room</h1>
          <p className="si-subtitle">
            Enter the room code shared by the organizer and upload the requested files.
          </p>
        </div>

        <div className="drop-submit-layout">
          <div className="si-card drop-panel-card">
            <div className="drop-section-title">
              <FiSearch />
              <div>
                <h2>Find Room</h2>
                <p>Room codes use six characters.</p>
              </div>
            </div>

            <div className="drop-code-lookup">
              <input
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
                placeholder="ABCD23"
                maxLength={6}
              />
              <button className="si-button" type="button" onClick={() => lookupRoom(roomCode)} disabled={lookupLoading}>
                <FiSearch /> {lookupLoading ? "Finding..." : "Find Room"}
              </button>
            </div>

            {room ? (
              <div className="drop-room-summary">
                <div className="drop-room-toolbar">
                  <div>
                    <span className="si-meta-label">Room</span>
                    <h2>{room.title}</h2>
                  </div>
                  <span className={`drop-status ${room.status}`}>{room.status}</span>
                </div>
                {room.description && <p>{room.description}</p>}
                {room.instructions && <div className="drop-instructions">{room.instructions}</div>}
                <div className="drop-stats-grid">
                  <div>
                    <span className="si-meta-label">Deadline</span>
                    <strong>{formatDate(room.expiresAt)}</strong>
                  </div>
                  <div>
                    <span className="si-meta-label">Max file</span>
                    <strong>{room.maxFileSizeMB} MB</strong>
                  </div>
                  <div>
                    <span className="si-meta-label">Documents</span>
                    <strong>{room.requiredFiles.length}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="drop-empty-state">
                <FiInbox />
                <strong>No room loaded</strong>
                <span>Paste a room code to begin.</span>
              </div>
            )}
          </div>

          <form className="si-card drop-panel-card drop-submit-card" onSubmit={handleSubmit}>
            <div className="drop-section-title">
              <FiUploadCloud />
              <div>
                <h2>Upload Documents</h2>
                <p>{room ? `${room.requiredFiles.length} required slots` : "Load a room first"}</p>
              </div>
            </div>

            {receipt ? (
              <div className="drop-receipt">
                <FiCheckCircle />
                <h2>Submission received</h2>
                <p>Receipt ID: {receipt.submissionId}</p>
                <p>Status: {receipt.status}</p>
                <button className="si-button-secondary" type="button" onClick={resetSubmission}>
                  Submit another
                </button>
              </div>
            ) : (
              <>
                <div className="drop-form-grid two">
                  <label className="drop-field">
                    <span>Your name</span>
                    <input
                      value={submitterName}
                      onChange={(event) => setSubmitterName(event.target.value)}
                      placeholder="Full name"
                      disabled={!room || submitting}
                      maxLength={80}
                    />
                  </label>
                  <label className="drop-field">
                    <span>Email</span>
                    <input
                      type="email"
                      value={submitterEmail}
                      onChange={(event) => setSubmitterEmail(event.target.value)}
                      placeholder="you@example.com"
                      disabled={!room || submitting}
                      maxLength={120}
                    />
                  </label>
                </div>

                <div className="drop-upload-slots">
                  {(room?.requiredFiles || []).map((item) => {
                    const selectedFile = filesByLabel[item.label];

                    return (
                      <label className="drop-upload-slot" key={item.label}>
                        <span className="drop-upload-slot-copy">
                          <strong><FiFile /> {item.label}</strong>
                          <small>
                            {selectedFile
                              ? `${selectedFile.name} | ${formatFileSize(selectedFile.size)}`
                              : "Choose file"}
                          </small>
                        </span>
                        <input
                          type="file"
                          disabled={submitting}
                          onChange={(event) => setFileForLabel(item.label, event.target.files?.[0] || null)}
                        />
                      </label>
                    );
                  })}
                </div>

                <button className="si-button drop-submit-button" type="submit" disabled={!room || submitting}>
                  <FiSend /> {submitting ? "Submitting..." : "Submit Documents"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default DropSubmit;
