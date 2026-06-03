import { Link } from "react-router-dom";

import CartItem from "@/components/cart/CartItem";
import useCartStore from "@/store/cartStore";

function CartPage() {
  const items = useCartStore((state) => state.items);

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const total = items.reduce(
    (sum, item) =>
      sum + (item.totalPrice || item.price) * item.quantity,
    0,
  );

  // =====================================================
  // TOTAL ITEM COUNT
  // =====================================================

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen space-y-4 bg-neutral-100 p-4 pb-32">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div>
        <h1 className="text-3xl font-bold">
          Your Cart
        </h1>

        {items.length > 0 && (
          <p className="mt-1 text-gray-500">
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* ================================= */}
      {/* EMPTY */}
      {/* ================================= */}

      {items.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-medium">
            Cart empty
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Add something delicious ☕
          </p>
        </div>
      )}

      {/* ================================= */}
      {/* CART ITEMS */}
      {/* ================================= */}

      {items.map((item) => (
        <CartItem
          key={item.cartKey}
          item={item}
        />
      ))}

      {/* ================================= */}
      {/* SUMMARY */}
      {/* ================================= */}

      {items.length > 0 && (
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="text-xl font-bold">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* ================================= */}
      {/* CHECKOUT */}
      {/* ================================= */}

      {items.length > 0 && (
        <Link
          to="/checkout"
          className="
            block w-full rounded-full
            bg-black p-4 text-center
            font-medium text-white shadow-sm
          "
        >
          Checkout
        </Link>
      )}
    </div>
  );
}

export default CartPage;