// All prices in this app are Australian dollars.
//
// Two guards keep the output as a plain "$8.50":
//   - the locale is pinned to en-AU, because en-US formats AUD as "A$8.50"
//   - currencyDisplay is "narrowSymbol", which forces "$" even if the locale
//     is ever changed or falls back to the visitor's own
//
// Never use currencyDisplay "code" ("AUD 8.50") or "name" ("8.50 Australian
// dollars") here.
const priceFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "narrowSymbol",
});

export function formatPrice(value) {
  const amount = Number(value);

  return priceFormatter.format(Number.isFinite(amount) ? amount : 0);
}
