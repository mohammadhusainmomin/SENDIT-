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
      answer: "Yes, SendIt is completely free to use. You can share files and code without any subscription or hidden fees."
    },
    {
      question: "Do I need to create an account?",
      answer: "No, you don't need to create an account. SendIt is designed to work without registration. However, creating an account allows you to track your file history and manage your transfers."
    },
    {
      question: "How long are shared links valid?",
      answer: "Shared links are valid for a period of time that you can customize (typically 24 hours by default). After expiration, the link will no longer be accessible."
    },
    {
      question: "Is my data encrypted?",
      answer: "Yes, all file transfers are encrypted during transmission. We use industry-standard encryption protocols to ensure your data remains secure."
    },
    {
      question: "What file types can I share?",
      answer: "You can share any file type including documents, images, videos, code files, and more. There are no restrictions on file types."
    },
    {
      question: "What is the file size limit?",
      answer: "File size limits depend on your account type. Free users can typically upload files up to a certain size, while premium users may have higher limits."
    },
    {
      question: "Can I delete a shared file before the link expires?",
      answer: "Yes, you can delete shared files at any time. Once deleted, the shared link will no longer be accessible for download."
    },
    {
      question: "How do I share code snippets?",
      answer: "Use the 'Send Code' feature to paste your code. It will automatically apply syntax highlighting based on the programming language. Share the generated link with others."
    },
    {
      question: "Is there a bandwidth limit?",
      answer: "We don't impose strict bandwidth limits, but we reserve the right to limit excessive usage. Normal usage is unlimited."
    },
    {
      question: "Can I set a password for shared links?",
      answer: "Yes, you can set optional passwords for shared links to add an extra layer of security. Recipients must enter the password to access the file."
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <SEO
        title="SendIt FAQ - Frequently Asked Questions"
        description="Get answers to common questions about SendIt file sharing. Learn about features, security, limits, and how to use our platform."
        url="https://sendit.example.com/faq"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">Frequently Asked Questions</h1>
          
          <section className="content-section">
            <p className="intro-text">
              Can't find the answer you're looking for? Contact our support team.
            </p>
          </section>

          <section className="faq-section">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${activeIndex === index ? "active" : ""}`}
                  onClick={() => toggleAccordion(index)}
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
