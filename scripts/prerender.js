/**
 * Pre-render script for generating static HTML files
 * Runs after Vite build to create SEO-optimized HTML for key routes
 * 
 * This script:
 * 1. Fetches all published blog post slugs from Supabase
 * 2. Renders static HTML for marketing pages AND individual blog posts
 * 3. Injects helmet (SEO) data into each page
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Supabase config for fetching blog slugs (uses anon key for public reads only)
const SUPABASE_URL = "https://viwxxjnehceedyctevau.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3h4am5laGNlZWR5Y3RldmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMDE3NzcsImV4cCI6MjA3MDc3Nzc3N30.bQqfq-ktOHrIs6cyCYx7t8PRmrn0oaO6qPUY2mGZOrI";

/**
 * Fetch all published blog post slugs from Supabase
 */
async function fetchBlogSlugs() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?select=slug&published=eq.true&order=published_at.desc`,
      {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch blog slugs: ${response.status} ${response.statusText}`);
      return [];
    }

    const posts = await response.json();
    return posts.map(p => p.slug);
  } catch (error) {
    console.warn("⚠️  Could not fetch blog slugs from Supabase:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

// Template HTML (will be generated from index.html)
const template = fs.readFileSync(toAbsolute("../dist/index.html"), "utf-8");

// Import the server entry (built by Vite)
const { render, initCache } = await import("../dist-ssr/entry-server.js");

// Initialize the post cache before rendering
console.log("📚 Initializing blog post cache for SSR...");
await initCache();

/**
 * Static routes to pre-render (always included)
 */
const staticRoutes = [
  "/",
  "/services",
  "/pricing",
  "/contact",
  "/faq",
  "/tools",
  "/service-areas",
  "/service-areas/northampton",
  "/service-areas/wellingborough",
  "/service-areas/kettering",
  "/service-areas/daventry",
  "/service-areas/towcester",
  "/service-areas/rushden",
  "/service-areas/corby",
  "/service-areas/milton-keynes",
  "/service-areas/banbury",
  "/why-do-dogs",
  "/blog",
  // Lovable Content Hub
  "/blog/lovable",
  "/blog/lovable/guides",
  "/blog/lovable/debug-diaries",
  "/blog/lovable/case-studies",
  "/blog/lovable/survival-notes",
  "/blog/lovable/frameworks",
];

// Ensure dist directory exists
const distDir = toAbsolute("../dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log("🚀 Starting pre-render process...\n");

// Fetch blog slugs from Supabase
console.log("📡 Fetching blog post slugs from Supabase...");
const blogSlugs = await fetchBlogSlugs();
console.log(`   Found ${blogSlugs.length} published blog posts\n`);

// Build dynamic blog post routes
const blogRoutes = blogSlugs.map(slug => `/blog/${slug}`);

// Combine all routes
const routes = [...staticRoutes, ...blogRoutes];

let successCount = 0;
let failCount = 0;

for (const route of routes) {
  try {
    const { html, helmet } = render(route);
    
    // Inject helmet data and rendered HTML into template
    const finalHtml = template
      .replace(`<!--helmet-title-->`, helmet.title)
      .replace(`<!--helmet-meta-->`, helmet.meta)
      .replace(`<!--helmet-link-->`, helmet.link)
      .replace(`<!--helmet-script-->`, helmet.script)
      .replace(`<!--app-html-->`, html);

    // Determine file path
    const filePath = route === "/" 
      ? path.join(distDir, "index.html")
      : path.join(distDir, route, "index.html");

    // Create directory if needed
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, finalHtml);
    console.log(`✅ Pre-rendered: ${route}`);
    successCount++;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to pre-render ${route}:`, errorMessage);
    failCount++;
  }
}

console.log(`\n✨ Pre-render complete!`);
console.log(`   ✅ ${successCount} pages rendered successfully`);
if (failCount > 0) {
  console.log(`   ❌ ${failCount} pages failed`);
}
console.log("");
