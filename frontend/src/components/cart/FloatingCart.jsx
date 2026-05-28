import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import useCartStore from "@/store/cartStore";

function FloatingCart() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return null;
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,

    0,
  );

  return (
    <Link
      to="/cart"
      className="
        fixed
        bottom-5
        left-1/2
        z-50
        flex
        w-[calc(100%-32px)]
        max-w-sm
        -translate-x-1/2
        items-center
        justify-between
        rounded-full
        bg-black
        px-5
        py-4
        text-white
        shadow-xl
      "
    >
      <div className="flex items-center gap-3">
        <ShoppingCart size={20} />

        <span className="font-medium">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
        </span>
      </div>

      <span className="font-bold">${subtotal.toFixed(2)}</span>
    </Link>
  );
}

export default FloatingCart;
