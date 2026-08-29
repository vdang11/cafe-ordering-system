# Cafe Ordering System

A mobile-first QR ordering platform for cafes, inspired by [123 Coffee House](https://www.123coffeehouse.com.au/s/order), [Bopple](https://bopple.app/fox-and-bow-red-hill/), Uber Eats, and DoorDash — with an Apple-style, minimal visual design.

Customers scan a QR code at their table, browse the menu, customize items, and place an order. Orders are routed to the correct preparation station (Kitchen or Front of House) and printed as dockets.

## Project Status

The **frontend** is in active development (React + Vite). The **backend** (Spring Boot) and **database** (MySQL) are planned but not yet implemented — the frontend currently uses local mock menu data and the checkout does not submit anywhere.

Sections below marked *(planned)* describe the intended design and are not implemented yet.

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Zustand, React Router, Framer Motion, Radix UI / shadcn |
| Data fetching | TanStack Query *(installed, not wired up yet)* |
| Backend  | Spring Boot 3, Java 21, Spring Modulith *(planned)* |
| Database | MySQL 8 *(planned)* |

## Project Structure

```
cafe-ordering-system/
└── frontend/                 # React + Vite app (see frontend/README.md)
    └── src/
        ├── pages/            # MenuPage, CartPage, CheckoutPage, SuccessPage
        ├── components/       # cart/, menu/, ui/ (shadcn primitives)
        ├── store/            # Zustand stores (cartStore)
        ├── routes/           # React Router route definitions
        ├── layouts/          # MainLayout
        ├── data/             # Mock menu data & modifier presets
        ├── constants/        # Shared constants (categories)
        ├── lib/              # Helpers (cn, formatPrice)
        ├── assets/           # Local images
        ├── api/              # HTTP client & endpoints (empty until the backend exists)
        ├── hooks/            # Shared React hooks (empty)
        └── types/            # Shared type definitions (empty)
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

## Conventions

- **Language** — everything committed to this repository is written in English: code, identifiers, comments, commit messages, and docs.
- **Currency** — all prices are Australian dollars. Every price is rendered through `lib/formatPrice.js`, which pins the locale to `en-AU` and uses `currencyDisplay: "narrowSymbol"` so the output is always a plain `$8.50` — never `A$8.50` or `AUD 8.50`. Do not format prices inline.
- **Money arithmetic** — prices are currently JavaScript numbers. This is exact for the present data (every price is a whole number or a `.5`) but will drift once a price such as `$3.30` appears. Totals should move to the backend using `DECIMAL(10,2)` / `BigDecimal`.

## Ordering Flow

```
Scan QR → Menu → Browse Categories → Product Modal (customize) →
Add to Cart → Floating Cart → Cart Review → Checkout (name + table) →
Submit Order → Success Page
```

Rules:
- Required modifiers must be selected before adding to cart. Optional modifiers can be cleared by tapping the active choice again; required ones always keep a selection.
- The Product Modal closes automatically after **Add To Cart** / **Save Changes**.
- Cart subtotal and the floating cart update instantly — no page refresh.
- Cart state survives route navigation and a full page reload; it is persisted to `localStorage` under the key `cafe-cart`.
- Two items with the same product and the same configuration collapse into a single line, regardless of the order the modifiers were chosen in. Editing a line re-merges it if it comes to match another line.

### Routes

| Path        | Page          |
|-------------|---------------|
| `/`         | MenuPage (entry point) |
| `/cart`     | CartPage |
| `/checkout` | CheckoutPage |
| `/success`  | SuccessPage |
| `*`         | Redirects to `/` |

Planned: `/admin`, `/kitchen`, `/orders`, `/profile`.

## Order Routing (Stations) *(planned)*

Every product will belong to a **station**, not a category. Categories change; stations don't.

- **KITCHEN** — hot food (burgers, toasties, breakfast items)
- **FRONT_OF_HOUSE** — coffee, drinks, cakes, pastries, cabinet items

When an order is placed, the backend splits items by station and generates a separate docket for each, printed on thermal docket printers. Kitchen never receives drinks; Front of House never receives kitchen food.

Not implemented yet — menu items currently carry a `category` only, with no `station` field.

## State Management

- **Zustand** — high-frequency, global business state: cart, and later order session, authentication, inventory cache.
- **React Context** *(planned)* — cross-cutting app configuration: theme, store info, table info, feature flags.

Context is never used as a substitute for Zustand — business state always lives in Zustand.

## Documentation

Architecture and business rules are not yet kept in this repository. When they are added, they belong under `docs/`:

- `docs/architecture.md` — product inspiration & state philosophy
- `docs/business/` — ordering flow, order routing rules
- `docs/frontend/` — routing, state management, UI guidelines, product modal
- `docs/operations/` — kitchen & admin docket flows

## Roadmap

The architecture is designed to support, without major rewrites:

- Spring Boot backend with a real menu and order API
- Admin dashboard
- POS integration
- Inventory management
- Kitchen Display System (KDS) alongside printed dockets
- Multi-location support
