# SEO Pre-Rendering Documentation

## Overview

This project uses **pre-rendering (SSG - Static Site Generation)** to ensure all SEO-critical elements (meta tags, titles, structured data) are present in the initial HTML delivered to search engines and users.

### Architecture

We use a **Vite + React SPA** with pre-rendering capabilities:
- **Client-side**: React Router DOM for navigation
- **Build-time**: Static HTML generation for key routes
- **SSR-compatible head management**: react-helmet-async

### Why Pre-Rendering?

While Google can process JavaScript, pre-rendered content is:
- ✅ Indexed more reliably
- ✅ Visible to all search bots immediately
- ✅ Faster for users (no JavaScript needed for initial view)
- ✅ Better for Core Web Vitals

## Key Files

### 1. SEO Component (`src/components/SeoHelmet.tsx`)
SSR-compatible SEO component using `react-helmet-async`:
```tsx
import { SeoHelmet } from "@/components/SeoHelmet";

<SeoHelmet
  title="Your Page Title"
  description="Your page description"
  path="/your-path"
  jsonLd={[/* custom schemas */]}
/>
```

### 2. Client Entry (`src/entry-client.tsx`)
Hydrates pre-rendered HTML on the client:
- Uses `ReactDOM.hydrateRoot()` instead of `render()`
- Wraps app in `HelmetProvider`

### 3. Server Entry (`src/entry-server.tsx`)
Renders React app to string during build:
- Uses `StaticRouter` for server context
- Collects helmet data (meta tags, scripts)
- Returns both HTML and helmet data

### 4. Pre-render Script (`scripts/prerender.js`)
Node script that:
- Runs after Vite build
- Renders each route with server entry
- Injects SEO data into HTML template
- Writes static HTML files to `dist/`

## Build Process

```bash
npm run build
```

**Steps:**
1. Vite builds client bundle → `dist/`
2. Vite builds server bundle → `dist-ssr/`
3. Pre-render script runs:
   - Loads server entry
   - Renders each route
   - Generates static HTML files

## Adding New Routes to Pre-Render

Edit `scripts/prerender.js` and add routes to the `routes` array:

```javascript
const routes = [
  "/",
  "/services",
  "/your-new-route",  // Add here
  // ...
];
```

**Best practices:**
- Add all marketing pages
- Add location pages
- Add key blog posts (can be dynamic)
- Skip admin/auth pages (don't need SEO)

## Vite Configuration

Update `vite.config.ts` to build server entry:

```typescript
export default defineConfig({
  // ... existing config
  build: {
    rollupOptions: {
      input: {
        client: './index.html',
        server: './src/entry-server.tsx'
      }
    }
  }
});
```

## HTML Template

The `dist/index.html` template includes placeholders:

```html
<head>
  <!--helmet-title-->
  <!--helmet-meta-->
  <!--helmet-link-->
  <!--helmet-script-->
</head>
<body>
  <div id="root"><!--app-html--></div>
</body>
```

These are replaced during pre-rendering with actual SEO content.

## Verification

### 1. Check Raw HTML
```bash
# After build
cat dist/service-areas/index.html
```

Look for:
- `<title>` tag with correct text
- `<meta name="description">` with correct content
- `<script type="application/ld+json">` with schemas

### 2. Test with Google Rich Results
Visit: https://search.google.com/test/rich-results
- Enter your production URL
- Verify structured data is detected

### 3. View Page Source
In browser: Right-click → View Page Source
- Should see all SEO content **before** any React code runs

## Dynamic Content

For blog posts or frequently updated content:

**Option A: Pre-render top posts**
```javascript
// In prerender.js
const topPosts = await fetchTopPosts();
const routes = [
  ...staticRoutes,
  ...topPosts.map(p => `/blog/${p.slug}`)
];
```

**Option B: On-demand regeneration**
Consider adding ISR (Incremental Static Regeneration) or webhook-triggered rebuilds.

## SPA Navigation

After initial load:
- React Router takes over navigation
- `SeoHelmet` component updates meta tags on client
- No page reload needed
- SEO still works via helmet

## Troubleshooting

### Pre-render fails
- Check `dist-ssr/entry-server.js` exists
- Ensure all imports work in Node context
- Check for browser-only code (window, document)

### Missing meta tags
- Verify `SeoHelmet` is rendered in component
- Check helmet context is extracted correctly
- Inspect `dist/[route]/index.html` raw HTML

### Hydration warnings
- Ensure client and server render identical markup
- Check for date/time that differs between builds
- Use `suppressHydrationWarning` only when needed

## Performance

Pre-rendering improves:
- **LCP**: Content visible immediately
- **FCP**: No JS needed for first paint
- **TTI**: Faster interactive time

Monitor with:
```bash
npm run build
npx lighthouse https://your-domain.com
```

## Maintenance

**Weekly:**
- Review new pages for pre-render candidates

**Monthly:**
- Test rich results in Google Search Console
- Audit crawl errors

**Per release:**
- Verify build includes pre-render step
- Spot-check key route HTML output

## Future Enhancements

Consider:
- [ ] Dynamic blog post pre-rendering
- [ ] Webhook for content updates
- [ ] ISR for frequently changing pages
- [ ] Sitemap auto-generation from routes

---

**Remember:** All SEO-critical content must be server-rendered or pre-rendered. Never rely on client-side JavaScript alone for meta tags or structured data.
