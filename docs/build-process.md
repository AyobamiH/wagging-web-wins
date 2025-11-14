# Build Process for Pre-Rendering

## Overview

The project now uses a three-step build process to generate pre-rendered HTML for SEO:

1. **Client Build** - Builds the SPA client bundle
2. **Server Build** - Builds the SSR server entry
3. **Pre-render** - Generates static HTML files

## Build Commands

### Production Build

```bash
npm run build
```

This runs three sub-commands in sequence:

1. `npm run build:client` - Builds client bundle to `dist/`
2. `npm run build:server` - Builds SSR entry to `dist-ssr/`
3. `npm run prerender` - Generates pre-rendered HTML files

### Individual Commands

```bash
# Build only client
npm run build:client

# Build only server entry
npm run build:server

# Run pre-render only (requires previous builds)
npm run prerender
```

### Development

```bash
npm run dev
```

Development mode uses the regular Vite dev server without pre-rendering.

## How It Works

### 1. Client Build (`vite build --outDir dist`)

- Bundles all React components and assets
- Outputs to `dist/` directory
- Creates `index.html` template with helmet placeholders

### 2. Server Build (`vite build --ssr src/entry-server.tsx --outDir dist-ssr`)

- Bundles the server entry point for SSR
- Outputs to `dist-ssr/` directory
- Creates Node-compatible bundle that exports a `render()` function

### 3. Pre-render (`node scripts/prerender.js`)

- Loads the server bundle from `dist-ssr/`
- Iterates through defined routes
- For each route:
  - Calls `render(url)` to get HTML and helmet data
  - Injects content into `index.html` template
  - Writes to appropriate file path in `dist/`

## Directory Structure

```
project/
├── dist/                    # Client build output
│   ├── index.html          # Root page (pre-rendered)
│   ├── services/
│   │   └── index.html      # Pre-rendered /services page
│   ├── service-areas/
│   │   ├── index.html      # Pre-rendered /service-areas page
│   │   ├── northampton/
│   │   │   └── index.html  # Pre-rendered location page
│   │   └── ...
│   └── assets/             # Bundled JS/CSS
├── dist-ssr/               # Server build output
│   └── entry-server.js     # SSR bundle
└── scripts/
    └── prerender.js        # Pre-render script
```

## Configuration

### Vite Config

Key sections in `vite.config.ts`:

```typescript
export default defineConfig(({ mode }) => ({
  ssr: {
    noExternal: mode === 'production' ? ['react-helmet-async'] : [],
  },
  build: {
    rollupOptions: {
      input: mode === 'production' ? {
        main: path.resolve(__dirname, 'index.html'),
        server: path.resolve(__dirname, 'src/entry-server.tsx')
      } : undefined,
      // ... code splitting config
    }
  }
}));
```

### Routes List

Edit `scripts/prerender.js` to add/remove routes:

```javascript
const routes = [
  "/",
  "/services",
  "/service-areas",
  "/service-areas/northampton",
  // Add more routes here
];
```

## Deployment

### Static Hosting (Recommended)

Deploy the `dist/` directory to:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

Configure SPA fallback (redirect 404s to `/index.html`) for client-side routing.

### Example: Netlify

Create `public/_redirects`:
```
# Pre-rendered pages are served as-is
# All other routes fallback to index.html for SPA routing
/*  /index.html  200
```

### Example: Vercel

Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Troubleshooting

### Build Fails

**Problem:** `dist-ssr/entry-server.js` not found

**Solution:** Ensure `build:server` runs before `prerender`:
```bash
npm run build:server
npm run prerender
```

### Pre-render Fails

**Problem:** Errors during rendering

**Common causes:**
- Browser-only code (window, document) in components
- Missing data/context during SSR
- Import errors in server bundle

**Debug:**
```bash
node scripts/prerender.js
# Check error output
```

### Hydration Warnings

**Problem:** React warns about mismatched content

**Solution:**
- Ensure server and client render identical markup
- Check for date/time values that change between builds
- Use `suppressHydrationWarning` sparingly

### Missing SEO Tags

**Problem:** Meta tags not in pre-rendered HTML

**Checklist:**
- ✅ `SeoHelmet` component is rendered in page
- ✅ Route is in pre-render list
- ✅ Build completed successfully
- ✅ Checked raw HTML (not DevTools DOM)

## Performance

### Build Time

Typical build times:
- Client build: ~10-15s
- Server build: ~5-8s
- Pre-render: ~2-5s (depends on route count)
- **Total: ~17-28s**

### Optimizations

To speed up pre-rendering:

1. **Reduce route count** - Only pre-render SEO-critical pages
2. **Parallel rendering** - Modify script to render routes in parallel
3. **Incremental builds** - Only rebuild changed routes

### Example: Parallel Pre-rendering

```javascript
// In scripts/prerender.js
await Promise.all(
  routes.map(async (route) => {
    const { html, helmet } = render(route);
    // ... write file
  })
);
```

## Maintenance

### Adding New Pages

1. Create the React component/page
2. Add route to `src/App.tsx`
3. Add route to `scripts/prerender.js`
4. Run `npm run build`
5. Verify HTML in `dist/[route]/index.html`

### Updating SEO

1. Edit `SeoHelmet` props in page component
2. Run `npm run build`
3. Verify with "View Page Source" in browser

### Regular Tasks

- **Weekly:** Review new pages for pre-render candidates
- **Monthly:** Audit pre-rendered HTML for SEO accuracy
- **Per release:** Verify build script runs successfully

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      # Deploy dist/ to hosting
```

## FAQ

**Q: Do I need to pre-render every route?**
A: No, only SEO-critical pages. Admin pages, auth pages, and dynamic user pages don't need pre-rendering.

**Q: Can I mix pre-rendered and non-pre-rendered pages?**
A: Yes! Pre-rendered routes serve static HTML. All other routes use the SPA fallback.

**Q: What about frequently updated content?**
A: Consider webhook-triggered rebuilds or on-demand ISR (requires server).

**Q: Does this work with dynamic data?**
A: Yes, for build-time data. For real-time data, fetch on client after hydration.

---

For more details on the SEO implementation, see [docs/seo-prerendering.md](./seo-prerendering.md).
