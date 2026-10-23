import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import posts from "../data/blogPosts.json";
import "../styles/Blog.css";

const SITE = "https://senditsystem.in";

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

  const visible =
    topic === "All"
      ? sorted
      : sorted.filter((post) => post.tags.includes(topic));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SendIt Blog",
    description:
      "Practical articles on file sharing, security, code snippets, and SendIt product workflows.",
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
        title="SendIt Blog | Practical File Sharing and Security Guides"
        description="Practical articles on file sharing, security, code snippets, and SendIt product workflows, with current product details and limitations."
        keywords="file sharing guides, secure file transfer, SendIt product workflows, code sharing, file expiry"
        url={`${SITE}/blog`}
        structuredData={structuredData}
      />

      <div className="blog-page">
        <header className="blog-hero">
          <span className="blog-kicker">SENDIT BLOG</span>
          <h1>Practical guides to sharing files and code</h1>

          <p>
            Explore practical advice and product-specific notes based on how
            SendIt currently works. Each article distinguishes general guidance
            from SendIt's own features and limitations.
          </p>
        </header>

        <div className="blog-topics" role="group" aria-label="Filter articles by topic">
          {topics.map((item) => (
            <button
              key={item}
              type="button"
              className={`blog-topic-btn ${topic === item ? "active" : ""}`}
              onClick={() => setTopic(item)}
              aria-pressed={topic === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {visible.map((post) => (
            <Link
              className="blog-card"
              key={post.slug}
              to={`/blog/${post.slug}`}
            >
              <div className="blog-card-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{post.readTime}</span>
              </div>
              <div className="blog-card-tags">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
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
