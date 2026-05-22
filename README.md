# Stripchats Demo

Stripchats Demo is a safe, production-quality UI/UX wireframe and clickable prototype for an 18+ live-streaming creator marketplace. It is built for founder presentation, developer handoff, UI/UX review, QA walkthroughs, and Vercel deployment.

## Safety Note

This project uses placeholder content only. It contains no explicit adult content, no real creator media, no real payment keys, and no production payment processing. All media blocks are safe gradient/blur placeholders and all payment actions are mock/demo only.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Zustand local state
- Mock JSON/TypeScript data
- Vercel-ready configuration

## Features

- Landing page with role selection
- 18+ age gate with localStorage confirmation
- Viewer discovery, search, profile, favorites, messages, live room, wallet, paid unlocks
- Mock token wallet and mock payment gateway with success, failed, and pending states
- Tip modal, tip menu, group show, ticket show, and private show demo
- Private show active state with timer and demo per-interval token deduction
- Creator onboarding with signup, email, KYC, agreement, and approval states
- Creator dashboard, profile setup, broadcast center, live-room controls, pricing, tip menu, goals, bots, earnings, payout, and moderation
- Admin dashboard, users, models/KYC, token ledger, payments/payouts, moderation, and analytics
- Developer Notes panel on every important page
- Full clickable prototype flow map

## User Flow

1. Open `/`.
2. Choose User / Viewer Demo.
3. Confirm age on `/age-gate`.
4. Browse `/user`, search creators, favorite profiles, open model profiles, and enter live rooms.
5. Use mock token wallet on `/user/wallet`.
6. Try tips, paid album unlocks, paid private messages, ticket/group/private show actions.

## Model Flow

1. Open `/model/onboarding`.
2. Walk through signup, email verification, KYC upload, agreement, and approval states.
3. Visit `/model` for dashboard metrics.
4. Configure profile, broadcast settings, pricing, tip menu, goals, bots, earnings, payout, and moderation.

## Admin Flow

1. Open `/admin`.
2. Review operational stats and navigate through admin sections.
3. Manage users, models, KYC decisions, token ledger, payments, payouts, reports, global moderation, and analytics.

## Mock Payment Gateway

The wallet uses `src/lib/mockPayment.ts` and never calls a real payment gateway.

Mock states:

- Success: tokens are added to local wallet state.
- Failed: wallet balance stays unchanged.
- Pending: transaction is recorded as pending/processing for demo review.

Production notes are included in code comments for:

- Razorpay order/signature verification
- Stripe PaymentIntent and webhook fulfillment
- PayPal order capture and webhook reconciliation
- Webhook signature verification
- Transaction ledger idempotency
- Refund handling with adjustment ledger rows

## Folder Structure

```text
src/
  app/
    age-gate/
    user/
    model/
    admin/
    prototype-map/
  components/
    layout.tsx
    pages.tsx
    ui.tsx
  data/
    admin.ts
    creators.ts
    tokenPackages.ts
    transactions.ts
    users.ts
  lib/
    mockAuth.ts
    mockKyc.ts
    mockPayment.ts
    mockPayout.ts
    store.ts
    tokenLedger.ts
    wallet.ts
  styles/
    globals.css
  types/
    index.ts
```

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` if needed.

```env
NEXT_PUBLIC_APP_NAME=Stripchats Demo
NEXT_PUBLIC_RAZORPAY_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
```

Do not commit real secrets.

## Vercel Deployment

1. Push this repository to GitHub.
2. Open Vercel and import `Shahrukh492/stripchats`.
3. Use these settings:
   - Framework Preset: Next.js
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: leave default
4. Add any public demo environment variables from `.env.example`.
5. Deploy.

## GitHub Upload / Push Commands

For a fresh local repository:

```bash
git init
git add .
git commit -m "Initial commit: Stripchats demo website prototype"
git branch -M main
git remote add origin https://github.com/Shahrukh492/stripchats.git
git push -u origin main
```

If the remote already exists:

```bash
git remote set-url origin https://github.com/Shahrukh492/stripchats.git
git push -u origin main
```

Alternative GitHub CLI flow:

```bash
gh repo clone Shahrukh492/stripchats
cd stripchats
git add .
git commit -m "Initial commit: Stripchats demo website prototype"
git push -u origin main
```

## Future Backend Integration Notes

- Replace Zustand/localStorage with authenticated server state.
- Add real age/compliance session handling.
- Add backend wallet service with immutable token ledger.
- Create payment intents/orders server-side only.
- Fulfill payments from verified webhooks only.
- Add KYC provider integration and secure document storage.
- Add WebSocket services for chat, live room state, tips, and private show sessions.
- Add role-based admin permissions and audit logging.
- Add media moderation, entitlement checks, refund workflows, and fraud monitoring.
