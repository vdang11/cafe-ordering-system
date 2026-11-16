import { motion } from "framer-motion";

import ProductModal from "@/components/menu/ProductModal";
import { formatPrice } from "@/lib/formatPrice";

function ProductCardBody({ item, soldOut }) {
  return (
    <>
      <img
        src={item.image}
        alt={item.name}
        className={`h-24 w-24 rounded-2xl object-cover ${soldOut ? "grayscale" : ""}`}
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">
            {item.name}
          </h3>

          {soldOut ? (
            <span className="text-sm font-medium text-red-600">
              Sold out
            </span>
          ) : (
            <span className="font-bold">
              {formatPrice(item.price)}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {item.description}
        </p>

        {item.tags?.length > 0 && (
          <div className="mt-3 flex gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ProductCard({ item }) {
  // A sold-out product stays on the menu so it does not vanish mid-session
  // (see docs/api-contract.md), but it cannot be opened or added to the cart.
  if (!item.available) {
    return (
      <div
        aria-disabled="true"
        className="flex gap-4 rounded-3xl border bg-white p-4 opacity-60 shadow-sm"
      >
        <ProductCardBody item={item} soldOut />
      </div>
    );
  }

  return (
    <ProductModal product={item} isEdit={false}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="flex gap-4 rounded-3xl border bg-white p-4 shadow-sm"
      >
        <ProductCardBody item={item} />
      </motion.div>
    </ProductModal>
  );
}

export default ProductCard;
