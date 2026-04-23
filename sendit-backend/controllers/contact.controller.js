import { sendContactEmail } from "../utils/sendEmail.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ message: "Message should be at least 10 characters long" });
    }

    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    res.json({ message: "Your message has been sent successfully" });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error.message);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
};
