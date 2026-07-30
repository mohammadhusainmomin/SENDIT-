import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiMail, FiMapPin, FiMessageCircle, FiSend, FiShield, FiUser } from "react-icons/fi";
import SEO from "../components/SEO";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import "../styles/ContentPages.css";

const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1091.9727843930043!2d72.50165155807875!3d22.989086664416938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1776916084265!5m2!1sen!2sin";

const contactCards = [
  {
    title: "Support Email",
    value: "mmbrothersteam@gmail.com",
    description: "Use this for support, transfer issues, approval questions, and general business contact. We reply within 24-48 hours.",
    href: "mailto:mmbrothersteam@gmail.com",
  },
  {
    title: "WhatsApp Contact",
    value: "+91 97256 86429",
    description: "Useful for quick communication when you want to discuss product questions or urgent follow-up.",
    href: "https://wa.me/919725686429",
  },
  {
    title: "Business Address",
    value: "SENDIT, Ahmedabad, Gujarat, India",
    description: "SENDIT is operated from Ahmedabad, Gujarat, India. Postal correspondence can be arranged by email request.",
  },
  {
    title: "Support Hours",
    value: "Mon-Sat, 10:00 AM - 6:00 PM IST",
    description: "Messages received outside these hours are answered on the next working day, typically within 24-48 hours.",
  },
  {
    title: "Service Focus",
    value: "Temporary file and code sharing",
    description: "You can contact SendIt about uploads, access codes, expiry flow, privacy, and policy concerns.",
  },
];

export default function Contact() {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (form.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showError("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);
      await api.post("/contact", form);
      success("Your message has been sent successfully! We'll get back to you soon.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send message. Please try again later.";
      showError(message);
    } finally {
      setLoading(false);
    }
  };

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
                  <a className="contact-primary-btn" href="mailto:mmbrothersteam@gmail.com">
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
                    <strong>Ahmedabad, Gujarat, India</strong>
                  </div>
                  <div>
                    <div className="contact-meta">Focus</div>
                    <strong>Files + Code</strong>
                  </div>
                  <div>
                    <div className="contact-meta">Hours</div>
                    <strong>Mon-Sat, 10 AM - 6 PM IST</strong>
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
            <div className="contact-form-shell">
              <div className="contact-form-copy">
                <span className="contact-kicker">SEND A MESSAGE</span>
                <h2>Contact form</h2>
                <p>
                  Fill out the form below and your message will be sent directly to <strong>mmbrothersteam@gmail.com</strong>. Use this for support, collaboration, or project-related questions.
                </p>
                <ul className="contact-form-list">
                  <li>Ask about transfer issues or account help</li>
                  <li>Request product clarification or support</li>
                  <li>Send business, academic, or collaboration queries</li>
                </ul>
              </div>

              <form className="contact-form-card" onSubmit={handleSubmit}>
                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span>Name</span>
                    <div className="contact-input-shell">
                      <FiUser />
                      <input 
                        type="text" 
                        placeholder="Enter your name" 
                        value={form.name} 
                        onChange={handleChange("name")}
                        className={errors.name ? "error" : ""}
                      />
                    </div>
                    {errors.name && <span className="contact-error">{errors.name}</span>}
                  </label>

                  <label className="contact-field">
                    <span>Email</span>
                    <div className="contact-input-shell">
                      <FiMail />
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={form.email} 
                        onChange={handleChange("email")}
                        className={errors.email ? "error" : ""}
                      />
                    </div>
                    {errors.email && <span className="contact-error">{errors.email}</span>}
                  </label>
                </div>

                <label className="contact-field">
                  <span>Subject</span>
                  <div className="contact-input-shell">
                    <FiShield />
                    <input 
                      type="text" 
                      placeholder="What is this about?" 
                      value={form.subject} 
                      onChange={handleChange("subject")}
                      className={errors.subject ? "error" : ""}
                    />
                  </div>
                  {errors.subject && <span className="contact-error">{errors.subject}</span>}
                </label>

                <label className="contact-field">
                  <span>Message</span>
                  <div className="contact-textarea-shell">
                    <textarea
                      placeholder="Write your message here (minimum 10 characters)"
                      value={form.message}
                      onChange={handleChange("message")}
                      className={errors.message ? "error" : ""}
                    />
                  </div>
                  <div className="contact-char-count">
                    {form.message.length}/500 characters
                  </div>
                  {errors.message && <span className="contact-error">{errors.message}</span>}
                </label>

                <button className="contact-primary-btn contact-submit-btn" type="submit" disabled={loading || Object.keys(errors).length > 0}>
                  <FiSend /> {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
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
                      <span>mmbrothersteam@gmail.com</span>
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
