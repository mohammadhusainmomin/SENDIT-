import jwt from "jsonwebtoken";

const getAdminSecret = () => process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;

export default function adminMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  const secret = getAdminSecret();

  if (!token || !secret) {
    return res.status(401).json({ message: "Admin authorization required" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.scope !== "admin" || !decoded.email) {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.admin = { email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid admin authorization" });
  }
}
