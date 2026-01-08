import { useEffect } from "react";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SendIt",
    description: "A secure platform for sharing files and code",
    url: "https://sendit.example.com",
    logo: "https://sendit.example.com/logo.png",
  };

  return (
    <>
      <SEO
        title="About SendIt - Secure File & Code Sharing Platform"
        description="Learn about SendIt, a secure platform for sharing files and code snippets. Our mission is to provide safe, easy, and fast file transfers."
        url="https://sendit.example.com/about"
        structuredData={structuredData}
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">About SendIt</h1>
          
          <section className="content-section">
            <h2>Our Mission</h2>
            <p>
              SendIt is dedicated to providing a secure, fast, and user-friendly platform for sharing files and code snippets. We believe that file sharing should be simple, safe, and accessible to everyone.
            </p>
          </section>

          <section className="content-section">
            <h2>Why Choose SendIt?</h2>
            <ul className="feature-list">
              <li><strong>Security First:</strong> All files are encrypted during transfer</li>
              <li><strong>No Registration:</strong> Share files without creating an account</li>
              <li><strong>Fast Transfer:</strong> Optimized for quick uploads and downloads</li>
              <li><strong>Code Sharing:</strong> Share code snippets with syntax highlighting</li>
              <li><strong>Privacy Focused:</strong> We don't store your data longer than necessary</li>
              <li><strong>Temporary Links:</strong> Files expire automatically for added security</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>What We Offer</h2>
            <p>
              SendIt provides two main features to meet your sharing needs:
            </p>
            <ul className="feature-list">
              <li><strong>File Sharing:</strong> Upload files up to your limit and share secure links</li>
              <li><strong>Code Sharing:</strong> Share code snippets with syntax highlighting and temporary links</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Our Commitment</h2>
            <p>
              We are committed to maintaining the highest standards of security and privacy. Our platform is designed with your security in mind, and we continuously improve our systems to protect your data.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
