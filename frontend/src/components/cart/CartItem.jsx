import ProductModal from "@/components/menu/ProductModal";
import useCartStore from "@/store/cartStore";

function CartItem({ item }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const selectedOptions = Object.values(item.selectedOptions || {}).filter(
    Boolean,
  );

  const selectedAddons = Object.values(item.selectedAddons || {})
    .flat()
    .filter(Boolean);

  // Robust total price calculation with error handling
  const calculateTotal = () => {
    if (item.totalPrice !== undefined && !isNaN(item.totalPrice)) {
      return item.totalPrice.toFixed(2);
    }
    // Fallback calculation
    if (item.price && item.quantity && !isNaN(item.price) && !isNaN(item.quantity)) {
      return (item.price * item.quantity).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="bg-white rounded-3xl border p-4 space-y-3">
      {/* ================= HEADER ================= */}

      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>

          <p className="text-sm text-gray-400">
            Base: ${item.price}
          </p>

          <p className="font-bold">
            Total: ${calculateTotal()}
          </p>
        </div>

        {/* QTY */}

        <div className="flex items-center gap-3">
          <button
            onClick={() => decreaseQuantity(item.cartKey)}
            className="h-8 w-8 rounded-full border"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item.cartKey)}
            className="h-8 w-8 rounded-full border"
          >
            +
          </button>
        </div>
      </div>

      {/* ================= OPTIONS ================= */}

      {selectedOptions.map((option) => (
        <div key={option.id} className="text-sm text-gray-500">
          • {option.name}
          {option.price > 0 && <> (+${option.price})</>}
        </div>
      ))}

      {/* ================= ADDONS ================= */}

      {selectedAddons.map((addon) => (
        <div key={addon.id} className="text-sm text-gray-500">
          • {addon.name}
          {addon.price > 0 && <> (+${addon.price})</>}
        </div>
      ))}

      {/* ================= SUGAR ================= */}

      {Object.entries(item.counters || {}).map(([key, value]) => {
        if (value === 0) return null;

        return (
          <div key={key} className="text-sm text-gray-500">
            • {value} tsp sugar
          </div>
        );
      })}

      {/* ================= EDIT ================= */}

      <div className="flex justify-end">
        <ProductModal
          item={item}
          isEdit
          cartKey={item.cartKey}
          selectedOptions={item.selectedOptions}
          selectedAddons={item.selectedAddons}
          counters={item.counters}
        >
          <button className="text-sm underline">
            Edit
          </button>
        </ProductModal>
      </div>
    </div>
  );
}

export default CartItem;
