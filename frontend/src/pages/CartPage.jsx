import { Link } from "react-router-dom";

import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";

function CartPage() {
  const {
    lines,
    isEmpty,
    totalQuantity,
    subtotal,
    isPending,
    isError,
    error,
    refetch,
  } = useCart();

  // The cart holds ids, so its lines can only be shown once the menu they
  // point at has loaded.
  const ready = !isEmpty && !isPending && !isError;

  return (
    <div className="min-h-screen space-y-4 bg-neutral-100 p-4 pb-32">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div>
        <h1 className="text-3xl font-bold">
          Your Cart
        </h1>

        {!isEmpty && (
          <p className="mt-1 text-gray-500">
            {totalQuantity} item{totalQuantity > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* ================================= */}
      {/* EMPTY */}
      {/* ================================= */}

      {isEmpty && (
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
      {/* MENU LOADING / ERROR */}
      {/* ================================= */}

      {!isEmpty && isPending && (
        <p className="p-8 text-center text-muted-foreground">
          Loading cart...
        </p>
      )}

      {!isEmpty && isError && (
        <div className="space-y-4 rounded-3xl bg-white p-8 text-center">
          <p className="font-medium">Could not load the menu</p>

          <p className="text-sm text-muted-foreground">{error.message}</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full bg-black px-6 py-3 text-white"
          >
            Try again
          </button>
        </div>
      )}

      {/* ================================= */}
      {/* CART ITEMS */}
      {/* ================================= */}

      {ready &&
        lines.map((line) => (
          <CartItem
            key={line.cartKey}
            line={line}
          />
        ))}

      {/* ================================= */}
      {/* SUMMARY */}
      {/* ================================= */}

      {ready && (
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="text-xl font-bold">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      )}

      {/* ================================= */}
      {/* CHECKOUT */}
      {/* ================================= */}

      {ready && (
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
