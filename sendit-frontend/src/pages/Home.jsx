import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import {
  FileTransferIllustration,
  SecurityIllustration,
  UploadIllustration,
  DownloadIllustration,
} from "../components/Illustrations";
import FileUpload from "../components/FileUpload";
import CodeInput from "../components/CodeInput";
import SEO from "../components/SEO";
import { FiUploadCloud, FiDownload, FiSmartphone, FiUserPlus, FiArrowRight, FiUser, FiClock, FiRepeat, FiX } from "react-icons/fi";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SendIt",
    "alternateName": "SendIt File Share",
    "description": "Secure file and code sharing platform with code-based access. Share files instantly without links.",
    "url": "https://senditsystem.netlify.app",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "author": {
      "@type": "Organization",
      "name": "SendIt Team",
      "url": "https://senditsystem.netlify.app"
    }
  };

  return (
    <div className="home-container">
      <SEO
        title="SendIt - Secure Files Sharing Platform"
        description="SendIt is the easiest way to file share online. Share files instantly with a 4-digit code - no links needed. Secure, free, and fast file sharing for everyone."
        keywords="file share, share files online, file sharing platform, send files free, secure file transfer, online file share, send large files, anonymous file sharing, best file sharing site, share files securely"
        url="https://senditsystem.netlify.app"
        structuredData={homeStructuredData}
      />
      {/* Background Animation Elements */}
      <div className="background-gradient"></div>
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>

      <div className="home-content">
        {/* Hero Section */}
      <section className="hero-section">
        <div className="mascot-wrapper">
          <Mascot size="large" />
        </div>

        <h1 className="hero-title">The Best File Share Platform  SendIt</h1>
          <p className="hero-subtitle">Share files instantly. No links. No hassle.</p>
          <p className="hero-description">
            SendIt is the fastest and most secure file share platform for transferring files online. Send and receive files with just a 4-digit code. No complicated links, no accounts required for sharing files instantly.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => setOpenModal("send")}>
              <FiUploadCloud size={20} />
              <span>Send File</span>
            </button>

            <button className="btn-secondary" onClick={() => setOpenModal("receive")}>
              <FiDownload size={20} />
              <span>Receive File</span>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose SendIt for Your File Share Needs?</h2>
          <p className="section-intro">SendIt provides the simplest and most secure way to share files online. Whether you need to file share with colleagues, send files to clients, or exchange documents with friends, SendIt is your perfect file sharing solution.</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-illustration">
                <FileTransferIllustration />
              </div>
              <h3>Lightning Fast File Transfer</h3>
              <p>Share files instantly in seconds with our optimized file sharing infrastructure. Easily send files of any type without slow uploads.</p>
            </div>

            <div className="feature-card">
              <div className="feature-illustration">
                <SecurityIllustration />
              </div>
              <h3>Secure & Private File Sharing</h3>
              <p>Code-based access only - the safest way to share files. No public links means your file sharing is completely private. Files auto-delete after 10 minutes.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FiSmartphone /></div>
              <h3>Mobile Friendly File Share</h3>
              <p>Share files seamlessly on phones, tablets, and desktops. SendIt is the perfect mobile file sharing platform for on-the-go file transfers.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FiUserPlus /></div>
              <h3>Free File Sharing - No Account</h3>
              <p>Share files for free without creating an account. Just select your file and share instantly. It's the easiest way to transfer files online.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2>How to Share Files in 3 Easy Steps</h2>
          <p className="section-intro">SendIt makes file sharing incredibly simple. Here's how to share files online using our secure file sharing platform:</p>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Select & Upload Your File</h4>
              <p>Choose any file from your device to begin sharing. SendIt supports all file types - documents, images, videos, archives and more.</p>
            </div>
            <div className="step-arrow"><FiArrowRight /></div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Receive Your Access Code</h4>
              <p>Our file sharing system instantly generates a secure 4-digit code for your file. This code is how your recipient will access your shared file.</p>
            </div>
            <div className="step-arrow"><FiArrowRight /></div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Share Code & They Download</h4>
              <p>Share the code with your recipient - no complex links needed. They enter the code on SendIt to download your file instantly. Perfect for quick file sharing.</p>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="premium-features">
          <h2>Advanced File Sharing Features</h2>
          <p className="section-intro">SendIt offers powerful features that make file sharing flexible and secure. These tools give you complete control over your file transfers.</p>
          <div className="premium-grid">
            <div className="premium-card">
              <div className="premium-icon guest-access">
                <FiUser />
              </div>
              <div className="premium-content">
                <h3>Free Guest File Sharing</h3>
                <p>No login required to share files with others. Send files instantly as a guest user with just a 4-digit code. Perfect for quick file sharing without complications.</p>
                <div className="premium-highlight">Share files without creating an account</div>
              </div>
            </div>

            <div className="premium-card">
              <div className="premium-icon time-expire">
                <FiClock />
              </div>
              <div className="premium-content">
                <h3>Smart Expiration Control</h3>
                <p>Control exactly how long your file sharing code stays active. Set custom expiration times that work for your needs - from minutes to hours. Enhance security with automatic file deletion.</p>
                <div className="premium-highlight">Complete control over code lifetime</div>
              </div>
            </div>

            <div className="premium-card">
              <div className="premium-icon reusable">
                <FiRepeat />
              </div>
              <div className="premium-content">
                <h3>Reusable Share Codes</h3>
                <p>One code can be used multiple times for sharing the same file with many recipients. Ideal for team collaboration and sharing files across departments without uploading repeatedly.</p>
                <div className="premium-highlight">Share one file with unlimited users</div>
              </div>
            </div>
          </div>
        </section>

        {/* File Sharing Benefits Section */}
        <section className="sharing-benefits">
          <h2>Why SendIt is the Best File Sharing Solution</h2>
          <p className="section-intro">When you need to share files securely and instantly, SendIt provides the perfect balance of simplicity, security, and speed. Here's why SendIt is trusted for file sharing. <a href="/features" className="section-link">Learn more about our features</a>.</p>

          <div className="benefits-content">
            <div className="benefit-item">
              <h3>Simple File Sharing for Everyone</h3>
              <p>SendIt is designed to be the easiest way to share files online. Unlike complicated file sharing platforms that require accounts and lengthy setups, SendIt lets you start sharing files in seconds. Just <a href="/send" className="inline-link">upload your file</a> and share the 4-digit code - that's it! No need to manage file sharing links or worry about complex permissions.</p>
            </div>

            <div className="benefit-item">
              <h3>Secure & Private File Transfer</h3>
              <p>Your privacy matters when you share files. SendIt uses code-based access instead of public links, making it one of the most secure file sharing platforms. Only people with your code can access your files. Unlike free file sharing sites that expose your data, SendIt keeps your file sharing private and secure.</p>
            </div>

            <div className="benefit-item">
              <h3>Perfect for Any File Sharing Need</h3>
              <p>Whether you need to share files for work, education, or personal reasons, SendIt handles all your file sharing requirements. <a href="/about" className="inline-link">Learn about SendIt's story</a> and how we serve millions sharing files every day.</p>
            </div>

            <div className="benefit-item">
              <h3>Fast & Reliable File Sharing Service</h3>
              <p>Time matters when you need to share files quickly. SendIt provides instant file sharing with optimized upload and download speeds. Our file sharing infrastructure ensures your files are always available when your recipients need them - no delays, no complications. Have questions? <a href="/faq" className="inline-link">Check our FAQ</a>.</p>
            </div>

            <div className="benefit-item">
              <h3>Free File Sharing Platform</h3>
              <p>The best part? SendIt is completely free. <a href="/send" className="inline-link">Start sharing files right now</a> without paying anything. No hidden fees, no premium tiers for basic file sharing. SendIt makes secure file transfer affordable for everyone.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Send File Modal */}
      {openModal === "send" && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenModal(null)}>
              <FiX size={24} />
            </button>

            <section className="send-header">
              <div className="header-icon"><FiUploadCloud /></div>
              <h2>Send File</h2>
              <p>Share any file with just a 4-digit code</p>
            </section>

            <section className="send-form-section">
              <div className="form-illustration">
                <UploadIllustration />
              </div>
              <FileUpload />
            </section>
          </div>
        </div>
      )}

      {/* Receive File Modal */}
      {openModal === "receive" && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenModal(null)}>
              <FiX size={24} />
            </button>

            <section className="receive-header">
              <div className="header-icon"><FiDownload /></div>
              <h2>Receive File</h2>
              <p>Enter the 4-digit code to download</p>
            </section>

            <section className="receive-form-section">
              <div className="form-illustration">
                <DownloadIllustration />
              </div>
              <CodeInput />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
