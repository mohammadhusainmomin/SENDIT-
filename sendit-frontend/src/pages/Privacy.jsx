import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Privacy Policy - SendIt"
        description="SendIt's comprehensive privacy policy explaining data collection, cookies, advertising, and your privacy rights. Learn how we protect your information."
        url="https://senditsystem.netlify.app/privacy"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Privacy Policy</h1>

          <div className="last-updated">Last updated: May 3, 2026</div>

          <section className="content-section">
            <h2>1. Introduction & Privacy Commitment</h2>
            <p>
              This Privacy Policy explains how SendIt ("we," "us," or "SendIt") collects, uses, discloses, retains, and protects your information when you visit and use our website at senditsystem.netlify.app (the "Service"). By accessing and using SendIt, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
            <p>
              <strong>Your privacy is important to us.</strong> SendIt is designed with privacy-first principles. We minimize data collection, limit data retention, and never sell your personal information to advertisers or third parties. We believe that temporary file sharing should not require permanent data collection.
            </p>
          </section>

          <section className="content-section">
            <h2>2. Information We Collect</h2>
            <h3>A. Usage Information</h3>
            <ul>
              <li><strong>Browser and Device Information:</strong> Browser type, operating system, device type, and device identifiers</li>
              <li><strong>Access Logs:</strong> Pages visited, time spent on pages, referring URLs, and click patterns</li>
              <li><strong>IP Address:</strong> Your Internet Protocol (IP) address for security and abuse detection</li>
              <li><strong>Approximate Location:</strong> General location data inferred from IP address (country/region level)</li>
            </ul>
            <h3>B. Transfer Information (Temporary)</h3>
            <ul>
              <li><strong>File Metadata:</strong> File names, file sizes, file types, and upload timestamps</li>
              <li><strong>Share Settings:</strong> Expiry time selected, number of files, access codes used (hashed)</li>
              <li><strong>Download Events:</strong> When files are accessed or downloaded (if tracking is enabled)</li>
              <li><strong>Upload/Download Activity:</strong> Timestamps of when transfers occur</li>
            </ul>
            <p>
              Important: We do NOT collect the actual content of your files. We do NOT store file contents beyond the temporary retention period selected for the share.
            </p>
            <h3>C. Account Information (Optional)</h3>
            <ul>
              <li><strong>Sign-in Credentials:</strong> Email address and password (encrypted) if you create an account</li>
              <li><strong>Account Preferences:</strong> Default expiry times, notification settings, and account settings</li>
              <li><strong>Transfer History:</strong> Records of files you've uploaded or code snippets you've created (metadata only)</li>
              <li><strong>Profile Information:</strong> Name and profile picture if you choose to add them</li>
            </ul>
            <h3>D. Cookies & Similar Technologies</h3>
            <ul>
              <li><strong>Session Cookies:</strong> Temporary cookies that maintain your login session and preferences during your visit</li>
              <li><strong>Persistent Cookies:</strong> Cookies that remember your preferences for future visits</li>
              <li><strong>Analytics Cookies:</strong> Track how users interact with the site to improve performance</li>
              <li><strong>Advertising Cookies:</strong> Google AdSense and third-party advertising cookies (see Advertising section)</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>3. How We Use Information</h2>
            <ul>
              <li><strong>Provide Services:</strong> Enable file uploads, generate access codes, process downloads, and deliver temporary sharing functionality</li>
              <li><strong>Security & Safety:</strong> Detect and prevent abuse, fraud, unauthorized access, malware uploads, and copyright violations</li>
              <li><strong>Service Improvement:</strong> Analyze usage patterns to improve performance, usability, user experience, and feature development</li>
              <li><strong>Technical Support:</strong> Troubleshoot errors, diagnose technical issues, and respond to user support requests</li>
              <li><strong>Legal Compliance:</strong> Comply with legal obligations, respond to lawful requests from authorities, and enforce our Terms of Service</li>
              <li><strong>Account Management:</strong> Send account notifications, password resets, and important service updates (if you have an account)</li>
              <li><strong>Personalization:</strong> Remember your preferences and make the service experience more convenient</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>4. Temporary File Storage & Expiry-Based Cleanup</h2>
            <p>
              SendIt is fundamentally designed for temporary sharing. Here's how file retention works:
            </p>
            <ul>
              <li><strong>You Choose the Expiry:</strong> When uploading files, you select the access duration </li>
              <li><strong>Expiry-Based Cleanup:</strong> After the selected expiry time passes, files are removed from active access</li>
              <li><strong>No Manual Cleanup Needed:</strong> Files don't linger indefinitely or clutter our storage.</li>
              <li><strong>Code Expiration:</strong> Access codes also expire at the same time, preventing any access attempts after expiry</li>
              <li><strong>Not a Backup Service:</strong> SendIt explicitly is NOT designed for long-term storage or backup. Do not rely on SendIt to keep files permanently.</li>
              <li><strong>No Permanent Recovery:</strong> Once deleted, files cannot be recovered. Make sure you keep local copies if you need the files long-term.</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>5. Cookies & Local Storage</h2>
            <h3>Types of Cookies We Use:</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for login, security, and basic site functionality. Cannot be disabled without breaking the service.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users navigate SendIt, which pages are popular, and where users encounter issues</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense and partner advertisers to serve relevant ads (see Advertising section)</li>
            </ul>
            <h3>Browser Cookie Controls:</h3>
            <p>
              Most browsers allow you to control cookies through their settings. You can typically:
            </p>
            <ul>
              <li>View all cookies and delete specific ones</li>
              <li>Block all cookies or only third-party cookies</li>
              <li>Set your browser to warn you before storing cookies</li>
              <li>Use "Private" or "Incognito" mode to block cookies during a session</li>
            </ul>
            <p>
              <strong>Note:</strong> Disabling cookies may affect your ability to use certain SendIt features, such as staying logged in or remembering preferences.
            </p>
          </section>

          <section className="content-section">
            <h2>6. Advertising & Third-Party Ad Networks</h2>
            <p>
              SendIt may display advertisements to support our service. Here's how advertising works:
            </p>
            <h3>Google AdSense</h3>
            <ul>
              <li><strong>Personalized Ads:</strong> Google may use cookies and data to serve ads tailored to your interests based on your browsing history</li>
              <li><strong>Cookie Usage:</strong> Google uses DoubleClick cookies and other technologies to track ad performance and serve relevant ads</li>
              <li><strong>Google's Privacy Policy:</strong> Google's ad serving is governed by Google's Privacy Policy: https://policies.google.com/privacy</li>
              <li><strong>Opting Out:</strong> You can opt out of Google's personalized advertising at Google Ads Settings: https://myaccount.google.com/data-and-privacy</li>
            </ul>
            <h3>Other Third-Party Advertisers</h3>
            <p>
              SendIt may also use other advertising networks. Those advertisers may use cookies, tracking pixels, and similar technologies. You can typically opt out through those vendors' privacy pages or through industry opt-out tools.
            </p>
            <h3>Our Commitment</h3>
            <ul>
              <li>We comply with Google AdSense program policies, including prohibitions on low-value content</li>
              <li>We do NOT sell your personal data to advertisers</li>
              <li>Ads will be clearly identifiable and compliant with advertising policies</li>
              <li>We provide clear opt-out options for behavioral advertising</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>7. Third-Party Services & Data Processing</h2>
            <p>
              SendIt relies on third-party services for various functions. These services may process information according to their own privacy policies:
            </p>
            <ul>
              <li><strong>Netlify:</strong> Hosts SendIt. May process usage data and error logs. See Netlify's Privacy Policy: https://www.netlify.com/privacy</li>
              <li><strong>Google Analytics:</strong> Tracks user behavior and site performance. See Google Analytics Privacy: https://policies.google.com/privacy</li>
              <li><strong>Authentication Services:</strong> If sign-in with Google or other OAuth providers is available, those services process authentication data</li>
              <li><strong>Email Services:</strong> Third-party email providers may handle password reset or notification emails</li>
            </ul>
            <p>
              We ensure third-party services meet reasonable privacy and security standards, but we are not responsible for their privacy practices.
            </p>
          </section>

          <section className="content-section">
            <h2>8. Data Security</h2>
            <p>
              We take reasonable and appropriate security measures to protect your information:
            </p>
            <ul>
              <li><strong>HTTPS Encryption:</strong> All communication between your browser and SendIt servers is encrypted with HTTPS/TLS</li>
              <li><strong>Access Controls:</strong> Only authorized staff can access servers and data systems</li>
              <li><strong>Expiry-Based Cleanup:</strong> Files are governed by the sender-selected expiry time, reducing stored data and exposure risk</li>
              <li><strong>Secure Password Storage:</strong> Account passwords are encrypted and cannot be read even by SendIt staff</li>
              <li><strong>Regular Monitoring:</strong> We monitor for suspicious activity, abuse, and security threats</li>
              <li><strong>Minimal Logging:</strong> We retain minimal operational logs, and those are periodically deleted</li>
            </ul>
            <p>
              <strong>Important Disclaimer:</strong> No website or internet transmission is completely secure. While we implement strong security practices, no system is 100% protected against all threats. You use SendIt at your own risk and should avoid uploading content you're uncomfortable transmitting online.
            </p>
          </section>

          <section className="content-section">
            <h2>9. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data:
            </p>
            <h3>GDPR Rights (European Union Users)</h3>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data SendIt holds about you</li>
              <li><strong>Correction:</strong> Request corrections to inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (right to be forgotten)</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Object to specific uses of your data, including marketing</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent to data processing where applicable</li>
            </ul>
            <h3>California Privacy Rights (CCPA)</h3>
            <ul>
              <li><strong>Know:</strong> You have the right to know what personal data is collected and used</li>
              <li><strong>Delete:</strong> You have the right to request deletion of personal data</li>
              <li><strong>Opt-Out:</strong> You have the right to opt out of the sale of personal data</li>
              <li><strong>Non-Discrimination:</strong> SendIt will not discriminate against you for exercising your privacy rights</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at senditsystem786@gmail.com with your request and proof of identity.
            </p>
          </section>

          <section className="content-section">
            <h2>10. Children's Privacy</h2>
            <p>
              SendIt is not intended for children under 13 years old. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information immediately and contact the child's parent or guardian.
            </p>
            <p>
              Parents or guardians who believe SendIt has collected information from a child under 13 should contact us immediately at senditsystem786@gmail.com.
            </p>
          </section>

          <section className="content-section">
            <h2>11. Data Retention & Destruction</h2>
            <ul>
              <li><strong>File Data:</strong> Retained only according to the expiry time selected for the share</li>
              <li><strong>Access Codes:</strong> Deleted after file expiry or manual removal</li>
              <li><strong>Account Data:</strong> Retained while your account is active. Deleted upon account deletion (with some data retained for legal compliance)</li>
              <li><strong>Analytics Data:</strong> Typically retained for 26 months to identify trends and patterns</li>
              <li><strong>Legal Records:</strong> Some data may be retained longer to comply with legal obligations or to defend SendIt in disputes</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>12. International Data Transfers</h2>
            <p>
              SendIt operates internationally, and your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have different data protection laws than your home country.
            </p>
            <p>
              By using SendIt, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws. We take reasonable steps to protect your information during international transfers.
            </p>
          </section>

          <section className="content-section">
            <h2>13. Links to Third-Party Websites</h2>
            <p>
              SendIt may contain links to external websites. We are not responsible for the privacy practices of those websites. This Privacy Policy applies only to SendIt. We recommend reviewing the privacy policies of any external websites before providing your information.
            </p>
          </section>

          <section className="content-section">
            <h2>14. Changes to This Privacy Policy</h2>
            <p>
              SendIt may update this Privacy Policy occasionally to reflect changes in our practices, technology, legal requirements, or other factors. The "Last Updated" date at the top indicates the most recent revision. If we make material changes, we will provide notice by updating the date or posting a notice on SendIt.
            </p>
            <p>
              Your continued use of SendIt after changes become effective means you accept the updated Privacy Policy. Please review this policy regularly to stay informed about how SendIt protects your information.
            </p>
          </section>

          <section className="content-section">
            <h2>15. Contact & Privacy Concerns</h2>
            <p>
              If you have questions about this Privacy Policy, want to exercise your privacy rights, or want to report a privacy concern, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> senditsystem786@gmail.com</li>
              <li><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 30 days</li>
            </ul>
            <p>
              If you believe SendIt has violated your privacy rights and we are unable to resolve your concern, you may have the right to lodge a complaint with a data protection authority in your jurisdiction.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
