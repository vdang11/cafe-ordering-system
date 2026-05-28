// ===== IMPORT =====
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCartStore from "@/store/cartStore";

// ===== COMPONENT =====
function CheckoutPage() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  function handleOrder() {

    if (!name || !tableNumber) {
      alert("Please fill required fields");
      return;
    }

    clearCart();

    navigate("/success");
  }

  return (
    <div className="p-4 space-y-5">

      <h1 className="text-3xl font-bold">
        Checkout
      </h1>

      {/* Name */}
      <div className="space-y-2">

        <label className="font-medium">
          Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="John"
          className="
          w-full
          border
          rounded-2xl
          p-4
          bg-white
          "
        />

      </div>

      {/* Table */}
      <div className="space-y-2">

        <label className="font-medium">
          Table Number
        </label>

        <input
          value={tableNumber}
          onChange={(e) =>
            setTableNumber(e.target.value)
          }
          placeholder="12"
          className="
          w-full
          border
          rounded-2xl
          p-4
          bg-white
          "
        />

      </div>

      {/* Notes */}
      <div className="space-y-2">

        <label className="font-medium">
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Less sugar..."
          rows={4}
          className="
          w-full
          border
          rounded-2xl
          p-4
          bg-white
          "
        />

      </div>

      {/* Total */}
      <div className="bg-white rounded-3xl p-4">

        <div className="flex justify-between">

          <span>
            Total
          </span>

          <span className="font-bold">

            ${total.toFixed(2)}

          </span>

        </div>

      </div>

      <button
        onClick={handleOrder}
        className="
        w-full
        bg-black
        text-white
        rounded-full
        p-4
        "
      >
        Place Order
      </button>

    </div>
  );
}

export default CheckoutPage;