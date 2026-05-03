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
        title="SendIt Sharing Guide | How to Send & Receive Files Safely"
        description="Complete step-by-step guide to using SendIt for temporary file sharing and code sharing. Learn best practices, security tips, and common scenarios."
        keywords="sendit guide, how to use sendit, send files safely, share code snippets, temporary sharing"
        url="https://senditsystem.netlify.app/guide"
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">SendIt Sharing Guide</h1>

          <section className="content-section">
            <p className="intro-text">
              This comprehensive guide explains how SendIt works, when to use each feature, and best practices for secure temporary sharing. Whether you're sharing homework with classmates, files with clients, or code with colleagues, this guide has you covered.
            </p>
          </section>

          <section className="content-section">
            <h2>Understanding SendIt's Approach</h2>
            <p>
              SendIt is built around a simple philosophy: <strong>temporary sharing should be as easy as permanent sharing</strong>. Instead of learning complex permission systems or dealing with permanent public links, SendIt uses a straightforward temporary code approach.
            </p>
            <p>
              Here's the core flow:
            </p>
            <ol>
              <li><strong>Sender uploads</strong> a file or creates a code share on SendIt</li>
              <li><strong>SendIt generates</strong> a 4-digit temporary access code</li>
              <li><strong>Sender shares the code</strong> via email, text, chat, or voice with intended recipient(s)</li>
              <li><strong>Recipient visits</strong> the matching receive page (file or code)</li>
              <li><strong>Recipient enters the code</strong> and accesses the content</li>
              <li><strong>After expiry</strong>, the file/code becomes inaccessible</li>
            </ol>
            <p>
              No permanent URLs. No permission systems. No confusing settings. Just upload, share the code, and let SendIt handle the rest.
            </p>
          </section>

          <section className="content-section">
            <h2>📤 How to Send a File: Step-by-Step</h2>
            <p>
              Follow these steps to share files using SendIt:
            </p>
            <h3>Step 1: Visit the Send File Page</h3>
            <p>
              Go to senditsystem.netlify.app/send to access the file sharing interface. You'll see an upload area where you can add files.
            </p>
            <h3>Step 2: Upload Your Files</h3>
            <p>
              You have two options to add files:
            </p>
            <ul>
              <li><strong>Click the upload button</strong> to open your file browser and select files</li>
              <li><strong>Drag-and-drop files</strong> directly into the upload area (drag files from your desktop/folder and drop them)</li>
            </ul>
            <p>
              You can upload multiple files at once. All files will be bundled under a single temporary code. See the file list update as you add files. Check file sizes and ensure nothing exceeds SendIt's limits.
            </p>
            <h3>Step 3: Set an Expiry Time</h3>
            <p>
              Before sharing, select how long the files should remain available. Choose the duration that fits your recipient's actual need.
            </p>
            <p>
              <em>Pro tip:</em> For sensitive data (contracts, credentials, personal information), choose a shorter expiry window.
            </p>
            <h3>Step 4: Generate Your Temporary Code</h3>
            <p>
              Click the "Send" or "Generate Code" button. SendIt creates your temporary code and displays it prominently on the page. You'll see a 4-digit code (e.g., 1234).
            </p>
            <h3>Step 5: Copy and Share the Code</h3>
            <p>
              Click the copy icon next to your code to copy it to your clipboard. Now share this code with your recipient through a secure channel:
            </p>
            <ul>
              <li>Email</li>
              <li>Text message (SMS)</li>
              <li>Slack, Discord, or other chat apps</li>
              <li>Face-to-face or phone call</li>
              <li>Any trusted communication method</li>
            </ul>
            <p>
              <strong>Important:</strong> Also tell the recipient to visit the receive file page and enter the code there. Provide clear instructions like: "Go to senditsystem.netlify.app/receive and enter code 1234."
            </p>
            <h3>Step 6: Recipient Accesses the Files</h3>
            <p>
              Your recipient visits the receive page, enters the code, and downloads all files at once. That's it!
            </p>
          </section>

          <section className="content-section">
            <h2>📥 How to Receive a File: Step-by-Step</h2>
            <h3>Step 1: Visit the Receive File Page</h3>
            <p>
              Go to senditsystem.netlify.app/receive to access the file receive interface. You'll see an input field for the temporary code.
            </p>
            <h3>Step 2: Enter the Temporary Code</h3>
            <p>
              The sender will give you a 4-digit code. Enter it in the provided input field. The code might be shared via email, text, chat, or verbally.
            </p>
            <h3>Step 3: View the Files</h3>
            <p>
              After entering the correct code, you'll see a list of all files the sender uploaded. The list shows filenames, file types, and file sizes so you know what you're downloading.
            </p>
            <h3>Step 4: Download the Files</h3>
            <p>
              Click on any file to download it, or look for a "Download All" button to download everything at once (as a ZIP archive). Your browser's normal download process applies.
            </p>
            <h3>Step 5: Check Expiry Information</h3>
            <p>
              The receive page displays when the files will expire. For example: "Files expire in 23 hours" or "Available until Friday 5:00 PM". Once expiry passes, the code stops working.
            </p>
          </section>

          <section className="content-section">
            <h2>💻 How to Share Code Snippets: Step-by-Step</h2>
            <h3>Step 1: Visit the Send Code Page</h3>
            <p>
              Go to senditsystem.netlify.app/code/send to access the code sharing interface. You'll see a text editor and settings for your snippet.
            </p>
            <h3>Step 2: Paste or Type Your Code</h3>
            <p>
              In the code editor, paste the code snippet you want to share. You can also type directly if it's a small snippet.
            </p>
            <h3>Step 3: Select Programming Language</h3>
            <p>
              From the language dropdown, select the programming language your code is written in (Python, JavaScript, Java, C++, SQL, HTML, CSS, etc.). SendIt will apply syntax highlighting for that language.
            </p>
            <h3>Step 4: Add a Description (Optional)</h3>
            <p>
              Write a brief description or comment explaining what the code does, why you're sharing it, or any context the recipient needs. This helps recipients understand the code without having to ask follow-up questions.
            </p>
            <h3>Step 5: Choose an Expiry Time</h3>
            <p>
              Select how long the code snippet should be available before generating the share code.
            </p>
            <h3>Step 6: Generate and Share</h3>
            <p>
              Click send. SendIt generates a temporary code for your snippet. Copy the code and share it with recipients through email, chat, or other secure channels.
            </p>
            <h3>Step 7: Recipient Accesses the Code</h3>
            <p>
              The recipient visits senditsystem.netlify.app/code/receive, enters your code, and sees the code snippet with proper syntax highlighting, ready for review or copying.
            </p>
          </section>

          <section className="content-section">
            <h2>🔒 Security Best Practices</h2>
            <h3>1. Use Short Expiry Times for Sensitive Data</h3>
            <p>
              If sharing confidential information (passwords, API keys, contracts, medical records), use a short sender-selected expiry. This minimizes the window for unauthorized access.
            </p>
            <h3>2. Share Codes Through Trusted Channels Only</h3>
            <p>
              Never post your temporary code on social media, public forums, or untrusted websites. Always share via:
            </p>
            <ul>
              <li>Direct email or text to a specific person</li>
              <li>Private Slack/Discord messages</li>
              <li>Phone call or in-person conversation</li>
              <li>Any communication method where you control who receives the code</li>
            </ul>
            <h3>3. Double-Check Recipient Identity</h3>
            <p>
              Before sending an access code, confirm you're sending to the right person. If sharing via email, verify the email address. For phone shares, confirm the recipient's identity.
            </p>
            <h3>4. Don't Upload Illegal or Harmful Content</h3>
            <p>
              SendIt is for legitimate sharing. Never upload copyrighted material, malware, hacking tools, or content that violates laws. Violations may result in account suspension.
            </p>
            <h3>5. Don't Use SendIt for Long-Term Storage</h3>
            <p>
              SendIt is for temporary sharing, not backup. Don't rely on SendIt to keep files forever. Use actual backup services for important data you need permanently.
            </p>
            <h3>6. Understand Recipient Limitations</h3>
            <p>
              Once the recipient has your code, they can potentially share it with others. If the code is widely known, anyone with it can access your files. Use short expiry times and trusted sharing for sensitive data.
            </p>
          </section>

          <section className="content-section">
            <h2>💡 Common Use Case Examples</h2>
            <h3>Example 1: Student Sharing Homework with Classmates</h3>
            <p>
              Sarah has a completed assignment (PDF) she wants to share with her study group. Here's what she does:
            </p>
            <ol>
              <li>Visits SendIt send file page</li>
              <li>Uploads her homework.pdf file</li>
              <li>Sets an expiry that gives everyone time to review</li>
              <li>Generates code: 5847</li>
              <li>Sends a group text: "Here's the homework for review. Go to senditsystem.netlify.app/receive and enter code 5847"</li>
              <li>Classmates receive the code, visit the receive page, enter the code, and download the PDF</li>
              <li>After the selected expiry time, the file is no longer available</li>
            </ol>
            <h3>Example 2: Developer Sharing Code Review</h3>
            <p>
              Marcus found a bug in production. He wants to share a debug script with his team:
            </p>
            <ol>
              <li>Visits SendIt send code page</li>
              <li>Pastes his debug script (Python)</li>
              <li>Selects "Python" language for syntax highlighting</li>
              <li>Adds description: "Bug fix for login issue. Apply to prod env."</li>
              <li>Sets a short expiry for the urgent fix</li>
              <li>Generates code and posts in team Slack: "Debug script ready: code 3921"</li>
              <li>Team members visit code receive page, enter the code, see the highlighted script</li>
              <li>After the selected expiry time, the code is removed</li>
            </ol>
            <h3>Example 3: Freelancer Sending Client Deliverable</h3>
            <p>
              Lisa completed a design project for a client. She wants to share high-resolution design files:
            </p>
            <ol>
              <li>Visits SendIt send file page</li>
              <li>Uploads design_final.zip (contains all design files)</li>
              <li>Sets an expiry that gives the client enough time to review</li>
              <li>Generates code: 6234</li>
              <li>Emails client: "Your design deliverable is ready. Download it here [link] using code 6234. Files are available until the selected expiry time."</li>
              <li>Client visits the link, enters the code, downloads the ZIP file</li>
              <li>Client can re-download while the share is active</li>
              <li>After the selected expiry time, files are no longer available</li>
            </ol>
            <h3>Example 4: Personal Device File Transfer</h3>
            <p>
              Rajesh wants to move a large video file from his laptop to his phone:
            </p>
            <ol>
              <li>On his laptop, visits SendIt send file page</li>
              <li>Uploads the large_video.mp4 file</li>
              <li>Sets an expiry long enough to download later</li>
              <li>Generates code and writes it down: 4821</li>
              <li>On his phone, visits SendIt receive page</li>
              <li>Enters code 4821</li>
              <li>Downloads the video file to his phone</li>
              <li>After the selected expiry time, the file is no longer available</li>
            </ol>
          </section>

          <section className="content-section">
            <h2>⚡ Quick Tips for Great Sharing</h2>
            <ul>
              <li><strong>Test with Small Files First</strong> - If you're new to SendIt, try uploading a test file first to understand the flow.</li>
              <li><strong>Communicate Clearly</strong> - Tell recipients exactly where to go and what code to enter. Include the complete instructions.</li>
              <li><strong>Set Appropriate Expiry</strong> - Think about how much time the recipient actually needs. Shorter expiry = better security.</li>
              <li><strong>Provide Context</strong> - For code snippets or complex files, add a description so recipients understand what they're receiving.</li>
              <li><strong>Verify Downloads</strong> - For important files, confirm the recipient was able to download successfully.</li>
              <li><strong>Use for One-Time Sharing</strong> - SendIt is perfect for one-off transfers. For ongoing collaboration, consider cloud storage or shared folders.</li>
              <li><strong>Keep Codes Private</strong> - Treat temporary codes like passwords. Share only with intended recipients through secure channels.</li>
              <li><strong>Create an Account for History</strong> - If you share frequently, create a free account to track your past shares.</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>❓ Troubleshooting</h2>
            <h3>Problem: Upload Fails or Is Slow</h3>
            <p>
              Try: Check your internet connection, use smaller files, clear your browser cache, or try a different browser.
            </p>
            <h3>Problem: Recipient Gets "Code Not Found" or "Expired" Message</h3>
            <p>
              Possible causes: Code was entered incorrectly, share has already expired, code was never created successfully. Generate a new share if needed.
            </p>
            <h3>Problem: File Size Is Too Large</h3>
            <p>
              Try compressing files using ZIP (Windows) or Archive Utility (Mac). Or split large files into smaller chunks and share separately.
            </p>
            <h3>Problem: Can't Delete a Share</h3>
            <p>
              If you're not signed in, you cannot delete shares—they expire according to the sender-selected time. Create an account if you need to delete shares before expiry.
            </p>
          </section>

          <section className="content-section">
            <h2>✅ Summary</h2>
            <p>
              SendIt makes temporary file and code sharing simple:
            </p>
            <ul>
              <li>Upload files or write code</li>
              <li>Set your preferred expiry time</li>
              <li>Get a temporary code</li>
              <li>Share the code securely</li>
              <li>Recipient accesses the content</li>
              <li>Files follow the sender-selected expiry time</li>
            </ul>
            <p>
              For more information, visit the FAQ page or contact SendIt support if you have questions. Happy sharing!
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
