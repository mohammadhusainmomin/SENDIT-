import { Link } from "react-router-dom";
import { FiGithub, FiMail, FiMessageCircle } from "react-icons/fi";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="si-footer">
      <div className="si-footer-grid">
        <div>
          <div className="si-footer-brand">SendIt</div>
          <p className="si-footer-copy">
            SendIt helps people share files and code snippets through temporary access codes, short retention windows, and simple receive steps.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
            <a className="si-nav-link" href="https://github.com/mohammadhusainmomin" target="_blank" rel="noreferrer">
              <FiGithub />
            </a>
            <a className="si-nav-link" href="mailto:mmbrothersteam@gmail.com">
              <FiMail />
            </a>
            <a className="si-nav-link" href="https://wa.me/919725686429" target="_blank" rel="noreferrer">
              <FiMessageCircle />
            </a>
          </div>
        </div>

        <div>
          <h3 className="si-footer-title">Product</h3>
          <Link className="si-footer-link" to="/send">Send File</Link>
          <Link className="si-footer-link" to="/receive">Receive File</Link>
          <Link className="si-footer-link" to="/code/send">Send Code</Link>
          <Link className="si-footer-link" to="/code/receive">Receive Code</Link>
        </div>

        <div>
          <h3 className="si-footer-title">Resources</h3>
          <Link className="si-footer-link" to="/blog">Blog</Link>
          <Link className="si-footer-link" to="/about">About Us</Link>
          <Link className="si-footer-link" to="/features">Features</Link>
          <Link className="si-footer-link" to="/guide">Sharing Guide</Link>
          <Link className="si-footer-link" to="/faq">FAQ</Link>
          <Link className="si-footer-link" to="/contact">Contact</Link>
        </div>

        <div>
          <h3 className="si-footer-title">Legal</h3>
          <Link className="si-footer-link" to="/privacy">Privacy Policy</Link>
          <Link className="si-footer-link" to="/security">Security</Link>
          <Link className="si-footer-link" to="/terms">Terms of Service</Link>
          <Link className="si-footer-link" to="/disclaimer">Disclaimer</Link>
          <span className="si-footer-copy">Clear policies, support access, and transparent product details.</span>
        </div>
      </div>

      <div className="si-footer-bottom">
        <span>&copy; {year} SendIt. File and code sharing for everyday workflows.</span>
        <span>Support: mmbrothersteam@gmail.com</span>
      </div>
    </footer>
  );
}

export default Footer;
