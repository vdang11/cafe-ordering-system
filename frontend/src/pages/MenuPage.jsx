import Hero from "@/components/menu/Hero";
import CategoryBar from "@/components/menu/CategoryBar";
import ProductCard from "@/components/menu/ProductCard";

import FloatingCart from "@/components/cart/FloatingCart";

import { useMenu } from "@/hooks/useMenu";

function MenuPage() {
  const { data, isPending, isError, error, refetch } = useMenu();

  if (isPending) {
    return (
      <div>
        <Hero />

        <p className="p-8 text-center text-muted-foreground">
          Loading menu...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Hero />

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
      </div>
    );
  }

  const { categories, products } = data;

  return (
    <div>
      <Hero />

      <CategoryBar categories={categories} />

      <div className="p-4">
        {categories.map((category) => {
          const items = products.filter(
            (product) => product.categoryId === category.id,
          );

          if (items.length === 0) return null;

          return (
            <section
              id={category.id}
              key={category.id}
              className="mb-10 scroll-mt-24"
            >
              <h2 className="mb-4 text-2xl font-bold">{category.name}</h2>

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
