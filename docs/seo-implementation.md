# SEO Implementation Guide

## Overview

This project implements a comprehensive server-side rendering (SSR) and pre-rendering solution for optimal SEO. Key routes are pre-rendered to static HTML at build time with full `<head>` metadata and `<body>` content, while still maintaining SPA functionality on the client.

## Architecture

### Technology Stack
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Routing**: React Router DOM v6
- **Build Tool**: Vite 5.x
- **Head Management**: react-helmet-async 2.0.5
- **Pre-rendering**: Custom Node.js script using Vite SSR APIs

### Key Components

1. **Seo Component** (`src/components/Seo.tsx`)
   - Uses `react-helmet-async` for SSR-compatible head management
   - Handles meta tags, Open Graph, Twitter Cards, and JSON-LD
   - Works in both SSR and client-side contexts

2. **Server Entry** (`src/entry-server.tsx`)
   - Uses `StaticRouter` for server-side route matching
   - Uses `HelmetProvider` to collect head tags
   - Exports a `render(url)` function that returns HTML and head content

3. **Client Entry** (`src/entry-client.tsx`)
   - Uses `hydrateRoot` to hydrate pre-rendered HTML
   - Wraps app in `HelmetProvider` and `BrowserRouter`
   - Maintains SPA functionality after hydration

4. **Prerender Script** (`scripts/prerender.js`)
   - Runs after Vite builds
   - Renders each route to static HTML
   - Injects SSR'd head tags and body content into HTML template

## Build Process

### Build Scripts

```bash
# Build client bundle
npm run build:client  # vite build --ssrManifest --outDir dist-client

# Build server bundle
npm run build:server  # vite build --ssr src/entry-server.tsx --outDir dist-ssr

# Pre-render static pages
npm run prerender     # node scripts/prerender.js

# Full build (runs all three)
npm run build         # vite build (runs standard build only)
```

### Manual Build Steps

For production with pre-rendering:

```bash
npm run build:client
npm run build:server
npm run prerender
```

This will create:
- `dist/` - Pre-rendered HTML files and client assets
- `dist-ssr/` - Server bundle (used during pre-rendering only)

## Pre-rendered Routes

The following routes are automatically pre-rendered during build:

### Core Pages
- `/` - Homepage
- `/services` - Services overview
- `/pricing` - Pricing packages
- `/contact` - Contact form
- `/faq` - FAQ page
- `/tools` - Tools hub

### Location Pages
- `/service-areas` - Service areas overview
- `/service-areas/northampton`
- `/service-areas/wellingborough`
- `/service-areas/kettering`
- `/service-areas/daventry`
- `/service-areas/towcester`
- `/service-areas/rushden`
- `/service-areas/corby`
- `/service-areas/milton-keynes`
- `/service-areas/banbury`

### Content Pages
- `/why-do-dogs` - Dog behavior content hub
- `/blog` - Blog index

## Adding New Routes to Pre-render

To add a new route to the pre-render list:

1. **Open** `scripts/prerender.js`

2. **Add the route** to the `routes` array:
   ```javascript
   const routes = [
     "/",
     "/services",
     // ... existing routes
     "/your-new-route", // Add here
   ];
   ```

3. **Ensure the route component uses `Seo`**:
   ```tsx
   import { Seo } from "@/components/Seo";
   
   export function YourNewPage() {
     return (
       <>
         <Seo
           title="Your Page Title"
           description="Your meta description"
           path="/your-new-route"
         />
         {/* Page content */}
       </>
     );
   }
   ```

4. **Rebuild**:
   ```bash
   npm run build:client
   npm run build:server
   npm run prerender
   ```

## SEO Component Usage

### Basic Usage

```tsx
import { Seo } from "@/components/Seo";

function MyPage() {
  return (
    <>
      <Seo
        title="Page Title - Tail Wagging Websites"
        description="A clear, concise description under 160 characters"
        path="/my-page"
      />
      {/* Page content */}
    </>
  );
}
```

### Advanced Usage

```tsx
<Seo
  title="Pet Care Web Design Northampton"
  description="Professional websites for pet care businesses"
  path="/service-areas/northampton"
  imageUrl="https://tailwaggingwebdesign.com/og/northampton.jpg"
  imageAlt="Northampton pet care website design"
  type="website"
  breadcrumbs={[
    { name: "Home", item: "/" },
    { name: "Service Areas", item: "/service-areas" },
    { name: "Northampton", item: "/service-areas/northampton" }
  ]}
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Pet Care Web Design",
      "areaServed": "Northampton"
    }
  ]}
  keywords={["pet care websites", "dog walker web design", "Northampton"]}
/>
```

## Verification

### After Building

1. **Check the HTML source** (not DevTools):
   ```bash
   cat dist/index.html
   cat dist/services/index.html
   cat dist/service-areas/northampton/index.html
   ```

2. **Verify each file contains**:
   - `<title>` tag with correct content
   - `<meta name="description">` 
   - Open Graph tags (`<meta property="og:...">`)
   - Twitter Card tags (`<meta name="twitter:...">`)
   - `<link rel="canonical">`
   - `<script type="application/ld+json">` with structured data
   - Rendered page content in `<body>` (not empty)

### Testing Tools

- **View Source**: Right-click → "View Page Source" (not Inspect Element)
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## Structured Data (JSON-LD)

The `Seo` component automatically includes:

1. **WebSite Schema** - Every page
   - Site name, URL, search action

2. **Organization Schema** - Every page
   - Company name, logo, contact info, social profiles

3. **LocalBusiness Schema** - Every page
   - Business type, location, hours, geo coordinates

4. **BreadcrumbList Schema** - When `breadcrumbs` prop is provided
   - Navigation hierarchy for the page

5. **Custom Schemas** - Via `jsonLd` prop
   - Page-specific schemas (Service, FAQPage, BlogPosting, etc.)

## Troubleshooting

### Hydration Errors

If you see "Hydration failed" errors:

1. **Ensure component structure is identical** between server and client
2. **Check for browser-only APIs** in component render (use `useEffect` for those)
3. **Verify ErrorBoundary** is present in both entry files
4. **Check for timestamp/random values** rendered during SSR

### Missing Meta Tags in Source

If meta tags don't appear in the HTML source:

1. **Verify the page uses `Seo` component**
2. **Check the route is in** `scripts/prerender.js` routes array
3. **Rebuild**: Run all three build commands
4. **View source** (not DevTools) to check

### Build Failures

If pre-render fails:

1. **Check for errors** in component tree (SSR doesn't support all browser APIs)
2. **Verify imports** work in Node context
3. **Check image imports** resolve correctly
4. **Test server entry** manually: `node` and import the render function

## Deployment

### Development
```bash
npm run dev
```
- Standard Vite dev server
- No pre-rendering
- SEO tags still work via Helmet (client-side)

### Production Build
```bash
npm run build:client && npm run build:server && npm run prerender
```
- Generates pre-rendered HTML
- Full SEO in initial HTML
- Deploy `dist/` folder

### Hosting Requirements
- Static file hosting (Netlify, Vercel, Cloudflare Pages, etc.)
- SPA fallback to `/index.html` for non-pre-rendered routes
- Proper MIME types for `.js`, `.css`, `.json`, etc.

## Performance Benefits

1. **Faster First Contentful Paint (FCP)**
   - HTML is pre-rendered, no JS needed to show content

2. **Better SEO**
   - Crawlers see full content immediately
   - No dependency on JS execution

3. **Improved Social Sharing**
   - Open Graph tags present in initial HTML
   - Preview cards work reliably

4. **Core Web Vitals**
   - Lower Largest Contentful Paint (LCP)
   - Faster Time to Interactive (TTI)

## Future Enhancements

- [ ] Dynamic blog post pre-rendering (fetch from Supabase at build time)
- [ ] Incremental Static Regeneration (ISR) equivalent
- [ ] Service-specific landing pages pre-rendering
- [ ] Automated sitemap generation from pre-rendered routes
- [ ] A/B testing for pre-rendered meta descriptions
