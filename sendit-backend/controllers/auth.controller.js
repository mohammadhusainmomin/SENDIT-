import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import Otp from "../models/Otp.js";
import { sendOtpEmail } from "../utils/sendEmail.js";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(401).json({ message: "No Google token provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { sub, name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        picture: picture || "",
        authProvider: "google"
      });
    } else if (picture && user.picture !== picture) {
      user.picture = picture;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (error) {
    console.error("GOOGLE AUTH ERROR:", error.message);
    res.status(401).json({ message: "Google authentication failed" });
  }
};




export const registerInit = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    try {
      await sendOtpEmail(email, otp);
      console.log("OTP generated and email sent for registration:", email);
      res.json({ message: "OTP sent to email" });
    } catch (emailError) {
      console.error("Email sending failed for", email, ":", emailError.message);

      // Delete OTP if email fails
      await Otp.deleteMany({ email });

      res.status(500).json({
        message: "Failed to send OTP email. Please try again or check your email address."
      });
    }
  } catch (err) {
    console.error("REGISTER INIT ERROR:", err.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

/* ================= VERIFY OTP & REGISTER ================= */
export const verifyOtpAndRegister = async (req, res) => {
  const { name, email, password, otp } = req.body;

  const record = await Otp.findOne({ email, otp });
  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date() > record.expiresAt) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    authProvider: "local"
  });

  await Otp.deleteMany({ email });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).json({ token, user });
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.authProvider !== "local") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    try {
      await sendOtpEmail(email, otp);
      console.log("OTP generated and email sent for:", email);
      res.json({ message: "OTP sent to email" });
    } catch (emailError) {
      console.error("Email sending failed for", email, ":", emailError.message);

      // Delete OTP if email fails
      await Otp.deleteMany({ email });

      res.status(500).json({
        message: "Failed to send OTP email. Please try again or check your email address."
      });
    }

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpDoc = await Otp.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { email },
      { password: hashedPassword }
    );

    await Otp.deleteMany({ email });

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
};
