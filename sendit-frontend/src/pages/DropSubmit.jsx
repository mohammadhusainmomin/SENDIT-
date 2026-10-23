import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiCheckCircle, FiFile, FiInbox, FiSearch, FiSend, FiUploadCloud } from "react-icons/fi";
import SEO from "../components/SEO";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatFileSize } from "../utils/formatFileSize";
import "../styles/DropRooms.css";

const DOCUMENT_MIME_TYPES = new Set([
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getFileAccept(fileType) {
  if (fileType === "image") return "image/*";
  if (fileType === "pdf") return ".pdf,application/pdf";
  if (fileType === "document") {
    return ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/csv";
  }
  return undefined;
}

function fileMatchesType(file, fileType) {
  if (!fileType || fileType === "any") return true;
  if (fileType === "image") return file.type.startsWith("image/");
  if (fileType === "pdf") return file.type === "application/pdf";
  if (fileType === "document") {
    return DOCUMENT_MIME_TYPES.has(file.type) || file.type === "application/pdf";
  }
  return false;
}

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
  const { user } = useAuth();
  const { success, error } = useToast();
  const [roomCode, setRoomCode] = useState(codeParam || "");
  const [room, setRoom] = useState(null);
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [existingSubmission, setExistingSubmission] = useState(null);
  const [checkingSubmission, setCheckingSubmission] = useState(false);
  const [submissionLookupError, setSubmissionLookupError] = useState("");
  const [filesByLabel, setFilesByLabel] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [lookupLoading, setLookupLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const normalizedSubmitterEmail = submitterEmail.trim().toLowerCase();
  const accountEmail = user?.email?.trim().toLowerCase() || "";
  const activeRoomCode = room?.code;

  useEffect(() => {
    if (accountEmail) {
      setSubmitterEmail(accountEmail);
      setExistingSubmission(null);
      setSubmissionLookupError("");
    }
  }, [accountEmail]);

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
      setFileErrors({});
      setExistingSubmission(null);
      setSubmissionLookupError("");
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

  useEffect(() => {
    if (!activeRoomCode || !EMAIL_PATTERN.test(normalizedSubmitterEmail)) {
      setCheckingSubmission(false);
      setExistingSubmission(null);
      setSubmissionLookupError("");
      return undefined;
    }

    let active = true;
    setCheckingSubmission(true);
    setExistingSubmission(null);
    setSubmissionLookupError("");
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await api.post(
          `/drop-rooms/public/${activeRoomCode}/submissions/status`,
          { submitterEmail: normalizedSubmitterEmail },
        );
        if (active && response.data.alreadySubmitted) {
          setExistingSubmission({
            alreadySubmitted: true,
            ...(response.data.submission || {}),
          });
        }
      } catch (err) {
        if (active) {
          setSubmissionLookupError(
            err.response?.data?.message || "Could not check previous submissions. You can still submit safely.",
          );
        }
      } finally {
        if (active) setCheckingSubmission(false);
      }
    }, 350);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [activeRoomCode, normalizedSubmitterEmail]);

  const setFileForLabel = (item, event) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    const sizeLimit = Number(item.maxFileSizeMB) * 1024 * 1024;
    const validationError = file.size > sizeLimit
      ? `${item.label} must be ${item.maxFileSizeMB} MB or smaller`
      : !fileMatchesType(file, item.fileType)
        ? `${item.label} must be a ${item.fileType === "image" ? "image" : item.fileType === "pdf" ? "PDF" : "supported document"}`
        : "";

    setFilesByLabel((prev) => ({
      ...prev,
      [item.label]: validationError ? null : file,
    }));
    setFileErrors((prev) => ({ ...prev, [item.label]: validationError }));
    if (validationError) event.target.value = "";
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

    if (!EMAIL_PATTERN.test(normalizedSubmitterEmail)) {
      error("Enter a valid email address");
      return;
    }

    if (existingSubmission?.alreadySubmitted) {
      error("This email has already submitted documents to this room");
      return;
    }

    if (checkingSubmission) {
      error("Please wait while we check previous submissions");
      return;
    }

    const invalidFile = room.requiredFiles.find((item) => {
      const file = filesByLabel[item.label];
      return file && (file.size > Number(item.maxFileSizeMB) * 1024 * 1024 || !fileMatchesType(file, item.fileType));
    });
    if (invalidFile) {
      error(fileErrors[invalidFile.label] || `Check the selected file for ${invalidFile.label}`);
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
      setExistingSubmission({
        alreadySubmitted: true,
        status: response.data.status,
        submittedAt: response.data.submittedAt,
        uploadedSlots: response.data.uploadedSlots || [],
      });
      success("Documents submitted");
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.alreadySubmitted) {
        setExistingSubmission({
          alreadySubmitted: true,
          ...(err.response.data.submission || {}),
        });
      } else {
        error(err.response?.data?.message || "Submission failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <SEO
        title="Submit Documents - SendIt Drop Room"
        description="Submit documents to a SendIt Drop Room."
        url="https://senditsystem.in/drop"
        robots="noindex, follow"
      />

      <section className="page-section">
        <div className="drop-submit-hero">
          <div>
            <span className="si-chip">Secure document collection</span>
            <h1 className="si-title">Submit to a Drop Room</h1>
            <p className="si-subtitle">
              Enter your room code, complete the checklist and send your documents securely.
            </p>
          </div>
        </div>

        <div className="drop-submit-layout">
          <div className="si-card drop-panel-card">
            <div className="drop-section-title">
              <span className="drop-section-icon"><FiSearch /></span>
              <div>
                <h2>Find Room</h2>
                <p>Enter the 6-character code from your organizer.</p>
              </div>
            </div>

            <div className="drop-code-lookup">
              <input
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
                placeholder="ABCD23"
                maxLength={6}
                aria-label="Room code"
              />
              <button className="si-button drop-find-button" type="button" onClick={() => lookupRoom(roomCode)} disabled={lookupLoading}>
                <FiSearch /> {lookupLoading ? "Finding..." : "Find Room"}
              </button>
            </div>

            {room ? (
              <div className="drop-room-summary">
                <div className="drop-room-toolbar drop-public-room-heading">
                  <div>
                    <span className="si-meta-label">You’re submitting to</span>
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
                    <span className="si-meta-label">Largest file limit</span>
                    <strong>{Math.max(...room.requiredFiles.map((item) => item.maxFileSizeMB))} MB</strong>
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
            <div className="drop-submit-card-heading">
              <div className="drop-section-title">
                <span className="drop-section-icon"><FiUploadCloud /></span>
                <div>
                  <h2>Upload Documents</h2>
                  <p>{room ? `${room.requiredFiles.length} document slots` : "Find a room to see its checklist"}</p>
                </div>
              </div>
              {room && !receipt && !existingSubmission?.alreadySubmitted && (
                <span className="drop-private-note"><FiCheckCircle /> Private upload</span>
              )}
            </div>

            {receipt ? (
              <div className="drop-receipt">
                <FiCheckCircle />
                <h2>Submission received</h2>
                <p>Status: {receipt.status}. This email can submit only once to this room.</p>
                <div className="drop-uploaded-slots" aria-label="Uploaded documents">
                  {(receipt.uploadedSlots || []).map((label) => (
                    <span className="drop-uploaded-slot" key={label}>
                      <FiCheckCircle /> {label} <strong>Uploaded</strong>
                    </span>
                  ))}
                </div>
              </div>
            ) : existingSubmission?.alreadySubmitted ? (
              <div className="drop-previous-submission">
                <div className="drop-previous-submission-message" role="status">
                  <FiCheckCircle />
                  <div>
                    <strong>Already submitted with this email</strong>
                    <span>
                      This email can submit only once to this room.
                      {existingSubmission.submittedAt
                        ? ` Submitted ${formatDate(existingSubmission.submittedAt)}.`
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="drop-uploaded-slots" aria-label="Previously uploaded documents">
                  {(room?.requiredFiles || []).map((item) => {
                    const uploaded = existingSubmission.uploadedSlots?.includes(item.label);
                    return (
                      <span className={`drop-uploaded-slot ${uploaded ? "uploaded" : "not-uploaded"}`} key={item.label}>
                        {uploaded ? <FiCheckCircle /> : <FiFile />}
                        {item.label}
                        <strong>{uploaded ? "Uploaded" : "Not included"}</strong>
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                <div className="drop-form-grid two">
                  <label className="drop-field">
                    <span>Your name <span className="drop-required-mark">*</span></span>
                    <input
                      value={submitterName}
                      onChange={(event) => setSubmitterName(event.target.value)}
                      placeholder="Full name"
                      disabled={!room || submitting}
                      maxLength={80}
                      required
                    />
                  </label>
                  <label className="drop-field">
                    <span>Email <span className="drop-required-mark">*</span></span>
                    <input
                      type="email"
                      value={submitterEmail}
                      onChange={(event) => {
                        setSubmitterEmail(event.target.value);
                        setExistingSubmission(null);
                        setSubmissionLookupError("");
                      }}
                      placeholder="you@example.com"
                      disabled={!room || submitting}
                      readOnly={Boolean(accountEmail)}
                      maxLength={120}
                      required
                    />
                    <small className="drop-email-hint">
                      {accountEmail
                        ? "Using the email on your signed-in SendIt account."
                        : "We use your email to show your previous upload and prevent duplicate submissions."}
                    </small>
                  </label>
                </div>

                {checkingSubmission && (
                  <p className="drop-submission-checking" role="status">
                    Checking whether this email has already submitted...
                  </p>
                )}
                {submissionLookupError && (
                  <p className="drop-submission-check-error" role="alert">{submissionLookupError}</p>
                )}

                <div className="drop-upload-slots">
                  {(room?.requiredFiles || []).map((item) => {
                    const selectedFile = filesByLabel[item.label];

                    return (
                      <label className="drop-upload-slot" key={item.label}>
                        <span className="drop-upload-slot-copy">
                          <strong>
                            <span className="drop-upload-file-icon"><FiFile /></span>
                            {item.label}
                            <span className={`drop-slot-requirement ${item.required ? "required" : "optional"}`}>
                              {item.required ? "Required" : "Optional"}
                            </span>
                          </strong>
                          <small>
                            {selectedFile
                              ? `${selectedFile.name} | ${formatFileSize(selectedFile.size)}`
                              : `${item.fileType === "any" ? "Any file" : item.fileType === "image" ? "Image" : item.fileType.toUpperCase()} | Max ${item.maxFileSizeMB} MB`}
                          </small>
                        </span>
                        <input
                          type="file"
                          disabled={submitting}
                          accept={getFileAccept(item.fileType)}
                          required={item.required}
                          aria-label={`Upload ${item.label}`}
                          aria-invalid={Boolean(fileErrors[item.label])}
                          onChange={(event) => setFileForLabel(item, event)}
                        />
                        {fileErrors[item.label] && (
                          <span className="drop-field-error">{fileErrors[item.label]}</span>
                        )}
                      </label>
                    );
                  })}
                </div>

                <button
                  className="si-button drop-submit-button"
                  type="submit"
                  disabled={!room || submitting || checkingSubmission}
                >
                  <FiSend /> {submitting ? "Submitting..." : checkingSubmission ? "Checking..." : "Submit Documents"}
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
