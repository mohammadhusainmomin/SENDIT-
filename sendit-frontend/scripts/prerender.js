/* eslint-disable no-console */
/**
 * Static prerender step for SendIt.
 *
 * Create React App ships a single empty index.html, which means crawlers
 * (including the AdSense crawler) see a blank page. This script runs after
 * `react-scripts build` and writes a real HTML file for every public route,
 * with a correct <title>, meta description, canonical URL, Open Graph tags,
 * JSON-LD, and readable body content inside #root.
 *
 * React still hydrates normally on top of it: createRoot replaces the
 * server-written markup on first render, so there is no mismatch.
 */

const fs = require("fs");
const path = require("path");

const SITE = "https://senditsystem.in";
const BUILD_DIR = path.join(__dirname, "..", "build");
const TEMPLATE = path.join(BUILD_DIR, "index.html");
const posts = require(
  path.join(__dirname, "..", "src", "data", "blogPosts.json"),
);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const staticPages = [
  {
    path: "/",
    title: "SendIt - Secure File Sharing and Code Sharing Platform",
    description:
      "SendIt is a free, account-free platform for sharing files and code snippets using short temporary access codes with sender-controlled expiry.",
    heading: "Share files and code with temporary access codes",
    body: [
      "SendIt lets you upload a file or a code snippet and share a short temporary access code instead of a long download URL. The recipient enters the code on the receive page and collects the content. When the expiry you selected passes, the share stops working.",
      "No account is required to send or receive. Uploads are transferred over HTTPS, access is gated by a code rather than a bare link, and shares are removed after expiry rather than kept indefinitely.",
    ],
    links: [
      ["/send", "Send a file"],
      ["/receive", "Receive a file"],
      ["/code/send", "Share a code snippet"],
      ["/blog", "Read our guides"],
    ],
  },
  {
    path: "/send",
    title: "Send a File | SendIt Secure File Transfer",
    description:
      "Upload a file, choose how long it stays available, and share a short temporary access code with your recipient. No signup required.",
    heading: "Send a file with a temporary access code",
    body: [
      "Choose a file, set the expiry window that matches how quickly your recipient will collect it, and SendIt generates a short access code. Share that code through any channel you trust and the recipient uses it on the receive page.",
      "Shorter expiry windows are safer. Most transfers are collected within the first hour, so there is rarely a reason to leave a share open for days.",
    ],
    links: [
      ["/receive", "Receive a file"],
      ["/guide", "Sharing guide"],
      [
        "/blog/share-files-securely-without-email",
        "How to share files securely without email",
      ],
    ],
  },
  {
    path: "/receive",
    title: "Receive a File | Enter Your SendIt Access Code",
    description:
      "Enter the temporary access code you were given to download a file shared through SendIt. No account needed.",
    heading: "Receive a file using an access code",
    body: [
      "Enter the short access code the sender gave you. If the code is valid and has not expired, the file downloads immediately.",
      "If the code no longer works, the share has passed its expiry window. Ask the sender to upload it again; re-sending takes under a minute.",
    ],
    links: [
      ["/send", "Send a file"],
      ["/faq", "Frequently asked questions"],
      ["/blog/why-links-expire-security", "Why download links expire"],
    ],
  },
  {
    path: "/code/send",
    title: "Share a Code Snippet | SendIt Code Sharing",
    description:
      "Paste a code snippet, pick the language for syntax highlighting, set an expiry, and share a short access code with your team.",
    heading: "Share a code snippet with an access code",
    body: [
      "Paste your snippet, select the language so it renders with syntax highlighting, add a short description of what you want the reader to look at, and choose an expiry.",
      "Expiring snippet shares keep chat channels readable and stop half-finished code from being linked in documentation months later.",
    ],
    links: [
      ["/code/receive", "Receive a code snippet"],
      [
        "/blog/share-code-snippets-with-your-team",
        "How to share code snippets with your team",
      ],
    ],
  },
  {
    path: "/code/receive",
    title: "Receive a Code Snippet | SendIt",
    description:
      "Enter your access code to view a code snippet shared through SendIt with syntax highlighting.",
    heading: "Receive a shared code snippet",
    body: [
      "Enter the access code you were given to open the snippet. Snippets are displayed with syntax highlighting and can be copied in one action.",
      "Snippet shares expire on the schedule the sender chose, so old links do not linger in team channels.",
    ],
    links: [
      ["/code/send", "Share a code snippet"],
      ["/blog/share-code-snippets-with-your-team", "Snippet sharing guide"],
    ],
  },
  {
    path: "/features",
    title: "Features | SendIt File and Code Sharing",
    description:
      "Temporary access codes, sender-controlled expiry, code snippet sharing with syntax highlighting, QR handoff and account-free transfers.",
    heading: "What SendIt does",
    body: [
      "SendIt combines file transfer and code snippet sharing behind the same idea: a short access code instead of a permanent link, and an expiry window you choose at the moment of sharing.",
      "Features include multi-file uploads, expiry control, syntax-highlighted snippet sharing, QR handoff between devices, optional accounts for transfer history, and automatic removal after expiry.",
    ],
    links: [
      ["/guide", "Sharing guide"],
      ["/faq", "FAQ"],
      ["/blog", "Blog"],
    ],
  },
  {
    path: "/guide",
    title: "Sharing Guide | How to Use SendIt Step by Step",
    description:
      "A step-by-step guide to sending files, receiving with an access code, sharing code snippets and choosing sensible expiry windows.",
    heading: "How to use SendIt, step by step",
    body: [
      "This guide walks through the full workflow: preparing a file, choosing an expiry, sharing the access code on a separate channel, and confirming the recipient collected it.",
      "It also covers the habits that matter more than the tool: neutral filenames, stripping metadata, sending only what is needed, and closing shares early once collection is confirmed.",
    ],
    links: [
      ["/send", "Send a file"],
      ["/blog/file-expiry-and-auto-delete", "Choosing an expiry window"],
      ["/blog/file-sharing-mistakes-to-avoid", "Common file sharing mistakes"],
    ],
  },
  {
    path: "/about",
    title: "About SendIt | Who We Are and Why We Built It",
    description:
      "SENDIT is an independent team in Ahmedabad, Gujarat, India building a privacy-first temporary file and code sharing platform.",
    heading: "About SENDIT",
    body: [
      "SENDIT is built and operated by an independent team based in Ahmedabad, Gujarat, India. We built it because the ordinary ways of moving a file between two people — email attachments and permanent cloud links — leave copies behind forever.",
      "Our approach is deliberately narrow: one file, one short code, one expiry window, then nothing. We publish guides explaining the reasoning so people can apply the same habits with any tool they use.",
    ],
    links: [
      ["/contact", "Contact us"],
      ["/blog", "Our guides"],
      ["/privacy", "Privacy policy"],
    ],
  },
  {
    path: "/faq",
    title: "FAQ | Common Questions About SendIt",
    description:
      "Answers about file size limits, expiry, accounts, supported file types, code snippet sharing, privacy and data retention on SendIt.",
    heading: "Frequently asked questions",
    body: [
      "Common questions cover whether SendIt is free, whether an account is required, how the temporary code system works, how long shared content stays available, what file types are supported and how deletion works.",
      "If your question is not answered here, contact the SENDIT team at mmbrothersteam@gmail.com and we will reply within 24-48 hours.",
    ],
    links: [
      ["/guide", "Sharing guide"],
      ["/contact", "Contact us"],
      ["/blog", "Blog"],
    ],
  },
  {
    path: "/contact",
    title: "Contact SendIt | Support, Location and Business Contact",
    description:
      "Contact SENDIT at mmbrothersteam@gmail.com. Based in Ahmedabad, Gujarat, India. Support hours Monday to Saturday, 10:00 AM to 6:00 PM IST.",
    heading: "Contact SENDIT",
    body: [
      "Business name: SENDIT. Email: mmbrothersteam@gmail.com. Location: Ahmedabad, Gujarat, India.",
      "Support hours are Monday to Saturday, 10:00 AM to 6:00 PM (IST). We typically respond to all inquiries within 24-48 hours. Use this address for support, transfer problems, privacy requests, policy questions and business enquiries.",
    ],
    links: [
      ["/faq", "FAQ"],
      ["/privacy", "Privacy policy"],
      ["/terms", "Terms of service"],
    ],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | SendIt",
    description:
      "How SendIt collects, uses and deletes data, our cookie usage, and disclosure of Google AdSense and third-party advertising cookies.",
    heading: "Privacy policy",
    body: [
      "This policy explains what data SendIt collects, how long it is retained, and how shared files and code snippets are removed after expiry.",
      "It also discloses our use of cookies and local storage, and that third parties including Google may place and read cookies on your browser, or use web beacons and IP addresses, to serve and measure advertising on this site. Opt-out options are described in full on the page.",
    ],
    links: [
      ["/terms", "Terms of service"],
      ["/disclaimer", "Disclaimer"],
      ["/contact", "Contact us"],
    ],
  },
  {
    path: "/terms",
    title: "Terms of Service | SendIt",
    description:
      "The rules for using SendIt: acceptable use, prohibited content, availability, liability and account terms.",
    heading: "Terms of service",
    body: [
      "These terms cover acceptable use of SendIt, prohibited content, service availability, limitation of liability and the conditions attached to optional accounts.",
      "By uploading content you confirm you have the right to share it and that it does not infringe any law or third-party right.",
    ],
    links: [
      ["/privacy", "Privacy policy"],
      ["/disclaimer", "Disclaimer"],
      ["/contact", "Contact us"],
    ],
  },
  {
    path: "/disclaimer",
    title: "Disclaimer | SendIt",
    description:
      "Editorial and service disclaimer for SendIt, including the scope of guidance published on our blog.",
    heading: "Disclaimer",
    body: [
      "SendIt is provided as-is. Guidance published on this site, including blog articles, is general information and not legal, financial or professional security advice.",
      "You remain responsible for the content you upload and for verifying that any practice described here is appropriate for your own situation.",
    ],
    links: [
      ["/terms", "Terms of service"],
      ["/privacy", "Privacy policy"],
    ],
  },
  {
    path: "/blog",
    title: "SendIt Blog | Guides on Secure File Sharing and Code Sharing",
    description:
      "In-depth, original guides on secure file transfer, temporary access codes, encryption, QR sharing, file expiry and privacy-first sharing workflows.",
    heading: "SendIt blog",
    body: [
      "Original, independently written guides about secure transfers, temporary access codes, encryption, expiry policies and the everyday habits that keep shared data from leaking.",
    ],
    links: posts
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((post) => [`/blog/${post.slug}`, post.title]),
  },
];

function renderBlocks(blocks) {
  return blocks
    .map((block) => {
      if (block.type === "h2") return `<h2>${escapeHtml(block.text)}</h2>`;
      if (block.type === "ul")
        return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      return `<p>${escapeHtml(block.text)}</p>`;
    })
    .join("\n");
}

function buildHtml(template, page) {
  const url = `${SITE}${page.path === "/" ? "/" : page.path}`;
  let html = template;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`,
  );
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:type"[\s\S]*?\/>/,
    `<meta property="og:type" content="${page.type || "website"}" />`,
  );
  const extraHead = page.jsonLd
    ? `\n    <script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`
    : "";

  if (extraHead) {
    html = html.replace("</head>", `${extraHead}\n  </head>`);
  }

  const nav = [
    ["/", "Home"],
    ["/send", "Send File"],
    ["/receive", "Receive File"],
    ["/code/send", "Send Code"],
    ["/blog", "Blog"],
    ["/features", "Features"],
    ["/guide", "Guide"],
    ["/faq", "FAQ"],
    ["/about", "About"],
    ["/contact", "Contact"],
    ["/privacy", "Privacy"],
    ["/terms", "Terms"],
  ]
    .map(([href, label]) => `<a href="${href}">${label}</a>`)
    .join(" ");

  const links = (page.links || [])
    .map(
      ([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`,
    )
    .join("");

  const content = `
      <div id="prerendered-content">
        <nav aria-label="Main">${nav}</nav>
        <main>
          <h1>${escapeHtml(page.heading)}</h1>
          ${page.meta || ""}
          ${page.bodyHtml || page.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
          ${links ? `<h2>More from SendIt</h2><ul>${links}</ul>` : ""}
        </main>
        <footer>
          <p>SENDIT, Ahmedabad, Gujarat, India. Support: mmbrothersteam@gmail.com. Monday to Saturday, 10:00 AM to 6:00 PM IST.</p>
        </footer>
      </div>`;

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${content}</div>`,
  );
  return html;
}

function writePage(html, routePath) {
  const dir = routePath === "/" ? BUILD_DIR : path.join(BUILD_DIR, routePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

function main() {
  if (!fs.existsSync(TEMPLATE)) {
    console.error(
      "prerender: build/index.html not found. Run react-scripts build first.",
    );
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE, "utf8");
  const routes = [];

  staticPages.forEach((page) => {
    const url = `${SITE}${page.path === "/" ? "/" : page.path}`;
    const enriched = {
      ...page,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url,
        isPartOf: { "@type": "WebSite", name: "SendIt", url: SITE },
        publisher: { "@type": "Organization", name: "SENDIT", url: SITE },
      },
    };
    writePage(buildHtml(template, enriched), page.path);
    routes.push({
      path: page.path,
      lastmod: null,
      priority: page.path === "/" ? "1.0" : "0.7",
    });
  });

  posts.forEach((post) => {
    const routePath = `/blog/${post.slug}`;
    const url = `${SITE}${routePath}`;
    const page = {
      path: routePath,
      title: `${post.title} | SendIt Blog`,
      description: post.description,
      heading: post.title,
      type: "article",
      meta: `<p><em>Published ${escapeHtml(post.date)} &middot; Updated ${escapeHtml(
        post.updated,
      )} &middot; ${escapeHtml(post.readTime)} &middot; By the SENDIT team</em></p>`,
      bodyHtml: `<p>${escapeHtml(post.description)}</p>\n${renderBlocks(post.content)}`,
      links: [
        ["/blog", "All articles"],
        ["/send", "Send a file"],
        ["/guide", "Sharing guide"],
      ],
      jsonLd: {
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
          logo: {
            "@type": "ImageObject",
            url: `${SITE}/images/Sendit_logo.png`,
          },
        },
      },
    };
    writePage(buildHtml(template, page), routePath);
    routes.push({ path: routePath, lastmod: post.updated, priority: "0.8" });
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) =>
      [
        "  <url>",
        `    <loc>${SITE}${route.path}</loc>`,
        route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : null,
        `    <priority>${route.priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    ),
    "</urlset>",
  ].join("\n");

  fs.writeFileSync(path.join(BUILD_DIR, "sitemap.xml"), xml);

  console.log(
    `prerender: wrote ${routes.length} static HTML pages and sitemap.xml`,
  );
}

main();
