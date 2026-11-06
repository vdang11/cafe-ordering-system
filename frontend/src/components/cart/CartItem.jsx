import { Trash2 } from "lucide-react";

import ProductModal from "@/components/menu/ProductModal";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";

// `line` is a cart line already joined with the menu by useCart().
function CartItem({ line }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const name = line.product?.name ?? "Unavailable item";

  return (
    <div className="bg-white rounded-3xl border p-4 space-y-3">
      {/* ================= HEADER ================= */}

      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>

          {line.unavailable ? (
            <p className="text-sm text-red-600">
              No longer available. Remove it to place your order.
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-400">
                {formatPrice(line.unitPrice)} × {line.quantity}
              </p>

              <p className="font-bold">{formatPrice(line.lineTotal)}</p>
            </>
          )}
        </div>

        {/* QTY */}

        <div className="flex items-center gap-3">
          <button
            onClick={() => decreaseQuantity(line.cartKey)}
            className="h-8 w-8 rounded-full border"
          >
            -
          </button>

          <span>{line.quantity}</span>

          <button
            onClick={() => increaseQuantity(line.cartKey)}
            className="h-8 w-8 rounded-full border"
          >
            +
          </button>
        </div>
      </div>

      {/* ================= MODIFIERS ================= */}

      {line.modifiers.map((modifier) => (
        <div key={modifier.key} className="text-sm text-gray-500">
          • {modifier.label}
          {modifier.price > 0 && <> (+{formatPrice(modifier.price)})</>}
        </div>
      ))}

      {/* ================= ACTIONS ================= */}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => removeItem(line.cartKey)}
          aria-label={`Remove ${name} from cart`}
          className="flex items-center gap-1 text-sm text-red-600"
        >
          <Trash2 size={14} />
          Remove
        </button>

        {/* A line that no longer matches the menu cannot be edited back into
            shape reliably, so it can only be removed. */}
        {!line.unavailable && (
          <ProductModal
            product={line.product}
            isEdit
            cartKey={line.cartKey}
            selection={{
              options: line.options,
              addons: line.addons,
              counters: line.counters,
            }}
          >
            <button className="text-sm underline">Edit</button>
          </ProductModal>
        )}
      </div>
    </div>
  );
}

export default CartItem;
