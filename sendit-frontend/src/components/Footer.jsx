import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiMail, FiHeart } from "react-icons/fi";
import "./styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <h3 className="footer-brand">SendIt</h3>
            <p className="brand-description">
              The fastest and most secure file sharing platform. Share files instantly with a 4-digit code.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="mailto:support@sendit.com" className="social-link" title="Email">
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section links-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/send">Send File</Link></li>
              <li><Link to="/receive">Receive File</Link></li>
              <li><Link to="/features">Features</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-section links-section">
            <h4 className="section-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><a href="mailto:support@sendit.com">Contact</a></li>
              <li><a href="https://blog.sendit.com" target="_blank" rel="noopener noreferrer">Blog</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section links-section">
            <h4 className="section-title">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Cookie Policy</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">GDPR</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section newsletter-section">
            <h4 className="section-title">Stay Updated</h4>
            <p className="newsletter-description">Subscribe to get the latest updates and features.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} SendIt. All rights reserved. Made with <FiHeart size={16} className="heart-icon" /> by SendIt Team
          </p>
          <div className="footer-badges">
            <span className="badge">🔒 Secure</span>
            <span className="badge">⚡ Fast</span>
            <span className="badge">🆓 Free</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
