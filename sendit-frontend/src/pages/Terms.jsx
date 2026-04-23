import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Terms of Service - SendIt"
        description="Read SendIt's terms of service to understand the rules for using the platform."
        url="https://senditsystem.netlify.app/terms"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Terms of Service</h1>

          <div className="last-updated">Last updated: April 23, 2026</div>

          <section className="content-section">
            <h2>Acceptance of terms</h2>
            <p>
              By accessing or using SendIt, you agree to these Terms of Service. If you do not agree, do not use the site.
            </p>
          </section>

          <section className="content-section">
            <h2>Service description</h2>
            <p>
              SendIt provides temporary file sharing and code sharing features through a web-based interface. Features, limits, and availability may change over time as the service evolves.
            </p>
          </section>

          <section className="content-section">
            <h2>Acceptable use</h2>
            <ul>
              <li>Do not upload illegal, harmful, abusive, fraudulent, or infringing material</li>
              <li>Do not use the service to distribute malware, spam, or phishing content</li>
              <li>Do not attempt to bypass limits, gain unauthorized access, or disrupt the service</li>
              <li>Do not use SendIt as a long-term archival or backup system</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>User responsibility</h2>
            <p>
              You are responsible for the content you upload, the people you share it with, and your compliance with applicable laws and intellectual property rights.
            </p>
          </section>

          <section className="content-section">
            <h2>Temporary availability</h2>
            <p>
              SendIt is designed around short-lived access. Shared content may expire automatically or become unavailable as part of the service's normal retention and cleanup behavior.
            </p>
          </section>

          <section className="content-section">
            <h2>Disclaimer</h2>
            <p>
              SendIt is provided on an "as is" and "as available" basis without warranties of any kind. We do not guarantee uninterrupted access, permanent storage, or error-free operation.
            </p>
          </section>

          <section className="content-section">
            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, SendIt and its operators will not be liable for indirect, incidental, special, consequential, or business-interruption damages arising from use of the service.
            </p>
          </section>

          <section className="content-section">
            <h2>Changes to the service or terms</h2>
            <p>
              We may update the service or revise these terms from time to time. Continued use of SendIt after changes are published means you accept the updated terms.
            </p>
          </section>

          <section className="content-section">
            <h2>Contact information</h2>
            <p>
              If you have questions about these Terms of Service, contact senditsystem786@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
