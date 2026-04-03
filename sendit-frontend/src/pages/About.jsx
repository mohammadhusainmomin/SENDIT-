import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiDatabase, FiServer } from "react-icons/fi";
import { RiReactjsLine } from "react-icons/ri";
import { MdSecurity, MdAutoDelete, MdPeopleAlt, MdSpeed } from "react-icons/md";
import SEO from "../components/SEO";

const teamMembers = [
  {
    name: "Mohammd Husain Momin",
    role: "Project Lead & Full Stack Developer",
    bio: "Originator of the SendIt idea, focused on solving real-world file sharing challenges. Leading the product vision across frontend, backend, and secure sharing workflows from concept to deployment.",
    image: "/images/mohammd.png",
  },
  {
    name: "Sabbir Trivedi",
    role: "UI & Frontend Developer",
    bio: "Focused on crafting the SendIt interface with clean layouts, responsive interactions, and a smooth sharing experience.",
    image: "/images/sabbir.jpeg",
  },
  {
    name: "Azim Diwan",
    role: "Backend & Systems Developer",
    bio: "Works on APIs, data flow, and the temporary file and code-sharing infrastructure that powers SendIt.",
    image: "/images/azim.jpeg",
  },
];

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-copy-page">
      <SEO
        title="About SendIt | File Sharing and Code Sharing Platform"
        description="Learn about SendIt, the secure file sharing and code sharing platform built for temporary access and simple transfer workflows."
        keywords="about sendit, sendit platform, file sharing company, code sharing platform"
        url="https://senditsystem.netlify.app/about"
      />

      <section className="about-copy-hero">
        <div className="about-copy-wrap">
          <span className="about-copy-kicker">THE KINETIC CURATOR</span>
          <h1 className="about-copy-title">
            Moving Digital Assets with <span>Absolute</span> Precision.
          </h1>
          <p className="about-copy-lead">
            SendIt brings together temporary access codes, streamlined transfer
            flows, and a polished interface for sharing files and code on the
            web.
          </p>
          <div className="about-copy-hero-image">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWt8ty5e6r6NsXjeWnxbl5g085AGdNmiswaaUvddsm3l4nFWmbpOxh9W9GdVOnWTEWlSnXXfD1ZbqSzdZoOMbiItu-BgMU6nU0HIUbJDaUJZu104n-AjKkGeTbT8E9M8hApWTDUIMnl4KMyUxobreUDTHxE-yCAbpr4WL0gD-SOjXIjQYxrKyjfZ6W6SISwBZFK41W18rk3UX63Pxv2c3exvFzKtA0QfbLAtKuEZ5Auo8PTBqqdUmNMcdxjtbIGNyh9A0xoaIXvGyF"
              alt="Digital infrastructure representation"
            />
            <div className="about-copy-overlay" />
          </div>
        </div>
      </section>

      <section className="about-copy-mission">
        <div className="about-copy-wrap about-copy-mission-grid">
          <div>
            <span className="about-copy-section-tag">OUR MISSION</span>
            <h2 className="about-copy-section-title">
              Architecting the Future of Secure Exchange.
            </h2>
            <div className="about-copy-body">
              <p>
                SendIt is a modern file and code-sharing platform designed for
                developers and everyday users. It allows users to upload files
                and share snippets temporarily using access codes and a simple
                receive flow.
              </p>
              <p>
                Our goal is to make transfer steps easy to understand while
                keeping the product fast, temporary by design, and aligned with
                the backend workflow already running in SendIt.
              </p>
            </div>
            <div className="about-copy-stats">
              <div>
                <strong>99.9%</strong>
                <span>Uptime Reliability</span>
              </div>
              <div>
                <strong>256-bit</strong>
                <span>AES Encryption</span>
              </div>
            </div>
          </div>

          <div className="about-copy-value-grid">
            <div className="about-copy-column offset">
              <article className="about-copy-value-card">
                <MdSecurity className="about-copy-value-icon" />
                <h3>Access Control</h3>
                <p>
                  Temporary codes help limit access to the content you intend to
                  share.
                </p>
              </article>
              <article className="about-copy-value-card">
                <MdSpeed className="about-copy-value-icon" />
                <h3>Warp Speed</h3>
                <p>
                  Fast transfer steps and a focused interface help users move
                  through the flow quickly.
                </p>
              </article>
            </div>

            <div className="about-copy-column">
              <article className="about-copy-value-card primary">
                <MdPeopleAlt className="about-copy-value-icon" />
                <h3>Human Centric</h3>
                <p>
                  Complex tech hidden behind a simple, editorial-grade
                  interface.
                </p>
              </article>
              <article className="about-copy-value-card">
                <MdAutoDelete className="about-copy-value-icon" />
                <h3>Expiry Workflow</h3>
                <p>
                  Short-lived sharing windows help keep temporary content from
                  staying active longer than needed.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="about-copy-stack">
        <div className="about-copy-wrap">
          <div className="about-copy-center-head">
            <span className="about-copy-section-tag">THE KINETIC ENGINE</span>
            <h2 className="about-copy-stack-title">Modern Tech Stack</h2>
          </div>

          <div className="about-copy-stack-grid">
            <article className="about-copy-stack-card react">
              <div className="about-copy-stack-icon">
                <RiReactjsLine />
              </div>
              <h3>React 19 &amp; Framer Motion</h3>
              <p>
                Leveraging concurrent rendering and fluid animations for an
                elite, application-like performance.
              </p>
              <div className="about-copy-stack-watermark">19</div>
            </article>

            <article className="about-copy-stack-card encryption">
              <div className="about-copy-stack-icon dark">
                <MdSecurity />
              </div>
              <h3 style={{ color: "white" }}>AES-256-CBC Encryption</h3>
              <p>
                SendIt is built around careful transfer handling, temporary
                access, and a workflow designed for secure sharing patterns.
              </p>
              <div className="about-copy-security-bar">
                <div />
              </div>
              <div
                style={{ color: "white" }}
                className="about-copy-security-meta"
              >
                <span>TRANSFER_LAYER_ACTIVE</span>
                <span>CONTROLLED_ACCESS_FLOW</span>
              </div>
            </article>

            <article className="about-copy-stack-card small">
              <div className="about-copy-stack-icon">
                <FiServer />
              </div>
              <h4>Node.js &amp; Express</h4>
              <p>Core API architecture built for speed and reliability.</p>
            </article>

            <article className="about-copy-stack-card small">
              <div className="about-copy-stack-icon">
                <FiDatabase />
              </div>
              <h4>MongoDB &amp; Mongoose</h4>
              <p>Scalable data storage with robust object modeling.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-copy-team">
        <div className="about-copy-wrap">
          <div className="about-copy-team-head">
            <div>
              <span className="about-copy-section-tag">THE ARCHITECTS</span>
              <h2 className="about-copy-stack-title left">
                The Minds Behind the Mission.
              </h2>
            </div>
          </div>

          <div className="about-copy-team-grid">
            {teamMembers.map((member) => (
              <article className="about-copy-team-card" key={member.name}>
                <div className="about-copy-team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h4>{member.name}</h4>
                <p className="about-copy-team-role">{member.role}</p>
                <p className="about-copy-team-bio">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-copy-cta">
        <div className="about-copy-wrap">
          <div className="about-copy-cta-box">
            <div className="about-copy-cta-content">
              <h2>Ready to experience the future?</h2>
              <p>
                Join thousands of companies trusting SendIt for their
                high-priority digital logistics.
              </p>
              <div className="about-copy-cta-actions">
                <button
                  className="about-copy-cta-primary"
                  onClick={() => navigate("/send")}
                  type="button"
                >
                  Start Sending Free
                </button>
                <button
                  className="about-copy-cta-secondary"
                  onClick={() => navigate("/about")}
                  type="button"
                >
                  Meet the Team
                </button>
              </div>
            </div>
            <div className="about-copy-cta-blob one" />
            <div className="about-copy-cta-blob two" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
