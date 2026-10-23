const MAX_EXPIRY_MINUTES = 24 * 60;
const DEFAULT_EXPIRY_MINUTES = 10;

export const resolveExpiryWindow = (rawValue) => {
  if (rawValue === undefined || rawValue === null || rawValue === "") {
    const expiresAt = new Date(Date.now() + DEFAULT_EXPIRY_MINUTES * 60 * 1000);

    return {
      expiresIn: DEFAULT_EXPIRY_MINUTES,
      expiresAt,
    };
  }

  const isNumericValue =
    typeof rawValue === "number" ||
    (typeof rawValue === "string" && /^\d+$/.test(rawValue));
  const expiresIn = isNumericValue ? Number(rawValue) : NaN;

  if (!Number.isSafeInteger(expiresIn) || expiresIn <= 0) {
    return {
      error: "Please provide a valid expiration time",
    };
  }

  if (expiresIn > MAX_EXPIRY_MINUTES) {
    return {
      error: "Maximum expiration time is 1 day (24 hours)",
    };
  }

  return {
    expiresIn,
    expiresAt: new Date(Date.now() + expiresIn * 60 * 1000),
  };
};
