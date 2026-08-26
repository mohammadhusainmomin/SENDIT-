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
      answer: "Yes, SendIt is completely free. There are no hidden fees, no premium tiers, and no payment required to send or receive files. We don't charge per file, per download, or for storage. SendIt is designed to be accessible to everyone, from students to small teams to individual users. Simply visit the site, upload your files or code, share the temporary code, and you're done—all without signing up for an account or entering payment information.",
    },
    {
      question: "Do I need to create an account to use SendIt?",
      answer: "No account is required for basic file and code sharing. You can immediately send a file, receive a file, or share a code snippet without registration. However, creating an optional account provides additional features like transfer history, the ability to manage past shares, and access to advanced settings. Your choice—use SendIt anonymously for quick sharing, or sign in for more control and record-keeping.",
    },
    {
      question: "How does the temporary code system work?",
      answer: "After you upload a file or create a code share, SendIt generates a 4-digit temporary access code. Instead of sending a long URL that stays active forever, you simply share this short code with your recipient through email, text, chat, or any secure channel. The recipient visits the matching receive page, enters the code, and accesses your content until the sender-selected expiry time passes.",
    },
    {
      question: "How long is shared content available?",
      answer: "You choose how long your share remains active when you upload. Select the expiry duration that fits the share before sending. After the selected time passes, the file or code share becomes inaccessible. The recipient will see an 'expired' or 'not found' message if they try to access it after expiry.",
    },
    {
      question: "What file types can I share with SendIt?",
      answer: "You can share virtually any file type: documents (PDF, DOC, DOCX), images (JPG, PNG, GIF), videos (MP4, MOV), audio files (MP3, WAV), compressed archives (ZIP, RAR), spreadsheets (XLS, CSV), presentations (PPT), code files (TXT, JS, PY, Java), and more. The platform is agnostic to file type. However, you are responsible for ensuring the content you share is legal and complies with SendIt's terms of service. Don't upload copyrighted material, malware, or any content that violates laws or our policies.",
    },
    {
      question: "What is the file size limit?",
      answer: "SendIt's current file size limits depend on your hosting configuration. Typically, users can upload files up to a reasonable size for web transfers. If you attempt to upload a file that exceeds the limit, the app will display an error message before processing your upload. If you frequently transfer large files, consider compressing them into a ZIP archive to reduce size, or contact SendIt support for guidance on optimal file sizes for your use case.",
    },
    {
      question: "Can I upload multiple files at once?",
      answer: "Yes! SendIt supports uploading multiple files in a single transfer. Simply select or drag multiple files into the upload area on the Send File page. All files are packaged under the same temporary code, so the recipient can download them all at once. This is convenient for sharing project folders, multiple documents, or collections of images with one simple access code.",
    },
    {
      question: "Can I delete or remove a share after I've created it?",
      answer: "If you're signed into your SendIt account, you can manage your shares and remove them before expiry. Visit your account dashboard or history section to find the share and delete it manually. If you're not signed in, you cannot retrieve or delete a share once it's created—you'll need to wait for sender-set expiry. This is why creating an account is useful if you need more control over your shares.",
    },
    {
      question: "How do I share code snippets with syntax highlighting?",
      answer: "Visit the 'Send Code' page, paste your code into the editor, and select the programming language (Python, JavaScript, Java, C++, etc.) for proper syntax highlighting. Write an optional description so the recipient understands the context. Set your preferred expiry time. Click send, copy the generated temporary code, and share it with the recipient. They visit the 'Receive Code' page, enter the code, and see your beautifully highlighted snippet. This is much cleaner than pasting code directly into chat applications.",
    },
    {
      question: "Is SendIt secure? How is my data protected?",
      answer: "SendIt prioritizes security and privacy through several mechanisms: (1) Temporary access codes ensure files are not accessible via public URLs; (2) Files remain available only for the sender-selected time window; (3) All transfers use HTTPS encryption to protect data in transit; (4) We maintain minimal logs and don't track personal information; (5) SendIt doesn't sell your data to third parties; (6) The platform follows web security best practices including proper access controls and security headers. For maximum security, use shorter expiry times for sensitive data and share codes through trusted channels only.",
    },
    {
      question: "How is SendIt different from email attachment sharing?",
      answer: "Email attachments have several limitations: they remain in email inboxes indefinitely, recipients can forward your files to anyone, attachments count against storage limits, and removing old emails doesn't guarantee server-side deletion. SendIt improves on this by: (1) letting the sender choose the share expiry; (2) requiring temporary access codes instead of permanent URLs; (3) not cluttering email inboxes; (4) providing a cleaner, more intentional sharing experience. For sensitive information, SendIt is a more privacy-conscious choice than email.",
    },
    {
      question: "How is SendIt different from cloud storage like Google Drive or Dropbox?",
      answer: "Cloud storage services are designed for permanent, long-term file management. Their default behavior is to keep files forever. You must manually manage shares, adjust permissions, and clean up old files. SendIt is optimized for temporary, short-lived sharing: the sender selects the expiry time; no permission management needed; no account required for basic use; simpler interface focused solely on sharing. Cloud storage is better for ongoing projects and long-term collaboration.",
    },
    {
      question: "Can I use SendIt on mobile devices?",
      answer: "Yes! SendIt is fully responsive and works on smartphones and tablets. The interface adapts to smaller screens, drag-and-drop upload is simplified for touch devices, and all functionality is accessible from mobile browsers. Whether you're on iOS or Android, you can send files, receive files, and share code snippets just as easily as on desktop. The responsive design ensures a smooth experience across all devices.",
    },
    {
      question: "Does SendIt track my transfer history?",
      answer: "If you're not signed in, SendIt doesn't track your transfers beyond the immediate session. If you create a free account, you can optionally keep a history of shares you've sent and received. This history helps you manage shares, see when files were downloaded, and reference past transfers. You can delete individual transfers from your history at any time. Your privacy is respected—history data is not sold or shared with third parties.",
    },
    {
      question: "What happens to files after they expire?",
      answer: "After your selected expiry time passes, the temporary access code stops working. Recipients who try to access the share will see an error message or 'not found' page. If you need to share the same file again, you must create a new share with a new temporary code.",
    },
    {
      question: "Can someone access my share if they guess the code?",
      answer: "SendIt uses 4-digit access codes, which provides a reasonable level of protection combined with the temporary nature of shares. While theoretically someone could guess a code, the combination of: (1) sender-selected time windows; (2) temporary codes that stop working after expiry; (3) the fact that codes are not sequential or predictable; makes unauthorized access unlikely. For maximum security, share your code only through trusted channels and use shorter expiry times for sensitive data.",
    },
    {
      question: "What if I accidentally share my code with the wrong person?",
      answer: "If you haven't signed in to an account, you cannot revoke access to a share once created—the only option is to wait for it to expire. This is why setting a short expiry time is wise for sensitive shares. If you're signed in to an account, you can delete the share immediately to stop access. To prevent mistakes: (1) double-check the recipient before sending; (2) share codes only through private, secure channels; (3) use short expiry times; (4) create an account for better control.",
    },
    {
      question: "Does SendIt show advertisements?",
      answer: "SendIt is currently in a monitoring phase with Google AdSense for policy compliance. Once approved, SendIt may display non-intrusive advertisements to support site operations. We are committed to following Google's publisher policies, which prohibit low-value content, copyright violations, and harmful material. Any ads shown will be clearly identifiable and compliant with AdSense policies. Our privacy policy explains how cookies and ad-related data are handled. You can review our full privacy policy and terms of service for more details.",
    },
    {
      question: "Who owns SendIt and how is it maintained?",
      answer: "SendIt is built and maintained by a dedicated team of developers committed to secure, temporary file sharing. The platform is actively maintained with regular security updates, feature improvements, and bug fixes. We take privacy and user trust seriously. If you have questions about the team or want to know more about SendIt's background, visit the About page for team information and project details.",
    },
    {
      question: "I found a bug or security issue. How do I report it?",
      answer: "Please contact the SendIt team immediately with details about the issue. Visit the Contact page to send us a message, or email us directly with a description of the bug, steps to reproduce it, and any relevant screenshots. We take all security reports seriously and will investigate promptly. Responsible disclosure helps us improve the platform for everyone.",
    },
    {
      question: "What are SendIt's terms of service and privacy policy?",
      answer: "SendIt has comprehensive Terms of Service and Privacy Policy documents that explain our service, your rights, and how we handle data. Key points: (1) You must not upload illegal, infringing, or harmful content; (2) SendIt is provided 'as-is' without guarantees; (3) We don't track excessive personal data; (4) files are temporary and governed by the sender-selected expiry time; (5) We comply with applicable laws. Read the full documents on our Terms and Privacy pages to understand exactly what you're agreeing to when you use SendIt.",
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
        url="https://senditsystem.in/faq"
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
