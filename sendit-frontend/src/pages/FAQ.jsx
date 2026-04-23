import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "Is SendIt free to use?",
      answer: "Yes. The public SendIt experience is free to use for sending files and code snippets through the current workflow.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No. Basic sending and receiving can be used without registration. If account features are available, they help with history and transfer management.",
    },
    {
      question: "How long is shared content available?",
      answer: "Availability depends on the expiry option selected during upload. After the selected time window ends, the file or code should no longer remain available through the normal receive flow.",
    },
    {
      question: "How does SendIt control access?",
      answer: "SendIt uses a temporary-code workflow and separate receive pages so the intended receiver can look up content using the shared code.",
    },
    {
      question: "What file types can I share?",
      answer: "People commonly share documents, images, PDFs, compressed folders, and other everyday files. Content must still follow our terms and applicable law.",
    },
    {
      question: "What is the file size limit?",
      answer: "The allowed size depends on the current backend and hosting limits configured for SendIt. If an upload exceeds the allowed limit, the app should show that during upload.",
    },
    {
      question: "Can I remove shared content early?",
      answer: "If the active workflow exposes delete or cleanup controls for your account, you can use them. Otherwise the item should expire automatically when its retention window ends.",
    },
    {
      question: "How do I share code snippets?",
      answer: "Open the Send Code page, paste your snippet, create the share entry, and send the generated temporary code to the receiver.",
    },
    {
      question: "Can I use SendIt on mobile?",
      answer: "Yes. The frontend is responsive and the main send, receive, and support pages are designed to work on mobile browsers as well as desktop.",
    },
    {
      question: "Does SendIt show ads?",
      answer: "The site may display ads in the future after policy review and approval. If ads are enabled, the privacy policy explains cookie and advertising disclosures.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <SEO
        title="SendIt FAQ - Frequently Asked Questions"
        description="Get answers to common questions about SendIt file sharing. Learn about features, expiry, support, and how to use the platform."
        url="https://senditsystem.netlify.app/faq"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Frequently Asked Questions</h1>

          <section className="content-section">
            <p className="intro-text">
              These answers cover common questions about transfers, expiry, support, and future advertising disclosures on SendIt.
            </p>
          </section>

          <section className="faq-section">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="faq-item">
                <button
                  className={`faq-question ${activeIndex === index ? "active" : ""}`}
                  onClick={() => toggleAccordion(index)}
                  type="button"
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
