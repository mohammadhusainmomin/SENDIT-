import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import posts from "../data/blogPosts.json";
import "../styles/Blog.css";

const SITE = "https://senditsystem.netlify.app";

const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  const [topic, setTopic] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topics = useMemo(() => {
    const set = new Set();
    posts.forEach((post) => post.tags.forEach((tag) => set.add(tag)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const visible = topic === "All" ? sorted : sorted.filter((post) => post.tags.includes(topic));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SendIt Blog",
    description:
      "Original guides on secure file sharing, temporary access codes, encryption, file expiry and code sharing workflows.",
    url: `${SITE}/blog`,
    blogPost: sorted.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      url: `${SITE}/blog/${post.slug}`,
      author: { "@type": "Organization", name: "SENDIT" },
    })),
  };

  return (
    <>
      <SEO
        title="SendIt Blog | Guides on Secure File Sharing and Code Sharing"
        description="In-depth, original guides on secure file transfer, temporary access codes, encryption, QR sharing, file expiry and privacy-first sharing workflows."
        keywords="secure file sharing guide, file transfer blog, temporary access code, encrypted file transfer, share code snippets, file expiry"
        url={`${SITE}/blog`}
        structuredData={structuredData}
      />

      <div className="blog-page">
        <header className="blog-hero">
          <span className="blog-kicker">SendIt Library</span>
          <h1>Guides on sharing files and code without leaving a trail</h1>
          <p>
            Practical, independently written articles about secure transfers, temporary access codes,
            encryption, expiry policies and the everyday habits that keep shared data from leaking. No
            reposted content, no filler.
          </p>
        </header>

        <div className="blog-topics">
          {topics.map((item) => (
            <button
              key={item}
              type="button"
              className={`blog-topic-btn ${topic === item ? "active" : ""}`}
              onClick={() => setTopic(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {visible.map((post) => (
            <Link className="blog-card" key={post.slug} to={`/blog/${post.slug}`}>
              <div className="blog-card-meta">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span className="blog-card-more">Read article &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
