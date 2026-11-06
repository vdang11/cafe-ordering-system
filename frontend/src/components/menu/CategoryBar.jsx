function CategoryBar({ categories }) {
  function scrollToSection(categoryId) {
    const element = document.getElementById(categoryId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="sticky top-0 z-50 overflow-x-auto border-b bg-white">
      <div className="flex w-max gap-3 p-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => scrollToSection(category.id)}
            className="rounded-full bg-muted px-4 py-2 text-sm whitespace-nowrap"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
