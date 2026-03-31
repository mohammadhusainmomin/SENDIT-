import { useEffect } from "react";
import { FiArrowRight, FiDatabase, FiServer } from "react-icons/fi";
import { RiReactjsLine } from "react-icons/ri";
import { MdSecurity, MdAutoDelete, MdPeopleAlt, MdSpeed } from "react-icons/md";
import SEO from "../components/SEO";

const teamMembers = [
  {
    name: "Marcus Chen",
    role: "Chief of Operations",
    bio: "Ex-Logistics lead with 15 years in global shipping networks.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhTCiD4VW9DA2JkDaD09coPz_Dy9wzYL--OLM6pzU4KdJogLG266pMAN7FnjjhNNPbtwEZfIXwygZeBZmhFGP8RXbKKO3Et-8cO-lVvGq1g-UJ53gFpvvp5CrN5uAsRXcMYlGbazGoSPIWUjz6oWagr4_wK8x3GPEWbN5q_mE1XiAh7B6E2VycosjJWHaO-bS-9CwwIJkqLBQK7tBmnRX-64f3CuZ9B_lQ5weUJbeziw5ctmCg6fcaYOpk-uSj2kjhWKaszxan8-T7",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Security",
    bio: "Cyber-security specialist and encryption methodology expert.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8K9Y8G61nIBMeOZO-xW7Qy9TyrMEArG5UM062_LKxUfzPga0KkBy7-qoLmcFquVQImSsYmX7Fh-b2wAG5BA65lIBFrzF7iu9CXGno07vT1XT_By49F_chbKa_d2TdC8zzs1ADib2Rh9TlVrpMP1Vb6J_YC3nPDE4AodzGDviJxQJiXsRbzFy5qRvkdKbu6-wnfx5j4YAsmv31W-yAUrjWOWD7ZEZvX4uwDzogQWZs60LDZwusACG7YGkxmgn9g3KUVW9ugK0FEFPO",
  },
  {
    name: "Jordan Smith",
    role: "Principal Designer",
    bio: "Visionary behind the 'Kinetic Curator' design language.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVi1x_bx6CIY8L2tHMk9eNKc-mZVicKzdW2Rbc4JtchjKEw2siyHHC2iDaofkaeSdA_cJaxi2AVyyW58vMrYEnSoLDIjSYCnOWOwNF6vV3BSnTq9KNLTnQVlFjHz7pXoXK6x7SrhdZjDQqASDc6HbNFtgGlDRMHZUHZAFg2g34ZunMXZCscLNnn2HrkD5ANy4MtiH1xk86Pn-DK9WcjcxqZysQkK8_Qg7AyZjecwM37F-pB15vagk4CZqBJ96g4pg-JFadEW4dZCWx",
  },
  {
    name: "Sarah Williams",
    role: "Lead Developer",
    bio: "Full-stack architect optimizing React performance and Node security.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkVd321hYGI0Ng3wkspPHyy8fvqE5LMbTfJ2pDK7J-gDfberPscs5XMm4r01E7Y3LdWNNwKLaSKZY5tedyczepEPUcCzezRQzR_RoioyRnZhfOaZ9B31pLdaEbOdoxhjC4bS-9TZtXW7bwUihj4ro21zBZvGDbBkScQkkeEFZfsP2htC6y6CL84QAsab2nZdSGa-qFRHxlHwfG1oafO_CqpzfsywbUfUdgcIJ8Pudyg2-Ea-3wH2AqHdbunB0ZwCA_TyKGfCdvlLJ1",
  },
];

function About() {
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
            SendIt brings together temporary access codes, streamlined transfer flows, and a polished interface for sharing files and code on the web.
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
            <h2 className="about-copy-section-title">Architecting the Future of Secure Exchange.</h2>
            <div className="about-copy-body">
              <p>
                SendIt is a modern file and code-sharing platform designed for developers and everyday
                users. It allows users to upload files and share snippets temporarily using access codes
                and a simple receive flow.
              </p>
              <p>
                Our goal is to make transfer steps easy to understand while keeping the product fast,
                temporary by design, and aligned with the backend workflow already running in SendIt.
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
                <p>Temporary codes help limit access to the content you intend to share.</p>
              </article>
              <article className="about-copy-value-card">
                <MdSpeed className="about-copy-value-icon" />
                <h3>Warp Speed</h3>
                <p>Fast transfer steps and a focused interface help users move through the flow quickly.</p>
              </article>
            </div>

            <div className="about-copy-column">
              <article className="about-copy-value-card primary">
                <MdPeopleAlt className="about-copy-value-icon" />
                <h3>Human Centric</h3>
                <p>Complex tech hidden behind a simple, editorial-grade interface.</p>
              </article>
              <article className="about-copy-value-card">
                <MdAutoDelete className="about-copy-value-icon" />
                <h3>Expiry Workflow</h3>
                <p>Short-lived sharing windows help keep temporary content from staying active longer than needed.</p>
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
                Leveraging concurrent rendering and fluid animations for an elite, application-like
                performance.
              </p>
              <div className="about-copy-stack-watermark">19</div>
            </article>

            <article className="about-copy-stack-card encryption">
              <div className="about-copy-stack-icon dark">
                <MdSecurity />
              </div>
              <h3 style={{color:'white'}}>AES-256-CBC Encryption</h3>
              <p>
                SendIt is built around careful transfer handling, temporary access, and a workflow designed for secure sharing patterns.
              </p>
              <div className="about-copy-security-bar">
                <div />
              </div>
              <div style={{color:'white'}} className="about-copy-security-meta">
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
              <h2 className="about-copy-stack-title left">The Minds Behind the Mission.</h2>
            </div>
            <button className="about-copy-careers" type="button">
              View Careers <FiArrowRight />
            </button>
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
                Join thousands of companies trusting SendIt for their high-priority digital logistics.
              </p>
              <div className="about-copy-cta-actions">
                <button className="about-copy-cta-primary" type="button">Start Sending Free</button>
                <button className="about-copy-cta-secondary" type="button">Talk to Sales</button>
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
