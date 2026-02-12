import { useEffect } from "react";

/**
 * SEO Component - Manages meta tags, title, and structured data for each page
 * @param {Object} props - SEO configuration
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.url - Canonical URL
 * @param {string} props.image - OG image URL
 * @param {string} props.type - OG type (website, article, etc)
 * @param {Object} props.structuredData - Structured data object (JSON-LD)
 */
export default function SEO({
  title = "SendIt - Share Files Online | Secure File & Code Sharing Platform",
  description = "Secure file and code sharing platform. Share files free with 4-digit codes. No links, no accounts. Fast, safe, and instant.",
  keywords = "share files online, send files free, secure file transfer, code sharing, anonymous file sharing, sendit, best file sharing site",
  url = "https://senditsystem.netlify.app",
  image = "https://senditsystem.netlify.app/og-image.png",
  type = "website",
  structuredData = null,
}) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("theme-color", "#000000");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("revisit-after", "7 days");

    // Open Graph meta tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:site_name", "SendIt", true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // Cleanup is optional here - we keep meta tags for consistency
    };
  }, [title, description, keywords, url, image, type, structuredData]);

  return null;
}
