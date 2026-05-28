import { useState } from "react";
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import useCartStore from "@/store/cartStore";

function ProductModal({ item, cartKey, children }) {
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

  const [selectedOptions, setSelectedOptions] = useState({});

  const [selectedAddons, setSelectedAddons] = useState({});

  const [counters, setCounters] = useState({});

  // =====================================================
  // OPTION
  // =====================================================

  function selectOption(groupId, option) {
    setSelectedOptions((prev) => ({
      ...prev,

      [groupId]: option,
    }));
  }

  // =====================================================
  // COUNTER
  // =====================================================

  function increaseCounter(group) {
    const current = counters[group.id] ?? group.defaultValue ?? 0;

    if (current >= group.max) {
      return;
    }

    setCounters((prev) => ({
      ...prev,

      [group.id]: current + 1,
    }));
  }

  function decreaseCounter(group) {
    const current = counters[group.id] ?? group.defaultValue ?? 0;

    if (current <= group.min) {
      return;
    }

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
    if (!group.required) {
      return false;
    }

    if (group.type === "counter") {
      return false;
    }

    return !selectedOptions[group.id];
  });

  // =====================================================
  // PRICE
  // =====================================================

  const optionPrice = Object.values(selectedOptions)

    .filter(Boolean)

    .reduce(
      (sum, option) => sum + (option.price ?? 0),

      0,
    );

  const addonPrice = Object.values(selectedAddons)

    .flat()

    .filter(Boolean)

    .reduce(
      (sum, addon) => sum + (addon.price ?? 0),

      0,
    );

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
      updateItem(cartKey, updatedItem); // 👈 Cập nhật item
    } else {
      addItem(updatedItem); // 👈 Thêm mới nếu không có cartKey
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
          max-w-sm
          rounded-3xl
          pt-10
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* accessibility */}

        <DialogTitle
          className="
            hidden
          "
        >
          {item.name}
        </DialogTitle>

        <DialogDescription
          className="
            hidden
          "
        >
          Product detail
        </DialogDescription>

        {/* image */}

        <img
          src={item.image}
          alt={item.name}
          className="
            w-full
            h-44
            rounded-2xl
            object-cover
            mb-4
          "
        />

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          {item.name}
        </h2>

        <p
          className="
            text-muted-foreground
            mb-6
          "
        >
          {item.description}
        </p>

        {/* OPTIONS */}

        {optionGroups.map((group) => (
          <div
            key={group.id}
            className="
                  mb-6
                "
          >
            <div
              className="
                  flex
                  justify-between
                  mb-2
                "
            >
              <h3
                className="
                    font-semibold
                  "
              >
                {group.name}
              </h3>

              {group.required && (
                <span
                  className="
                          text-xs
                          text-red-500
                        "
                >
                  Required
                </span>
              )}
            </div>

            {group.type === "single" && (
              <div
                className="
                        flex
                        flex-wrap
                        gap-2
                      "
              >
                {group.options.map((option) => {
                  const active = selectedOptions[group.id]?.id === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(group.id, option)}
                      className={`

                                  px-4
                                  py-2
                                  rounded-full
                                  border
                                  transition

                                  ${active ? "bg-black text-white" : "bg-white"}

                                `}
                    >
                      {option.name}

                      {option.price > 0 && ` (+$${option.price})`}
                    </button>
                  );
                })}
              </div>
            )}

            {group.type === "counter" && (
              <div
                className="
                      flex
                      items-center
                      gap-4
                    "
              >
                <button
                  onClick={() => decreaseCounter(group)}
                  className="
                        w-10
                        h-10
                        border
                        rounded-full
                      "
                >
                  -
                </button>

                <span
                  className="
                        font-bold
                      "
                >
                  {counters[group.id] ?? group.defaultValue ?? 0} {group.unit}
                </span>

                <button
                  onClick={() => increaseCounter(group)}
                  className="
                        w-10
                        h-10
                        border
                        rounded-full
                      "
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}

        {/* ADDONS */}

        {addonGroups.map((group) => (
          <div
            key={group.id}
            className="
                  mb-6
                "
          >
            <h3
              className="
                  font-semibold
                  mb-2
                "
            >
              {group.name}
            </h3>

            <div
              className="
                  flex
                  flex-wrap
                  gap-2
                "
            >
              {group.options.map((option) => {
                const active = selectedAddons[group.id]?.some(
                  (addon) => addon.id === option.id,
                );

                return (
                  <button
                    key={option.id}
                    onClick={() => toggleAddon(group.id, option)}
                    className={`
                              px-4
                              py-2
                              rounded-full
                              border

                              ${active ? "bg-black text-white" : ""}
                            `}
                  >
                    {option.name}

                    {option.price > 0 && ` (+$${option.price})`}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <Button
          disabled={missingRequired}
          onClick={handleAddToCart}
          className="
            w-full
          "
        >
          <Pencil />
          Save Changes • ${total.toFixed(2)}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;
