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
        description="Read SendIt's terms of service to understand the rules and conditions for using our platform."
        url="https://senditsystem.netlify.app/terms"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Terms of Service</h1>
          
          <div className="last-updated">Last updated: January 8, 2024</div>

          <section className="content-section">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using SendIt, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="content-section">
            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on SendIt for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on SendIt</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Disclaimer</h2>
            <p>
              The materials on SendIt are provided on an 'as is' basis. SendIt makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="content-section">
            <h2>Limitations</h2>
            <p>
              In no event shall SendIt or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on SendIt.
            </p>
          </section>

          <section className="content-section">
            <h2>Accuracy of Materials</h2>
            <p>
              The materials appearing on SendIt could include technical, typographical, or photographic errors. SendIt does not warrant that any of the materials on its website are accurate, complete, or current. SendIt may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="content-section">
            <h2>Links</h2>
            <p>
              SendIt has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SendIt of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="content-section">
            <h2>Modifications</h2>
            <p>
              SendIt may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="content-section">
            <h2>Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws applicable in your jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="content-section">
            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at support@senditsystem.netlify.app.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
