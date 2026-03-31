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
  title = "SendIt - Secure File Sharing and Code Sharing Platform",
  description = "SendIt is a secure file sharing and code sharing platform for sending files online with temporary access codes and a clean receive flow.",
  keywords = "sendit, sendit file sharing, secure file sharing, send files online, file sharing platform, code sharing platform, receive files with code, temporary access code, share code online",
  url = "https://senditsystem.netlify.app/",
  image = "https://senditsystem.netlify.app/images/Sendit_logo.png",
  type = "website",
  structuredData = null,
  robots = "index, follow",
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
    updateMetaTag("theme-color", "#0d6efd");
    updateMetaTag("robots", robots);
    updateMetaTag("revisit-after", "7 days");
    updateMetaTag("author", "SendIt");

    // Open Graph meta tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:site_name", "SendIt", true);
    updateMetaTag("og:image:alt", "SendIt secure file sharing platform", true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:image:alt", "SendIt secure file sharing platform");

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Structured Data (JSON-LD)
    const existingManagedSchemas = document.querySelectorAll('script[data-seo-schema="true"]');
    existingManagedSchemas.forEach((node) => node.remove());

    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: "SendIt",
        url: "https://senditsystem.netlify.app/",
      },
    };

    const schemas = structuredData
      ? Array.isArray(structuredData)
        ? [defaultSchema, ...structuredData]
        : [defaultSchema, structuredData]
      : [defaultSchema];

    schemas.forEach((schema) => {
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-seo-schema", "true");
      scriptTag.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    });

    return () => {
      const managedSchemas = document.querySelectorAll('script[data-seo-schema="true"]');
      managedSchemas.forEach((node) => node.remove());
    };
  }, [title, description, keywords, url, image, type, structuredData, robots]);

  return null;
}
