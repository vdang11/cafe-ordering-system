// =====================================================
// SIZE TEMPLATES
// =====================================================

export const takeawaySizeGroup = {
  id: "size",
  name: "Size",
  required: true,
  type: "single",

  options: [
    { id: "small", name: "Small", price: 0 },
    { id: "medium", name: "Medium", price: 0 },
    { id: "large", name: "Large", price: 1 },
  ],
};

export const coldDrinkSizeGroup = {
  id: "size",
  name: "Size",
  required: true,
  type: "single",

  options: [
    { id: "medium", name: "Medium", price: 0 },
    { id: "large", name: "Large", price: 1 },
  ],
};

export const largeOnlyGroup = {
  id: "size",
  name: "Size",
  required: true,
  type: "single",

  options: [
    { id: "large", name: "Large", price: 0 },
  ],
};

export const dineInGroup = {
  id: "serve",
  name: "Serve",
  required: true,
  type: "single",

  options: [
    { id: "cup", name: "Cup", price: 0 },
    { id: "mug", name: "Mug", price: 1 },
  ],
};


// =====================================================
// SUGAR
// =====================================================

export const sugarGroup = {
  id: "sugar",

  name: "Sugar",

  type: "counter",

  defaultValue: 0,

  min: 0,

  max: 10,

  unit: "tsp",
};


// =====================================================
// TEMPERATURE
// =====================================================

export const temperatureGroup = {
  id: "temperature",

  name: "Temperature",

  type: "single",

  options: [
    {
      id: "extra-hot",
      name: "Extra Hot",
      price: 0,
    },

    {
      id: "warm",
      name: "Warm",
      price: 0,
    },

    {
      id: "cold",
      name: "Cold",
      price: 0,
    },
  ],
};


// =====================================================
// STRENGTH
// =====================================================

export const strengthGroup = {
  id: "strength",

  name: "Strength",

  type: "single",

  options: [
    {
      id: "normal",
      name: "Normal",
      price: 0,
    },

    {
      id: "extra-shot",
      name: "Extra Shot",
      price: 0.5,
    },

    {
      id: "extra-strong",
      name: "Extra Strong",
      price: 0,
    },

    {
      id: "decaf",
      name: "Decaf",
      price: 0,
    },

    {
      id: "half-strength",
      name: "Half Strength",
      price: 0,
    },

    {
      id: "three-quarter-strength",
      name: "3/4 Strength",
      price: 0,
    },
  ],
};


// =====================================================
// MILK
// =====================================================

export const milkGroup = {
  id: "milk",

  name: "Milk",

  type: "single",

  options: [
    {
      id: "full-cream",
      name: "Full Cream",
      price: 0,
    },

    {
      id: "light",
      name: "Light Milk",
      price: 0,
    },

    {
      id: "lactose-free",
      name: "Lactose Free",
      price: 0.5,
    },

    {
      id: "almond",
      name: "Almond Milk",
      price: 1,
    },

    {
      id: "oat",
      name: "Oat Milk",
      price: 1,
    },

    {
      id: "milk-side",
      name: "Milk On Side",
      price: 0,
    },
  ],
};


// =====================================================
// ICE
// =====================================================

export const iceGroup = {
  id: "ice",

  name: "Ice",

  type: "single",

  options: [
    {
      id: "normal",
      name: "Normal Ice",
      price: 0,
    },

    {
      id: "less",
      name: "Less Ice",
      price: 0,
    },

    {
      id: "extra",
      name: "Extra Ice",
      price: 0,
    },
  ],
};


// =====================================================
// SYRUP
// =====================================================

export const syrupGroup = {
  id: "syrup",

  name: "Syrup",

  type: "multi",

  options: [
    {
      id: "vanilla",
      name: "Vanilla Syrup",
      price: 0.5,
    },

    {
      id: "caramel",
      name: "Caramel Syrup",
      price: 0.5,
    },

    {
      id: "hazelnut",
      name: "Hazelnut Syrup",
      price: 0.5,
    },
  ],
};


// =====================================================
// EXTRAS
// =====================================================

export const extrasGroup = {
  id: "extras",

  name: "Extras",

  type: "multi",

  options: [
    {
      id: "extra-froth",
      name: "Extra Froth",
      price: 0,
    },

    {
      id: "flat",
      name: "Flat",
      price: 0,
    },

    {
      id: "less-froth",
      name: "Less Froth",
      price: 0,
    },

    {
      id: "extra-chocolate",
      name: "Extra Chocolate",
      price: 0.5,
    },

    {
      id: "extra-cinnamon",
      name: "Extra Cinnamon",
      price: 0.5,
    },

    {
      id: "ice-cream",
      name: "Add Ice Cream",
      price: 1,
    },
  ],
};


// =====================================================
// PRESETS
// =====================================================

export const hotDrinkModifiers = [
  takeawaySizeGroup,

  sugarGroup,

  temperatureGroup,

  strengthGroup,

  milkGroup,
];

export const coldDrinkModifiers = [
  coldDrinkSizeGroup,

  sugarGroup,

  iceGroup,

  milkGroup,
];

export const frappeModifiers = [
  largeOnlyGroup,

  sugarGroup,
];

export const dineInCoffeeModifiers = [
  dineInGroup,

  sugarGroup,

  temperatureGroup,

  strengthGroup,

  milkGroup,
];