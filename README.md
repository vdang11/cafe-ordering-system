# Cafe Ordering System

A mobile-first QR ordering platform for cafes, inspired by [123 Coffee House](https://www.123coffeehouse.com.au/s/order), [Bopple](https://bopple.app/fox-and-bow-red-hill/), Uber Eats, and DoorDash — with an Apple-style, minimal visual design.

Customers scan a QR code at their table, browse the menu, customize items, and place an order. Orders are routed to the correct preparation station (Kitchen or Front of House) and printed as dockets.

## Project Status

The **frontend** is in active development (React + Vite). The **backend** (Spring Boot) and **database** (MySQL) are planned but not yet implemented — the frontend currently uses local mock menu data.

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Zustand, React Router, Framer Motion, Radix UI / shadcn |
| Backend  | Spring Boot *(planned)* |
| Database | MySQL *(planned)* |

## Project Structure

```
cafe-ordering-system/
├── frontend/              # React + Vite app (see frontend/README.md)
│   └── src/
│       ├── pages/         # MenuPage, CartPage, CheckoutPage, SuccessPage
│       ├── components/    # cart/, menu/, ui/ components
│       ├── store/          # Zustand stores (cartStore)
│       ├── routes/         # React Router route definitions
│       ├── layouts/        # MainLayout
│       └── data/           # Mock menu data & modifiers
└── continue/docs/         # Architecture & business rules (source of truth)
    ├── architecture.md
    ├── business/           # Ordering flow, order routing rules
    ├── frontend/            # Routing, state management, UI guidelines, product modal
    ├── operations/          # Kitchen & admin docket flows
    └── rules/               # Overall project rules
```

## Getting Started

```bash
cd frontend
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run lint      # run ESLint
npm run preview   # preview production build
```

## Ordering Flow

```
Scan QR → Menu → Browse Categories → Product Modal (customize) →
Add to Cart → Floating Cart → Cart Review → Checkout (name + table) →
Submit Order → Success Page
```

Rules:
- Required modifiers must be selected before adding to cart.
- The Product Modal closes automatically after **Add To Cart** / **Save Changes**.
- Cart subtotal and the floating cart update instantly — no page refresh.
- Cart state survives route navigation.

### Routes

| Path        | Page          |
|-------------|---------------|
| `/`         | MenuPage (entry point) |
| `/cart`     | CartPage |
| `/checkout` | CheckoutPage |
| `/success`  | SuccessPage |

Planned: `/admin`, `/kitchen`, `/orders`, `/profile`.

## Order Routing (Stations)

Every product belongs to a **station**, not a category. Categories change; stations don't.

- **KITCHEN** — hot food (burgers, toasties, breakfast items)
- **FRONT_OF_HOUSE** — coffee, drinks, cakes, pastries, cabinet items

When an order is placed, the backend splits items by station and generates a separate docket for each, printed on thermal docket printers. Kitchen never receives drinks; Front of House never receives kitchen food.

## State Management

- **Zustand** — high-frequency, global business state: cart, order session, authentication, inventory cache.
- **React Context** — cross-cutting app configuration: theme, store info, table info, feature flags.

Context is never used as a substitute for Zustand — business state always lives in Zustand.

## Documentation

The `continue/docs/` directory is the source of truth for product, frontend, and operations rules. Read it before making significant changes:

- [`architecture.md`](continue/docs/architecture.md) — product inspiration & state philosophy
- [`rules/cafe-ordering-system-rules.md`](continue/docs/rules/cafe-ordering-system-rules.md) — overall project rules
- [`business/ordering-flow.md`](continue/docs/business/ordering-flow.md) / [`order-routing.md`](continue/docs/business/order-routing.md)
- [`frontend/routing.md`](continue/docs/frontend/routing.md), [`state-management.md`](continue/docs/frontend/state-management.md), [`ui-guidelines.md`](continue/docs/frontend/ui-guidelines.md), [`product-modal.md`](continue/docs/frontend/product-modal.md)
- [`operations/kitchen-flow.md`](continue/docs/operations/kitchen-flow.md), [`admin-flow.md`](continue/docs/operations/admin-flow.md)

## Roadmap

The architecture is designed to support, without major rewrites:

- Admin dashboard
- POS integration
- Inventory management
- Kitchen Display System (KDS) alongside printed dockets
- Multi-location support
