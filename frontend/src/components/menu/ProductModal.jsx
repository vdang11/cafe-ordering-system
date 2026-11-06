import { useState } from "react";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import { resolveSelection } from "@/lib/cart";

function ProductForm({ product, cartKey, isEdit, selection, onDone }) {
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);

  const { optionGroups, addonGroups } = product;

  // =====================================================
  // STATE
  // =====================================================

  // Choices are kept as ids, the same shape the cart stores:
  // options { [groupId]: optionId }, addons { [groupId]: [optionId] }.
  const [options, setOptions] = useState(selection?.options ?? {});

  const [addons, setAddons] = useState(selection?.addons ?? {});

  // Seed every counter group from its default so what the form shows and what
  // it stores always agree. Without this a group with a non-zero defaultValue
  // would render that value while storing nothing.
  const [counters, setCounters] = useState(() => {
    const seeded = {};

    for (const group of optionGroups) {
      if (group.type === "counter") {
        seeded[group.id] = group.defaultValue ?? 0;
      }
    }

    return { ...seeded, ...(selection?.counters ?? {}) };
  });

  // =====================================================
  // OPTION
  // =====================================================

  function selectOption(group, option) {
    setOptions((prev) => {
      // Clicking the active choice again clears it.
      // Required groups (size, serve) must always keep a selection.
      if (prev[group.id] === option.id) {
        if (group.required) return prev;

        const next = { ...prev };
        delete next[group.id];

        return next;
      }

      return {
        ...prev,
        [group.id]: option.id,
      };
    });
  }

  // =====================================================
  // COUNTER
  // =====================================================

  // Both counters read the previous value from the updater rather than from the
  // render closure. Reading `counters` directly meant several clicks batched
  // into one render all saw the same starting value and collapsed into a single
  // step. group.max and group.min may also be missing once the menu comes from
  // an API, and comparing against undefined is always false, which would let the
  // count run unbounded.
  function increaseCounter(group) {
    const max = group.max ?? Infinity;

    setCounters((prev) => {
      const current = prev[group.id] ?? group.defaultValue ?? 0;

      if (current >= max) return prev;

      return { ...prev, [group.id]: current + 1 };
    });
  }

  function decreaseCounter(group) {
    const min = group.min ?? 0;

    setCounters((prev) => {
      const current = prev[group.id] ?? group.defaultValue ?? 0;

      if (current <= min) return prev;

      return { ...prev, [group.id]: current - 1 };
    });
  }

  // =====================================================
  // ADDON
  // =====================================================

  // Reads the previous list from the updater for the same reason the counters
  // do: two quick taps batched into one render must not start from the same
  // list.
  function toggleAddon(group, option) {
    setAddons((prev) => {
      const current = prev[group.id] ?? [];

      return {
        ...prev,
        [group.id]: current.includes(option.id)
          ? current.filter((optionId) => optionId !== option.id)
          : [...current, option.id],
      };
    });
  }

  // =====================================================
  // PRICE
  // =====================================================

  // The cart prices lines through the same function, so the total on this
  // button always matches what the cart shows afterwards.
  const { unitPrice, complete } = resolveSelection(product, {
    options,
    addons,
    counters,
  });

  // =====================================================
  // ADD CART
  // =====================================================

  function handleAddToCart() {
    if (!complete) return;

    const nextSelection = { options, addons, counters };

    if (cartKey) {
      updateItem(cartKey, nextSelection);
    } else {
      addItem(product.id, nextSelection);
    }

    onDone();
  }

  return (
    <>
      <DialogTitle className="sr-only">{product.name}</DialogTitle>

      <DialogDescription className="sr-only">Product detail</DialogDescription>

      {/* ================= SCROLL AREA ================= */}

      <div className="flex-1 overflow-y-auto px-4 pt-10 pb-4">
        <img
          src={product.image}
          alt={product.name}
          className="mb-4 h-44 w-full rounded-2xl object-cover"
        />

        <h2 className="text-2xl font-bold">{product.name}</h2>

        <p className="mb-6 text-muted-foreground">{product.description}</p>

        {/* OPTIONS */}

        {optionGroups.map((group) => (
          <div key={group.id} className="mb-6">
            <div className="mb-2 flex justify-between">
              <h3 className="font-semibold">{group.name}</h3>

              {group.required && (
                <span className="text-xs text-red-500">Required</span>
              )}
            </div>

            {group.type === "single" && (
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const active = options[group.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(group, option)}
                      className={`
                        rounded-full border px-4 py-2 transition
                        ${active ? "bg-black text-white" : "bg-white"}
                      `}
                    >
                      {option.name}
                      {option.price > 0 && ` (+${formatPrice(option.price)})`}
                    </button>
                  );
                })}
              </div>
            )}

            {group.type === "counter" && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseCounter(group)}
                  className="h-10 w-10 rounded-full border"
                >
                  -
                </button>

                <span className="font-bold">
                  {counters[group.id] ?? group.defaultValue ?? 0} {group.unit}
                </span>

                <button
                  onClick={() => increaseCounter(group)}
                  className="h-10 w-10 rounded-full border"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}

        {/* ADDONS */}

        {addonGroups.map((group) => (
          <div key={group.id} className="mb-6">
            <h3 className="mb-2 font-semibold">{group.name}</h3>

            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const active = addons[group.id]?.includes(option.id);

                return (
                  <button
                    key={option.id}
                    onClick={() => toggleAddon(group, option)}
                    className={`
                      rounded-full border px-4 py-2
                      ${active ? "bg-black text-white" : ""}
                    `}
                  >
                    {option.name}
                    {option.price > 0 && ` (+${formatPrice(option.price)})`}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}

      <div className="shrink-0 border-t bg-popover p-4">
        <Button
          disabled={!complete}
          onClick={handleAddToCart}
          className="w-full"
        >
          {isEdit ? (
            <>
              <Pencil />
              Save Changes • {formatPrice(unitPrice)}
            </>
          ) : (
            <>Add to Cart • {formatPrice(unitPrice)}</>
          )}
        </Button>
      </div>
    </>
  );
}

function ProductModal({ children, ...formProps }) {
  const [isOpen, setIsOpen] = useState(false);

  // Radix keeps DialogContent mounted after it closes, so ProductForm would
  // otherwise hold on to the previous selections. Bumping this counter on each
  // open changes ProductForm's key and forces a fresh mount, which re-seeds its
  // state from props. It deliberately does not change on close, so the content
  // stays put while the exit animation plays.
  const [openCount, setOpenCount] = useState(0);

  function handleOpenChange(open) {
    if (open) setOpenCount((count) => count + 1);

    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
          flex max-h-[90vh] max-w-sm
          flex-col gap-0 overflow-hidden
          rounded-3xl p-0
        "
      >
        <ProductForm
          key={openCount}
          {...formProps}
          onDone={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;
