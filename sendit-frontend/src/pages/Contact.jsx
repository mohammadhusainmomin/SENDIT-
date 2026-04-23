import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiMail, FiMapPin, FiMessageCircle, FiShield } from "react-icons/fi";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";

const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1091.9727843930043!2d72.50165155807875!3d22.989086664416938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1776916084265!5m2!1sen!2sin";

const contactCards = [
  {
    title: "Support Email",
    value: "senditsystem786@gmail.com",
    description: "Use this for support, transfer issues, approval questions, and general business contact.",
    href: "mailto:senditsystem786@gmail.com",
  },
  {
    title: "WhatsApp Contact",
    value: "+91 97256 86429",
    description: "Useful for quick communication when you want to discuss product questions or urgent follow-up.",
    href: "https://wa.me/919725686429",
  },
  {
    title: "Service Focus",
    value: "Temporary file and code sharing",
    description: "You can contact SendIt about uploads, access codes, expiry flow, privacy, and policy concerns.",
  },
];

export default function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Contact SendIt | Support, Location, and Business Contact"
        description="Contact SendIt for support, transfer issues, policy questions, and location details."
        keywords="contact sendit, sendit support, sendit location, sendit email"
        url="https://senditsystem.netlify.app/contact"
      />

      <div className="contact-page">
        <section className="contact-hero">
          <div className="contact-wrap">
            <div className="contact-hero-grid">
              <div>
                <span className="contact-kicker">CONTACT SENDIT</span>
                <h1 className="contact-title">
                  Reach the team behind
                  <span> temporary sharing.</span>
                </h1>
                <p className="contact-lead">
                  If you need support, want to ask about privacy or AdSense readiness, or want to report a transfer issue, this page gives you the fastest way to contact SendIt.
                </p>

                <div className="contact-hero-actions">
                  <a className="contact-primary-btn" href="mailto:senditsystem786@gmail.com">
                    Email Support <FiArrowUpRight />
                  </a>
                  <a
                    className="contact-secondary-btn"
                    href="https://wa.me/919725686429"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp <FiMessageCircle />
                  </a>
                </div>
              </div>

              <div className="contact-highlight-card">
                <div className="contact-highlight-top">
                  <span className="contact-chip">Support Window</span>
                  <span className="contact-status">Active</span>
                </div>
                <div className="contact-highlight-grid">
                  <div>
                    <div className="contact-meta">Primary</div>
                    <strong>Email Support</strong>
                  </div>
                  <div>
                    <div className="contact-meta">Location</div>
                    <strong>Gujarat, India</strong>
                  </div>
                  <div>
                    <div className="contact-meta">Focus</div>
                    <strong>Files + Code</strong>
                  </div>
                  <div>
                    <div className="contact-meta">Use</div>
                    <strong>Help and policy</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-panel-section">
          <div className="contact-wrap">
            <div className="contact-card-grid">
              {contactCards.map((card) => (
                <article className="contact-info-card" key={card.title}>
                  <h2>{card.title}</h2>
                  {card.href ? (
                    <a href={card.href} className="contact-info-value" target={card.href.startsWith("https") ? "_blank" : undefined} rel={card.href.startsWith("https") ? "noreferrer" : undefined}>
                      {card.value}
                    </a>
                  ) : (
                    <p className="contact-info-value">{card.value}</p>
                  )}
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-panel-section">
          <div className="contact-wrap">
            <div className="contact-location-layout">
              <div className="contact-location-copy">
                <span className="contact-kicker">LOCATION</span>
                <h2>Google location for trust and contact clarity</h2>
                <p>
                  We have added a visible location section so visitors and reviewers can quickly understand the operating region behind SendIt. This also helps the site feel more complete and trustworthy.
                </p>

                <div className="contact-location-points">
                  <div className="contact-point">
                    <FiMapPin />
                    <div>
                      <strong>Operating region</strong>
                      <span>Gujarat, India</span>
                    </div>
                  </div>
                  <div className="contact-point">
                    <FiMail />
                    <div>
                      <strong>Email</strong>
                      <span>senditsystem786@gmail.com</span>
                    </div>
                  </div>
                  <div className="contact-point">
                    <FiShield />
                    <div>
                      <strong>Policy and abuse reports</strong>
                      <span>Accepted through the same support contact</span>
                    </div>
                  </div>
                </div>

                <a
                  className="contact-secondary-btn contact-map-link"
                  href="https://www.google.com/maps?q=Gujarat,India"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps <FiArrowUpRight />
                </a>
              </div>

              <div className="contact-map-card">
                <iframe
                  title="SendIt location map"
                  src={googleMapsEmbedUrl}
                  loading="lazy"
                  allowFullScreen
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="contact-panel-section">
          <div className="contact-wrap">
            <div className="contact-bottom-grid">
              <article className="contact-detail-panel">
                <h2>When to contact us</h2>
                <ul>
                  <li>If a receiver cannot access a file or code that should still be active</li>
                  <li>If you need clarification about privacy, retention, cookies, or ad disclosures</li>
                  <li>If you want to report abuse, prohibited content, or suspicious usage</li>
                  <li>If you want to discuss product improvement or business collaboration</li>
                </ul>
              </article>

              <article className="contact-detail-panel emphasis">
                <h2>Need help now?</h2>
                <p>
                  The easiest next step is to use the email in this page footer or open the About page to understand the project background. For product use, you can go directly to Send File or Receive File.
                </p>
                <div className="contact-inline-actions">
                  <button className="contact-primary-btn" onClick={() => navigate("/send")} type="button">
                    Send File
                  </button>
                  <button className="contact-secondary-btn" onClick={() => navigate("/about")} type="button">
                    About Us
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
