// =====================================================
// IMPORT
// =====================================================

import {
  hotDrinkModifiers,
  coldDrinkModifiers,
  frappeModifiers,

  syrupGroup,
  extrasGroup,
} from "./drinkModifiers";

import {
  foodAddonGroups,

  breakfastOptionGroups,
  benedictOptionGroups,
  noOptionGroups,
} from "./foodModifiers";

// =====================================================
// MENU
// =====================================================

const menuData = [

  // =====================================================
  // FOOD
  // =====================================================

  {
    id: 101,

    name: "Eggs On Toast",

    price: 16,

    category: "Food",

    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8",

    description:
      "Two eggs on toast",

    tags: ["Popular"],

    optionGroups:
      breakfastOptionGroups,

    addonGroups:
      foodAddonGroups,
  },

  {
    id: 102,

    name: "Eggs Benedict",

    price: 22,

    category: "Food",

    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d",

    description:
      "Poached eggs with hollandaise sauce",

    tags: [],

    optionGroups:
      benedictOptionGroups,

    addonGroups:
      foodAddonGroups,
  },

  {
    id: 103,

    name: "Bacon & Egg Roll",

    price: 14,

    category: "Food",

    image:
      "https://images.unsplash.com/photo-1550507992-eb63ffee0847",

    description:
      "Classic bacon and egg roll",

    tags: ["Best Seller"],

    optionGroups:
      noOptionGroups,

    addonGroups:
      foodAddonGroups,
  },



  // =====================================================
  // COFFEE
  // =====================================================

  {
    id: 201,

    name: "Signature Latte",

    price: 6.5,

    category: "Coffee",

    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348",

    description:
      "Smooth espresso with creamy milk",

    tags: ["Popular"],

    optionGroups:
      hotDrinkModifiers,

    addonGroups: [
      syrupGroup,
      extrasGroup,
    ],
  },

  {
    id: 202,

    name: "Flat White",

    price: 6,

    category: "Coffee",

    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",

    description:
      "Australian classic coffee",

    tags: [],

    optionGroups:
      hotDrinkModifiers,

    addonGroups: [
      syrupGroup,
      extrasGroup,
    ],
  },

  {
    id: 203,

    name: "Mocha",

    price: 7,

    category: "Coffee",

    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0",

    description:
      "Chocolate espresso coffee",

    tags: ["Popular"],

    optionGroups:
      hotDrinkModifiers,

    addonGroups: [
      syrupGroup,
      extrasGroup,
    ],
  },



  // =====================================================
  // COLD DRINK
  // =====================================================

  {
    id: 301,

    name: "Iced Latte",

    price: 7.5,

    category: "Cold Drink",

    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",

    description:
      "Cold espresso milk drink",

    tags: [],

    optionGroups:
      coldDrinkModifiers,

    addonGroups: [
      syrupGroup,
      extrasGroup,
    ],
  },

  {
    id: 302,

    name: "Strawberry Matcha",

    price: 8.5,

    category: "Cold Drink",

    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b",

    description:
      "Fresh strawberry matcha",

    tags: ["New"],

    optionGroups:
      coldDrinkModifiers,

    addonGroups: [
      syrupGroup,
      extrasGroup,
    ],
  },

  {
    id: 303,

    name: "Cookies Frappe",

    price: 9,

    category: "Cold Drink",

    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699",

    description:
      "Cookies frappe with whipped cream",

    tags: ["Popular"],

    optionGroups:
      frappeModifiers,

    addonGroups: [
      extrasGroup,
    ],
  },



  // =====================================================
  // PASTRY
  // =====================================================

  {
    id: 401,

    name: "Butter Croissant",

    price: 5,

    category: "Pastry",

    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a",

    description:
      "Fresh baked butter croissant",

    tags: [],

    optionGroups: [],
    addonGroups: [],
  },

  {
    id: 402,

    name: "Ham Cheese Croissant",

    price: 8,

    category: "Pastry",

    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff",

    description:
      "Ham and cheese croissant",

    tags: ["Popular"],

    optionGroups: [],
    addonGroups: [],
  },



  // =====================================================
  // DESSERT
  // =====================================================

  {
    id: 501,

    name: "Cheesecake",

    price: 8,

    category: "Dessert",

    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",

    description:
      "Creamy cheesecake",

    tags: ["Best Seller"],

    optionGroups: [],
    addonGroups: [],
  },

];

export default menuData;