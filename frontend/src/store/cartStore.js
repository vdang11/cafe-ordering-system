import { create } from "zustand";

function createCartKey(item) {
  return JSON.stringify({
    id: item.id,

    selectedOptions: item.selectedOptions,

    selectedAddons: item.selectedAddons,

    counters: item.counters,
  });
}

const useCartStore = create((set) => ({
  items: [],

  addItem: (newItem) =>
    set((state) => {
      const cartKey = createCartKey(newItem);

      const existingItem = state.items.find((item) => item.cartKey === cartKey);

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
    set((state) => ({
      items: state.items.map((item) =>
        item.cartKey === cartKey ? { ...item, ...updatedItem } : item,
      ),
    })),
}));

export default useCartStore;
