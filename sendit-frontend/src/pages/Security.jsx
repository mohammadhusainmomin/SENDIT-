import { useEffect } from "react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/ContentPages.css";

export default function Security() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="SendIt Security | How Temporary Sharing Works"
        description="A plain-language explanation of SendIt transport encryption, access codes, expiry, storage cleanup, and the limits users should understand."
        url="https://senditsystem.in/security"
      />

      <div className="content-page-wrapper legal-page legal-page--security">
        <div className="content-container content-container--wide legal-container">
          <Breadcrumbs current="Security" />
          <div className="legal-hero">
            <div>
              <span className="content-eyebrow">Protection overview</span>
              <h1 className="page-title">SendIt Security</h1>
              <p className="intro-text">A plain-language explanation of the controls that exist today and the risks that remain your responsibility.</p>
            </div>
            <div className="legal-meta-panel legal-meta-panel--accent">
              <span>Security model</span>
              <strong>Temporary access, clear limits</strong>
              <small>HTTPS, encrypted stored files, expiry checks</small>
              <a href="/guide">Read safer sharing habits <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <div className="legal-summary-row"><span>What is implemented</span><span>What is not promised</span><span>How to share safely</span></div>

          <section className="content-section">
            <h2>What happens during a file transfer?</h2>
            <ol>
              <li>You choose one or more files and an expiry window of up to 24 hours.</li>
              <li>The server receives the upload over HTTPS and encrypts the file before storing the encrypted copy.</li>
              <li>SendIt creates a temporary four-digit access code. The recipient must provide that code on the receive page.</li>
              <li>After expiry, the API refuses access. A cleanup job removes encrypted files during its next scheduled run, while some metadata may remain for history and operational purposes.</li>
            </ol>
          </section>

          <section className="content-section">
            <h2>Controls SendIt uses</h2>
            <ul>
              <li><strong>HTTPS in transit:</strong> Browser-to-server communication should use the site's HTTPS connection.</li>
              <li><strong>Temporary access:</strong> A share is governed by its expiry time rather than being a permanent public URL.</li>
              <li><strong>Server-side validation:</strong> The receive API checks the code and expiry before returning content.</li>
              <li><strong>Encrypted stored files:</strong> Uploaded file content is encrypted before it is written to the application storage path.</li>
              <li><strong>Temporary download output:</strong> A decrypted download is streamed through a temporary path and removed after the response cleanup step.</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Important limitations</h2>
            <ul>
              <li>A four-digit code is convenient, not a password or high-assurance secret. Anyone who obtains it may be able to retrieve the share before expiry.</li>
              <li>Recipients can copy, save, or forward a downloaded file or displayed code. SendIt cannot control a copy after delivery.</li>
              <li>Expiry blocks application access, but physical cleanup is scheduled and may happen a few minutes later. History metadata can remain after the file content is unavailable.</li>
              <li>SendIt is not end-to-end encrypted: the server performs the encryption and decryption needed to deliver content.</li>
              <li>Normal uploads accept up to 20 files with a maximum of 100 MB per file. Actual transfer success can still depend on network, hosting, and available storage.</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Safer sharing habits</h2>
            <ul>
              <li>Use the shortest expiry that gives the recipient enough time.</li>
              <li>Send the access code privately and confirm the recipient before sharing it.</li>
              <li>Remove passwords, API keys, private keys, identity documents, and other secrets from a file before uploading whenever possible.</li>
              <li>Keep your own copy of anything important. SendIt is a transfer tool, not a backup service.</li>
              <li>Report suspected abuse or a security issue through the <a href="mailto:mmbrothersteam@gmail.com">support email</a>.</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Related information</h2>
            <p>
              Read the <a href="/privacy">Privacy Policy</a> for data categories and retention details, or follow the <a href="/guide">Sharing Guide</a> for practical file and code workflows.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
