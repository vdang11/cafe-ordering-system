import { create } from "zustand";
import { persist } from "zustand/middleware";

function createCartKey(item) {
  const options = Object.entries(item.selectedOptions || {})
    .filter(([, option]) => Boolean(option))
    .map(([groupId, option]) => `${groupId}:${option.id}`)
    .sort();

  const addons = Object.entries(item.selectedAddons || {})
    .flatMap(([groupId, list]) =>
      (list || []).filter(Boolean).map((addon) => `${groupId}:${addon.id}`),
    )
    .sort();

  const counters = Object.entries(item.counters || {})
    .filter(([, value]) => value > 0)
    .map(([groupId, value]) => `${groupId}:${value}`)
    .sort();

  return [item.id, ...options, ...addons, ...counters].join("|");
}

function calculateTotalPrice(item) {
  // Calculate based on item price + option price + addon price
  const optionPrice = Object.values(item.selectedOptions || {})
    .filter(Boolean)
    .reduce((sum, option) => sum + (option.price || 0), 0);

  const addonPrice = Object.values(item.selectedAddons || {})
    .flat()
    .filter(Boolean)
    .reduce((sum, addon) => sum + (addon.price || 0), 0);

  const basePrice = item.price || 0;

  return basePrice + optionPrice + addonPrice;
}

const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const cartKey = createCartKey(newItem);

          const existingItem = state.items.find(
            (item) => item.cartKey === cartKey,
          );

          if (existingItem) {
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
                ...newItem,
                cartKey,
                quantity: 1,
                totalPrice: calculateTotalPrice(newItem),
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

      clearCart: () =>
        set({
          items: [],
        }),

      updateItem: (cartKey, updatedItem) =>
        set((state) => {
          const target = state.items.find((item) => item.cartKey === cartKey);

          if (!target) return state;

          const merged = { ...target, ...updatedItem };

          merged.cartKey = createCartKey(merged);
          merged.totalPrice = calculateTotalPrice(merged);

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

      // Bump this whenever the cart item shape changes.
      // Zustand calls migrate() on an older version instead of loading stale data.
      version: 1,

      // Persist items only. The actions are functions and cannot be serialised.
      partialize: (state) => ({ items: state.items }),

      migrate: () => ({ items: [] }),
    },
  ),
);

export default useCartStore;
