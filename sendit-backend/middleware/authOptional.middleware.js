import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddlewareOptional = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      req.user = user;
    }
  } catch (err) {
    console.log("Invalid token, treated as guest");
  }

  next();
};

export default authMiddlewareOptional;