import { motion } from "framer-motion";
import ProductModal from "@/components/menu/ProductModal";
function ProductCard({ item }) {
  return (
    <ProductModal item={item}>
      <motion.div
        whileTap={{
          scale: 0.98,
        }}
        className="
      bg-white
      rounded-3xl
      p-4
      border
      flex
      gap-4
      shadow-sm
      "
      >
        <img
          src={item.image}
          alt={item.name}
          className="
        w-24
        h-24
        rounded-2xl
        object-cover
        "
        />

        <div
          className="
        flex-1
        "
        >
          <div
            className="
          flex
          justify-between
          "
          >
            <h3
              className="
            font-semibold
            "
            >
              {item.name}
            </h3>

            <span
              className="
            font-bold
            "
            >
              ${item.price}
            </span>
          </div>

          <p
            className="
          text-sm
          text-muted-foreground
          mt-2
          "
          >
            {item.description}
          </p>

          {item.tags.length > 0 && (
            <div
              className="
            mt-3
            flex
            gap-2
            "
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                  text-xs
                  px-3
                  py-1
                  bg-muted
                  rounded-full
                  "
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
