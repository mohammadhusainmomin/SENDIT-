import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import posts from "../data/blogPosts.json";
import productNotes from "../data/blogProductNotes";
import NotFound from "./NotFound";
import "../styles/Blog.css";

const SITE = "https://senditsystem.in";

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

function countWords(blocks) {
  const text = blocks
    .flatMap((block) => [block.text, ...(block.items || [])])
    .filter(Boolean)
    .join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  const productNote = productNotes[post.slug];
  const url = `${SITE}/blog/${post.slug}`;
  const wordCount = countWords(post.content);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      wordCount,
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
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span aria-current="page">{post.title}</span>
        </nav>

        <h1>{post.title}</h1>

        <div className="blog-article-meta">
          <span>Published <time dateTime={post.date}>{formatDate(post.date)}</time></span>
          <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
          <span>{post.readTime}</span>
          <span>By the SENDIT team</span>
        </div>

        <p className="blog-lead">{post.description}</p>

        <div className="blog-body">{post.content.map(renderBlock)}</div>

        {productNote && (
          <aside className="blog-product-note" aria-labelledby="blog-product-note-title">
            <p className="blog-product-note__eyebrow">Current SendIt product context</p>
            <h2 id="blog-product-note-title">How this applies in SendIt</h2>
            <p>{productNote.detail}</p>
            <p><strong>Practical example:</strong> {productNote.example}</p>
            <p className="blog-product-note__disclosure">
              This is an illustrative workflow based on the current product, not a customer testimonial.
              See <Link to="/features">features and limits</Link> and the{" "}
              <Link to="/security">security overview</Link>.
            </p>
          </aside>
        )}

        <div className="blog-tags">
          {post.tags.map((tag) => (
            <span className="blog-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="blog-cta">
          <h3>Explore the current SendIt documentation</h3>
          <p>
            Product instructions and limits can change. Check the current sharing guide and feature details
            before starting a transfer.
          </p>
          <div className="blog-cta-links">
            <Link to="/features">Current product features</Link>
            <Link className="secondary" to="/guide">
              Read the sharing guide
            </Link>
            <Link className="secondary" to="/blog">
              Browse all articles
            </Link>
          </div>
        </div>

        <section className="blog-related">
          <h2>More practical guidance</h2>
          <div className="blog-related-list">
            <Link to="/security">
              SendIt security overview
              <span>Review the protections SendIt uses and the risks that remain.</span>
            </Link>
            <Link to="/faq">
              Frequently asked questions
              <span>Find current answers about codes, expiry, and transfer limits.</span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
