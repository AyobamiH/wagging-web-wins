/**
 * Pre-render script for generating static HTML files
 * Runs after Vite build to create SEO-optimized HTML for key routes
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Template HTML (will be generated from index.html)
const template = fs.readFileSync(toAbsolute("../dist/index.html"), "utf-8");

// Import the server entry (built by Vite)
const { render } = await import("../dist-ssr/entry-server.js");

/**
 * Routes to pre-render
 * 
 * To add a new route to the pre-render list:
 * 1. Add the route path to this array
 * 2. Ensure the route exists in your React Router configuration
 * 3. Make sure the route's component uses the Seo component with proper props
 * 4. Run: npm run build:client && npm run build:server && npm run prerender
 */
const routes = [
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
  } catch (error) {
    console.error(`❌ Failed to pre-render ${route}:`, error);
  }
}

console.log("\n✨ Pre-render complete!\n");
