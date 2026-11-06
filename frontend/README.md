# Frontend

The customer-facing ordering app: React 19 + Vite, Tailwind CSS v4, Zustand for the cart and TanStack Query for the menu.

The project overview, conventions and ordering rules live in the [root README](../README.md). The JSON exchanged with the backend is defined in [`docs/api-contract.md`](../docs/api-contract.md).

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.example` documents both variables. While the backend does not exist, keep `VITE_USE_MOCK_MENU=true`.

## Where things live

- `src/hooks/useMenu.js` loads the menu, from the API or from the mock depending on `VITE_USE_MOCK_MENU`.
- `src/lib/normalizeMenu.js` turns either source into the contract's shape before any component sees it.
- `src/store/cartStore.js` holds cart lines as ids only.
- `src/lib/cart.js` prices a selection and builds its modifier labels; the product modal and the cart both use it.
- `src/hooks/useCart.js` joins the cart with the menu and is the one place the subtotal is computed.
