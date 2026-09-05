import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

const fileFeatures = [
  ["Multiple-file upload", "Select one or more files in the Send File flow. They share one temporary access code."],
  ["Temporary four-digit code", "The sender receives a short code and shares it with the intended recipient through a separate channel."],
  ["Sender-selected expiry", "The normal file flow accepts an expiry window up to 24 hours. Access is refused after the window ends."],
  ["Progress and copy actions", "The upload flow shows progress and provides copy and WhatsApp sharing actions after a code is created."],
  ["Repeat downloads while active", "Recipients can download files in an active bundle more than once. The share is not one-time viewing."],
];

const codeLanguages = [
  "JavaScript", "TypeScript", "JSX", "TSX", "Python", "Java", "C", "C++",
  "C#", "PHP", "HTML", "CSS", "JSON", "Plain text",
];

export default function Features() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="SendIt Features | Temporary File and Code Sharing"
        description="See the file transfer, code sharing, expiry, account, and Drop Room features SendIt currently provides, including important limits and exclusions."
        url="https://senditsystem.in/features"
      />
      <div className="content-page-wrapper content-page-wrapper--features">
        <div className="content-container content-container--wide">
          <div className="content-hero">
            <div>
              <span className="content-eyebrow">Product map</span>
              <h1 className="page-title">What SendIt currently provides</h1>
              <p className="intro-text">A practical overview of file sharing, code sharing, expiry, accounts, and the boundaries of the current product.</p>
            </div>
            <div className="content-hero-panel content-hero-panel--accent">
              <span className="content-hero-panel-label">Designed for</span>
              <strong>Short, intentional transfers</strong>
              <a href="/send">Start a file transfer <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <div className="content-stat-row" aria-label="SendIt product limits">
            <div><strong>14</strong><span>code language choices</span></div>
            <div><strong>20</strong><span>files per transfer</span></div>
            <div><strong>24h</strong><span>maximum normal expiry</span></div>
          </div>

          <section className="content-section">
            <div className="section-heading-row"><span className="section-number">01</span><div><span className="section-kicker">Core workflow</span><h2>File sharing</h2></div></div>
            <div className="feature-details">
              <p>Upload a file bundle, choose how long it should remain available, and give the recipient the generated four-digit code.</p>
              <ul>{fileFeatures.map(([title, text]) => <li key={title}><strong>{title}:</strong> {text}</li>)}</ul>
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading-row"><span className="section-number">02</span><div><span className="section-kicker">For developers</span><h2>Code sharing</h2></div></div>
            <div className="feature-details">
              <p>Paste a snippet into Send Code, choose a language, set an expiry, and share the generated code. Formatting happens in the browser before the snippet is submitted.</p>
              <p><strong>Supported language choices:</strong> {codeLanguages.join(", ")}.</p>
              <ul>
                <li>Snippets are displayed in a read-only viewer with syntax highlighting.</li>
                <li>Code retrieval is repeatable while the share is active; it is not one-time viewing.</li>
                <li>There is no stored description/comment field for a code share at present.</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading-row"><span className="section-number">03</span><div><span className="section-kicker">Lifecycle</span><h2>Expiry and storage behavior</h2></div></div>
            <ul>
              <li>The API refuses file and code access after the stored expiry time.</li>
              <li>A cleanup job removes expired encrypted file content on a schedule. Access is disabled first; physical cleanup is not guaranteed to happen at the exact expiry second.</li>
              <li>History and operational metadata may remain after content access ends.</li>
              <li>SendIt is not a backup service and does not promise permanent retention or recovery.</li>
            </ul>
          </section>

          <section className="content-section">
            <div className="section-heading-row"><span className="section-number">04</span><div><span className="section-kicker">Extended workflows</span><h2>Accounts and Drop Rooms</h2></div></div>
            <p>Basic file and code sharing does not require an account. Optional accounts provide history views. Drop Rooms are a separate authenticated workflow for collecting documents from submitters; rooms have their own expiry and per-file limits.</p>
            <ul>
              <li>Normal file sharing accepts up to 20 files, with a maximum of 100 MB per file. Hosting and storage limits can still affect an upload.</li>
              <li>Drop Room submissions are limited by the room's configured maximum, up to 100 MB per file and 20 files per submission.</li>
              <li>There is no normal sender-facing delete endpoint for guest or account file shares today.</li>
            </ul>
          </section>

          <section className="content-section">
            <div className="section-heading-row"><span className="section-number">05</span><div><span className="section-kicker">Important context</span><h2>What SendIt is not</h2></div></div>
            <p>It is not end-to-end encrypted, a permanent cloud drive, a backup system, or a guarantee that a recipient will not copy delivered content. Do not upload passwords, private keys, identity documents, malware, or material you do not have the right to share.</p>
          </section>

          <section className="content-section">
            <div className="section-heading-row"><span className="section-number">06</span><div><span className="section-kicker">Continue exploring</span><h2>Useful next steps</h2></div></div>
            <p>Use the <a href="/send">Send File</a> page for a transfer, read the <a href="/guide">Sharing Guide</a> for practical workflows, or review <a href="/security">Security</a> for the protection model and limitations.</p>
          </section>
        </div>
      </div>
    </>
  );
}
