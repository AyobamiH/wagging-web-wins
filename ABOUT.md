# Tail Wagging Websites - Comprehensive Documentation

## 1. Project Overview

**Tail Wagging Websites** is a professional web design and digital services platform specifically tailored for pet care businesses in Northamptonshire, UK. The platform serves dog walkers, pet groomers, pet sitters, trainers, and veterinary practices by providing modern, conversion-optimized websites with integrated automation tools.

### Business Model
- **Primary Service**: Custom web design for pet care businesses
- **Target Market**: Pet care professionals in Northampton, Wellingborough, Kettering, Daventry, Towcester, Rushden, Corby, Milton Keynes, Banbury, and surrounding areas
- **Revenue Streams**: 
  - One-time website design projects (Starter, Pro, Growth packages)
  - Recurring website care plans
  - Add-on services (SEO, automations, audits)

### Key Value Propositions
1. Mobile-first websites optimized for Core Web Vitals
2. Local SEO and Google Business Profile optimization
3. Smart automations (booking confirmations, reminders, review requests)
4. Clear pricing displays and conversion-optimized booking flows
5. Industry-specific knowledge of pet care business operations

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite (fast modern bundler)
- **Styling**: Tailwind CSS 3.x with custom design system
- **UI Components**: 
  - Radix UI primitives (accessible, unstyled components)
  - Custom shadcn/ui component library
  - Framer Motion for animations
- **Routing**: React Router DOM v6
- **State Management**: 
  - React Context API (Auth, Reviews)
  - TanStack Query (server state)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Backend
- **Platform**: Supabase (PostgreSQL database + Edge Functions)
- **Runtime**: Deno (for Supabase Edge Functions)
- **API**: RESTful + Supabase client SDK
- **Authentication**: Supabase Auth (email/magic link)
- **Storage**: Supabase Storage (blog images)

### Third-Party Integrations
- **Payments**: Stripe (subscriptions + one-time payments)
- **Scheduling**: Calendly (embedded booking)
- **Automation**: n8n webhooks (CRM, email campaigns)
- **Maps**: Mapbox GL (service area visualization)
- **Analytics**: Custom implementation with Web Vitals tracking
- **DOMPurify**: HTML sanitization for blog content

### Development Tools
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with TypeScript + JSX a11y plugins
- **Type Checking**: TypeScript 5.x
- **Package Manager**: npm

---

## 3. Application Architecture

### High-Level Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend (SPA)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Public    │  │    Admin     │  │  Authentication  │   │
│  │   Marketing │  │   Dashboard  │  │    (Supabase)    │   │
│  │    Pages    │  │ (Blog Editor)│  │                  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
          ┌──────────────────────────────────┐
          │    Supabase Backend Services      │
          ├──────────────────────────────────┤
          │  • PostgreSQL Database           │
          │  • Edge Functions (Deno)         │
          │  • Authentication & Authorization │
          │  • Storage (Blog Images)         │
          │  • Row Level Security (RLS)      │
          └──────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        ↓                                 ↓
┌───────────────┐              ┌──────────────────┐
│     Stripe    │              │   n8n Webhooks   │
│   Payments    │              │   (Automations)  │
└───────────────┘              └──────────────────┘
```

### Routing Architecture

**Public Routes** (Marketing Layout):
- `/` - Homepage (dynamic: shows TradesLanding on trades subdomain)
- `/services` - Services overview
- `/services/:slug` - Individual service pages
- `/pricing` - Pricing packages
- `/tools` - Tools hub (free utilities)
- `/tools/:slug` - Individual tool details
- `/blog` - Blog listing (Supabase-powered)
- `/blog/:slug` - Individual blog posts
- `/why-do-dogs/` - Dog behavior content pillar
- `/why-do-dogs/:slug/` - Individual behavior guides
- `/contact` - Contact form
- `/service-areas` - Geographic coverage
- `/locations/:slug` - Location-specific pages
- `/faq` - Frequently asked questions
- `/success/stripe/:sessionId` - Payment success
- `/cancel` - Payment cancellation
- `/payment-failed` - Payment failure

**Admin Routes** (Protected):
- `/admin/blog` - Blog post management
- `/admin/blog/:id` - Blog editor (create/edit)

**Auth Routes**:
- `/auth` - Authentication page (login/signup)

### Component Architecture

**Layout Components**:
- `MarketingLayout` - Wrapper for all public pages
- `ModernHeader` - Site navigation with mobile menu
- `SiteFooter` - Site footer with links

**Specialized Components**:
- `ErrorBoundary` - Global error catching
- `SEO` - Dynamic meta tags and structured data
- `CalendlyEmbed` - Booking widget integration
- `BuyPlanButton` - Stripe checkout integration
- `PlanAssistantWidget` - AI-powered plan recommendation

**UI System**:
- 40+ shadcn/ui components in `src/components/ui/`
- Custom design tokens in `src/index.css`
- Tailwind config with semantic color system

---

## 4. Core Features

### 4.1 Marketing Website

**Homepage** (`src/pages/Index.tsx`):
- Hero with value proposition
- Trust signals (4 key benefits)
- Value propositions (3-column grid)
- How it works (3-step process)
- Social proof (client testimonials)
- Structured data (Organization, LocalBusiness, HowTo)

**Services System**:
- 5 core services defined in `src/data/services.ts`:
  1. Website Design & Rebuilds
  2. Local SEO & Content Strategy
  3. Smart Automations & CRM Integration
  4. Website Care Plans
  5. Speed & UX Audits
- Dynamic service detail pages
- Outcome-focused messaging
- Internal linking structure

**Location Pages**:
- 10 service areas with dedicated pages
- Local SEO optimization per town
- Benefits and nearby areas
- Mapbox visualization (Northampton)
- Structured for "near me" searches

**Tools Hub**:
- Dynamic tools registry from `src/data/tools.local.json`
- Category filtering (Audit, Automation, Planning, Booking, Client Management, Content)
- Search functionality
- External tool links
- Email capture for updates

### 4.2 Content Marketing

**Blog System** (Supabase-powered):
- CRUD operations via admin interface
- Rich text editing with HTML support
- DOMPurify sanitization for security
- SEO metadata (meta title, description)
- FAQ schema support (JSON-LD)
- Pillar tagging system
- OG image support
- Slug-based routing

**Why Do Dogs Content Pillar**:
- 14 behavior guides organized into 5 clusters:
  1. Licking & Affection
  2. Eating & Health
  3. Movement & Body Language
  4. Sounds & Communication
  5. Behaviour Quirks
- SEO-optimized (primary + secondary keywords)
- Word count targets (900-1800 words)
- OG images pre-generated
- FAQ sections for rich snippets
- Red flag callouts for health concerns

### 4.3 Payments & Subscriptions

**Stripe Integration**:
- Three pricing tiers (Starter £750, Pro £1,950, Growth £3,500)
- Checkout session creation via Edge Function
- Webhook handling for fulfillment
- Payment status tracking
- Subscription management
- Customer records
- Idempotency for webhook events

**Payment Flow**:
1. User clicks "Buy Plan" button
2. Edge Function creates Stripe Checkout Session
3. User completes payment on Stripe
4. Webhook receives `checkout.session.completed`
5. System creates customer, payment, subscription records
6. User redirected to success page with session status

### 4.4 Contact & Lead Capture

**Contact Form** (`src/pages/Contact.tsx`):
- Zod validation schema
- Fields: name, email, phone, business, services[], postcode, message
- Rate-limited submission (1 req/sec, burst 5)
- n8n webhook integration for CRM
- Toast notifications
- Error handling
- Loading states

**Email Updates**:
- Email capture on Tools Hub
- Supabase storage
- n8n webhook for nurture sequences

### 4.5 Authentication & Authorization

**Supabase Auth**:
- Magic link (email-based) authentication
- User roles system (admin, user)
- Admin guard component for protected routes
- Session management via React Context
- `is_admin()` database function

**Admin Features**:
- Blog post CRUD
- User role management
- Content publishing workflow

### 4.6 SEO & Performance

**SEO Implementation**:
- Dynamic meta tags (title, description)
- Open Graph tags with images
- Twitter Card metadata
- JSON-LD structured data:
  - Organization
  - LocalBusiness
  - WebSite
  - BreadcrumbList
  - HowTo
  - CollectionPage
  - SoftwareApplication
  - FAQPage
- Canonical URLs
- Breadcrumb navigation
- Semantic HTML5
- Image alt attributes
- XML sitemap (`public/sitemap.xml`)
- Robots.txt

**Performance Optimizations**:
- Code splitting (lazy-loaded routes)
- Image lazy loading
- CDN headers configuration
- Core Web Vitals tracking
- Vite build optimization
- Immutable caching for static assets
- Bundle size analysis available

**Accessibility**:
- Skip to content link
- ARIA labels
- Focus states
- Semantic landmarks
- Color contrast compliance
- Keyboard navigation
- Screen reader support

### 4.7 Automations & Integrations

**n8n Webhooks**:
- Contact form submissions → CRM
- Email updates → Nurture campaigns
- Environment variables for webhook URLs

**Plan Assistant**:
- Interactive questionnaire modal
- AI-powered website recommendations
- Style preferences analysis
- Feature suggestions based on responses

---

## 5. Database Schema

### Tables

**`posts`** (Blog Content):
```sql
- id: uuid (PK)
- slug: text (unique)
- title: text
- excerpt: text
- meta_title: text
- meta_description: text
- content: text (HTML)
- faq: jsonb (Q&A pairs)
- pillar_tag: text
- og_image_url: text
- cover_alt: text
- published: boolean
- published_at: timestamptz
- created_at: timestamptz
- updated_at: timestamptz
- extras: jsonb
```

**`messages`** (Contact Form Submissions):
```sql
- id: uuid (PK)
- name: text
- email: text
- phone: text
- business: text
- services: text[] (array)
- postcode: text
- message: text
- created_at: timestamptz
- updated_at: timestamptz
```

**`email_updates`** (Newsletter Subscriptions):
```sql
- id: uuid (PK)
- email: text
- created_at: timestamptz
```

**`user_roles`** (Authorization):
```sql
- id: uuid (PK)
- user_id: uuid (FK to auth.users)
- role: app_role (enum: admin, user)
- created_at: timestamptz
```

**`customers`** (Stripe Customers):
```sql
- id: uuid (PK)
- user_id: uuid (nullable)
- stripe_customer_id: text (unique)
- email: text
- name: text
- created_at: timestamptz
- updated_at: timestamptz
```

**`payments`** (Payment Records):
```sql
- id: uuid (PK)
- user_id: uuid (nullable)
- stripe_customer_id: text
- session_id: text (unique)
- subscription_id: text
- price_id: text
- amount_total: integer (in cents)
- currency: text
- status: text (paid, failed)
- current_period_end: timestamptz
- raw_event: jsonb (Stripe event)
- created_at: timestamptz
```

**`subscriptions`** (Active Subscriptions):
```sql
- id: uuid (PK)
- user_id: uuid
- stripe_subscription_id: text (unique)
- status: text (active, canceled, etc.)
- plan: text (starter, pro, growth)
- price_id: text
- current_period_start: timestamptz
- current_period_end: timestamptz
- created_at: timestamptz
- updated_at: timestamptz
```

**`payments_events`** (Webhook Idempotency):
```sql
- event_id: text (PK)
- created_at: timestamptz
```

**`rate_limits`** (API Rate Limiting):
```sql
- key: text (PK, IP+route hash)
- tokens: integer
- updated_at: timestamptz
```

**`site_settings`** (Configuration):
```sql
- id: uuid (PK)
- review_count: jsonb (total, average, breakdown)
- updated_at: timestamptz
```

### Row Level Security (RLS) Policies

**Posts**:
- ✅ SELECT: Public can view published posts
- 🔒 INSERT/UPDATE/DELETE: Admins only

**Messages**:
- ✅ INSERT: Anyone can submit
- 🔒 SELECT/UPDATE/DELETE: Admins only

**Email Updates**:
- ✅ INSERT: Anyone can subscribe
- 🔒 SELECT/UPDATE/DELETE: Admins only

**User Roles**:
- ✅ SELECT: Users can view their own roles
- 🔒 INSERT/UPDATE/DELETE: Admins only

**Customers**:
- ✅ SELECT: Users can view their own records
- 🔒 INSERT/UPDATE/DELETE: Service role only

**Payments**:
- ✅ SELECT: Users can view their own payments
- 🔒 INSERT/UPDATE/DELETE: Service role only

**Subscriptions**:
- ✅ SELECT: Users can view their own subscriptions
- 🔒 INSERT/UPDATE/DELETE: Service role only

**Site Settings**:
- ✅ SELECT: Public can view
- 🔒 INSERT/UPDATE/DELETE: No policies (admin-only via dashboard)

### Database Functions

**`is_admin()`**:
```sql
-- Checks if current user has admin role
RETURNS boolean
SECURITY DEFINER
```

**`update_updated_at_column()`**:
```sql
-- Trigger function to auto-update updated_at timestamps
RETURNS trigger
SECURITY DEFINER
```

---

## 6. Edge Functions (Supabase)

### `create-buy-plan-session`
**Purpose**: Creates Stripe Checkout Session for plan purchases

**Method**: POST  
**Auth**: Optional  
**Rate Limited**: Yes (1 req/sec, burst 5)  
**CORS**: Restricted to allowed origins

**Input** (Zod validated):
```typescript
{
  priceId: string,
  userId?: string,
  successUrl: string,
  cancelUrl: string
}
```

**Output**:
```typescript
{
  url: string (Stripe Checkout URL),
  sessionId: string
}
```

**Flow**:
1. Validate input with Zod
2. Rate limit check
3. Create Stripe Checkout Session with client_reference_id
4. Return checkout URL

---

### `stripe-session-status`
**Purpose**: Retrieves canonical payment/subscription status

**Method**: GET  
**Params**: `?session_id=xxx`  
**Auth**: Optional  
**Rate Limited**: Yes  
**CORS**: Restricted

**Output**:
```typescript
{
  status: string,
  customer: object,
  subscription: object | null,
  plan: string,
  current_period_end: string | null
}
```

**Used By**: Payment success page to display confirmation

---

### `stripe-webhook`
**Purpose**: Handles Stripe webhook events for fulfillment

**Method**: POST  
**Auth**: Stripe signature verification  
**Rate Limited**: No  
**CORS**: Not applicable

**Events Handled**:
1. `checkout.session.completed`
   - Creates customer record
   - Creates payment record
   - Creates subscription record
   - Grants access to services

2. `invoice.payment_succeeded` / `invoice.payment_failed`
   - Updates payment status

3. `customer.subscription.updated` / `customer.subscription.deleted`
   - Updates subscription status and period

**Idempotency**: Uses `payments_events` table to prevent duplicate processing

**Security**:
- Signature verification via `STRIPE_WEBHOOK_SECRET`
- Service role key for database writes
- Event ID deduplication

---

### `submit-message`
**Purpose**: Processes contact form submissions

**Method**: POST  
**Auth**: Public  
**Rate Limited**: Yes (1 req/sec, burst 5)  
**CORS**: Restricted

**Input** (Zod validated):
```typescript
{
  name: string (2-100 chars),
  email: string (valid email),
  phone?: string (max 20 chars),
  business?: string,
  services?: string[],
  postcode?: string,
  message?: string (max 5000 chars)
}
```

**Flow**:
1. Validate input
2. Rate limit check
3. Insert into `messages` table
4. Trigger n8n webhook (CRM integration)
5. Return success

---

### `submit-email-update`
**Purpose**: Captures email for newsletter/updates

**Method**: POST  
**Auth**: Public  
**Rate Limited**: Yes  
**CORS**: Restricted

**Input** (Zod validated):
```typescript
{
  email: string (valid email)
}
```

**Flow**:
1. Validate email
2. Rate limit check
3. Insert into `email_updates` table
4. Trigger n8n webhook (nurture sequence)
5. Return success

---

### `blog-sitemap`
**Purpose**: Generates dynamic sitemap for blog posts

**Method**: GET  
**Auth**: Public  
**Rate Limited**: No  
**CORS**: Public

**Output**: XML sitemap with all published blog posts

---

### `bootstrap-admin`
**Purpose**: Creates initial admin user (dev/setup only)

**Method**: POST  
**Auth**: Service role  
**Rate Limited**: No

**Usage**: Run once during initial setup to create first admin

---

### `generate-pillar2-images`
**Purpose**: Utility for generating OG images for content

**Method**: POST  
**Auth**: Admin  
**Rate Limited**: No

**Note**: Development utility for content creation

---

### Shared Utilities

**`_shared/cors.ts`**:
- Validates origin against `ALLOWED_ORIGINS` env var
- Returns proper CORS headers or null
- Handles preflight OPTIONS requests

**`_shared/rateLimit.ts`**:
- Token bucket algorithm (1 req/sec, burst 5)
- Postgres-backed state (`rate_limits` table)
- Key: hash of IP + route
- Returns 429 on exceed

**`_shared/validation.ts`**:
- Zod schemas for common inputs
- `contactSchema`: Contact form validation
- `emailSchema`: Email validation
- Centralized validation logic

---

## 7. Data & Content Structure

### Services (`src/data/services.ts`)
```typescript
{
  slug: string,
  title: string,
  desc: string (card summary),
  intro: string (detail page intro),
  includes: string[] (features),
  outcomes: string[] (benefits),
  ogImage?: string
}
```

**Services Available**:
1. website-design
2. local-seo
3. automations
4. care-plans
5. speed-ux-audits

### Pricing (`src/data/pricing.ts`)
```typescript
{
  id: string,
  name: string,
  price: string (display),
  priceValue: number (Stripe amount),
  desc: string,
  features: string[],
  popular?: boolean
}
```

**Packages**:
- Starter: £750
- Pro: £1,950 (popular)
- Growth: £3,500

### Locations (`src/data/location.ts`)
```typescript
{
  slug: string,
  name: string,
  county: string,
  description: string,
  benefits: string[],
  nearby: string[],
  lat?: number,
  lng?: number
}
```

**10 Service Areas**:
Northampton, Wellingborough, Kettering, Daventry, Towcester, Rushden, Corby, Milton Keynes, Banbury, Northamptonshire

### Why Dogs Guides (`src/data/whyDoDogs.ts`)
```typescript
{
  cluster: ClusterKey,
  title: string,
  slug: string,
  metaTitle: string,
  metaDescription: string,
  primaryKeyword: string,
  secondaryPhrases: string[],
  wordTargetMin: number,
  wordTargetMax: number,
  ogImageName: string,
  imageAlt: string
}
```

**14 Guides** organized into 5 behavior clusters

---

## 8. File Organization

```
tail-wagging-websites/
│
├── public/                    # Static assets
│   ├── og/                   # Open Graph images (46 images)
│   ├── favicon.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _headers, _redirects  # Cloudflare/Netlify config
│
├── src/
│   ├── assets/               # Images imported in code
│   ├── components/
│   │   ├── ui/              # 40+ shadcn components
│   │   ├── admin/           # Admin interface
│   │   ├── auth/            # Authentication UI
│   │   ├── layout/          # Header, Footer, Layout
│   │   ├── plan-assistant/  # AI recommendation widget
│   │   ├── whyDoDogs/       # Dog behavior content
│   │   └── *.tsx            # Shared components
│   ├── contexts/            # React Context providers
│   ├── data/                # Static data & config
│   ├── hooks/               # Custom React hooks
│   ├── integrations/
│   │   └── supabase/        # Supabase client & types
│   ├── lib/                 # Utilities & helpers
│   │   └── repositories/    # Data access layer
│   ├── pages/               # Route components
│   │   └── services/        # Service detail pages
│   ├── index.css           # Design tokens & Tailwind
│   ├── main.tsx            # App entry point
│   └── App.tsx             # Router & providers
│
├── supabase/
│   ├── functions/           # Edge Functions (Deno)
│   │   ├── _shared/        # Utilities (cors, rate limit, validation)
│   │   └── [function]/     # Individual functions
│   ├── migrations/          # Database migrations (SQL)
│   └── config.toml         # Supabase configuration
│
├── README.md               # Setup instructions
├── ABOUT.md               # This document
├── SECURITY_FIXES_GUIDE.md
├── SEO_OPTIMIZATION_REPORT.md
├── STRIPE_INTEGRATION_GUIDE.md
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 9. Environment Variables & Secrets

### Supabase Secrets (Dashboard → Settings → Edge Functions)

**Required**:
```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://viwxxjnehceedyctevau.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ALLOWED_ORIGINS=https://tailwaggingwebdesign.com,https://www.tailwaggingwebdesign.com
```

**Optional** (Automations):
```bash
N8N_MESSAGES_WEBHOOK_URL=https://...
N8N_EMAIL_UPDATE_WEBHOOK_URL=https://...
```

### Frontend Environment Variables

**`.env`** (NOT committed to git):
```bash
VITE_SUPABASE_URL=https://viwxxjnehceedyctevau.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**Note**: Frontend env vars are PUBLIC (embedded in bundle). Never store secrets here.

---

## 10. Setup & Deployment

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase keys

# 3. Start development server
npm run dev
# Opens at http://localhost:8080

# 4. Run tests
npm run test
```

### Database Setup

```bash
# 1. Install Supabase CLI
npm install -g supabase

# 2. Link to project
supabase link --project-ref viwxxjnehceedyctevau

# 3. Run migrations
supabase db push
```

### Edge Functions Deployment

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy create-buy-plan-session

# View logs
supabase functions logs stripe-webhook
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run analyze
```

### Deployment Checklist

**Before Launch**:
- [ ] Set all Supabase secrets in dashboard
- [ ] Configure Stripe webhook endpoint
- [ ] Update Supabase Auth settings (OTP expiry, leaked password protection)
- [ ] Enable RLS on all tables
- [ ] Test payment flow end-to-end
- [ ] Verify contact form submissions
- [ ] Check blog post creation/editing
- [ ] Test admin authentication
- [ ] Run Lighthouse audit
- [ ] Verify structured data with Google Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Configure CDN headers (immutable caching)
- [ ] Set up monitoring/error tracking
- [ ] Test offline detection
- [ ] Verify CORS restrictions

**Stripe Setup**:
1. Create products and prices in Stripe Dashboard
2. Copy price IDs to `pricing.ts`
3. Configure webhook: `https://viwxxjnehceedyctevau.supabase.co/functions/v1/stripe-webhook`
4. Select events: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
5. Copy webhook secret to Supabase secrets

**DNS & CDN**:
- Configure custom domain (requires paid Lovable plan or self-hosting)
- Set up Cloudflare or similar CDN
- Enable HTTP/2 and Brotli compression
- Configure cache rules for static assets

---

## 11. Key Workflows

### 11.1 User Purchases a Plan

```
User clicks "Buy Now" (Starter/Pro/Growth)
    ↓
BuyPlanButton component
    ↓
POST /functions/v1/create-buy-plan-session
    ↓
Stripe Checkout Session created
    ↓
User redirected to Stripe
    ↓
User completes payment
    ↓
Stripe sends webhook to /stripe-webhook
    ↓
Webhook handler:
  - Verifies signature
  - Checks idempotency
  - Creates customer record
  - Creates payment record
  - Creates subscription record
  - Grants access (sets user role/tier)
    ↓
User redirected to /success/stripe/{sessionId}
    ↓
Success page calls /stripe-session-status
    ↓
Display confirmation and subscription details
```

### 11.2 Blog Post Creation

```
Admin logs in via /auth
    ↓
Navigates to /admin/blog
    ↓
Clicks "New Post"
    ↓
BlogEditor component loads
    ↓
Admin fills in:
  - Title, slug, excerpt
  - Meta title, meta description
  - Content (HTML)
  - FAQ (JSON)
  - Pillar tag
  - OG image URL
    ↓
Clicks "Publish"
    ↓
EnhancedSupabasePostRepository.create()
    ↓
RLS checks is_admin()
    ↓
Post inserted into posts table
    ↓
Post immediately visible at /blog/{slug}
```

### 11.3 Contact Form Submission

```
User fills contact form
    ↓
Frontend Zod validation
    ↓
POST /functions/v1/submit-message
    ↓
Backend validation (Zod)
    ↓
Rate limit check (1 req/sec)
    ↓
Insert into messages table
    ↓
Trigger n8n webhook → CRM
    ↓
Return success to frontend
    ↓
Toast notification displayed
```

### 11.4 Admin Blog Management

```
Admin navigates to /admin/blog
    ↓
BlogList component loads
    ↓
EnhancedSupabasePostRepository.list()
    ↓
RLS filters: only published posts for non-admins
    ↓
Admin sees all posts
    ↓
Click "Edit" → Navigate to /admin/blog/{id}
    ↓
BlogEditor loads existing post
    ↓
Admin makes changes
    ↓
Click "Update"
    ↓
EnhancedSupabasePostRepository.update()
    ↓
updated_at trigger fires
    ↓
Changes saved
```

---

## 12. Security Considerations

### Authentication
- ✅ Supabase Auth with secure JWT tokens
- ✅ Magic link (passwordless) authentication
- ✅ HTTP-only cookies for session storage
- ✅ Role-based access control (admin/user)
- ✅ `is_admin()` security definer function

### Database Security
- ✅ Row Level Security enabled on all sensitive tables
- ✅ Service role key never exposed to frontend
- ✅ Anon key only for public read operations
- ✅ Admin policies require `is_admin()` check
- ✅ Users can only view their own payments/subscriptions

### API Security
- ✅ Rate limiting on all public endpoints (1 req/sec, burst 5)
- ✅ CORS restricted to allowed origins
- ✅ Input validation with Zod schemas
- ✅ Stripe webhook signature verification
- ✅ Idempotency keys for payment webhooks
- ✅ DOMPurify sanitization for user HTML

### Content Security
- ✅ Blog HTML sanitized with DOMPurify on render
- ✅ XSS prevention via React's built-in escaping
- ✅ No eval() or dangerouslySetInnerHTML without sanitization
- ✅ CSP headers via `_headers` file

### Environment Variables
- ✅ Secrets stored in Supabase dashboard (encrypted)
- ✅ No secrets in frontend code
- ✅ `.env` files gitignored
- ✅ Service role key only used server-side

### Recommendations for Production
- [ ] Enable Supabase Auth: Leaked Password Protection
- [ ] Set OTP expiry to 15 minutes
- [ ] Upgrade to latest Postgres version
- [ ] Add error monitoring (Sentry, LogRocket)
- [ ] Implement audit logging for admin actions
- [ ] Add request signing for n8n webhooks
- [ ] Set up IP allowlisting for admin routes
- [ ] Enable 2FA for admin accounts

---

## 13. Performance Optimizations

### Frontend
- ✅ Code splitting (lazy-loaded routes)
- ✅ Tree shaking (Vite + ESM)
- ✅ Image lazy loading (loading="lazy")
- ✅ Font subsetting and preloading
- ✅ Critical CSS inlined
- ✅ Bundle size analysis available
- ✅ Debounced search/filter inputs
- ✅ Memoized expensive computations

### Backend
- ✅ Database indexes on:
  - posts.slug (unique)
  - posts.published_at
  - messages.created_at
  - user_roles.user_id
  - payments.stripe_customer_id
  - subscriptions.stripe_subscription_id
- ✅ Connection pooling (Supabase)
- ✅ Edge Functions globally distributed
- ✅ Rate limiting prevents abuse

### Caching Strategy
- Static assets: 1 year immutable cache
- HTML: No cache (SPA, client-side routing)
- API responses: No cache (dynamic data)
- CDN: Cloudflare recommended

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTFB** (Time to First Byte): < 600ms

---

## 14. SEO Strategy

### Technical SEO
- ✅ Semantic HTML5 structure
- ✅ Descriptive page titles (< 60 chars)
- ✅ Meta descriptions (< 160 chars)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ XML sitemap with 50+ pages
- ✅ Robots.txt configuration
- ✅ Breadcrumb navigation
- ✅ Image alt attributes
- ✅ Internal linking structure
- ✅ Mobile-responsive design
- ✅ Fast page speed (Core Web Vitals)

### Structured Data (JSON-LD)
- Organization schema
- LocalBusiness schema
- WebSite schema
- BreadcrumbList schema
- FAQPage schema (blog posts)
- HowTo schema
- Review/AggregateRating schema
- Article schema (blog posts)

### Local SEO
- 10 location-specific pages
- Google Business Profile mentions
- NAP (Name, Address, Phone) consistency
- Service area markup
- Local keywords in content
- Town/city-specific meta data

### Content SEO
- **Why Do Dogs Pillar**: 14 guides targeting 1,000+ monthly searches
  - Primary keywords: 900-1,800 word targets
  - Secondary keyword variations
  - FAQ schema for rich snippets
  - Internal linking between related guides
- **Blog**: Regular content on pet care digital marketing
- **Services**: Outcome-focused copywriting
- **Tools**: Lead generation with free utilities

---

## 15. Analytics & Monitoring

### Current Implementation
- Custom page view tracking (`trackPageView` in `lib/analytics.ts`)
- Web Vitals measurement (`useWebVitals` hook)
- Error boundary for crash reporting
- Console logging (dev mode only)

### Recommended Additions
- Google Analytics 4
- Google Search Console
- Hotjar or Microsoft Clarity (heatmaps)
- Sentry (error tracking)
- Stripe Dashboard (payment analytics)
- Supabase Dashboard (database metrics)
- Uptime monitoring (UptimeRobot, Pingdom)

### Key Metrics to Track
- Conversion rate (contact form, payments)
- Bounce rate by page
- Average session duration
- Top landing pages
- Search queries (GSC)
- Payment success/failure rates
- Blog post engagement
- Tool usage (clicks to external tools)

---

## 16. Testing Strategy

### Current Test Coverage
- React component unit tests (`*.test.tsx`)
- Context provider tests (`AuthContext.test.tsx`)
- Error utility tests (`errors.test.ts`)
- Vitest + React Testing Library
- User-event testing

### Test Commands
```bash
npm run test          # Run tests once
npm run test:watch   # Watch mode
npm run test:ui      # Vitest UI
```

### Recommended Test Expansion
- [ ] Integration tests for payment flow
- [ ] E2E tests with Playwright
- [ ] API endpoint tests (Edge Functions)
- [ ] Visual regression tests (Percy, Chromatic)
- [ ] Accessibility tests (axe-core)
- [ ] Load testing (k6, Artillery)

---

## 17. Common Development Tasks

### Add a New Service
1. Add service object to `SERVICES` in `src/data/services.ts`
2. Add slug to `SLUGS` array
3. Create OG image: `public/og/{slug}.jpg`
4. Update sitemap if needed
5. Test route: `/services/{slug}`

### Add a New Blog Post
1. Log in as admin: `/auth`
2. Navigate to: `/admin/blog`
3. Click "New Post"
4. Fill in all fields (title, slug, content, meta, etc.)
5. Click "Publish"
6. Verify at `/blog/{slug}`

### Add a New Location Page
1. Add location to `LOCATIONS_BY_SLUG` in `src/data/location.ts`
2. Update `SERVICE_AREA` array
3. Add to service area summary if needed
4. Update sitemap
5. Test route: `/locations/{slug}`

### Modify Design Tokens
1. Edit CSS variables in `src/index.css`
2. Update Tailwind config in `tailwind.config.ts`
3. Use semantic tokens (--primary, --secondary, etc.)
4. Never use direct colors (text-white, bg-black)

### Add a New Edge Function
1. Create folder: `supabase/functions/{name}/`
2. Create `index.ts` with Deno serve handler
3. Add to `supabase/config.toml`
4. Use shared utilities (`_shared/cors.ts`, `_shared/rateLimit.ts`)
5. Deploy: `supabase functions deploy {name}`
6. Test: Check logs with `supabase functions logs {name}`

### Database Migration
1. Write SQL in `supabase/migrations/`
2. Include: table creation, indexes, RLS policies, triggers
3. Test locally: `supabase db push`
4. Deploy: Migrations auto-run on push to production

---

## 18. Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

### Edge Function Errors
```bash
# View function logs
supabase functions logs {function-name}

# Check environment variables
supabase secrets list

# Redeploy function
supabase functions deploy {function-name}
```

### Database Issues
```bash
# Check RLS policies
-- In Supabase SQL editor
SELECT * FROM pg_policies WHERE schemaname = 'public';

# View migration status
supabase db remote list

# Reset local database (DESTRUCTIVE)
supabase db reset
```

### Stripe Webhook Not Firing
1. Check webhook URL in Stripe Dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` matches
3. Check Edge Function logs: `supabase functions logs stripe-webhook`
4. Test with Stripe CLI: `stripe trigger checkout.session.completed`

### Payment Flow Issues
1. Check Stripe Dashboard → Payments
2. Verify price IDs in `pricing.ts` match Stripe
3. Check `payments_events` table for idempotency issues
4. Review `payments` and `subscriptions` tables

---

## 19. Future Enhancements

### Planned Features
- [ ] Customer dashboard (view subscriptions, invoices)
- [ ] Service provider directory
- [ ] Blog category system
- [ ] Advanced search (Algolia or Meilisearch)
- [ ] Email newsletters (Resend or SendGrid)
- [ ] Live chat widget
- [ ] Booking calendar integration
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Portfolio case studies
- [ ] Video testimonials
- [ ] Webinar/event system

### Technical Debt
- [ ] Migrate from inline styles to CSS modules where appropriate
- [ ] Add more comprehensive error boundaries
- [ ] Improve TypeScript strict mode compliance
- [ ] Add missing unit tests (target 80% coverage)
- [ ] Optimize bundle size (< 200KB gzipped)
- [ ] Add service worker for offline support
- [ ] Implement progressive image loading

---

## 20. Team & Contacts

### Project Information
- **Project Name**: Tail Wagging Websites
- **Domain**: https://tailwaggingwebdesign.com
- **Primary Service Area**: Northamptonshire, UK
- **Target Audience**: Pet care businesses (dog walkers, groomers, sitters, trainers, vets)

### Key Contacts
- **Phone**: +44 7402 342694
- **Calendly**: https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call

### Technical Stack URLs
- **Frontend Hosting**: Lovable (or custom deployment)
- **Backend**: Supabase Project ID `viwxxjnehceedyctevau`
- **Payments**: Stripe Dashboard
- **Automation**: n8n (self-hosted or cloud)
- **Code Repository**: (Add GitHub URL if applicable)

---

## 21. License & Usage

This is proprietary software for Tail Wagging Websites. All rights reserved.

**Confidential Information**: This codebase contains proprietary business logic, design systems, and integrations. Do not share or redistribute without explicit permission.

---

## Appendix A: Tech Stack Versions

```json
{
  "react": "18.3.1",
  "react-router-dom": "6.30.1",
  "typescript": "5.x",
  "vite": "5.x",
  "tailwindcss": "3.x",
  "@supabase/supabase-js": "2.55.0",
  "@tanstack/react-query": "5.83.0",
  "stripe": "14.21.0 (Deno)",
  "zod": "3.25.76",
  "react-hook-form": "7.61.1",
  "framer-motion": "11.18.2",
  "lucide-react": "0.462.0",
  "dompurify": "3.3.0"
}
```

---

## Appendix B: Database Diagram

```
┌─────────────────┐
│   auth.users    │ (Supabase managed)
└────────┬────────┘
         │
         │ (user_id FK)
         │
    ┌────┴────────────────────────────────────┐
    │                                         │
┌───▼──────────┐                   ┌──────────▼─────┐
│  user_roles  │                   │   customers    │
│  - id        │                   │   - id         │
│  - user_id   │                   │   - user_id    │
│  - role      │                   │   - stripe_id  │
│  - created   │                   │   - email      │
└──────────────┘                   └────────┬───────┘
                                            │
                                            │ (stripe_customer_id FK)
                                            │
                              ┌─────────────┴──────────────┐
                              │                            │
                    ┌─────────▼──────────┐   ┌────────────▼────────┐
                    │      payments      │   │   subscriptions     │
                    │  - id              │   │   - id              │
                    │  - user_id         │   │   - user_id         │
                    │  - stripe_cust_id  │   │   - stripe_sub_id   │
                    │  - session_id      │   │   - status          │
                    │  - subscription_id │   │   - plan            │
                    │  - amount_total    │   │   - current_period  │
                    │  - status          │   └─────────────────────┘
                    └────────────────────┘

┌──────────────┐      ┌───────────────┐      ┌──────────────┐
│    posts     │      │   messages    │      │email_updates │
│  - id        │      │   - id        │      │  - id        │
│  - slug      │      │   - name      │      │  - email     │
│  - title     │      │   - email     │      │  - created   │
│  - content   │      │   - phone     │      └──────────────┘
│  - faq       │      │   - business  │
│  - published │      │   - message   │
│  - meta_*    │      │   - created   │
└──────────────┘      └───────────────┘

┌──────────────────┐      ┌──────────────┐
│ payments_events  │      │ site_settings│
│  - event_id (PK) │      │  - id        │
│  - created_at    │      │  - review_ct │
└──────────────────┘      └──────────────┘

┌──────────────┐
│ rate_limits  │
│  - key (PK)  │
│  - tokens    │
│  - updated   │
└──────────────┘
```

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-09  
**Next Review**: Q2 2025

