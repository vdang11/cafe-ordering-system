import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createCartKey } from "@/lib/cart";

// Lines hold ids only, never names or prices. See lib/cart.js for the shape,
// and hooks/useCart.js for joining them with the menu.
const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (productId, selection) =>
        set((state) => {
          const cartKey = createCartKey(productId, selection);

          const exists = state.items.some((item) => item.cartKey === cartKey);

          if (exists) {
            return {
              items: state.items.map((item) =>
                item.cartKey === cartKey
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                cartKey,
                productId,
                ...selection,
                quantity: 1,
              },
            ],
          };
        }),

      increaseQuantity: (cartKey) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartKey === cartKey
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        })),

      decreaseQuantity: (cartKey) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartKey === cartKey
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      removeItem: (cartKey) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartKey !== cartKey),
        })),

      clearCart: () =>
        set({
          items: [],
        }),

      updateItem: (cartKey, selection) =>
        set((state) => {
          const target = state.items.find((item) => item.cartKey === cartKey);

          if (!target) return state;

          const merged = {
            ...target,
            ...selection,
            cartKey: createCartKey(target.productId, selection),
          };

          // Configuration unchanged -> replace in place
          if (merged.cartKey === cartKey) {
            return {
              items: state.items.map((item) =>
                item.cartKey === cartKey ? merged : item,
              ),
            };
          }

          // New configuration collides with another row -> merge quantities, drop the old row
          const duplicate = state.items.some(
            (item) => item.cartKey === merged.cartKey,
          );

          if (duplicate) {
            return {
              items: state.items
                .filter((item) => item.cartKey !== cartKey)
                .map((item) =>
                  item.cartKey === merged.cartKey
                    ? {
                        ...item,
                        quantity: item.quantity + merged.quantity,
                      }
                    : item,
                ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.cartKey === cartKey ? merged : item,
            ),
          };
        }),
    }),

    {
      name: "cafe-cart",

      // Bump this whenever the cart line shape or the menu ids change.
      // Zustand calls migrate() on an older version instead of loading stale
      // data.
      //   2: menu item ids were renumbered by category, and cartKey embeds
      //      the id.
      //   3: lines store ids only, with no names or prices.
      version: 3,

      // Persist items only. The actions are functions and cannot be serialised.
      partialize: (state) => ({ items: state.items }),

      migrate: () => ({ items: [] }),
    },
  ),
);

export default useCartStore;
