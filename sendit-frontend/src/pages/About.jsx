import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiDatabase, FiServer } from "react-icons/fi";
import { RiReactjsLine } from "react-icons/ri";
import { MdAutoDelete, MdPeopleAlt, MdSecurity, MdSpeed } from "react-icons/md";
import SEO from "../components/SEO";

const teamMembers = [
  {
    name: "Mohammd Husain Momin",
    role: "Project Lead and Full Stack Developer",
    bio: "Leads the overall product direction and works across the frontend, backend, and deployment workflow of SendIt.",
    image: "/images/mohammd.png",
  },
  {
    name: "Sabbir Trivedi",
    role: "UI and Frontend Developer",
    bio: "Focused on responsive layouts, navigation clarity, and making the file-sharing flow easier for first-time visitors.",
    image: "/images/sabbir.jpeg",
  },
  {
    name: "Azim Diwan",
    role: "Backend and Systems Developer",
    bio: "Works on APIs, storage flow, cleanup routines, and the server-side logic behind temporary sharing.",
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
        title="About SendIt | Temporary File and Code Sharing"
        description="Learn what SendIt does, who builds it, and how the platform is designed for temporary file and code sharing."
        keywords="about sendit, sendit team, temporary file sharing, code sharing platform"
        url="https://senditsystem.in/about"
      />

      <section className="about-copy-hero">
        <div className="about-copy-wrap">
          <span className="about-copy-kicker">ABOUT SENDIT</span>
          <h1 className="about-copy-title">
            A practical tool for <span>temporary</span> digital sharing.
          </h1>
          <p className="about-copy-lead">
            SendIt is a free, secure web app for sending files and code snippets with short temporary access codes and a straightforward receive flow. We solve the file-sharing problem by making temporary, one-time transfers as simple as permanent sharing—but with sender-set expiry for better privacy and data control.
          </p>
          <div className="about-copy-hero-image">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWt8ty5e6r6NsXjeWnxbl5g085AGdNmiswaaUvddsm3l4nFWmbpOxh9W9GdVOnWTEWlSnXXfD1ZbqSzdZoOMbiItu-BgMU6nU0HIUbJDaUJZu104n-AjKkGeTbT8E9M8hApWTDUIMnl4KMyUxobreUDTHxE-yCAbpr4WL0gD-SOjXIjQYxrKyjfZ6W6SISwBZFK41W18rk3UX63Pxv2c3exvFzKtA0QfbLAtKuEZ5Auo8PTBqqdUmNMcdxjtbIGNyh9A0xoaIXvGyF"
              alt="Abstract representation of digital file transfer"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="about-copy-overlay" />
          </div>
        </div>
      </section>

      <section className="about-copy-mission">
        <div className="about-copy-wrap about-copy-mission-grid">
          <div>
            <span className="about-copy-section-tag">THE PROBLEM WE SOLVE</span>
            <h2 className="about-copy-section-title">
              File Sharing Should Be Easy AND Temporary
            </h2>
            <div className="about-copy-body">
              <p>
                Traditional file-sharing methods have a fundamental problem: <strong>they stay forever</strong>. Email attachments sit in inboxes indefinitely. Cloud storage links remain accessible until manually deleted. This creates unnecessary privacy and security risks.
              </p>
              <p>
                Many situations call for temporary sharing—assignments that expire after grading, client deliverables that should be accessible only for review, confidential information that should self-destruct after viewing. But existing solutions force you to choose: either simplicity with permanent access, or complexity with temporary controls.
              </p>
              <p>
                <strong>SendIt solves this problem.</strong> We combine simplicity (upload, share, done) with temporary access (sender-set expiry, expiry-based cleanup). No complex permission systems. No manual cleanup. No files lingering on servers.
              </p>
            </div>
            <div className="about-copy-stats">
              <div>
                <strong>Simple</strong>
                <span>No registration needed</span>
              </div>
              <div>
                <strong>Secure</strong>
                <span>Sender-set expiry</span>
              </div>
              <div>
                <strong>Private</strong>
                <span>Temporary codes</span>
              </div>
            </div>
          </div>

          <div className="about-copy-value-grid">
            <div className="about-copy-column offset">
              <article className="about-copy-value-card">
                <MdSecurity className="about-copy-value-icon" />
                <h3>Privacy-First Design</h3>
                <p>You control how long application access lasts by setting the expiry before sending. Uploaded content is temporary by design, while operational and history metadata can remain as described in the Privacy Policy.</p>
              </article>
              <article className="about-copy-value-card">
                <MdSpeed className="about-copy-value-icon" />
                <h3>Intentional Sharing</h3>
                <p>Temporary codes require deliberate sharing to the right person. No accidental public posts. No leaked permanent links. Better control over who accesses your files.</p>
              </article>
            </div>

            <div className="about-copy-column">
              <article className="about-copy-value-card primary">
                <MdPeopleAlt className="about-copy-value-icon" />
                <h3>Built for Everyone</h3>
                <p>SendIt works for students, developers, teams, freelancers, and anyone who needs to share files. No technical expertise required. Works on all devices.</p>
              </article>
              <article className="about-copy-value-card">
                <MdAutoDelete className="about-copy-value-icon" />
                <h3>Expiry Control</h3>
                <p>No forgotten uploads cluttering the sharing flow. Files follow the expiry duration selected by the sender.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section style={{ 
        backgroundColor: "rgba(13, 71, 161, 0.05)", 
        padding: "3rem 0",
        marginTop: "2rem"
      }}>
        <div className="about-copy-wrap">
          <span className="about-copy-section-tag">OUR MISSION</span>
          <h2 className="about-copy-section-title">
            Make secure, temporary sharing the default
          </h2>
          <div className="about-copy-body">
            <p>
              Most file-sharing services were designed in an era where storage was expensive and permanent sharing was the norm. Today, we understand that temporary sharing is often better for privacy and data control. Yet most people still default to permanent solutions (email, cloud storage) because temporary alternatives are complex or expensive.
            </p>
            <p>
              SendIt exists to change this. We believe that temporary, one-time sharing should be as simple as permanent sharing. That's why SendIt is:
            </p>
            <ul>
              <li><strong>Free</strong> - No payment, no premium tiers, no upgrade walls</li>
              <li><strong>Private by default</strong> - Basic sharing does not require an account, but the service still processes operational data needed to run and support transfers</li>
              <li><strong>Simple</strong> - Upload, share a code, done. No complex permission systems.</li>
              <li><strong>Secure</strong> - HTTPS encryption, temporary codes, expiry-based cleanup, minimal logging</li>
              <li><strong>Inclusive</strong> - Works on any device, requires no registration, accessible to everyone</li>
            </ul>
            <p>
              We're building SendIt for users who care about privacy, simplicity, and intentional sharing. Users who want their files to follow a clear sender-selected expiry instead of lingering forever. Users who believe temporary access should be the default, not a complex afterthought.
            </p>
          </div>
        </div>
      </section>

      <section className="about-copy-stack">
        <div className="about-copy-wrap">
          <div className="about-copy-center-head">
            <span className="about-copy-section-tag">TECHNOLOGY</span>
            <h2 className="about-copy-stack-title">Current stack</h2>
          </div>

          <div className="about-copy-stack-grid">
            <article className="about-copy-stack-card react">
              <div className="about-copy-stack-icon">
                <RiReactjsLine />
              </div>
              <h3>React Frontend</h3>
              <p>Handles the user interface, page routing, and the responsive browser experience across SendIt.</p>
              <div className="about-copy-stack-watermark">UI</div>
            </article>

            <article className="about-copy-stack-card encryption">
              <div className="about-copy-stack-icon dark">
                <MdSecurity />
              </div>
              <h3 style={{ color: "white" }}>Temporary Sharing Workflow</h3>
              <p>
                The product is centered on short access codes, time-limited availability, and a clear separation between sending and receiving actions.
              </p>
              <div className="about-copy-security-bar">
                <div />
              </div>
              <div style={{ color: "white" }} className="about-copy-security-meta">
                <span>CODE-BASED ACCESS</span>
                <span>TIME-LIMITED FLOW</span>
              </div>
            </article>

            <article className="about-copy-stack-card small">
              <div className="about-copy-stack-icon">
                <FiServer />
              </div>
              <h4>Node.js and Express</h4>
              <p>Supports the API and transfer logic behind the app.</p>
            </article>

            <article className="about-copy-stack-card small">
              <div className="about-copy-stack-icon">
                <FiDatabase />
              </div>
              <h4>MongoDB and Mongoose</h4>
              <p>Used for data modeling, transfer records, and related app storage.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-copy-team">
        <div className="about-copy-wrap">
          <div className="about-copy-team-head">
            <div>
              <span className="about-copy-section-tag">TEAM</span>
              <h2 className="about-copy-stack-title left">People behind the project</h2>
            </div>
          </div>

          <div className="about-copy-team-grid">
            {teamMembers.map((member) => (
              <article className="about-copy-team-card" key={member.name}>
                <div className="about-copy-team-image">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    width="320"
                    height="320"
                  />
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
              <h2>Want to try the flow?</h2>
              <p>Start with a file upload, explore the guide, or contact the team if you want to report an issue.</p>
              <div className="about-copy-cta-actions">
                <button
                  className="about-copy-cta-primary"
                  onClick={() => navigate("/send")}
                  type="button"
                >
                  Start Sending
                </button>
                <button
                  className="about-copy-cta-secondary"
                  onClick={() => navigate("/contact")}
                  type="button"
                >
                  Contact SendIt
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
