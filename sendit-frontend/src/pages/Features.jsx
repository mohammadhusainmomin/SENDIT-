import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function Features() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="SendIt Features - Secure File & Code Sharing"
        description="Discover SendIt's powerful features: encrypted file transfer, code sharing with syntax highlighting, temporary links, and more."
        url="https://senditsystem.netlify.app/features"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">SendIt Features</h1>

          <section className="content-section">
            <h2>File Sharing</h2>
            <div className="feature-details">
              <p>Share files securely with encrypted links. No account needed.</p>
              <ul>
                <li>Upload multiple files at once</li>
                <li>Encrypted transfer protocol</li>
                <li>Customizable expiration time</li>
                <li>Download progress tracking</li>
                <li>Secure link generation</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>Code Sharing</h2>
            <div className="feature-details">
              <p>Share code snippets with syntax highlighting and formatting.</p>
              <ul>
                <li>Support for multiple programming languages</li>
                <li>Syntax highlighting</li>
                <li>Code formatting and beautification</li>
                <li>View and share history</li>
                <li>One-time view links for security</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>Security Features</h2>
            <div className="feature-details">
              <p>Your data security is our top priority.</p>
              <ul>
                <li>End-to-end encryption</li>
                <li>Secure URL generation</li>
                <li>Automatic link expiration</li>
                <li>Password protected links</li>
                <li>Download attempt logging</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>User Experience</h2>
            <div className="feature-details">
              <p>Designed for simplicity and ease of use.</p>
              <ul>
                <li>No registration required</li>
                <li>Drag-and-drop file upload</li>
                <li>One-click copy to clipboard</li>
                <li>Responsive design (mobile & desktop)</li>
                <li>Fast and intuitive interface</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>File Management</h2>
            <div className="feature-details">
              <p>Manage your transfers with ease.</p>
              <ul>
                <li>View your sent files</li>
                <li>Track download history</li>
                <li>Delete files before expiration</li>
                <li>Re-share previously sent files</li>
                <li>Download receipts and reports</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
