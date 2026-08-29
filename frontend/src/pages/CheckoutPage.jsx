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
  const [showAllItems, setShowAllItems] = useState(false);

  // Fixed total calculation using totalPrice from cart items
  const total = items.reduce(
    (sum, item) => sum + (item.totalPrice || 0) * item.quantity,
    0,
  );

  // Check if cart is empty
  if (items.length === 0) {
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

  function handleOrder() {
    if (!name || !tableNumber) {
      alert("Please fill required fields");
      return;
    }

    // Validate table number is a positive number
    if (isNaN(tableNumber) || tableNumber <= 0) {
      alert("Please enter a valid table number");
      return;
    }

    clearCart();

    navigate("/success");
  }

  // Helper function to format options for display
  function formatOptions(options) {
    if (!options || Object.keys(options).length === 0) {
      return "";
    }
    
    return Object.values(options)
      .map(option => option?.name || option)
      .filter(Boolean)
      .join(', ');
  }

  // Helper function to format addons for display
  function formatAddons(addons) {
    if (!addons || Object.keys(addons).length === 0) {
      return "";
    }
    
    const addonList = [];
    Object.values(addons).forEach(group => {
      if (Array.isArray(group)) {
        group.forEach(addon => {
          if (addon?.name) {
            addonList.push(addon.name);
          }
        });
      }
    });
    
    return addonList.join(', ');
  }

  // Function to get a summary of items (first 3 items + count of remaining)
  function getItemsSummary() {
    if (items.length <= 3) {
      return items;
    }
    
    const firstThree = items.slice(0, 3);
    const remainingCount = items.length - 3;
    
    return [
      ...firstThree,
      {
        id: 'summary',
        name: `+ ${remainingCount} more items`,
        quantity: 1,
        totalPrice: 0,
        isSummary: true
      }
    ];
  }

  const itemsToShow = showAllItems ? items : getItemsSummary();

  return (
    <div className="space-y-5 p-4">
      <h1 className="text-3xl font-bold">
        Checkout
      </h1>

      {/* Cart Items Display */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        {itemsToShow.map((item) => {
          if (item.isSummary) {
            return (
              <div 
                key={item.id} 
                className="rounded-2xl bg-white p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">Total items: {items.length}</span>
                </div>
              </div>
            );
          }
          
          return (
            <div key={item.cartKey || item.id} className="rounded-2xl bg-white p-4">
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-bold">
                  ${(item.totalPrice * item.quantity).toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </div>
              {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  Options: {formatOptions(item.selectedOptions)}
                </div>
              )}
              {item.selectedAddons && Object.keys(item.selectedAddons).length > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  Addons: {formatAddons(item.selectedAddons)}
                </div>
              )}
              {item.counters && Object.keys(item.counters).length > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  Counters: {Object.entries(item.counters)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ')}
                </div>
              )}
            </div>
          );
        })}
        
        {items.length > 3 && (
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className="w-full py-2 text-center text-blue-600 hover:text-blue-800"
          >
            {showAllItems ? "Show Less" : `Show All ${items.length} Items`}
          </button>
        )}
      </div>

      {/* Name */}

      <div className="space-y-2">
        <label className="font-medium">
          Customer Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-2xl border bg-white p-4"
        />
      </div>

      {/* Table */}

      <div className="space-y-2">
        <label className="font-medium">
          Table Number
        </label>

        <input
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
          className="w-full rounded-2xl border bg-white p-4"
        />
      </div>

      {/* Notes */}

      <div className="space-y-2">
        <label className="font-medium">
          Special Instructions
        </label>

        <textarea
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
          <span className="font-bold">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleOrder}
        className="w-full rounded-full bg-black p-4 text-white"
      >
        Place Order
      </button>
    </div>
  );
}

export default CheckoutPage;