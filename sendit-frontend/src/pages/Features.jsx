import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function Features() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="SendIt Features | Temporary File & Code Sharing Platform"
        description="Explore SendIt's complete feature set: temporary file sharing with access codes, code snippet sharing with syntax highlighting, sender-set expiry options, secure transfers, and a simple user-friendly interface."
        keywords="sendit features, file sharing features, code sharing features, temporary access codes, secure file transfer, syntax highlighting, sender-set expiry"
        url="https://senditsystem.netlify.app/features"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">SendIt Features</h1>

          <section className="content-section">
            <h2>🔄 Temporary File Sharing</h2>
            <div className="feature-details">
              <p>
                SendIt's core file sharing feature is designed for one-time or short-term transfers. Upload any file type, set the expiry duration, get a temporary access code, and share it with your recipient.
              </p>
              <h3>Key Capabilities:</h3>
              <ul>
                <li><strong>Multiple File Upload</strong> - Upload 1, 10, or 100 files in a single transfer. All files are bundled under the same temporary code for streamlined sharing.</li>
                <li><strong>Drag-and-Drop Interface</strong> - Simply drag files from your computer into the upload area. No complex navigation. Works on desktop and mobile.</li>
                <li><strong>4-Digit Access Codes</strong> - Instead of long, complex URLs, recipients only need a 4-digit temporary code. Easier to share via text, phone call, or chat.</li>
                <li><strong>Customizable Expiration</strong> - Choose the expiry duration before sending, so the share stays available only as long as you intend.</li>
                <li><strong>One-Click Copy</strong> - Copy your temporary code to clipboard with a single click. Share it immediately with your recipient.</li>
                <li><strong>Progress Indication</strong> - See file upload progress in real-time. Know exactly when your files are ready to share.</li>
                <li><strong>Encryption in Transit</strong> - All file transfers use HTTPS encryption to protect your data while it moves across the internet.</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>💻 Code Snippet Sharing</h2>
            <div className="feature-details">
              <p>
                Beyond files, SendIt is perfect for developers and students who need to share code cleanly. Write or paste code snippets with proper syntax highlighting, and share them with a temporary code instead of cluttering chat applications or emails.
              </p>
              <h3>Key Capabilities:</h3>
              <ul>
                <li><strong>50+ Programming Languages</strong> - Support for Python, JavaScript, Java, C++, C#, PHP, Ruby, Go, Rust, SQL, HTML, CSS, and many more. Proper syntax highlighting for each language.</li>
                <li><strong>Real-Time Syntax Highlighting</strong> - As you type or paste code, SendIt automatically highlights syntax. Makes reviewing and sharing code much cleaner.</li>
                <li><strong>Code Formatting</strong> - Auto-format and beautify your code. Keep code indentation consistent and readable.</li>
                <li><strong>Line Numbers</strong> - Code displays with line numbers, making it easy to reference specific lines during discussion or review.</li>
                <li><strong>Code History (with Account)</strong> - Create an account to keep a history of code snippets you've shared. Revisit or re-share old snippets easily.</li>
                <li><strong>Description/Comments</strong> - Add a description or comments to your code snippet so the recipient understands the context.</li>
                <li><strong>Temporary Code Sharing</strong> - Just like file shares, code snippets use 4-digit access codes and sender-set expiry.</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>⏱️ Sender-Set Expiry & Retention Control</h2>
            <div className="feature-details">
              <p>
                One of SendIt's core strengths is sender-set expiry. Unlike services that keep files forever, SendIt gives you control over how long your shares remain active.
              </p>
              <h3>Key Capabilities:</h3>
              <ul>
                <li><strong>Multiple Expiry Options</strong> - Choose the duration that fits the share before sending. Perfect for different sharing scenarios (urgent handoff vs. longer project review).</li>
                <li><strong>Expiry-Based Cleanup</strong> - After the selected time passes, the share is no longer available to recipients.</li>
                <li><strong>Access Code Expiration</strong> - The temporary access code expires at the same time. Recipients see a "code expired" or "not found" message if they try to access after expiry.</li>
                <li><strong>Reduced Data Liability</strong> - Files don't linger indefinitely, reducing your risk of accidental data exposure.</li>
                <li><strong>Compliance Support</strong> - Sender-set expiry helps support data retention and privacy practices in education and business contexts.</li>
                <li><strong>No Ongoing Storage</strong> - SendIt doesn't store your files permanently. They're temporary by design.</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>🔐 Security & Privacy Features</h2>
            <div className="feature-details">
              <p>
                SendIt prioritizes user security and privacy. Your data is protected through multiple mechanisms designed to keep transfers secure and private.
              </p>
              <h3>Key Capabilities:</h3>
              <ul>
                <li><strong>HTTPS Encryption</strong> - All data transfers use industry-standard HTTPS encryption. Your files are protected in transit.</li>
                <li><strong>Temporary Access Codes</strong> - No permanent public URLs. Recipients need the specific code, reducing unauthorized access risk.</li>
                <li><strong>No Permanent Logs</strong> - SendIt doesn't maintain extensive logs of your transfers. Your activity remains private.</li>
                <li><strong>No Personal Data Collection</strong> - SendIt doesn't require registration for basic use. No tracking, profiling, or personal information collection beyond what's necessary.</li>
                <li><strong>No Data Selling</strong> - Your data is never sold to advertisers, marketers, or third parties.</li>
                <li><strong>Access Control</strong> - Only people with the temporary code can access your shares. Proper server-side access validation.</li>
                <li><strong>Content Validation</strong> - SendIt prohibits illegal content, copyright violations, and malware. Violations result in immediate suspension.</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>👥 User Experience & Accessibility</h2>
            <div className="feature-details">
              <p>
                SendIt is designed for simplicity and accessibility. No technical expertise required to send or receive files.
              </p>
              <h3>Key Capabilities:</h3>
              <ul>
                <li><strong>No Registration Required</strong> - Send and receive files immediately without creating an account. Fastest possible user onboarding.</li>
                <li><strong>Optional Account</strong> - Create a free account if you want transfer history, advanced settings, or better management controls.</li>
                <li><strong>Intuitive Interface</strong> - Clear send and receive pages. Obvious buttons and flows. New users understand SendIt within seconds.</li>
                <li><strong>Fully Responsive Design</strong> - Works perfectly on desktop, tablet, and mobile phones. iOS, Android, Windows, Mac—all supported.</li>
                <li><strong>Mobile Upload</strong> - Upload files from your phone. Most mobile browsers support file selection and drag-drop-like functionality.</li>
                <li><strong>Fast Performance</strong> - Optimized for speed. Uploads and downloads are quick, even on slower connections.</li>
                <li><strong>Simple Navigation</strong> - Clear menu structure. Easy to find Send, Receive, FAQ, About, and other important pages.</li>
                <li><strong>Accessibility Standards</strong> - SendIt follows web accessibility best practices. Works with screen readers and keyboard navigation.</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>📊 Account & History Features (Optional)</h2>
            <div className="feature-details">
              <p>
                While SendIt works without an account, creating one (for free) unlocks additional features for managing your shares and transfer history.
              </p>
              <h3>Key Capabilities:</h3>
              <ul>
                <li><strong>Transfer History</strong> - View a complete history of files and code snippets you've shared. See when they were uploaded and when they expire.</li>
                <li><strong>Share Management</strong> - Delete old shares before they expire. Cancel accidental shares immediately if needed.</li>
                <li><strong>Download Tracking</strong> - See when and if your recipients downloaded files or accessed code snippets (optional tracking).</li>
                <li><strong>Code Snippet Library</strong> - Keep a personal library of code snippets you've created and shared. Easily re-share or modify existing snippets.</li>
                <li><strong>Saved Preferences</strong> - Set your preferred expiry time and other settings that persist across sessions.</li>
                <li><strong>Free Account</strong> - All account features are completely free. No upgrade paths or premium tiers.</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>📱 Typical Use Cases & Scenarios</h2>
            <div className="feature-details">
              <p>
                SendIt is designed for real-world sharing scenarios where temporary access makes sense.
              </p>
              <h3>Education</h3>
              <ul>
                <li>Students sharing homework assignments with classmates</li>
                <li>Teachers distributing notes or test files to students</li>
                <li>Group projects passing files between team members</li>
                <li>Research teams sharing preliminary data with colleagues</li>
              </ul>
              <h3>Business & Teams</h3>
              <ul>
                <li>Freelancers sending deliverables to clients</li>
                <li>Remote teams passing files for rapid collaboration</li>
                <li>Marketing teams sharing draft designs for review</li>
                <li>Sales passing proposals to prospects</li>
                <li>IT departments sharing temporary credentials (encrypted)</li>
              </ul>
              <h3>Development</h3>
              <ul>
                <li>Developers sharing code snippets or scripts with colleagues</li>
                <li>Code reviews without cluttering version control systems</li>
                <li>Debugging sessions sharing error logs or stack traces</li>
                <li>Quick knowledge sharing without commit history</li>
              </ul>
              <h3>Personal Use</h3>
              <ul>
                <li>Moving files between personal devices (laptop, phone, tablet)</li>
                <li>Sharing photos with family or friends</li>
                <li>Sending large files that email can't handle</li>
                <li>Quick data transfer without account setup</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>🔄 Why SendIt vs. Alternatives</h2>
            <div className="feature-details">
              <h3>vs. Email Attachments</h3>
              <ul>
                <li>Email attachments stay in inboxes forever; SendIt files expire according to the sender-selected time</li>
                <li>Recipients can't accidentally forward your files with SendIt codes</li>
                <li>Large files that exceed email limits work fine with SendIt</li>
                <li>No storage limit concerns with email providers</li>
              </ul>
              <h3>vs. Cloud Storage (Google Drive, Dropbox)</h3>
              <ul>
                <li>SendIt is optimized for temporary sharing; cloud storage is for permanent storage</li>
                <li>No permission management with SendIt—just share a code</li>
                <li>SendIt doesn't require account creation for basic use</li>
                <li>Files expire according to the sender-selected time—no manual cleanup needed</li>
              </ul>
              <h3>vs. Generic File Sharing Services</h3>
              <ul>
                <li>SendIt's focus is temporary sharing, not permanent downloads</li>
                <li>Simple 4-digit codes are easier than complex URLs</li>
                <li>Built-in code snippet support for developers</li>
                <li>Strong privacy commitment—no data collection or selling</li>
              </ul>
            </div>
          </section>

          <section className="content-section">
            <h2>🎯 Feature Summary</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ textAlign: "left", padding: "0.8rem", fontWeight: "bold" }}>Feature</th>
                  <th style={{ textAlign: "left", padding: "0.8rem", fontWeight: "bold" }}>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>File Types</td>
                  <td style={{ padding: "0.8rem" }}>Any file type (documents, images, videos, archives, code)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>File Count</td>
                  <td style={{ padding: "0.8rem" }}>Multiple files in one transfer</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>Access Method</td>
                  <td style={{ padding: "0.8rem" }}>4-digit temporary code</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>Expiry Options</td>
                  <td style={{ padding: "0.8rem" }}>Sender-selected duration</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>Registration</td>
                  <td style={{ padding: "0.8rem" }}>Not required (optional for features)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>Cost</td>
                  <td style={{ padding: "0.8rem" }}>100% free</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>Mobile Support</td>
                  <td style={{ padding: "0.8rem" }}>Fully responsive on all devices</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>Code Sharing</td>
                  <td style={{ padding: "0.8rem" }}>50+ languages with syntax highlighting</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.8rem" }}>Security</td>
                  <td style={{ padding: "0.8rem" }}>HTTPS encryption, temporary codes, expiry-based cleanup</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
}
