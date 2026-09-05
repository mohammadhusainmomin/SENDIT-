import fs from "fs";
import crypto from "crypto";
import { ZipArchive } from "archiver";
import DropRoom from "../models/DropRoom.js";
import DropSubmission from "../models/DropSubmission.js";
import { encryptFile, decryptFile } from "../utils/encryption.utils.js";

const ROOM_CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const DROP_ROOM_DEFAULT_EXPIRY_MINUTES = 24 * 60;
const DROP_ROOM_MAX_EXPIRY_MINUTES = 7 * 24 * 60;

const normalizeRoomCode = (code = "") => String(code).trim().toUpperCase();

const removeUploadedFiles = (files = []) => {
  files.forEach((file) => {
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlink(file.path, (err) => {
        if (err) console.error("DROP ROOM TEMP DELETE ERROR:", err);
      });
    }
  });
};

const parseRequiredFiles = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((label) => ({ label, required: true }));
  }
};

const normalizeRequiredFiles = (rawFiles) => {
  const seen = new Set();

  return parseRequiredFiles(rawFiles)
    .map((item) => {
      const label =
        typeof item === "string" ? item.trim() : String(item?.label || "").trim();

      return {
        label,
        required: typeof item?.required === "boolean" ? item.required : true,
      };
    })
    .filter((item) => item.label)
    .filter((item) => {
      const key = item.label.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
};

const parseLabels = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((item) => String(item));
  } catch (error) {
    return [value];
  }

  return [value];
};

const getRoomStatus = (room) => {
  if (room.isClosed) return "closed";
  if (new Date(room.expiresAt).getTime() <= Date.now()) return "expired";
  return "open";
};

const resolveDropRoomExpiryWindow = (rawValue) => {
  const rawMinutes =
    rawValue === undefined || rawValue === null || rawValue === ""
      ? DROP_ROOM_DEFAULT_EXPIRY_MINUTES
      : Number.parseInt(String(rawValue), 10);

  if (!Number.isInteger(rawMinutes) || rawMinutes <= 0) {
    return { error: "Please provide a valid expiration time" };
  }

  if (rawMinutes > DROP_ROOM_MAX_EXPIRY_MINUTES) {
    return { error: "Maximum drop room expiration time is 7 days" };
  }

  return {
    expiresIn: rawMinutes,
    expiresAt: new Date(Date.now() + rawMinutes * 60 * 1000),
  };
};

const generateRoomCode = async (maxAttempts = 20) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const code = Array.from({ length: 6 }, () =>
      ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)]
    ).join("");

    const exists = await DropRoom.findOne({ code });
    if (!exists) return code;
  }

  throw new Error("Failed to generate a unique room code");
};

const buildRoomPayload = (room, submissionsCount = 0) => ({
  _id: room._id,
  code: room.code,
  title: room.title,
  description: room.description,
  instructions: room.instructions,
  requiredFiles: room.requiredFiles,
  maxFileSizeMB: room.maxFileSizeMB,
  expiresAt: room.expiresAt,
  expiresIn: room.expiresIn,
  organizerName: room.organizerName,
  organizerEmail: room.organizerEmail,
  isClosed: room.isClosed,
  status: getRoomStatus(room),
  submissionsCount,
  createdAt: room.createdAt,
});

export const createDropRoom = async (req, res) => {
  try {
    const { title, description = "", instructions = "", expiresIn, maxFileSizeMB } = req.body;
    const requiredFiles = normalizeRequiredFiles(req.body.requiredFiles);

    if (!title?.trim()) {
      return res.status(400).json({ message: "Room title is required" });
    }

    if (requiredFiles.length === 0) {
      return res.status(400).json({ message: "Add at least one required document" });
    }

    const {
      expiresIn: expirationTime,
      expiresAt,
      error: expiryError,
    } = resolveDropRoomExpiryWindow(expiresIn);

    if (expiryError) {
      return res.status(400).json({ message: expiryError });
    }

    const resolvedMaxFileSize = Number.parseInt(String(maxFileSizeMB || 10), 10);
    if (!Number.isInteger(resolvedMaxFileSize) || resolvedMaxFileSize < 1 || resolvedMaxFileSize > 100) {
      return res.status(400).json({ message: "Max file size must be between 1 MB and 100 MB" });
    }

    const room = await DropRoom.create({
      code: await generateRoomCode(),
      title: title.trim(),
      description: description.trim(),
      instructions: instructions.trim(),
      requiredFiles,
      maxFileSizeMB: resolvedMaxFileSize,
      expiresIn: expirationTime,
      expiresAt,
      organizerId: req.user._id,
      organizerName: req.user.name,
      organizerEmail: req.user.email,
    });

    res.status(201).json({
      success: true,
      room: buildRoomPayload(room),
    });
  } catch (error) {
    console.error("CREATE DROP ROOM ERROR:", error);
    res.status(500).json({ message: "Failed to create drop room" });
  }
};

export const getMyDropRooms = async (req, res) => {
  try {
    const rooms = await DropRoom.find({ organizerId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    const counts = await DropSubmission.aggregate([
      {
        $match: {
          roomId: { $in: rooms.map((room) => room._id) },
          isDeleted: { $ne: true },
        },
      },
      { $group: { _id: "$roomId", count: { $sum: 1 } } },
    ]);

    const countMap = new Map(counts.map((item) => [String(item._id), item.count]));

    res.json({
      success: true,
      rooms: rooms.map((room) => buildRoomPayload(room, countMap.get(String(room._id)) || 0)),
    });
  } catch (error) {
    console.error("GET DROP ROOMS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch drop rooms" });
  }
};

export const getPublicDropRoom = async (req, res) => {
  try {
    const code = normalizeRoomCode(req.params.code);
    const room = await DropRoom.findOne({ code }).lean();

    if (!room) {
      return res.status(404).json({ message: "Drop room not found" });
    }

    const status = getRoomStatus(room);
    if (status !== "open") {
      return res.status(410).json({ message: `This drop room is ${status}` });
    }

    res.json({
      success: true,
      room: buildRoomPayload(room),
    });
  } catch (error) {
    console.error("LOOKUP DROP ROOM ERROR:", error);
    res.status(500).json({ message: "Failed to load drop room" });
  }
};

export const getDropRoomDetails = async (req, res) => {
  try {
    const room = await DropRoom.findOne({
      _id: req.params.roomId,
      organizerId: req.user._id,
    }).lean();

    if (!room) {
      return res.status(404).json({ message: "Drop room not found" });
    }

    const submissions = await DropSubmission.find({
      roomId: room._id,
      isDeleted: { $ne: true },
    })
      .sort({ submittedAt: -1 })
      .select("-files.encryptedPath")
      .lean();

    res.json({
      success: true,
      room: buildRoomPayload(room, submissions.length),
      submissions,
    });
  } catch (error) {
    console.error("GET DROP ROOM DETAILS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch room details" });
  }
};

export const submitToDropRoom = async (req, res) => {
  const uploadedFiles = req.files || [];
  const encryptedPaths = [];

  try {
    const code = normalizeRoomCode(req.params.code);
    const { submitterName, submitterEmail = "" } = req.body;
    const fileLabels = parseLabels(req.body.fileLabels);

    if (!submitterName?.trim()) {
      removeUploadedFiles(uploadedFiles);
      return res.status(400).json({ message: "Submitter name is required" });
    }

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ message: "Please upload at least one document" });
    }

    const room = await DropRoom.findOne({ code });
    if (!room) {
      removeUploadedFiles(uploadedFiles);
      return res.status(404).json({ message: "Drop room not found" });
    }

    const status = getRoomStatus(room);
    if (status !== "open") {
      removeUploadedFiles(uploadedFiles);
      return res.status(410).json({ message: `This drop room is ${status}` });
    }

    const maxBytes = room.maxFileSizeMB * 1024 * 1024;
    const tooLargeFile = uploadedFiles.find((file) => file.size > maxBytes);
    if (tooLargeFile) {
      removeUploadedFiles(uploadedFiles);
      return res.status(400).json({
        message: `${tooLargeFile.originalname} is larger than ${room.maxFileSizeMB} MB`,
      });
    }

    const allowedLabels = new Set(room.requiredFiles.map((item) => item.label));
    const requiredLabels = room.requiredFiles
      .filter((item) => item.required)
      .map((item) => item.label);

    const fileObjects = [];
    const submittedLabels = new Set();

    for (const [index, file] of uploadedFiles.entries()) {
      const rawLabel = fileLabels[index] || room.requiredFiles[index]?.label || "Document";
      const slotLabel = allowedLabels.has(rawLabel) ? rawLabel : "Extra Document";
      const encryptedPath = `uploads/drop-encrypted-${Date.now()}-${crypto.randomUUID()}`;

      await encryptFile(file.path, encryptedPath);
      encryptedPaths.push(encryptedPath);
      fs.unlink(file.path, (err) => {
        if (err) console.error("DROP ROOM ORIGINAL DELETE ERROR:", err);
      });

      submittedLabels.add(slotLabel);
      fileObjects.push({
        slotLabel,
        encryptedPath,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      });
    }

    const missingSlots = requiredLabels.filter((label) => !submittedLabels.has(label));
    const submission = await DropSubmission.create({
      roomId: room._id,
      roomCode: room.code,
      submitterName: submitterName.trim(),
      submitterEmail: submitterEmail.trim(),
      files: fileObjects,
      missingSlots,
      status: missingSlots.length === 0 ? "complete" : "partial",
    });

    res.status(201).json({
      success: true,
      submissionId: submission._id,
      status: submission.status,
      missingSlots,
      filesCount: fileObjects.length,
    });
  } catch (error) {
    removeUploadedFiles(uploadedFiles);
    encryptedPaths.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error("DROP ROOM ENCRYPTED DELETE ERROR:", err);
        });
      }
    });
    console.error("SUBMIT DROP ROOM ERROR:", error);
    res.status(500).json({ message: "Failed to submit documents" });
  }
};

export const downloadSubmissionFile = async (req, res) => {
  try {
    const { roomId, submissionId, fileIndex } = req.params;

    const room = await DropRoom.findOne({
      _id: roomId,
      organizerId: req.user._id,
    });

    if (!room) {
      return res.status(404).json({ message: "Drop room not found" });
    }

    const submission = await DropSubmission.findOne({
      _id: submissionId,
      roomId: room._id,
      isDeleted: { $ne: true },
    });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const file = submission.files[Number.parseInt(fileIndex, 10)];
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const decryptedPath = `uploads/drop-tmp-${Date.now()}-${crypto.randomUUID()}`;

    if (!file.encryptedPath || !fs.existsSync(file.encryptedPath)) {
      return res.status(410).json({ message: "File is no longer available on the server" });
    }

    await decryptFile(file.encryptedPath, decryptedPath);

    const safeSubmitter = submission.submitterName.replace(/[^\w.-]+/g, "_");
    const safeSlot = file.slotLabel.replace(/[^\w.-]+/g, "_");
    const downloadName = `${safeSubmitter}_${safeSlot}_${file.originalName}`;

    res.setHeader("X-Filename", encodeURIComponent(downloadName));
    res.type(file.mimeType);
    res.download(decryptedPath, downloadName, (err) => {
      if (err) {
        console.error("DROP ROOM DOWNLOAD ERROR:", err);
        if (!res.headersSent) {
          res.status(500).json({ message: "Download failed" });
        }
      }

      fs.unlink(decryptedPath, (unlinkError) => {
        if (unlinkError) console.error("DROP ROOM TEMP DOWNLOAD DELETE ERROR:", unlinkError);
      });
    });
  } catch (error) {
    console.error("DOWNLOAD DROP ROOM FILE ERROR:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to download file" });
    }
  }
};

export const downloadAllDropRoomFiles = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await DropRoom.findOne({
      _id: roomId,
      organizerId: req.user._id,
    });

    if (!room) {
      return res.status(404).json({ message: "Drop room not found" });
    }

    const submissions = await DropSubmission.find({
      roomId: room._id,
      isDeleted: { $ne: true },
    });

    if (submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found to download" });
    }

    const safeRoomTitle = room.title.replace(/[^\w.-]+/g, "_");
    const zipFilename = `DropRoom_${safeRoomTitle}_Submissions.zip`;

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${zipFilename}"`);
    res.setHeader("X-Filename", encodeURIComponent(zipFilename));

    const archive = new ZipArchive({
      zlib: { level: 9 },
    });

    archive.on("error", (err) => {
      console.error("ARCHIVER ERROR:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Failed to create zip file" });
      }
    });

    archive.pipe(res);

    const decryptedPathsToCleanup = [];

    for (const submission of submissions) {
      const safeSubmitter = submission.submitterName.replace(/[^\w.-]+/g, "_");

      for (const file of submission.files) {
        if (!fs.existsSync(file.encryptedPath)) {
          console.warn("Skipping missing encrypted file:", file.encryptedPath);
          continue;
        }

        let decryptedPath;
        try {
          decryptedPath = `uploads/drop-tmp-${Date.now()}-${crypto.randomUUID()}`;
          await decryptFile(file.encryptedPath, decryptedPath);
        } catch (decryptErr) {
          console.error("Failed to decrypt file, skipping:", file.encryptedPath, decryptErr);
          continue;
        }

        decryptedPathsToCleanup.push(decryptedPath);

        const safeSlot = file.slotLabel.replace(/[^\w.-]+/g, "_");
        const fileName = `${safeSlot}_${file.originalName}`;

        // Use a ReadStream with an explicit error handler so a missing/corrupt
        // decrypted file doesn't emit an unhandled 'error' event that crashes
        // the server process.
        const readStream = fs.createReadStream(decryptedPath);
        readStream.on("error", (streamErr) => {
          console.error("ReadStream error for file, skipping entry:", decryptedPath, streamErr);
        });

        archive.append(readStream, { name: `Submissions/${safeSubmitter}/${fileName}` });
      }
    }

    await archive.finalize();

    res.on("finish", () => {
      decryptedPathsToCleanup.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) console.error("DROP ROOM TEMP DOWNLOAD DELETE ERROR:", err);
          });
        }
      });
    });

  } catch (error) {
    console.error("DOWNLOAD ALL DROP ROOM FILES ERROR:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to download all files" });
    }
  }
};

export const closeDropRoom = async (req, res) => {
  try {
    const room = await DropRoom.findOneAndUpdate(
      {
        _id: req.params.roomId,
        organizerId: req.user._id,
      },
      {
        isClosed: true,
        closedAt: new Date(),
      },
      { new: true },
    );

    if (!room) {
      return res.status(404).json({ message: "Drop room not found" });
    }

    res.json({
      success: true,
      room: buildRoomPayload(room),
    });
  } catch (error) {
    console.error("CLOSE DROP ROOM ERROR:", error);
    res.status(500).json({ message: "Failed to close drop room" });
  }
};
