import { useEffect, useMemo, useState } from "react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/ContentPages.css";

const faqs = [
  ["What is SendIt?", "SendIt is a temporary file and code sharing service. A sender uploads a file or snippet, chooses an expiry, and shares a short access code with the intended recipient."],
  ["Do I need an account?", "No account is required for basic file or code sharing. An optional account provides access to history views. Guest shares do not have a normal manual revoke control."],
  ["How do I share a file?", "Open Send File, choose one or more files, select an expiry, wait for the upload to finish, and privately send the generated four-digit code to the recipient."],
  ["How does the recipient download a file?", "The recipient opens Receive File and enters the four-digit code. A single-file share starts its download after validation; a multi-file share shows the files for individual download."],
  ["How long are files available?", "The normal file flow accepts an expiry window up to 24 hours. The code and API access stop working after the stored expiry time."],
  ["Are files physically deleted exactly at expiry?", "No exact-second deletion promise is made. Access is blocked at expiry, and a scheduled cleanup job removes encrypted file content afterward. History or operational metadata may remain."],
  ["What file sizes are supported?", "Normal file sharing accepts up to 20 files, with a maximum of 100 MB per file. Drop Room submissions also allow up to 100 MB per file, subject to the room's configured limit. Network, hosting, and available storage can still affect a transfer."],
  ["Can I upload multiple files?", "Yes. The normal file flow accepts multiple selected files under one access code. Each file can be downloaded while the share remains active."],
  ["Can I share code?", "Yes. Open Send Code, paste a snippet, choose a language, set an expiry, and share the generated code. The current language choices include JavaScript, TypeScript, JSX, TSX, Python, Java, C, C++, C#, PHP, HTML, CSS, JSON, and plain text."],
  ["Are shared files public?", "They are not listed as public pages. A recipient must provide the access code before expiry. However, anyone who obtains the code may attempt to retrieve the share, so codes should be shared privately."],
  ["Can I delete or revoke a normal share?", "The current normal file and code APIs do not provide a user-facing manual revoke endpoint. Use the shortest practical expiry and contact support if a code was exposed."],
  ["Is SendIt cloud storage or backup?", "No. It is a temporary transfer tool. Keep your own copy of important files and use a dedicated storage or backup service for ongoing access."],
  ["Is SendIt end-to-end encrypted?", "No. HTTPS protects transport and uploaded file content is encrypted before storage, but the server performs the encryption and decryption needed to deliver content. Do not treat SendIt as a provider-blind end-to-end encrypted service."],
  ["Can I use SendIt on mobile?", "Yes. SendIt is a browser-based responsive application. Mobile browser file selection and downloads depend on the device, browser permissions, network, and available storage."],
  ["What should I avoid uploading?", "Do not upload passwords, private keys, production tokens, malware, illegal material, copyrighted material you do not have permission to share, or sensitive documents unless you understand the risks and have authorization."],
  ["What should I do if a download fails?", "Check the code, matching receive page, expiry, browser download permissions, connection, and device storage. If the share has expired, ask the sender to create a new one. Contact support for a reproducible issue."],
  ["How do I report a security issue?", "Email mmbrothersteam@gmail.com with a clear description, reproduction steps, and relevant timestamps. Do not include live secrets or private user files in the report."],
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return faqs;
    return faqs.filter(([question, answer]) =>
      `${question} ${answer}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <>
      <SEO
        title="SendIt FAQ | File Sharing, Code Sharing and Expiry"
        description="Accurate answers about SendIt access codes, expiry, file limits, code snippets, storage behavior, security, accounts, and troubleshooting."
        url="https://senditsystem.in/faq"
        structuredData={structuredData}
      />
      <div className="content-page-wrapper content-page-wrapper--faq">
        <div className="content-container content-container--wide">
          <Breadcrumbs current="FAQ" />
          <div className="content-hero">
            <div>
              <span className="content-eyebrow">Support library</span>
              <h1 className="page-title">Answers before you share</h1>
              <p className="intro-text">Clear answers about codes, expiry, downloads, privacy, and the limits of the current SendIt product.</p>
            </div>
            <div className="content-hero-panel">
              <span className="content-hero-panel-label">Need a quick start?</span>
              <strong>Send a file in three steps.</strong>
              <a href="/guide">Open the sharing guide <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <div className="content-stat-row" aria-label="FAQ highlights">
            <div><strong>17</strong><span>practical answers</span></div>
            <div><strong>24h</strong><span>maximum normal expiry</span></div>
            <div><strong>100 MB</strong><span>maximum per file</span></div>
          </div>
          <label className="faq-search">
            <span>Search answers</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search expiry, downloads, security..."
            />
          </label>
          <section className="faq-section" aria-label="SendIt frequently asked questions">
            {filteredFaqs.map(([question, answer]) => {
              const index = faqs.findIndex(([itemQuestion]) => itemQuestion === question);
              const isOpen = activeIndex === index;
              const answerId = `faq-answer-${index}`;
              return (
                <div key={question} className="faq-item">
                  <button
                    className={`faq-question ${isOpen ? "active" : ""}`}
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span>{question}</span>
                    <span className="faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <div className="faq-answer" id={answerId}><p>{answer}</p></div>}
                </div>
              );
            })}
            {filteredFaqs.length === 0 && <p className="faq-empty">No answer matched that search. Try a different term or contact SendIt support.</p>}
          </section>
        </div>
      </div>
    </>
  );
}
