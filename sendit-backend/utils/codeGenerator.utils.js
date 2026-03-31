import Code from "../models/Code.js";
import File from "../models/File.js";

/**
 * Generate a unique 4-digit code
 * Ensures no collisions by checking both Code and File collections
 */
export const generateUniqueCode = async (maxAttempts = 10) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Check both collections for existing codes
    const existsInCode = await Code.findOne({ code });
    const existsInFile = await File.findOne({ code });

    if (!existsInCode && !existsInFile) {
      return code;
    }
  }

  // If we couldn't generate a unique code after max attempts, throw error
  throw new Error("Failed to generate unique code after maximum attempts");
};
