import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiClock, FiHash, FiLock, FiShield, FiZap, FiCheck, FiUsers, FiBook } from "react-icons/fi";
import { FileTransferIllustration } from "../components/Illustrations";
import SEO from "../components/SEO";
import posts from "../data/blogPosts.json";

const blogDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

function formatBlogDate(date) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return blogDateFormatter.format(parsedDate);
}

function Home() {
  const navigate = useNavigate();

  const homeStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "SendIt",
      description: "Free temporary file sharing and code sharing platform with secure access codes, sender-set expiry, and simple receive workflow. Share files online without long URLs.",
      url: "https://senditsystem.netlify.app",
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does SendIt work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SendIt simplifies file sharing through a temporary code system. Upload your files or code, set the expiry time, get a short access code, and share that code with recipients. They visit the receive page, enter the code, and access your content until the selected expiry time.",
          },
        },
        {
          "@type": "Question",
          name: "Who should use SendIt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SendIt is ideal for students sharing coursework, developers exchanging code snippets, teams passing client deliverables, freelancers sending proposals, and anyone needing secure temporary file access without permanent public URLs.",
          },
        },
        {
          "@type": "Question",
          name: "Is SendIt free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, SendIt is completely free to use. Upload, share, and receive files with no account required for basic functionality.",
          },
        },
        {
          "@type": "Question",
          name: "How is SendIt more secure than email?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SendIt provides temporary access based on the sender's selected expiry time. Unlike email attachments that remain in inboxes indefinitely, SendIt helps reduce long-term exposure.",
          },
        },
      ],
    },
  ];
  const latestPosts = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="page-shell">
      <SEO
        title="SendIt - Free Temporary File Sharing and Code Sharing Platform"
        description="SendIt is a secure, free file sharing and code sharing platform. Send files online with temporary access codes, sender-set expiry, and simple receive workflow. No registration required."
        keywords="file sharing, send files online, temporary file sharing, code sharing, secure file transfer, free file sharing app, temporary access code, send files with code"
        url="https://senditsystem.netlify.app"
        structuredData={homeStructuredData}
      />

      <section className="page-section">
        <div className="hero-layout">
          <div>
            <span className="si-chip">Temporary Sharing Made Simple</span>
            <h1 className="si-title" style={{ marginTop: "1rem", marginBottom: "1.4rem" }}>
              Send Files and Code
              <br />
              <span className="si-gradient-text">Securely, Without Permanent Links.</span>
            </h1>
            <p className="si-subtitle">
              SendIt provides a fast, secure way to share files and code snippets using temporary access codes with expiry set by the sender. No long URLs. No permanent storage. No registration needed for basic sharing. Perfect for students, developers, teams, and anyone who values privacy and simplicity.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <button className="si-button" onClick={() => navigate("/send")} type="button">
                Send Files <FiArrowRight />
              </button>
              <button className="si-button-secondary" onClick={() => navigate("/receive")} type="button">
                Receive File
              </button>
            </div>

            <div className="si-stats-row">
              <div className="si-stat-card">
                <div className="si-meta-label">Setup Time</div>
                <h3 style={{ marginTop: "0.35rem" }}>Under 30 seconds</h3>
              </div>
              <div className="si-stat-card">
                <div className="si-meta-label">No Account</div>
                <h3 style={{ marginTop: "0.45rem" }}>Share instantly</h3>
              </div>
              <div className="si-stat-card">
                <div className="si-meta-label">Expiry Control</div>
                <h3 style={{ marginTop: "0.45rem" }}>Set by sender</h3>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-core">
              <div className="hero-visual-illustration" aria-label="Animated file transfer illustration" role="img">
                <FileTransferIllustration />
              </div>
            </div>
            <div className="hero-floating-card">
              <div className="hero-floating-top">
                <span className="si-chip">Secure Transfer</span>
                <span className="hero-floating-status">Online</span>
              </div>
              <div className="hero-floating-metrics">
                <div>
                  <div className="si-meta-label">Method</div>
                  <strong>Temporary Code</strong>
                </div>
                <div>
                  <div className="si-meta-label">Expiry</div>
                  <strong>Sender-set</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use SendIt Section */}
      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">Why Choose SendIt</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>The Secure Alternative to Email and Cloud Storage</h2>
          <p className="si-subtitle" style={{ marginTop: "0.8rem", fontSize: "1.05rem" }}>
            Traditional file sharing methods leave data exposed indefinitely. SendIt lets the sender choose how long access should stay available.
          </p>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <FiClock className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Sender-Set Expiry</h3>
            <p>The sender chooses how long the share should remain available, so access is intentional from the start.</p>
          </div>

          <div className="si-card span-2">
            <FiLock className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Temporary Access Codes</h3>
            <p>Recipients only need a short 4-digit code—not a long URL. Easier to share securely via text, chat, or voice without exposing sensitive download links.</p>
          </div>

          <div className="si-card span-2">
            <FiShield className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Privacy First</h3>
            <p>No account tracking. No permanent logs. No marketing. Your files are transferred and deleted according to your expiry choice.</p>
          </div>

          <div className="si-card span-3">
            <FiHash className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Simple Receive Workflow</h3>
            <p className="si-subtitle" style={{ fontSize: "1rem", maxWidth: "unset" }}>
              Recipients don't need to understand download links or navigate complex interfaces. They visit the receive page, enter the code, and access the content. Ideal for non-technical users, classmates, and teams.
            </p>
          </div>

          <div className="si-card span-3" style={{ background: "linear-gradient(135deg, var(--si-primary-deep), var(--si-primary))", color: "#fff" }}>
            <FiZap className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem", color: "#fff" }}>Fast & Free</h3>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.8 }}>
              No registration. No payment. No limits on free sharing. Upload, share the code, done. SendIt focuses on speed and accessibility over complex features.
            </p>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">Use Cases</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Perfect for Real-World Sharing Scenarios</h2>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <FiBook className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Education</h3>
            <p><strong>Students & Teachers:</strong> Share coursework, assignments, lecture notes, and projects with classmates without creating permanent downloads. Expiry ensures compliance with data retention policies.</p>
          </div>

          <div className="si-card span-2">
            <FiUsers className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Teams & Collaboration</h3>
            <p><strong>Remote Teams:</strong> Pass client deliverables, design drafts, and project files quickly. Code developers can share code snippets with syntax highlighting and history tracking.</p>
          </div>

          <div className="si-card span-2">
            <FiCheck className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Business</h3>
            <p><strong>Freelancers & Agencies:</strong> Send proposals, invoices, and sample work to clients with controlled, time-limited access.</p>
          </div>

          <div className="si-card span-3">
            <FiLock className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Personal Use</h3>
            <p><strong>File Transfer Between Devices:</strong> Quickly move files between your laptop, phone, or tablet. Share photos with friends who only need temporary access. Transfer large files that email can't handle.</p>
          </div>

          <div className="si-card span-3">
            <FiArrowRight className="inline-icon" size={34} />
            <h3 style={{ marginTop: "1rem" }}>Development</h3>
            <p><strong>Developers:</strong> Share code snippets, debug sessions, and scripts without cluttering chat threads. Syntax highlighting and code formatting make sharing clean and professional.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">How It Works</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Three Simple Steps to Secure Sharing</h2>
          <p className="si-subtitle" style={{ marginTop: "0.8rem" }}>
            SendIt is designed for speed and clarity. No confusing options. No steep learning curve. Just upload, share, and receive.
          </p>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <div style={{ fontSize: "2.4rem", fontWeight: "bold", color: "var(--si-primary)", marginBottom: "1rem" }}>1</div>
            <h3>Upload or Create</h3>
            <p>Choose "Send File" to upload documents, images, or any file. Choose "Send Code" to share a code snippet. Then set the expiry time before sending.</p>
          </div>

          <div className="si-card span-2">
            <div style={{ fontSize: "2.4rem", fontWeight: "bold", color: "var(--si-primary)", marginBottom: "1rem" }}>2</div>
            <h3>Get Your Code</h3>
            <p>SendIt generates a 4-digit temporary access code. Copy it with one click. Share it via text, email, Slack, or any communication method.</p>
          </div>

          <div className="si-card span-2">
            <div style={{ fontSize: "2.4rem", fontWeight: "bold", color: "var(--si-primary)", marginBottom: "1rem" }}>3</div>
            <h3>Recipient Receives</h3>
            <p>The receiver visits the matching receive page, enters your code, and downloads or views the content. The content stays available while the share is still active.</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">What You Get</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Powerful Features Built for Simplicity</h2>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <h4 style={{ marginBottom: "0.8rem" }}>✓ Multiple File Upload</h4>
            <p>Upload multiple files at once. All files are bundled under one temporary code for the receiver.</p>
          </div>

          <div className="si-card span-2">
            <h4 style={{ marginBottom: "0.8rem" }}>✓ Syntax Highlighting</h4>
            <p>Share code in 50+ programming languages with proper syntax highlighting. Makes code review and collaboration easier.</p>
          </div>

          <div className="si-card span-2">
            <h4 style={{ marginBottom: "0.8rem" }}>✓ Drag-and-Drop Upload</h4>
            <p>Simple drag-and-drop interface. No complex navigation. Upload in seconds from desktop or mobile.</p>
          </div>

          <div className="si-card span-2">
            <h4 style={{ marginBottom: "0.8rem" }}>✓ Share History (Optional)</h4>
            <p>Sign in to track your transfer history, manage old shares, and revisit code snippets you've sent.</p>
          </div>

          <div className="si-card span-2">
            <h4 style={{ marginBottom: "0.8rem" }}>✓ Mobile Friendly</h4>
            <p>Full responsive design. Send and receive on any device—phone, tablet, or desktop browser.</p>
          </div>

          <div className="si-card span-2">
            <h4 style={{ marginBottom: "0.8rem" }}>✓ Customizable Expiry</h4>
            <p>Choose the expiry duration yourself before creating the share. Full control stays with the sender.</p>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="page-section" >
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">Security & Privacy</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Your Data Is Protected</h2>
        </div>

        <div className="feature-bento">
          <div className="si-card span-3">
            <h3 style={{ marginTop: "0", marginBottom: "0.8rem" }}>Temporary Codes, Not Permanent URLs</h3>
            <p>Unlike traditional file-sharing services that generate permanent download links, SendIt uses temporary codes that expire. Once your expiry time passes, files are no longer accessible through any means.</p>
          </div>

          <div className="si-card span-3">
            <h3 style={{ marginTop: "0", marginBottom: "0.8rem" }}>No Unnecessary Data Collection</h3>
            <p>SendIt doesn't track personal information beyond what's needed to deliver your files. No marketing databases. No selling your data. Your privacy is paramount.</p>
          </div>

          <div className="si-card span-3">
            <h3 style={{ marginTop: "0", marginBottom: "0.8rem" }}>Compliant & Secure</h3>
            <p>SendIt follows web security best practices. Your transfers are protected with security headers, proper access controls, and industry-standard encryption during transit.</p>
          </div>

          <div className="si-card span-3">
            <h3 style={{ marginTop: "0", marginBottom: "0.8rem" }}>No Permanent Logs</h3>
            <p>Temporary uploads mean temporary records. We don't maintain extensive logs of your transfers, keeping your activity private and reducing data exposure risks.</p>
          </div>

          <div className="si-card span-3">
            <h3 style={{ marginTop: "0", marginBottom: "0.8rem" }}>Why SendIt Is Better Than Email</h3>
            <p>Email attachments stay forever. Recipients can forward your files to anyone. SendIt keeps sharing tied to the sender's selected access duration.</p>
          </div>

          <div className="si-card span-3">
            <h3 style={{ marginTop: "0", marginBottom: "0.8rem" }}>Why SendIt Is Better Than Cloud Storage</h3>
            <p>Cloud services often default to "keep forever." SendIt keeps each share tied to the expiry duration selected during sending.</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">Best Practices</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Maximize Security with Smart Sharing Habits</h2>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <FiClock className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>1. Choose Short Expiry for Sensitive Data</h3>
            <p>Sharing confidential information? Choose the shortest practical expiry for that situation to reduce the access window.</p>
          </div>

          <div className="si-card span-2">
            <FiShield className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>2. Share Codes Through Trusted Channels</h3>
            <p>Don't post the code publicly. Send it directly via email, text, Slack, or another secure method to ensure only intended recipients access your files.</p>
          </div>

          <div className="si-card span-2">
            <FiCheck className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>3. Confirm Recipient Before Sending</h3>
            <p>Double-check you're sharing with the right person. Once the code is shared, anyone with that code can access your files.</p>
          </div>

          <div className="si-card span-2">
            <FiLock className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>4. Don't Upload Illegal Content</h3>
            <p>SendIt is for legitimate file sharing. Never upload copyrighted material, malware, or illegal content. Violations may result in account suspension.</p>
          </div>

          <div className="si-card span-2">
            <FiArrowRight className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>5. Use for Temporary Sharing Only</h3>
            <p>SendIt is not a backup service. Use it for short-term transfers, not permanent storage. Your files will expire and be deleted.</p>
          </div>

          <div className="si-card span-2">
            <FiZap className="inline-icon" size={30} />
            <h3 style={{ marginTop: "1rem" }}>6. Test with Non-Sensitive Data First</h3>
            <p>New to SendIt? Try a test transfer with a simple file first to understand the flow before sharing important documents.</p>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="page-section">
        <div style={{ marginBottom: "1.6rem" }}>
          <span className="si-chip">Learn More</span>
          <h2 className="si-heading" style={{ marginTop: "1rem" }}>Complete Resources for Every Question</h2>
          <p className="si-subtitle" style={{ marginTop: "1rem" }}>
            SendIt is transparent about its features, limits, and policies. Read our guides, FAQs, and legal documents to understand exactly how the platform works and what to expect.
          </p>
        </div>

        <div className="feature-bento">
          <div className="si-card span-2">
            <h3>📖 Sharing Guide</h3>
            <p>Step-by-step instructions on how to use SendIt, including detailed explanations of file sharing, code sharing, expiry options, and common use cases for different scenarios.</p>
            <Link className="inline-resource-link" to="/guide">Read Full Guide</Link>
          </div>

          <div className="si-card span-2">
            <h3>❓ Frequently Asked Questions</h3>
            <p>Answers to common questions about file sizes, expiry windows, account features, mobile support, ad policies, and troubleshooting. Get instant answers to what you want to know.</p>
            <Link className="inline-resource-link" to="/faq">View FAQ</Link>
          </div>

          <div className="si-card span-2">
            <h3>ℹ️ About SendIt</h3>
            <p>Learn what SendIt does, who built it, the problem it solves, and why the product focuses on temporary sharing instead of permanent storage. Meet the team behind the platform.</p>
            <Link className="inline-resource-link" to="/about">Learn About Us</Link>
          </div>

          <div className="si-card span-2">
            <h3>⚙️ All Features</h3>
            <p>Comprehensive breakdown of file sharing features, code sharing capabilities, expiry controls, and typical use cases for students, teams, developers, and businesses.</p>
            <Link className="inline-resource-link" to="/features">Explore Features</Link>
          </div>

          <div className="si-card span-2">
            <h3>🔒 Privacy & Security</h3>
            <p>Read our privacy policy, terms of service, and security practices. Understand exactly how SendIt protects your data, handles temporary files, and ensures user privacy.</p>
            <div className="home-resource-stack">
              <Link className="inline-resource-link" to="/privacy">Privacy Policy</Link>
              <Link className="inline-resource-link" to="/terms">Terms of Service</Link>
            </div>
          </div>

          <div className="si-card span-2">
            <h3>📚 SendIt Blog</h3>
            <p>Original in-depth guides on secure transfers, encryption, temporary access codes, QR sharing, file expiry policies and the sharing habits that prevent data leaks.</p>
            <Link className="inline-resource-link" to="/blog">Read the Blog</Link>
          </div>

          <div className="si-card span-2">
            <h3>💬 Contact & Support</h3>
            <p>Have questions about SendIt? Run into an issue? Want to provide feedback? Reach out to our team directly. We respond to all support inquiries promptly.</p>
            <Link className="inline-resource-link" to="/contact">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="page-section " aria-labelledby="home-blog-title">
        <div className="home-blog-header">
          <div className="home-blog-header-copy">
            <span className="si-chip">From the Blog</span>
            <h2 id="home-blog-title" className="si-heading">Guides on sharing files and code safely</h2>
            <p className="si-subtitle">
              Practical, original writing about moving files between people without leaving copies behind.
            </p>
          </div>

          <Link className="si-button-secondary home-blog-header-link" to="/blog">
            Browse all articles <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="home-blog-grid">
          {latestPosts.map((post, index) => (
            <Link
              aria-label={`Read article: ${post.title}`}
              className="home-blog-card"
              key={post.slug}
              to={`/blog/${post.slug}`}
            >
              <div className="home-blog-card-top">
                <span className="home-blog-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="home-blog-tag">{post.tags?.[0] || "Guide"}</span>
              </div>

              <h3>{post.title}</h3>
              <p>{post.description}</p>

              <div className="home-blog-meta">
                <span>
                  <FiCalendar aria-hidden="true" />
                  {formatBlogDate(post.date)}
                </span>
                <span>
                  <FiClock aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>

              <span className="home-blog-read">
                Read article <FiArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-section">
        <div className="si-panel home-cta">
          <h2>Ready to Share Securely?</h2>
          <p>
            Start sharing files and code snippets with temporary access codes today. No registration. No payment. No strings attached.
          </p>
          <button className="si-button home-cta-button" onClick={() => navigate("/send")} type="button">
            Send a File Now <FiArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
