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
        description="Read SendIt's privacy policy to understand how we collect, use, and protect your data."
        url="https://senditsystem.netlify.app/privacy"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Privacy Policy</h1>
          
          <div className="last-updated">Last updated: January 8, 2024</div>

          <section className="content-section">
            <h2>Introduction</h2>
            <p>
              SendIt ("Company", "we", "our", or "us") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
            </p>
          </section>

          <section className="content-section">
            <h2>Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes:</p>
            <ul>
              <li><strong>Usage Data:</strong> Information about how you use our service</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers</li>
              <li><strong>File Metadata:</strong> File names, sizes, and upload times (not file contents)</li>
              <li><strong>Account Information:</strong> If you create an account, we collect name, email, and authentication data</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Data Security</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="content-section">
            <h2>File Storage and Retention</h2>
            <p>
              Files shared through SendIt are stored temporarily. The retention period depends on the link expiration time set by the sender. Once a link expires or is deleted, the associated file is permanently removed from our servers.
            </p>
          </section>

          <section className="content-section">
            <h2>Cookies</h2>
            <p>
              SendIt uses cookies to store user preferences and session information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="content-section">
            <h2>Third-Party Services</h2>
            <p>
              Our service may contain links to third-party websites and services that are not operated by us. This Privacy Policy does not apply to third-party websites, and we are not responsible for their content or practices.
            </p>
          </section>

          <section className="content-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@senditsystem.netlify.app.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
