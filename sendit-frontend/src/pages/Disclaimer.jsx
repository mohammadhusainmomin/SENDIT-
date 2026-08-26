import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function Disclaimer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Disclaimer - SendIt"
        description="Read SendIt's disclaimer about temporary file sharing, service availability, and informational content."
        url="https://senditsystem.in/disclaimer"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Disclaimer</h1>

          <div className="last-updated">Last updated: April 23, 2026</div>

          <section className="content-section">
            <h2>General Information</h2>
            <p>
              The information on SendIt is provided for general informational and product-use purposes only. While we aim to keep the site accurate and useful, we do not guarantee that every statement, feature description, or availability status will always remain complete, current, or error-free.
            </p>
          </section>

          <section className="content-section">
            <h2>No Permanent Storage Guarantee</h2>
            <p>
              SendIt is designed for temporary sharing. Users should not treat the platform as a permanent archive, backup system, or guaranteed long-term hosting service.
            </p>
          </section>

          <section className="content-section">
            <h2>User Responsibility</h2>
            <p>
              Users are responsible for the content they upload, share, or retrieve through the platform. This includes compliance with applicable laws, copyright rules, privacy obligations, and safe usage practices.
            </p>
          </section>

          <section className="content-section">
            <h2>External Services</h2>
            <p>
              SendIt may rely on third-party services for hosting, authentication, analytics, or future advertising. We are not responsible for downtime, policy changes, or technical issues originating from those external providers.
            </p>
          </section>

          <section className="content-section">
            <h2>Contact</h2>
            <p>
              If you have any questions about this Disclaimer, contact mmbrothersteam@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
