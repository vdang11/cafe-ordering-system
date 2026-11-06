// ===== IMPORT =====

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCartStore from "@/store/cartStore";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";

// How many lines the order summary shows before "Show All".
const SUMMARY_LIMIT = 3;

// ===== COMPONENT =====

function CheckoutPage() {
  const navigate = useNavigate();

  const clearCart = useCartStore((state) => state.clearCart);

  const {
    lines,
    isEmpty,
    subtotal,
    hasUnavailable,
    isPending,
    isError,
    error,
    refetch,
  } = useCart();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [showAllItems, setShowAllItems] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if cart is empty
  if (isEmpty) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-full bg-black p-4 text-white"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // The cart holds ids, so nothing can be priced until the menu has loaded.
  if (isPending) {
    return (
      <p className="p-8 text-center text-muted-foreground">
        Loading your order...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 p-8 text-center">
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
    );
  }

  function handleOrder() {
    // Submitting is synchronous today, so this cannot fire twice yet. It is here
    // for when placing an order becomes a request: the guard, the disabled
    // button and the pending label all need to exist before that call is added.
    if (isSubmitting) return;

    // A line that no longer matches the menu would be rejected by the server.
    if (hasUnavailable) return;

    if (!name.trim() || !tableNumber.trim()) {
      alert("Please fill required fields");
      return;
    }

    // Validate table number is a positive number
    if (isNaN(tableNumber) || tableNumber <= 0) {
      alert("Please enter a valid table number");
      return;
    }

    setIsSubmitting(true);

    clearCart();

    navigate("/success");
  }

  const visibleLines = showAllItems ? lines : lines.slice(0, SUMMARY_LIMIT);
  const hiddenCount = lines.length - visibleLines.length;

  return (
    <div className="space-y-5 p-4">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Cart Items Display */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        {visibleLines.map((line) => (
          <div key={line.cartKey} className="rounded-2xl bg-white p-4">
            <div className="flex justify-between">
              <span>{line.product?.name ?? "Unavailable item"}</span>

              {!line.unavailable && (
                <span className="font-bold">
                  {formatPrice(line.lineTotal)}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600">
              Quantity: {line.quantity}
            </div>

            {line.modifiers.length > 0 && (
              <div className="text-sm text-gray-600 mt-1">
                {line.modifiers.map((modifier) => modifier.label).join(", ")}
              </div>
            )}

            {line.unavailable && (
              <div className="text-sm text-red-600 mt-1">
                No longer available
              </div>
            )}
          </div>
        ))}

        {hiddenCount > 0 && (
          <div className="rounded-2xl bg-white p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">+ {hiddenCount} more items</span>
              <span className="text-sm text-gray-500">
                Total items: {lines.length}
              </span>
            </div>
          </div>
        )}

        {lines.length > SUMMARY_LIMIT && (
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className="w-full py-2 text-center text-blue-600 hover:text-blue-800"
          >
            {showAllItems ? "Show Less" : `Show All ${lines.length} Items`}
          </button>
        )}
      </div>

      {/* Name */}

      <div className="space-y-2">
        <label htmlFor="customer-name" className="font-medium">
          Customer Name
        </label>

        <input
          id="customer-name"
          name="customerName"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-2xl border bg-white p-4"
        />
      </div>

      {/* Phone (optional) */}

      <div className="space-y-2">
        <label htmlFor="phone-number" className="font-medium">
          Phone Number <span className="text-sm text-gray-400">(optional)</span>
        </label>

        <input
          id="phone-number"
          name="phoneNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full rounded-2xl border bg-white p-4"
        />
      </div>

      {/* Table */}

      <div className="space-y-2">
        <label htmlFor="table-number" className="font-medium">
          Table Number
        </label>

        <input
          id="table-number"
          name="tableNumber"
          inputMode="numeric"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
          className="w-full rounded-2xl border bg-white p-4"
        />
      </div>

      {/* Notes */}

      <div className="space-y-2">
        <label htmlFor="special-instructions" className="font-medium">
          Special Instructions
        </label>

        <textarea
          id="special-instructions"
          name="specialInstructions"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests or notes..."
          rows={4}
          className="w-full rounded-2xl border bg-white p-4"
        />
      </div>

      {/* Total */}

      <div className="rounded-3xl bg-white p-4">
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </div>
      </div>

      {hasUnavailable && (
        <p className="text-center text-sm text-red-600">
          Remove the unavailable items from your cart to place the order.
        </p>
      )}

      <button
        onClick={handleOrder}
        disabled={isSubmitting || hasUnavailable}
        className="w-full rounded-full bg-black p-4 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default CheckoutPage;
