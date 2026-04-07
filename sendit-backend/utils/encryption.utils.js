import crypto from "crypto";
import fs from "fs";

const algorithm = "aes-256-cbc";

// File encryption secret key
const getFileSecretKey = () => {
  if (!process.env.FILE_SECRET) {
    throw new Error("FILE_SECRET is missing in environment variables");
  }

  return crypto
    .createHash("sha256")
    .update(String(process.env.FILE_SECRET))
    .digest();
};

// Code encryption secret key
const getCodeSecretKey = () => {
  if (!process.env.CODE_SECRET) {
    throw new Error("CODE_SECRET is missing in environment variables");
  }

  return crypto
    .createHash("sha256")
    .update(String(process.env.CODE_SECRET))
    .digest();
};

// ================= FILE ENCRYPTION =================
export const encryptFile = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const secretKey = getFileSecretKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    output.write(iv);

    input
      .pipe(cipher)
      .pipe(output)
      .on("finish", resolve)
      .on("error", reject);
  });
};

export const decryptFile = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const secretKey = getFileSecretKey();

      if (!fs.existsSync(inputPath)) {
        reject(new Error(`Encrypted file not found: ${inputPath}`));
        return;
      }

      const fileHandle = fs.openSync(inputPath, "r");
      const iv = Buffer.alloc(16);
      const bytesRead = fs.readSync(fileHandle, iv, 0, 16, 0);
      fs.closeSync(fileHandle);

      if (bytesRead !== 16) {
        reject(new Error(`Encrypted file header is invalid: ${inputPath}`));
        return;
      }

      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
      const input = fs.createReadStream(inputPath, { start: 16 });
      const output = fs.createWriteStream(outputPath);

      input.on("error", reject);
      output.on("error", reject);
      decipher.on("error", reject);

      input.pipe(decipher).pipe(output).on("finish", resolve);
    } catch (error) {
      reject(error);
    }
  });
};

// ================= CODE ENCRYPTION =================
export const encryptText = (text) => {
  try {
    const secretKey = getCodeSecretKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Prepend IV to encrypted data for storage
    const combinedData = iv.toString("hex") + ":" + encrypted;

    return combinedData;
  } catch (err) {
    console.error("Encryption error:", err);
    throw err;
  }
};

export const decryptText = (combinedData) => {
  try {
    const secretKey = getCodeSecretKey();

    // Extract IV and encrypted data
    const [ivHex, encrypted] = combinedData.split(":");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (err) {
    console.error("Decryption error:", err);
    throw err;
  }
};
