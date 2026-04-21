import { writeFileSync } from "fs";
import { BLOG_POSTS } from "./src/blogPosts.js";

const BASE = "https://thegenios.com";
const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { path: "/",                priority: "1.0", changefreq: "weekly"  },
  { path: "/thesis",          priority: "0.9", changefreq: "monthly" },
  { path: "/insights",        priority: "0.8", changefreq: "monthly" },
  { path: "/applications",    priority: "0.8", changefreq: "monthly" },
  { path: "/blogs",           priority: "0.9", changefreq: "weekly"  },
  { path: "/startup-program", priority: "0.7", changefreq: "monthly" },
];

const urls = [
  ...staticPages.map(({ path, priority, changefreq }) => `
  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`),

  ...BLOG_POSTS.map(post => `
  <url>
    <loc>${BASE}/blogs/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

writeFileSync("public/sitemap.xml", xml.trim());
console.log(`✓ sitemap.xml — ${staticPages.length + BLOG_POSTS.length} URLs`);
