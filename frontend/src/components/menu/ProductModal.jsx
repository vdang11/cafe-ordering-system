import { useEffect, useState } from "react";
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

function ProductModal({
  item,
  cartKey,
  isEdit,
  selectedOptions: initialSelectedOptions,
  selectedAddons: initialSelectedAddons,
  counters: initialCounters,
  children,
}) {
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);

  // =====================================================
  // GROUPS
  // =====================================================

  const optionGroups = item.optionGroups ?? item.modifierGroups ?? [];
  const addonGroups = item.addonGroups ?? [];

  // =====================================================
  // STATE
  // =====================================================

  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions || {},
  );

  const [selectedAddons, setSelectedAddons] = useState(
    initialSelectedAddons || {},
  );

  const [counters, setCounters] = useState(initialCounters || {});

  const [isOpen, setIsOpen] = useState(false);

  // =====================================================
  // OPTION
  // =====================================================

  function selectOption(group, option) {
    setSelectedOptions((prev) => {
      const current = prev[group.id];

      // Clicking the active choice again clears it.
      // Required groups (size, serve) must always keep a selection.
      if (current?.id === option.id) {
        if (group.required) return prev;

        const next = { ...prev };
        delete next[group.id];

        return next;
      }

      return {
        ...prev,
        [group.id]: option,
      };
    });
  }

  // =====================================================
  // COUNTER
  // =====================================================

  function increaseCounter(group) {
    const current = counters[group.id] ?? group.defaultValue ?? 0;

    if (current >= group.max) return;

    setCounters((prev) => ({
      ...prev,
      [group.id]: current + 1,
    }));
  }

  function decreaseCounter(group) {
    const current = counters[group.id] ?? group.defaultValue ?? 0;

    if (current <= group.min) return;

    setCounters((prev) => ({
      ...prev,
      [group.id]: current - 1,
    }));
  }

  // =====================================================
  // ADDON
  // =====================================================

  function toggleAddon(groupId, option) {
    const current = selectedAddons[groupId] ?? [];

    const exists = current.some((addon) => addon.id === option.id);

    setSelectedAddons((prev) => ({
      ...prev,
      [groupId]: exists
        ? current.filter((addon) => addon.id !== option.id)
        : [...current, option],
    }));
  }

  // =====================================================
  // REQUIRED
  // =====================================================

  const missingRequired = optionGroups.some((group) => {
    if (!group.required) return false;

    if (group.type === "counter") return false;

    return !selectedOptions[group.id];
  });

  // =====================================================
  // PRICE
  // =====================================================

  const optionPrice = Object.values(selectedOptions)
    .filter(Boolean)
    .reduce((sum, option) => sum + (option.price ?? 0), 0);

  const addonPrice = Object.values(selectedAddons)
    .flat()
    .filter(Boolean)
    .reduce((sum, addon) => sum + (addon.price ?? 0), 0);

  const total = item.price + optionPrice + addonPrice;

  // =====================================================
  // ADD CART
  // =====================================================

  function handleAddToCart() {
    if (missingRequired) return;

    const updatedItem = {
      ...item,
      selectedOptions,
      selectedAddons,
      counters,
      totalPrice: total,
    };

    if (cartKey) {
      updateItem(cartKey, updatedItem);
      console.log("Item updated:", updatedItem);
    } else {
      addItem(updatedItem);
      console.log("Item added to cart:", updatedItem);
    }

    setIsOpen(false);
  }

  // =====================================================
  // EFFECTS
  // =====================================================

  useEffect(() => {
    if (isOpen && isEdit && item) {
      setSelectedOptions(item.selectedOptions || {});
      setSelectedAddons(item.selectedAddons || {});
      setCounters(item.counters || {});
    }
  }, [isOpen, isEdit, item]);

  useEffect(() => {
    if (!isOpen && !isEdit) {
      setSelectedOptions({});
      setSelectedAddons({});
      setCounters({});
    }
  }, [isOpen, isEdit]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
          flex max-h-[90vh] max-w-sm
          flex-col gap-0 overflow-hidden
          rounded-3xl p-0
        "
      >
        <DialogTitle className="sr-only">{item.name}</DialogTitle>

        <DialogDescription className="sr-only">
          Product detail
        </DialogDescription>

        {/* ================= SCROLL AREA ================= */}

        <div className="flex-1 overflow-y-auto px-4 pt-10 pb-4">
          <img
            src={item.image}
            alt={item.name}
            className="mb-4 h-44 w-full rounded-2xl object-cover"
          />

          <h2 className="text-2xl font-bold">{item.name}</h2>

          <p className="mb-6 text-muted-foreground">{item.description}</p>

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
                    const active = selectedOptions[group.id]?.id === option.id;

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
                  const active = selectedAddons[group.id]?.some(
                    (addon) => addon.id === option.id,
                  );

                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleAddon(group.id, option)}
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
            disabled={missingRequired}
            onClick={handleAddToCart}
            className="w-full"
          >
            {isEdit ? (
              <>
                <Pencil />
                Save Changes • {formatPrice(total)}
              </>
            ) : (
              <>Add to Cart • {formatPrice(total)}</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;
