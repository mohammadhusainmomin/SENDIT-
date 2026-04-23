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
        url="https://senditsystem.netlify.app/about"
      />

      <section className="about-copy-hero">
        <div className="about-copy-wrap">
          <span className="about-copy-kicker">ABOUT SENDIT</span>
          <h1 className="about-copy-title">
            A practical tool for <span>temporary</span> digital sharing.
          </h1>
          <p className="about-copy-lead">
            SendIt is a web app for sending files and code snippets with a short access code and a straightforward receive flow. The aim is to make sharing easier to understand for both technical and non-technical users.
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
            <span className="about-copy-section-tag">WHAT WE FOCUS ON</span>
            <h2 className="about-copy-section-title">
              Clear sharing, short-lived access, and simpler handoffs.
            </h2>
            <div className="about-copy-body">
              <p>
                SendIt was built around a temporary-sharing model. A sender uploads a file or creates a code share, passes a short code to the receiver, and the receiver uses the matching page to retrieve the content.
              </p>
              <p>
                This makes the product suitable for assignments, quick team collaboration, client handoffs, and short-lived downloads that do not need to stay public for long periods.
              </p>
            </div>
            <div className="about-copy-stats">
              <div>
                <strong>Files</strong>
                <span>Temporary transfers</span>
              </div>
              <div>
                <strong>Code</strong>
                <span>Snippet sharing</span>
              </div>
            </div>
          </div>

          <div className="about-copy-value-grid">
            <div className="about-copy-column offset">
              <article className="about-copy-value-card">
                <MdSecurity className="about-copy-value-icon" />
                <h3>Controlled Access</h3>
                <p>Temporary codes and receive pages help keep sharing more intentional than a permanent public post.</p>
              </article>
              <article className="about-copy-value-card">
                <MdSpeed className="about-copy-value-icon" />
                <h3>Fast Handoffs</h3>
                <p>The flow is designed to reduce steps so people can upload, share, and retrieve content quickly.</p>
              </article>
            </div>

            <div className="about-copy-column">
              <article className="about-copy-value-card primary">
                <MdPeopleAlt className="about-copy-value-icon" />
                <h3>User Friendly</h3>
                <p>SendIt is meant to feel approachable even for users who are not deeply technical.</p>
              </article>
              <article className="about-copy-value-card">
                <MdAutoDelete className="about-copy-value-icon" />
                <h3>Expiry Workflow</h3>
                <p>Short-lived sharing windows help keep old transfers from remaining active indefinitely.</p>
              </article>
            </div>
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
