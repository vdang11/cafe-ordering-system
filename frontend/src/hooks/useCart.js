import { useMenu } from "@/hooks/useMenu";
import { resolveLine } from "@/lib/cart";
import useCartStore from "@/store/cartStore";

// The store holds ids; this joins them with the current menu. Every screen that
// shows a cart total reads it from here, so the subtotal has one definition.
export function useCart() {
  const items = useCartStore((state) => state.items);
  const menu = useMenu();

  const productsById = new Map(
    (menu.data?.products ?? []).map((product) => [product.id, product]),
  );

  const lines = menu.data
    ? items.map((line) => resolveLine(line, productsById))
    : [];

  return {
    lines,
    isEmpty: items.length === 0,
    totalQuantity: items.reduce((sum, line) => sum + line.quantity, 0),

    // A line that can no longer be priced is left out rather than counted at a
    // guess. Checkout refuses to submit while one is in the cart.
    subtotal: lines
      .filter((line) => !line.unavailable)
      .reduce((sum, line) => sum + line.lineTotal, 0),
    hasUnavailable: lines.some((line) => line.unavailable),

    isPending: menu.isPending,
    isError: menu.isError,
    error: menu.error,
    refetch: menu.refetch,
  };
}
