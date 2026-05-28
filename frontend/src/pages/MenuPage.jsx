import Hero from "@/components/menu/Hero";
import CategoryBar from "@/components/menu/CategoryBar";
import FloatingCart from "@/components/cart/FloatingCart";
import menuData from "@/data/menuData";
import { categories } from "@/constants/categories";
import ProductCard from "@/components/menu/ProductCard";

function MenuPage() {
  return (
    <div>
      <Hero />

      <CategoryBar />

      <div className="p-4">
        {categories.map((category) => {
          const items = menuData.filter((item) => item.category === category);

          return (
            <section id={category} key={category} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <FloatingCart />
    </div>
  );
}

export default MenuPage;
