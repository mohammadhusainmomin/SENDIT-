/**
 * Format bytes to human-readable file size (B, KB, MB, GB, TB)
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted file size with unit
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toFixed(decimals) + " " + units[i];
};
