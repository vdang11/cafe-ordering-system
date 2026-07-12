import { create } from "zustand";

function createCartKey(item) {
  return JSON.stringify({
    id: item.id,
    selectedOptions: item.selectedOptions,
    selectedAddons: item.selectedAddons,
    counters: item.counters,
  });
}

function calculateTotalPrice(item) {
  // If totalPrice is already calculated and valid, return it
  if (item.totalPrice !== undefined && !isNaN(item.totalPrice)) {
    return item.totalPrice;
  }
  
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
    set((state) => ({
      items: state.items.map((item) =>
        item.cartKey === cartKey
          ? {
              ...item,
              ...updatedItem,
              totalPrice: calculateTotalPrice({ ...item, ...updatedItem }),
            }
          : item,
      ),
    })),
}));

export default useCartStore;