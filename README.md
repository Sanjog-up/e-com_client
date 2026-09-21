# E-Com Client

Frontend storefront for a full-stack e-commerce platform — product browsing, cart, wishlist, checkout, and Khalti payment integration.

🔗 **Live site: https://e-com-client-wubw.onrender.com
🔗 **Backend repo:** [ecom-server](https://github.com/Sanjog-up/ecom-server)

## Features

- **Storefront** — product listing with sidebar filters and pagination
- **Wishlist** — save products for later, full end-to-end flow
- **Cart** — debounced quantity updates, persistent across sessions
- **Checkout** — form validation with React Hook Form + Yup, order confirmation page
- **Payments** — Khalti checkout flow with callback handling
- **Auth** — login/register with role-based redirects, session-aware UI via TanStack Query cache
- **Admin panel** — product/category/brand management with sortable, paginated tables

## Tech Stack

- **Framework:** Next.js / React + TypeScript
- **Data fetching & caching:** TanStack Query
- **Forms & validation:** React Hook Form + Yup
- **Tables:** TanStack Table
- **Styling:** CSS custom properties (design token system), Fraunces serif type, warm ink/paper palette
- **Deployment:** Vercel

## Getting Started

```bash
git clone https://github.com/Sanjog-up/e-com_client.git
cd e-com_client
npm install
```

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=your_backend_api_url
```

Run in development:

```bash
npm run dev
```

## Notable Engineering Decisions

- Custom `withAuth` HOC for route protection with role-based checks
- TanStack Query cache invalidation wired into the login flow so role-based UI updates immediately without a full reload
- Design system built from CSS custom properties rather than a component library, for full control over the storefront's visual identity

## License

MIT
