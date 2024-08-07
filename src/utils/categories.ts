export const categories = [
  {
    name: "Fashion",
    subCategories: ["t-shirt", "polo-shirt", "Sports", "blouse", "skirt"],
  },

  {
    name: "Electronics",
    subCategories: ["Accessories", "laptop", "camera"],
  },
  {
    name: "Kitchen",
    subCategories: ["furniture", "appliances", "decor"],
  },
  {
    name: "Books",
    subCategories: ["fiction", "non-fiction", "comics"],
  },
  {
    name: "Beauty",
    subCategories: ["makeup", "skincare", "haircare"],
  },
  {
    name: "Shoes",
    subCategories: ["sneakers", "boots", "sandals", "loafers"],
  },
  {
    name: "Watches",
    subCategories: ["smartwatches", "quartz-watches", "women-watch"],
  },
  {
    name: "Telecommunications",
    subCategories: ["cables", "chargers", "brands"],
  },
];

export const categoriesSelect = categories.map((item) => ({
  value: item.name,
  label: item.name,
}));
