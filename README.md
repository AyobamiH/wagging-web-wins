# Tail Wagging Websites

A modern, responsive website for pet care business web design services. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with beautiful layouts
- **SEO Optimized**: Built-in SEO components with structured data
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Component Library**: Custom UI components built on Radix UI
- **Interactive Elements**: Modals, forms, and smooth animations
- **Service Pages**: Dedicated pages for different service offerings
- **Contact Forms**: Integrated contact functionality
- **Portfolio Showcase**: Client work and testimonials

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tail-wagging-websites
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size (after build)

## Post-Deploy Checklist

### Required Environment Variables (Supabase Secrets)
Set these in your Supabase dashboard under Settings → Edge Functions:

```bash
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ALLOWED_ORIGINS=https://tailwaggingwebdesign.com,https://www.tailwaggingwebdesign.com
N8N_MESSAGES_WEBHOOK_URL=https://...
N8N_EMAIL_UPDATE_WEBHOOK_URL=https://...
```

### Supabase Auth Security Settings
Go to Supabase Dashboard → Authentication → Settings:

1. **OTP Expiry**: Set to 15 minutes (recommended)
2. **Leaked Password Protection**: Enable this feature
3. **Postgres Version**: Update to latest if available

### Stripe Webhook Configuration
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://viwxxjnehceedyctevau.supabase.co/functions/v1/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET` env var

### CDN/Hosting Configuration
For optimal performance, configure your hosting platform:

```nginx
# Cache static assets immutably
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

Or for Cloudflare:
- Set Browser Cache TTL to "Respect Existing Headers"
- Enable "Auto Minify" for JS, CSS, HTML

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, forms, etc.)
│   └── layout/         # Layout components (header, footer, etc.)
├── pages/              # Page components
│   └── services/       # Service-specific pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets

public/                 # Public assets
├── og.png             # Open Graph image
├── robots.txt         # Search engine directives
└── sitemap.xml        # XML sitemap
```

## Key Features

### Services Offered
- Website Design & Rebuilds
- Local SEO & Content
- Automations & CRM Integration
- Website Care Plans
- Speed & UX Audits

### Design System
The project uses a custom design system built on Tailwind CSS with:
- Semantic color tokens
- Consistent spacing and typography
- Dark/light mode support
- Responsive breakpoints
- Custom animations

### SEO Features
- Dynamic meta tags and Open Graph data
- Structured data (JSON-LD)
- XML sitemap
- Robots.txt
- Breadcrumb navigation

## Deployment

The project is optimized for deployment on any static hosting platform:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Tail Wagging Websites.