// A cart line stores identifiers only:
//
//   { cartKey, productId, quantity,
//     options:  { [groupId]: optionId },
//     addons:   { [groupId]: [optionId] },
//     counters: { [groupId]: number } }
//
// Names and prices are looked up in the current menu every time the cart is
// shown, so a price change or a sold-out product shows up at once instead of a
// stale copy living on in localStorage. This matches what POST /api/orders
// sends: ids in, prices computed by the server.

// The same product with the same choices gets the same key, whatever order the
// choices were made in. A counter at 0 counts as not chosen.
export function createCartKey(
  productId,
  { options = {}, addons = {}, counters = {} },
) {
  const optionKeys = Object.entries(options)
    .filter(([, optionId]) => optionId != null)
    .map(([groupId, optionId]) => `${groupId}:${optionId}`)
    .sort();

  const addonKeys = Object.entries(addons)
    .flatMap(([groupId, optionIds]) =>
      (optionIds ?? []).map((optionId) => `${groupId}:${optionId}`),
    )
    .sort();

  const counterKeys = Object.entries(counters)
    .filter(([, value]) => value > 0)
    .map(([groupId, value]) => `${groupId}:${value}`)
    .sort();

  return [productId, ...optionKeys, ...addonKeys, ...counterKeys].join("|");
}

// Turns a selection of ids into what the screen needs: the price of one unit
// and a label per modifier, in menu order. The product modal and the cart both
// price through here, so the two can never disagree.
//
// `complete` is false when a chosen id no longer exists in the menu or a
// required group has no choice, so a line can be flagged instead of priced on
// a guess.
export function resolveSelection(
  product,
  { options = {}, addons = {}, counters = {} },
) {
  let unitPrice = product.price;
  let resolved = 0;
  const modifiers = [];

  function addOption(groupId, option) {
    resolved += 1;
    unitPrice += option.price;

    modifiers.push({
      key: `${groupId}:${option.id}`,
      label: option.name,
      price: option.price,
    });
  }

  for (const group of product.optionGroups) {
    if (group.type === "counter") {
      const value = counters[group.id] ?? 0;

      if (value > 0) {
        modifiers.push({
          key: group.id,
          label: [value, group.unit, group.name].filter(Boolean).join(" "),
          price: 0,
        });
      }

      continue;
    }

    const option = group.options.find((o) => o.id === options[group.id]);

    if (option) addOption(group.id, option);
  }

  for (const group of product.addonGroups) {
    const chosen = addons[group.id] ?? [];

    for (const option of group.options) {
      if (chosen.includes(option.id)) addOption(group.id, option);
    }
  }

  const requested =
    Object.values(options).filter((optionId) => optionId != null).length +
    Object.values(addons).flat().length;

  const missingRequired = product.optionGroups.some(
    (group) =>
      group.required && group.type !== "counter" && options[group.id] == null,
  );

  return {
    unitPrice,
    modifiers,
    complete: resolved === requested && !missingRequired,
  };
}

export function resolveLine(line, productsById) {
  const product = productsById.get(line.productId);

  if (!product) {
    return {
      ...line,
      product: null,
      modifiers: [],
      unitPrice: 0,
      lineTotal: 0,
      unavailable: true,
    };
  }

  const { unitPrice, modifiers, complete } = resolveSelection(product, line);

  return {
    ...line,
    product,
    modifiers,
    unitPrice,
    lineTotal: unitPrice * line.quantity,
    unavailable: !product.available || !complete,
  };
}
