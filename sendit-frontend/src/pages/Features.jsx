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
        title="SendIt Features | File Sharing and Code Sharing Tools"
        description="Explore SendIt features for file sharing, code sharing, temporary access codes, expiry settings, and a simple receive workflow."
        keywords="sendit features, file sharing features, code sharing features, temporary access codes"
        url="https://senditsystem.netlify.app/features"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">SendIt Features</h1>

          <section className="content-section">
            <h2>File Sharing</h2>
            <div className="feature-details">
              <p>Share files through a temporary-code workflow built for quick handoffs.</p>
              <ul>
                <li>Upload multiple files at once</li>
                <li>Receive files using a short access code</li>
                <li>Customizable expiration time</li>
                <li>Clear send and receive pages</li>
                <li>Temporary storage approach for shared items</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>Code Sharing</h2>
            <div className="feature-details">
              <p>Share code snippets without needing to paste large blocks into chat apps.</p>
              <ul>
                <li>Support for multiple programming languages</li>
                <li>Syntax highlighting</li>
                <li>Code formatting and beautification</li>
                <li>View and share history</li>
                <li>Dedicated receive page for code lookup</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>Access and Retention Controls</h2>
            <div className="feature-details">
              <p>SendIt is designed to reduce friction while keeping sharing more controlled than a permanent public post.</p>
              <ul>
                <li>Temporary codes instead of open browsing</li>
                <li>Automatic link expiration</li>
                <li>User-selected time windows</li>
                <li>Temporary storage and cleanup workflows</li>
                <li>Optional account-based history for signed-in users</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>User Experience</h2>
            <div className="feature-details">
              <p>Designed for simplicity and ease of use.</p>
              <ul>
                <li>No registration required for core sending and receiving</li>
                <li>Drag-and-drop file upload</li>
                <li>One-click copy to clipboard</li>
                <li>Responsive design for mobile and desktop</li>
                <li>Simple route structure for first-time visitors</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>Typical Use Cases</h2>
            <div className="feature-details">
              <p>Common ways people use SendIt in daily work and study.</p>
              <ul>
                <li>Sharing assignments or notes with classmates</li>
                <li>Sending design drafts or PDFs to clients</li>
                <li>Passing code snippets between developers</li>
                <li>Moving temporary files between personal devices</li>
                <li>Collecting short-lived downloads without cluttering chat threads</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
