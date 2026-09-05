import crypto from "crypto";
import fs from "fs";

const LEGACY_ALGORITHM = "aes-256-cbc";
const AUTHENTICATED_ALGORITHM = "aes-256-gcm";
const FILE_MAGIC = Buffer.from("SITF1");
const GCM_NONCE_BYTES = 12;
const GCM_TAG_BYTES = 16;

const getSecretKey = (name) => {
  if (!process.env[name]) {
    throw new Error(`${name} is missing in environment variables`);
  }

  return crypto.createHash("sha256").update(String(process.env[name])).digest();
};

const getFileSecretKey = () => getSecretKey("FILE_SECRET");
const getCodeSecretKey = () => getSecretKey("CODE_SECRET");

const resolveEncryptedPath = (inputPath) => {
  const normalizedPath = String(inputPath || "").trim();
  const candidates = [
    normalizedPath,
    normalizedPath.replace(/^['"]+|['",\s]+$/g, ""),
    normalizedPath.replace(/[",\s]+$/g, ""),
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate)) || normalizedPath;
};

const rejectIfMissing = (filePath, label) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} not found: ${filePath}`);
  }
};

// New files use a magic header, random GCM nonce, ciphertext, and auth tag.
export const encryptFile = (inputPath, outputPath) => new Promise((resolve, reject) => {
  try {
    rejectIfMissing(inputPath, "Source file");
    const nonce = crypto.randomBytes(GCM_NONCE_BYTES);
    const cipher = crypto.createCipheriv(
      AUTHENTICATED_ALGORITHM,
      getFileSecretKey(),
      nonce,
    );
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
    let settled = false;
    const fail = (error) => {
      if (!settled) {
        settled = true;
        output.destroy();
        reject(error);
      }
    };

    input.on("error", fail);
    cipher.on("error", fail);
    output.on("error", fail);
    output.write(Buffer.concat([FILE_MAGIC, nonce]));
    input.pipe(cipher);
    cipher.on("data", (chunk) => output.write(chunk));
    cipher.on("end", () => {
      if (settled) return;
      output.write(cipher.getAuthTag());
      output.end(() => {
        settled = true;
        resolve();
      });
    });
  } catch (error) {
    reject(error);
  }
});

const decryptLegacyFile = (inputPath, outputPath) => new Promise((resolve, reject) => {
  try {
    const fileHandle = fs.openSync(inputPath, "r");
    const iv = Buffer.alloc(16);
    const bytesRead = fs.readSync(fileHandle, iv, 0, 16, 0);
    fs.closeSync(fileHandle);
    if (bytesRead !== 16) throw new Error(`Legacy encrypted file header is invalid: ${inputPath}`);

    const decipher = crypto.createDecipheriv(LEGACY_ALGORITHM, getFileSecretKey(), iv);
    const input = fs.createReadStream(inputPath, { start: 16 });
    const output = fs.createWriteStream(outputPath);
    input.on("error", reject);
    decipher.on("error", reject);
    output.on("error", reject);
    output.on("finish", resolve);
    input.pipe(decipher).pipe(output);
  } catch (error) {
    reject(error);
  }
});

export const decryptFile = (inputPath, outputPath) => {
  const resolvedInputPath = resolveEncryptedPath(inputPath);
  rejectIfMissing(resolvedInputPath, "Encrypted file");

  const header = Buffer.alloc(FILE_MAGIC.length);
  const handle = fs.openSync(resolvedInputPath, "r");
  fs.readSync(handle, header, 0, FILE_MAGIC.length, 0);
  fs.closeSync(handle);

  if (!header.equals(FILE_MAGIC)) {
    return decryptLegacyFile(resolvedInputPath, outputPath);
  }

  return new Promise((resolve, reject) => {
    try {
      const stat = fs.statSync(resolvedInputPath);
      const encryptedStart = FILE_MAGIC.length + GCM_NONCE_BYTES;
      const encryptedEnd = stat.size - GCM_TAG_BYTES - 1;
      if (stat.size <= encryptedStart + GCM_TAG_BYTES) {
        throw new Error(`Authenticated encrypted file is truncated: ${resolvedInputPath}`);
      }

      const nonce = Buffer.alloc(GCM_NONCE_BYTES);
      const fileHandle = fs.openSync(resolvedInputPath, "r");
      fs.readSync(fileHandle, nonce, 0, GCM_NONCE_BYTES, FILE_MAGIC.length);
      const tag = Buffer.alloc(GCM_TAG_BYTES);
      fs.readSync(fileHandle, tag, 0, GCM_TAG_BYTES, stat.size - GCM_TAG_BYTES);
      fs.closeSync(fileHandle);

      const decipher = crypto.createDecipheriv(AUTHENTICATED_ALGORITHM, getFileSecretKey(), nonce);
      decipher.setAuthTag(tag);
      const input = fs.createReadStream(resolvedInputPath, { start: encryptedStart, end: encryptedEnd });
      const output = fs.createWriteStream(outputPath);
      input.on("error", reject);
      decipher.on("error", reject);
      output.on("error", reject);
      output.on("finish", resolve);
      input.pipe(decipher).pipe(output);
    } catch (error) {
      reject(error);
    }
  });
};

export const encryptText = (text) => {
  const nonce = crypto.randomBytes(GCM_NONCE_BYTES);
  const cipher = crypto.createCipheriv(AUTHENTICATED_ALGORITHM, getCodeSecretKey(), nonce);
  const encrypted = Buffer.concat([cipher.update(String(text), "utf8"), cipher.final()]);
  return `gcm:v1:${nonce.toString("hex")}:${cipher.getAuthTag().toString("hex")}:${encrypted.toString("hex")}`;
};

const decryptLegacyText = (combinedData) => {
  const [ivHex, encrypted] = String(combinedData).split(":");
  const decipher = crypto.createDecipheriv(LEGACY_ALGORITHM, getCodeSecretKey(), Buffer.from(ivHex, "hex"));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, "hex")), decipher.final()]).toString("utf8");
};

export const decryptText = (combinedData) => {
  const value = String(combinedData || "");
  if (!value.startsWith("gcm:v1:")) return decryptLegacyText(value);

  const [, , nonceHex, tagHex, encryptedHex] = value.split(":");
  const decipher = crypto.createDecipheriv(
    AUTHENTICATED_ALGORITHM,
    getCodeSecretKey(),
    Buffer.from(nonceHex, "hex"),
  );
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]).toString("utf8");
};
