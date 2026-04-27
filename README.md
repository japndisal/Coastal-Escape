# 🌊 Coastal Escape
 
A premium travel booking web app built with Next.js 15, featuring package browsing, secure payments, consultation scheduling, and automated booking confirmations.
 
---
 
## Tech Stack
 
- **Framework** — Next.js 15 (App Router)
- **Auth** — Clerk
- **Database** — MongoDB + Mongoose
- **Payments** — Stripe
- **Email** — Resend
- **Scheduling** — Cal.com
- **Styling** — Tailwind CSS
---
 
## Getting Started
 
### 1. Install dependencies
 
```bash
npm install
```
 
### 2. Set up environment variables
 
Create a `.env.local` file in the root of the project:
 
```dotenv
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
 
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/coastal-escape
 
# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
 
# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=tickets@yourdomain.com
 
# Cal.com
NEXT_PUBLIC_CAL_LINK=your-username/consultation
```
 
### 3. Run the development server
 
```bash
npm run dev
```
 
---
 
## Key Features
 
- **Package browsing** — explore travel packages with filtering
- **Secure checkout** — Stripe-powered payments with webhook handling
- **Booking tickets** — unique token generated per booking
- **Email confirmations** — automated emails via Resend on booking
- **Consultation scheduling** — Cal.com embed for 1:1 sessions
- **User dashboard** — view and manage bookings
- **Reviews** — leave reviews on completed packages
---
 
## Data Models
 
| Model | Purpose |
|---|---|
| `Package` | Travel packages with pricing, images, itinerary |
| `Booking` | User bookings linked to a package + ticket token |
| `Review` | User reviews tied to a completed booking |
 
---
 
## Important Notes
 
- The Stripe webhook route (`/api/stripe/webhook`) uses raw body parsing — do not apply `bodyParser` to it
- `RESEND_FROM_EMAIL` domain must be verified in the Resend dashboard before emails will send
- Use `auth()` in server components and `useAuth()` in client components (Clerk)
- All MongoDB operations go through Mongoose models — no raw driver queries
- Validate all API inputs with Zod before touching the database
---
 
## Design
 
The app uses the **Coastal Escape** colour palette with:
- **Climate Crisis** (display font) for headings
- **Instrument Serif** italic for taglines and pull quotes
- **Montserrat** for all UI elements (buttons, labels, nav)
