import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import posts from "../data/blogPosts.json";
import NotFound from "./NotFound";
import "../styles/Blog.css";

const SITE = "https://senditsystem.netlify.app";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function renderBlock(block, index) {
  if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
  if (block.type === "ul") {
    return (
      <ul key={index}>
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p key={index}>{block.text}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  const related = posts
    .filter((item) => item.slug !== post.slug && item.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const url = `${SITE}/blog/${post.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      wordCount: post.words,
      keywords: post.tags.join(", "),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: "SENDIT", url: SITE },
      publisher: {
        "@type": "Organization",
        name: "SENDIT",
        logo: { "@type": "ImageObject", url: `${SITE}/images/Sendit_logo.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={`${post.title} | SendIt Blog`}
        description={post.description}
        keywords={post.tags.join(", ")}
        url={url}
        type="article"
        structuredData={structuredData}
      />

      <article className="blog-article">
        <nav className="blog-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>{post.title}</span>
        </nav>

        <h1>{post.title}</h1>

        <div className="blog-article-meta">
          <span>Published {formatDate(post.date)}</span>
          <span>Updated {formatDate(post.updated)}</span>
          <span>{post.readTime}</span>
          <span>By the SENDIT team</span>
        </div>

        <p className="blog-lead">{post.description}</p>

        <div className="blog-body">{post.content.map(renderBlock)}</div>

        <div className="blog-tags">
          {post.tags.map((tag) => (
            <span className="blog-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="blog-cta">
          <h3>Try the workflow described here</h3>
          <p>
            SendIt lets you upload a file or a code snippet, share a short temporary access code, and let
            the share expire automatically. No account needed to send or receive.
          </p>
          <div className="blog-cta-links">
            <Link to="/send">Send a file</Link>
            <Link className="secondary" to="/code/send">
              Share a code snippet
            </Link>
            <Link className="secondary" to="/guide">
              Read the sharing guide
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="blog-related">
            <h2>Related reading</h2>
            <div className="blog-related-list">
              {related.map((item) => (
                <Link key={item.slug} to={`/blog/${item.slug}`}>
                  {item.title}
                  <span>{item.description}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
