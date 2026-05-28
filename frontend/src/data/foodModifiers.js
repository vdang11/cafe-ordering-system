// =====================================================
// SHARED ADDON GROUPS
// =====================================================

export const foodAddonGroups = [

  {
    id: "extras",

    name: "Add-ons",

    type: "multi",

    options: [

      {
        id: "extra-egg",
        name: "Extra Egg",
        price: 2,
      },

      {
        id: "extra-bacon",
        name: "Extra Bacon",
        price: 4,
      },

      {
        id: "salmon",
        name: "Salmon",
        price: 5,
      },

      {
        id: "mushrooms",
        name: "Mushrooms",
        price: 3,
      },

      {
        id: "pumpkin",
        name: "Pumpkin",
        price: 3,
      },

      {
        id: "cherry-tomatoes",
        name: "Cherry Tomatoes",
        price: 2,
      },

      {
        id: "crispy-bacon",
        name: "Crispy Bacon",
        price: 1,
      },

      {
        id: "crispy-eggs",
        name: "Crispy Eggs",
        price: 1,
      },

      {
        id: "spinach",
        name: "Spinach",
        price: 2,
      },

      {
        id: "rocket",
        name: "Rocket",
        price: 2,
      },

      {
        id: "salad-side",
        name: "Salad On Side",
        price: 3,
      },

      {
        id: "chorizo",
        name: "Chorizo",
        price: 4,
      },

      {
        id: "hashbrown",
        name: "Hashbrown",
        price: 2,
      },

      {
        id: "avocado",
        name: "Add Avocado",
        price: 4,
      },

      {
        id: "side-chips",
        name: "Side Of Chips",
        price: 5,
      },

    ],
  },



  {
    id: "sauces",

    name: "Sauces",

    type: "multi",

    options: [

      {
        id: "tomato",
        name: "Extra Tomato Sauce",
        price: 0.5,
      },

      {
        id: "aioli",
        name: "Aioli Sauce",
        price: 0.5,
      },

      {
        id: "bbq",
        name: "BBQ Sauce",
        price: 0.5,
      },

      {
        id: "gravy",
        name: "Gravy Sauce",
        price: 1,
      },

      {
        id: "chilli-oil",
        name: "Chilli Oil On Side",
        price: 0.5,
      },

    ],
  },



  {
    id: "special",

    name: "Special Request",

    type: "multi",

    options: [

      {
        id: "cut-half",
        name: "Cut In Half",
        price: 0,
      },

      {
        id: "extra-hot",
        name: "Extra Hot",
        price: 0,
      },

      {
        id: "extra-spicy",
        name: "Extra Spicy",
        price: 0,
      },

      {
        id: "dairy-free",
        name: "Dairy Free",
        price: 1,
      },

      {
        id: "gluten-free",
        name: "Gluten Free",
        price: 1,
      },

      {
        id: "nut-free",
        name: "Nut Free",
        price: 0,
      },

      {
        id: "no-cheese",
        name: "No Cheese",
        price: 0,
      },

    ],
  },

];


// =====================================================
// OPTION GROUPS
// =====================================================

export const eggStyleGroup = {

  id: "egg-style",

  name: "Choose Eggs",

  required: true,

  type: "single",

  options: [

    {
      id: "poached",
      name: "Poached Eggs",
      price: 0,
    },

    {
      id: "fried",
      name: "Fried Eggs",
      price: 0,
    },

    {
      id: "scramble",
      name: "Scramble Eggs",
      price: 0,
    },

  ],

};


export const breadGroup = {

  id: "bread",

  name: "Choose Bread",

  required: true,

  type: "single",

  options: [

    {
      id: "white",
      name: "White Bread",
      price: 0,
    },

    {
      id: "sourdough",
      name: "Sourdough",
      price: 1,
    },

    {
      id: "focaccia",
      name: "Focaccia",
      price: 1,
    },

  ],

};


export const benedictGroup = {

  id: "benedict-style",

  name: "Choose Benedict",

  required: true,

  type: "single",

  options: [

    {
      id: "ham",
      name: "With Ham",
      price: 0,
    },

    {
      id: "bacon",
      name: "With Bacon",
      price: 2,
    },

    {
      id: "salmon",
      name: "With Salmon",
      price: 4,
    },

  ],

};


// =====================================================
// PRESETS
// =====================================================

export const breakfastOptionGroups = [

  eggStyleGroup,

  breadGroup,

];


export const benedictOptionGroups = [

  benedictGroup,

  breadGroup,

];


export const noOptionGroups = [];