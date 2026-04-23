import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

const guideSteps = [
  {
    title: "Choose the right flow",
    description:
      "Use Send File when you want to transfer documents or media. Use Send Code when you want to share a snippet that another person can look up with a short code.",
  },
  {
    title: "Set an appropriate expiry",
    description:
      "Shorter expiry windows are useful when the transfer is time-sensitive or private. Longer windows can help when the receiver may need more time.",
  },
  {
    title: "Share the code through a trusted channel",
    description:
      "A temporary code works best when you send it directly to the intended receiver using chat, email, or another communication method you already trust.",
  },
  {
    title: "Confirm the receiver used the correct page",
    description:
      "Files and code have dedicated receive pages. Sending the correct destination reduces mistakes and helps first-time visitors complete the process faster.",
  },
];

export default function SharingGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="SendIt Sharing Guide | How to Send Files and Code Safely"
        description="Learn how to use SendIt for file sharing and code sharing, including expiry choices, sharing tips, and safe usage guidance."
        keywords="sendit guide, how to use sendit, send files safely, share code snippets"
        url="https://senditsystem.netlify.app/guide"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">SendIt Sharing Guide</h1>

          <section className="content-section">
            <p className="intro-text">
              This guide explains how SendIt works, when to use each page, and what habits make temporary sharing cleaner and safer for both sender and receiver.
            </p>
          </section>

          <section className="content-section">
            <h2>How SendIt works</h2>
            <p>
              SendIt is built around a simple idea: the sender uploads a file or creates a code share, chooses an expiry window when available, and then passes a temporary code to the receiver. The receiver opens the matching receive page and enters that code to retrieve the content.
            </p>
            <p>
              This approach can be easier to explain than long download links, especially when sharing with someone who only needs the item for a short period of time.
            </p>
          </section>

          <section className="content-section">
            <h2>Step-by-step</h2>
            <div className="content-grid-two">
              {guideSteps.map((step) => (
                <article className="info-card" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>Good use cases</h2>
            <ul>
              <li>Sending notes, PDFs, and coursework to classmates</li>
              <li>Passing draft assets or documents to a client for quick review</li>
              <li>Sharing a code snippet that another developer can retrieve from a clean page</li>
              <li>Moving a temporary file between your own devices without leaving it permanently online</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Safety tips</h2>
            <ul>
              <li>Do not upload illegal, infringing, or harmful material</li>
              <li>Use shorter expiry windows for more sensitive transfers</li>
              <li>Double-check the recipient before sending the access code</li>
              <li>Avoid treating temporary sharing as long-term backup storage</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
