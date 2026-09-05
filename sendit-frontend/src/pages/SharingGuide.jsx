import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function SharingGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="SendIt Sharing Guide | Files, Codes, Expiry and Troubleshooting"
        description="A practical guide to sending files, receiving downloads, sharing code snippets, choosing expiry windows, and troubleshooting SendIt transfers."
        url="https://senditsystem.in/guide"
      />
      <div className="content-page-wrapper content-page-wrapper--guide">
        <div className="content-container content-container--wide">
          <div className="content-hero">
            <div>
              <span className="content-eyebrow">Practical handbook</span>
              <h1 className="page-title">Share with confidence</h1>
              <p className="intro-text">A step-by-step guide to sending files, receiving downloads, sharing snippets, and handling common problems.</p>
            </div>
            <div className="content-hero-panel">
              <span className="content-hero-panel-label">Read time</span>
              <strong>5 minutes to the full flow</strong>
              <a href="#guide-troubleshooting">Jump to troubleshooting <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <nav className="guide-jump-nav" aria-label="Guide sections">
            <a href="#guide-files"><span>01</span> Send a file</a>
            <a href="#guide-download"><span>02</span> Receive a file</a>
            <a href="#guide-code"><span>03</span> Share code</a>
            <a href="#guide-troubleshooting"><span>04</span> Troubleshooting</a>
          </nav>

          <section className="content-section" id="guide-files">
            <div className="section-heading-row"><span className="section-number">01</span><div><span className="section-kicker">Sender workflow</span><h2>Send a file</h2></div></div>
            <ol>
              <li>Open <a href="/send">Send File</a> and choose one or more files.</li>
              <li>Set a non-zero expiry. The normal file API accepts up to 24 hours.</li>
              <li>Start the upload and wait for the success state. SendIt encrypts the uploaded file before storing its encrypted copy.</li>
              <li>Copy the four-digit code. Send the code privately to the person who should receive the files.</li>
              <li>Keep your own copy. SendIt is for transfer, not backup, and there is no normal manual-delete control today.</li>
            </ol>
            <p>Normal uploads accept up to 20 files and 100 MB per file. Test a non-sensitive file first if the transfer is important, because network, hosting, and device conditions can still affect large uploads.</p>
          </section>

          <section className="content-section" id="guide-download">
            <div className="section-heading-row"><span className="section-number">02</span><div><span className="section-kicker">Receiver workflow</span><h2>Receive and download a file</h2></div></div>
            <ol>
              <li>Open <a href="/receive">Receive File</a> and enter the sender's four-digit code.</li>
              <li>For a single-file share, the current receive flow starts the download after the code is accepted.</li>
              <li>For a multi-file share, review the file list and download individual files.</li>
              <li>Downloads can be repeated while the share is active. Normal file sharing does not currently provide a Download All ZIP button.</li>
            </ol>
            <p>After expiry, the API rejects the code. Ask the sender to create a new share if the file is still needed. Cleanup of stored file content runs separately on a schedule, so “no longer accessible” and “physically removed at that exact moment” are different events.</p>
          </section>

          <section className="content-section" id="guide-code">
            <div className="section-heading-row"><span className="section-number">03</span><div><span className="section-kicker">Developer workflow</span><h2>Share a code snippet</h2></div></div>
            <ol>
              <li>Open <a href="/code/send">Send Code</a> and paste or type the snippet.</li>
              <li>Choose the closest language from the selector. Current choices include JavaScript, TypeScript, JSX, TSX, Python, Java, C, C++, C#, PHP, HTML, CSS, JSON, and plain text.</li>
              <li>Set an expiry and generate the share code.</li>
              <li>Send the four-digit code privately. The recipient enters it at <a href="/code/receive">Receive Code</a>.</li>
            </ol>
            <p>Formatting and syntax display improve readability, but SendIt does not execute or validate the code. Never share passwords, API keys, private keys, production tokens, or proprietary code without authorization.</p>
          </section>

          <section className="content-section guide-callout">
            <div className="section-heading-row"><span className="section-number">04</span><div><span className="section-kicker">Good defaults</span><h2>Choosing a safer workflow</h2></div></div>
            <ul>
              <li>Use the shortest expiry that gives the recipient enough time.</li>
              <li>Share the code through a private channel and confirm the recipient before sending it.</li>
              <li>Remove unnecessary metadata and sensitive values from files and snippets.</li>
              <li>Remember that anyone who gets the code can try the share before expiry, and a recipient can copy delivered content.</li>
              <li>Use a permanent, controlled collaboration or backup system when people need ongoing access.</li>
            </ul>
          </section>

          <section className="content-section" id="guide-troubleshooting">
            <h2>Troubleshooting</h2>
            <h3>“Invalid” or “expired” code</h3>
            <p>Check that you are using the matching file or code receive page, re-enter all four digits, and ask the sender to confirm the expiry. An expired share must be created again.</p>
            <h3>Upload fails or stalls</h3>
            <p>Check the connection, try a smaller non-sensitive file, keep the browser tab open, and retry. Since normal uploads have no explicit application size limit, the hosting and network may be the constraint.</p>
            <h3>A download does not start</h3>
            <p>Check browser download permissions, available device storage, and whether the share is still active. Try the receive page again before asking the sender to resend.</p>
            <h3>I need to revoke a share</h3>
            <p>The current normal file/code API has no user-facing manual revoke endpoint. Use a short expiry and contact support if you believe a share has been exposed.</p>
          </section>

          <section className="content-section">
            <h2>Related pages</h2>
            <p>See <a href="/features">current features</a>, the <a href="/security">security explanation</a>, or <a href="/faq">FAQ</a> for concise answers.</p>
          </section>
        </div>
      </div>
    </>
  );
}
