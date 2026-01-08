import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import {
  FileTransferIllustration,
  SecurityIllustration,
} from "../components/Illustrations";
import SEO from "../components/SEO";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SendIt",
    description: "Secure file and code sharing platform with code-based access",
    url: "https://sendit.example.com",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="home-container">
      <SEO
        title="SendIt - Secure File & Code Sharing Platform"
        description="Share files instantly with just a 4-digit code. No links, no accounts required. Secure, fast, and easy file transfer."
        url="https://sendit.example.com"
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

        <h1 className="hero-title">SENDIT</h1>
          <p className="hero-subtitle">Share files instantly. No links.</p>
          <p className="hero-description">
            Secure, fast, code-based file sharing. Send and receive files with just a
            4-digit code. No complications, no accounts required for sending.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => navigate("/send")}>
              <span className="btn-icon">📤</span>
              <span>Send File</span>
            </button>

            <button className="btn-secondary" onClick={() => navigate("/receive")}>
              <span className="btn-icon">📥</span>
              <span>Receive File</span>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why SENDIT?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-illustration">
                <FileTransferIllustration />
              </div>
              <h3>Lightning Fast</h3>
              <p>Send and receive files in seconds with our optimized infrastructure.</p>
            </div>

            <div className="feature-card">
              <div className="feature-illustration">
                <SecurityIllustration />
              </div>
              <h3>Secure & Private</h3>
              <p>Code-based access only. Files auto-delete after 10 minutes.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Works seamlessly on phones, tablets, and desktops.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>No Sign-Up Required</h3>
              <p>Send files without creating an account. Receive requires login.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Upload Your File</h4>
              <p>Select any file from your device</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Get Access Code</h4>
              <p>System generates a 4-digit code</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Share & Download</h4>
              <p>Share the code, receiver downloads the file</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
