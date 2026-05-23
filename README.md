# CreatorLive Demo

CreatorLive Demo is a safe, non-explicit live creator marketplace prototype inspired by modern live-streaming marketplace patterns. It is built for boss presentation, client demos, UI/UX review, QA reference, and future backend planning.

## Safety Note

This is a placeholder-only learning prototype. It does not copy Stripchat branding, logos, copyrighted assets, text, images, or adult content. All creator media is represented with safe gradient placeholders, blurred avatar blocks, neutral labels, and dummy names. Login, wallet, payment, KYC, streaming, chat, payout, and moderation are mock/local only.

## Features

- Landing page and role selection for User, Creator, and Admin demos
- 18+ safe confirmation with localStorage gating for user routes
- Dummy login and signup with role-based redirect
- User discovery, search, creator profile, public live room, wallet, messages, favorites, and history
- Mock token wallet with success, failed, and pending payment states
- Tip modal, tip menu, group show, ticket show, fan club, paid album, paid message, and private show demo
- Private show active screen with timer and demo token deduction
- Creator onboarding, KYC states, dashboard, profile setup, broadcast center, live control panel, pricing, automation, earnings, payout, and moderation
- Admin dashboard, user management, creator/KYC review, token ledger, payment/payout controls, moderation, and analytics
- Developer Notes panels on important pages
- Prototype flow map and visible state references

## User Flow

1. Open `/`.
2. Choose **Open User Demo**.
3. Confirm age on `/age-gate`.
4. Browse `/user`, search creators, open `/user/creator/[id]`, and enter `/user/live/[id]`.
5. Try wallet recharge on `/user/wallet`.
6. Test messages, paid unlocks, favorites, history, tips, ticket/group/private flows.

## Creator Flow

1. Open `/model/onboarding`.
2. Walk through signup, email verification, KYC upload, agreement, and approval states.
3. Use `/model` dashboard and quick actions.
4. Configure profile, broadcast, live-room controls, pricing, automation, earnings, payout, and moderation.

## Admin Flow

1. Open `/admin`.
2. Review platform stats and navigate through admin sections.
3. Manage users, creators/KYC, token ledger, payments/payouts, reports, and analytics.

## Mock Payment Gateway

The wallet uses `src/lib/mockPayment.ts`. It never calls a real gateway and never includes secret keys.

Mock states:

- Success: adds tokens to local wallet and transaction history.
- Failed: keeps balance unchanged and shows failed state.
- Pending: records a processing-style state for review.

Future gateway comments are included for:

- Razorpay order creation and backend signature verification
- Stripe Checkout/PaymentIntent and webhook signature verification
- PayPal order approval/capture
- Idempotency keys
- Refund adjustment ledger rows
- Backend-only wallet updates

## Folder Structure

```text
src/
  app/
    auth/
    age-gate/
    user/
    model/
    admin/
    prototype-map/
  components/
    common/
    user/
    model/
    admin/
    layout.tsx
    pages.tsx
    ui.tsx
  data/
  lib/
  store/
  styles/
  types/
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

## Lint

```bash
npm run lint
```

## Environment Variables

Use `.env.example` as a template:

```env
NEXT_PUBLIC_APP_NAME=CreatorLive Demo
NEXT_PUBLIC_RAZORPAY_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
```

Do not commit real secrets.

## Vercel Deployment

Settings:

- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: default / blank

CLI:

```bash
npx vercel --prod
```

## GitHub Commands

```bash
git init
git add .
git commit -m "Initial commit: CreatorLive demo marketplace prototype"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```

For this existing repo:

```bash
git remote set-url origin https://github.com/malachitetechnologies0-ui/stripchats.git
git push -u origin main
```

## Future Backend Integration Notes

- Replace localStorage/Zustand with authenticated server state.
- Add real auth with secure sessions and role-based permissions.
- Add compliance/age-gate sessions on the backend.
- Add immutable wallet ledger and backend-only token updates.
- Fulfill payments only after verified Razorpay/Stripe/PayPal webhooks.
- Add KYC provider integration and secure document storage.
- Add live streaming orchestration with WebRTC/RTMP and room state services.
- Add WebSocket chat, moderation, bot automation, and live tip events.
- Add admin audit logs, fraud monitoring, refund workflows, and payout reconciliation.

## Limitations

- Frontend-only demo.
- No real auth, database, payment gateway, KYC provider, streaming server, or adult content.
- All data, payments, wallet updates, chat, reports, and payouts are mock/local state.
