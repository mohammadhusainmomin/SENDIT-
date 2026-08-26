import emailjs from "@emailjs/nodejs";

let initialized = false;

const initializeEmailJS = () => {
  if (initialized) return;

  console.log("=== EMAILJS CONFIGURATION ===");
  console.log("EMAILJS_SERVICE_ID configured:", !!process.env.EMAILJS_SERVICE_ID);
  console.log("EMAILJS_TEMPLATE_ID configured:", !!process.env.EMAILJS_TEMPLATE_ID);
  console.log("EMAILJS_PUBLIC_KEY configured:", !!process.env.EMAILJS_PUBLIC_KEY);
  console.log("EMAILJS_PRIVATE_KEY configured:", !!process.env.EMAILJS_PRIVATE_KEY);

  if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_PRIVATE_KEY) {
    console.error("❌ WARNING: EmailJS credentials not found in environment variables!");
    console.error("   Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PRIVATE_KEY in your .env file");
    console.error("   Get these from https://dashboard.emailjs.com/admin/account");
    return;
  }

  console.log("✓ EmailJS configuration loaded successfully");
  initialized = true;
};

export const sendOtpEmail = async (to, otp) => {
  try {
    if (!to) {
      throw new Error("Recipient email address is required");
    }

    initializeEmailJS();

    console.log("📧 Attempting to send OTP to:", to);

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SENDIT OTP Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
            padding: 20px;
            min-height: 100vh;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #1a1f2e 0%, #16202f 100%);
            border: 1px solid #2a3647;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .email-header {
            background: linear-gradient(135deg, #00d4ff 0%, #00bce6 100%);
            padding: 30px 20px;
            text-align: center;
            color: #0f1419;
        }

        .email-header h1 {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: 3px;
            margin: 0;
            text-transform: uppercase;
        }

        .email-header p {
            margin: 8px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
            font-weight: 500;
        }

        .email-content {
            padding: 40px 30px;
        }

        .greeting {
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        .greeting strong {
            color: #00d4ff;
            font-weight: 700;
        }

        .otp-section {
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%);
            border: 2px solid #00d4ff;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }

        .otp-label {
            color: #b0b8c4;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: block;
        }

        .otp-code {
            font-size: 48px;
            font-weight: 800;
            letter-spacing: 8px;
            color: #00d4ff;
            font-family: 'Courier New', monospace;
            line-height: 1.2;
            margin: 10px 0 20px 0;
            word-spacing: 10px;
        }

        .otp-validity {
            color: #00d4ff;
            font-size: 14px;
            font-weight: 600;
            margin: 0;
        }

        .info-box {
            background: rgba(26, 31, 46, 0.5);
            border-left: 4px solid #00d4ff;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
        }

        .info-box h3 {
            color: #00d4ff;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .info-box p {
            color: #b0b8c4;
            font-size: 14px;
            line-height: 1.6;
            margin: 8px 0;
        }

        .info-box li {
            color: #b0b8c4;
            font-size: 14px;
            line-height: 1.8;
            margin: 6px 0;
            margin-left: 20px;
        }

        .security-notice {
            background: rgba(255, 71, 87, 0.05);
            border: 1px solid rgba(255, 71, 87, 0.2);
            border-radius: 6px;
            padding: 16px;
            margin: 25px 0;
        }

        .security-notice p {
            color: #ff9ca3;
            font-size: 13px;
            line-height: 1.6;
            margin: 0;
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #2a3647, transparent);
            margin: 30px 0;
        }

        .footer-content {
            color: #b0b8c4;
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .footer-content p {
            margin: 8px 0;
            color: #b0b8c4;
        }

        .email-footer {
            background: rgba(15, 20, 25, 0.5);
            border-top: 1px solid #2a3647;
            padding: 25px 30px;
            text-align: center;
        }

        .footer-links {
            margin-bottom: 15px;
        }

        .footer-links a {
            color: #00d4ff;
            text-decoration: none;
            font-size: 13px;
            margin: 0 10px;
            font-weight: 600;
        }

        .footer-links a:hover {
            text-decoration: underline;
        }

        .footer-brand {
            color: #b0b8c4;
            font-size: 12px;
            margin-top: 10px;
        }

        .footer-brand strong {
            color: #00d4ff;
        }

        @media (max-width: 600px) {
            .email-container {
                border-radius: 8px;
            }

            .email-header {
                padding: 25px 15px;
            }

            .email-header h1 {
                font-size: 28px;
                letter-spacing: 2px;
            }

            .email-content {
                padding: 25px 20px;
            }

            .otp-section {
                padding: 20px;
                margin: 20px 0;
            }

            .otp-code {
                font-size: 36px;
                letter-spacing: 6px;
                word-spacing: 6px;
            }

            .info-box {
                padding: 15px;
                margin: 20px 0;
            }

            .email-footer {
                padding: 20px 15px;
            }

            .footer-links a {
                display: inline-block;
                margin: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>SENDIT</h1>
            <p>Secure File Sharing</p>
        </div>

        <!-- Main Content -->
        <div class="email-content">
            <p class="greeting">
                Welcome to <strong>SENDIT</strong>! Your verification code is below.
            </p>

            <!-- OTP Display -->
            <div class="otp-section">
                <span class="otp-label">Your Verification Code</span>
                <div class="otp-code">${otp}</div>
                <p class="otp-validity">⏱️ Valid for 10 minutes</p>
            </div>

            <!-- Instructions -->
            <div class="info-box">
                <h3>📋 What to do next:</h3>
                <ul>
                    <li>Enter the code above in your SENDIT app</li>
                    <li>The code will expire in 10 minutes</li>
                    <li>Never share this code with anyone</li>
                    <li>If you didn't request this, ignore this email</li>
                </ul>
            </div>

            <!-- Security Notice -->
            <div class="security-notice">
                <p>
                    <strong>🔒 Security Tip:</strong> SENDIT will never ask you to share your verification code via email or message.
                    This code is only for your account.
                </p>
            </div>

            <div class="divider"></div>

            <!-- Footer Content -->
            <div class="footer-content">
                <p><strong>Have trouble?</strong></p>
                <p>
                    If you're having issues, make sure you're entering the code within 10 minutes of receiving this email.
                    Need help? Contact our support team.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-links">
                <a href="https://senditsystem.in">Visit SENDIT</a>
                <a href="mailto:support@sendit.com">Support</a>
                <a href="https://senditsystem.in/privacy">Privacy</a>
            </div>
            <div class="footer-brand">
                <p>© 2024 <strong>SENDIT</strong>. All rights reserved.</p>
                <p>Secure, Fast, Code-based File Sharing</p>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    const templateParams = {
      to_email: to,
      otp_code: otp,
      html_content: emailHtml,
    };

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log("✓ OTP email sent successfully to:", to);
    return result;
  } catch (error) {
    console.error("❌ Failed to send OTP email to:", to);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

import { Resend } from "resend";

// Create a reliable contact email function using Resend
export const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error(
        "RESEND_API_KEY is not configured. Please add your Resend API key to the .env file: RESEND_API_KEY=re_xxxxx"
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const safeName = name || "Website Visitor";
    const safeEmail = email || "Not provided";
    const safeSubject = subject || "Contact form message";
    const safeMessage = message || "No message content provided.";

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SendIt Contact Form</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      background: linear-gradient(135deg, #0d6efd 0%, #0057cd 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      color: #151d22;
    }
    .container {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #0d6efd 0%, #0057cd 100%);
      color: #ffffff;
      padding: 32px 28px;
      border-bottom: 4px solid #0a58ca;
    }
    .header h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 0;
      opacity: 0.95;
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      padding: 36px;
    }
    .field {
      margin-bottom: 28px;
    }
    .label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #0d6efd;
      margin-bottom: 10px;
    }
    .value {
      font-size: 15px;
      line-height: 1.8;
      color: #151d22;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .message-box {
      padding: 20px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(13, 110, 253, 0.08) 0%, rgba(0, 92, 205, 0.04) 100%);
      border: 2px solid rgba(13, 110, 253, 0.2);
      border-left: 4px solid #0d6efd;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e0e7ff, transparent);
      margin: 28px 0;
    }
    .footer {
      padding: 24px 36px;
      background: #f8fbff;
      font-size: 12px;
      color: #607081;
      border-top: 1px solid #e0e7ff;
      text-align: center;
    }
    .sender-info {
      font-size: 13px;
      color: #607081;
      margin-top: 20px;
      padding: 12px 16px;
      background: #f8fbff;
      border-radius: 8px;
      border-left: 3px solid #0d6efd;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Message</h1>
      <p>A visitor submitted the SendIt contact form</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">From</span>
        <p class="value">${safeName}</p>
      </div>

      <div class="field">
        <span class="label">Email Address</span>
        <p class="value"><a href="mailto:${safeEmail}" style="color: #0d6efd; text-decoration: none; font-weight: 600;">${safeEmail}</a></p>
      </div>

      <div class="field">
        <span class="label">Subject</span>
        <p class="value">${safeSubject}</p>
      </div>

      <div class="divider"></div>

      <div class="field">
        <span class="label">Message</span>
        <div class="message-box">
          <p class="value">${safeMessage}</p>
        </div>
      </div>

      <div class="sender-info">
        💡 <strong>Quick Reply:</strong> Click the email address above to reply directly to this visitor.
      </div>
    </div>
    <div class="footer">
      <p>✓ This message was sent from the SendIt website contact form</p>
      <p style="margin-top: 8px; font-size: 11px; opacity: 0.7;">Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
    </div>
  </div>
</body>
</html>
    `;

    console.log("📧 Sending contact email via Resend...");
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured in environment variables");
    }

    const result = await resend.emails.send({
      from: "SendIt <onboarding@resend.dev>",
      to: "senditsystem786@gmail.com",
      replyTo: safeEmail,
      subject: `[Contact Form] ${safeSubject}`,
      html: emailHtml,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log("✓ Contact email sent successfully:", result.data.id);
    return result.data;
  } catch (error) {
    console.error("❌ CONTACT EMAIL ERROR:", error.message);
    throw new Error(`Failed to send contact email: ${error.message}`);
  }
};
