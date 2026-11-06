// One canonical shape for the menu, whatever the source:
//
//   category { id, name, sortOrder }
//   product  { id, categoryId, station, name, description, price,
//              image, tags, available, optionGroups, addonGroups }
//
// Prices become numbers here, once. The API sends them as strings ("6.50") so
// the decimal survives the trip; converting at this boundary keeps that detail
// out of every component. These prices are for display only: the server
// recomputes every total when the order is placed, and formatPrice rounds what
// the screen shows to two decimals.

function toNumber(value) {
  const amount = Number(value);

  return Number.isFinite(amount) ? amount : 0;
}

function slugify(name) {
  return String(name).trim().toLowerCase().replace(/\s+/g, "-");
}

// Counter groups have no options, so they pass through untouched.
function normalizeGroup(group) {
  if (!group.options) return group;

  return {
    ...group,
    options: group.options.map((option) => ({
      ...option,
      price: toNumber(option.price),
    })),
  };
}

function normalizeProduct(product) {
  return {
    ...product,
    price: toNumber(product.price),
    tags: product.tags ?? [],
    available: product.available ?? true,
    optionGroups: (product.optionGroups ?? []).map(normalizeGroup),
    addonGroups: (product.addonGroups ?? []).map(normalizeGroup),
  };
}

export function normalizeApiMenu(payload) {
  return {
    categories: [...(payload?.categories ?? [])].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
    ),
    products: (payload?.products ?? []).map(normalizeProduct),
  };
}

// Mock products carry a display string in `category` and no categoryId or
// station. Derive both so the UI cannot tell the two sources apart. Delete this
// function once the API is the only source.
const MOCK_STATIONS = { food: "KITCHEN" };

export function normalizeMockMenu(products) {
  const categories = [];
  const seen = new Set();

  for (const product of products) {
    const id = slugify(product.category);

    if (!seen.has(id)) {
      seen.add(id);

      categories.push({
        id,
        name: product.category,
        sortOrder: categories.length + 1,
      });
    }
  }

  return {
    categories,
    products: products.map((product) => {
      const categoryId = slugify(product.category);

      return normalizeProduct({
        ...product,
        categoryId,
        station: MOCK_STATIONS[categoryId] ?? "FRONT_OF_HOUSE",
      });
    }),
  };
}
