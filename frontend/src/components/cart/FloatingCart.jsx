import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";

function FloatingCart() {
  const { isEmpty, totalQuantity, subtotal } = useCart();

  if (isEmpty) {
    return null;
  }

  return (
    <Link
      to="/cart"
      className="
        fixed bottom-5 left-1/2 z-50 flex
        w-[calc(100%-32px)] max-w-sm -translate-x-1/2
        items-center justify-between
        rounded-full bg-black px-5 py-4
        text-white shadow-xl
      "
    >
      <div className="flex items-center gap-3">
        <ShoppingCart size={20} />

        <span className="font-medium">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
        </span>
      </div>

      <span className="font-bold">
        {formatPrice(subtotal)}
      </span>
    </Link>
  );
}

export default FloatingCart;
