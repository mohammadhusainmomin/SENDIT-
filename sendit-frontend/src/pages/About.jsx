import { useEffect } from "react";
import { FiCode, FiLock, FiZap, FiUsers, FiGithub, FiMail, FiLinkedin, FiTarget, FiEye, FiHeart } from "react-icons/fi";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";
import "../styles/About.css";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SendIt",
    description: "A secure platform for sharing files and code",
    url: "https://sendit.example.com",
    logo: "https://sendit.example.com/logo.png",
  };

  const teamMembers = [
    {
      name: "Mohammad Husain",
      img: "images/mohammd.png",
      role: "Full Stack Developer",
      bio: "Full Stack Developer with practical experience in Angular and Next.js React.js. Specializes in building responsive web applications with REST API integration.",
      skills: ["React.js", "Next.js", "Angular", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
      email: "mohammadhusainmsn@gmail.com",
      linkedin: "linkedin.com/in/mohammadhusainmomin",
      github: "https://github.com/mohammadhusainmomin",
    },
    {
      name: "Shabir Trivedi",
      img: "images/sabbir.jpeg",
      role: "Frontend Developer",
      bio: "Frontend developer with expertise in modern web technologies and responsive UI/UX implementation.",
      skills: ["React", "JavaScript", "HTML/CSS", "Web Design", "User Experience", "Frontend Optimization"],
      email: "trivedishabbir071@gmail.com",
      linkedin: "https://www.linkedin.com/in/shabbir-trivedi-10a529358/",
    },
    {
      name: "Azim Divan",
      img: "images/azim.jpeg",
      role: "Backend Developer",
      bio: "Backend specialist focused on building robust and scalable server-side solutions with secure API implementation.",
      skills: ["Node.js", "Express.js", "MongoDB", "Authentication", "API Security", "Database Design"],
      email: "ajimdiwan04570457@gmail.com",
    },
  ];

  const values = [
    {
      icon: FiLock,
      title: "Security",
      description: "We prioritize your data security with end-to-end encryption and industry best practices."
    },
    {
      icon: FiEye,
      title: "Transparency",
      description: "Open communication and honest practices are at the core of everything we do."
    },
    {
      icon: FiZap,
      title: "Performance",
      description: "Fast, reliable, and optimized for seamless file and code sharing experience."
    },
    {
      icon: FiHeart,
      title: "User-Centric",
      description: "We design with users in mind, ensuring intuitive and accessible interfaces for everyone."
    }
  ];

  const stats = [
    { number: "100K+", label: "Files Shared" },
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "0ms", label: "Zero Trust" }
  ];

  return (
    <>
      <SEO
        title="About SendIt - Secure File & Code Sharing Platform"
        description="Learn about SendIt, a secure platform for sharing files and code snippets. Meet the team behind the innovation."
        url="https://sendit.example.com/about"
        structuredData={structuredData}
      />

      <div className="about-wrapper">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1 className="hero-title">About SendIt</h1>
            <p className="hero-subtitle">Secure, fast, and simple file & code sharing platform built for modern teams</p>
          </div>
          <div className="hero-decoration"></div>
        </section>

        <div className="about-container">
          {/* Mission & Vision */}
          <section className="about-section mission-vision">
            <div className="section-content">
              <div className="mission-card">
                <div className="card-icon">
                  <FiTarget />
                </div>
                <h2>Our Mission</h2>
                <p>
                  SendIt is dedicated to providing a secure, fast, and user-friendly platform for sharing files and code snippets. We believe that file sharing should be simple, safe, and accessible to everyone without compromising on security or performance.
                </p>
              </div>

              <div className="vision-card">
                <div className="card-icon">
                  <FiEye />
                </div>
                <h2>Our Vision</h2>
                <p>
                  To become the most trusted and reliable platform for secure file sharing, empowering individuals and teams to collaborate confidently without barriers.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="about-section stats-section">
            <h2 className="section-title">By The Numbers</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="about-section features-section">
            <h2 className="section-title">Why Choose SendIt?</h2>
            <div className="features-showcase">
              <div className="feature-item">
                <FiLock className="feature-item-icon" />
                <h4>Security First</h4>
                <p>All files are encrypted during transfer with military-grade encryption standards</p>
              </div>
              <div className="feature-item">
                <FiZap className="feature-item-icon" />
                <h4>Lightning Fast</h4>
                <p>Optimized infrastructure for quick uploads and downloads with minimal latency</p>
              </div>
              <div className="feature-item">
                <FiCode className="feature-item-icon" />
                <h4>Code Sharing</h4>
                <p>Share code snippets with syntax highlighting and automatic expiration</p>
              </div>
              <div className="feature-item">
                <FiUsers className="feature-item-icon" />
                <h4>No Sign-Up Required</h4>
                <p>Share files instantly without creating an account or providing personal data</p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="about-section values-section">
            <h2 className="section-title">Our Core Values</h2>
            <div className="values-grid">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="value-card">
                    <div className="value-icon">
                      <IconComponent />
                    </div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What We Offer */}
          <section className="about-section offerings-section">
            <h2 className="section-title">What We Offer</h2>
            <p className="section-description">
              SendIt provides comprehensive file and code sharing solutions tailored to your needs:
            </p>
            <ul className="feature-list">
              <li><strong>File Sharing:</strong> Upload and share files securely with code-based access and detailed tracking</li>
              <li><strong>Code Sharing:</strong> Share code snippets with syntax highlighting, auto-expiration, and version history</li>
              <li><strong>Privacy Protection:</strong> Automatic file expiration and secure deletion for enhanced privacy</li>
              <li><strong>User Management:</strong> Create accounts to track, manage, and organize your shared content</li>
              <li><strong>Mobile Friendly:</strong> Access and share files on any device with responsive design</li>
            </ul>
          </section>

          {/* Team Section */}
          <section className="about-section team-section">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description">
              We are passionate developers committed to creating tools that make secure file sharing simple and accessible.
            </p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-avatar">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="avatar-img" />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-skills">
                    {member.skills.map((skill, i) => (
                      <span key={i} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                  <div className="team-social">
                    {member.email !== "#" && (
                      <a href={`mailto:${member.email}`} title="Email" className="social-link">
                        <FiMail size={18} />
                      </a>
                    )}
                    {member.linkedin !== "#" && (
                      <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link">
                        <FiLinkedin size={18} />
                      </a>
                    )}
                    {member.github !== "#" && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="social-link">
                        <FiGithub size={18} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Commitment Section */}
          <section className="about-section commitment-section">
            <div className="commitment-content">
              <h2 className="section-title">Our Commitment to You</h2>
              <p>
                We are committed to maintaining the highest standards of security and privacy. Our platform is built with modern web technologies and best practices to ensure your data is always protected.
              </p>
              <p>
                We continuously improve our systems and listen to user feedback to provide the best experience possible. Your trust is our most valuable asset, and we work tirelessly to deserve it.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
