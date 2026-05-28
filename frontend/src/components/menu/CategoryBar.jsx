import { categories } from "@/constants/categories";

function CategoryBar() {
  function scrollToSection(category) {
    const element = document.getElementById(category);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div
      className="
      sticky
      top-0
      z-50
      bg-white
      border-b
      overflow-x-auto
      "
    >
      <div
        className="
        flex
        gap-3
        p-3
        w-max
        "
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => scrollToSection(category)}
            className="
            px-4
            py-2
            rounded-full
            bg-muted
            whitespace-nowrap
            text-sm
            "
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
