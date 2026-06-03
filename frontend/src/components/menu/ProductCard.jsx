import { motion } from "framer-motion";

import ProductModal from "@/components/menu/ProductModal";

function ProductCard({ item }) {
  return (
    <ProductModal item={item} isEdit={false}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="flex gap-4 rounded-3xl border bg-white p-4 shadow-sm"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 rounded-2xl object-cover"
        />

        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">
              {item.name}
            </h3>

            <span className="font-bold">
              ${item.price}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {item.description}
          </p>

          {item.tags.length > 0 && (
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
      </motion.div>
    </ProductModal>
  );
}

export default ProductCard;