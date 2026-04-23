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
        description="Read SendIt's privacy policy to understand how we collect, use, store, and protect data."
        url="https://senditsystem.netlify.app/privacy"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Privacy Policy</h1>

          <div className="last-updated">Last updated: April 23, 2026</div>

          <section className="content-section">
            <h2>Overview</h2>
            <p>
              This Privacy Policy explains how SendIt collects, uses, stores, and protects information when you use the website. By using SendIt, you agree to the practices described on this page.
            </p>
          </section>

          <section className="content-section">
            <h2>Information we may collect</h2>
            <ul>
              <li>Basic usage information such as browser type, device type, pages visited, and approximate timestamps</li>
              <li>Technical information such as IP address, request logs, and error diagnostics needed to operate the service</li>
              <li>Account-related information when login or account features are used</li>
              <li>Transfer-related information such as file names, sizes, expiry choices, and upload or download events</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>How we use information</h2>
            <ul>
              <li>To provide file sharing and code sharing features</li>
              <li>To maintain security, detect abuse, and troubleshoot technical issues</li>
              <li>To improve product performance, usability, and reliability</li>
              <li>To respond to support, legal, or policy-related requests</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>File storage and retention</h2>
            <p>
              SendIt is intended for temporary sharing. Shared files or code entries may remain available only for the configured retention period or until they are removed by the active cleanup workflow. We do not describe the service as permanent storage or backup infrastructure.
            </p>
          </section>

          <section className="content-section">
            <h2>Cookies and similar technologies</h2>
            <p>
              SendIt may use cookies or similar technologies for sign-in state, preference storage, security, analytics, and service reliability. You can control cookies through your browser settings, though disabling some cookies may affect functionality.
            </p>
          </section>

          <section className="content-section">
            <h2>Advertising disclosure</h2>
            <p>
              If Google AdSense or other advertising products are enabled on SendIt, third-party vendors, including Google, may use cookies to serve ads based on a user's prior visits to this site or other sites on the Internet.
            </p>
            <p>
              Google's use of advertising cookies enables Google and its partners to serve ads based on visits to this site and other websites. Users may opt out of personalized advertising by visiting Google's Ads Settings. If other third-party ad networks are used in the future, users may also be able to opt out through those vendors or through industry opt-out tools where available.
            </p>
          </section>

          <section className="content-section">
            <h2>Third-party services</h2>
            <p>
              SendIt may rely on third-party services for hosting, authentication, analytics, infrastructure, or future advertising. Those services may process information according to their own privacy policies and terms.
            </p>
          </section>

          <section className="content-section">
            <h2>Security</h2>
            <p>
              We take reasonable steps to protect the service and the information we process, but no website or internet transmission can be guaranteed to be completely secure. Users should avoid uploading content they are not comfortable transmitting online.
            </p>
          </section>

          <section className="content-section">
            <h2>Contact</h2>
            <p>
              If you have questions about this Privacy Policy or want to report a privacy concern, contact us at senditsystem786@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
