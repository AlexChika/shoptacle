import React from "react";
import shoes from "../public/shoes.jpg";
import accessory from "../public/accessory.jpg";
import clothes from "../public/clothes.jpg";
import shoe from "../public/shoe.png";
import jacket from "../public/jacket.png";
import ladyGown from "../public/lady-gown.png";
import watch from "../public/watch.png";
import shoe2 from "../public/shoe2.png";
import handBag from "../public/hand-bag.png";
const data = [
  {
    name: "Design Snickers",
    id: 1,
    url: shoe,
    price: 198,
    rating: {
      five: 12,
      four: 10,
      three: 0,
      two: 3,
      one: 5,
    },
  },
  {
    name: "Designer Ball Gown ",
    id: 2,
    url: ladyGown,
    price: 1400,
    rating: {
      five: 12,
      four: 4,
      three: 0,
      two: 3,
      one: 1,
    },
  },
  {
    name: "Channel Bag",
    id: 3,
    url: handBag,
    price: 400,
    rating: {
      five: 12,
      four: 0,
      three: 7,
      two: 3,
      one: 15,
    },
  },
  {
    name: "Apple Series Watch",
    id: 4,
    url: watch,
    price: 850,
    rating: {
      five: 12,
      four: 0,
      three: 0,
      two: 30,
      one: 5,
    },
  },
  {
    name: "Design Boots",
    id: 5,
    url: shoe2,
    price: 230,
    rating: {
      five: 12,
      four: 0,
      three: 10,
      two: 3,
      one: 5,
    },
  },
  {
    name: "Versace Jacket",
    id: 6,
    url: jacket,
    price: 760,
    rating: {
      five: 20,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    },
  },
];
const categories = [
  {
    id: 1,
    name: "Clothes",
    url: clothes,
    desc: "Here at Shoptacle we believe Fashion is a form of self-expression and autonomy in a specific context, of clothing. We have over ten thousand clothes available for you to choose from designer wears to your favorite small brands. We have clothes for fashionable men and women. ",
  },
  {
    id: 2,
    name: "Shoes & Bags",
    url: shoes,
    desc: "Explore different designer Shoes and bags that would be perfect for your clothes and fit the occasion. Enjoy two years warranty for any designer shoes or bag you buy with express delivery to anywhere in the country. Slay any day effortlessly with our trendy shoes and bags.",
  },
  {
    id: 3,
    name: "Accessories",
    url: accessory,
    desc: "Pick accessories to match what you are wearing. Here at Shoptacle, it is our priority to help you in any way we can and it is our greatest joy to see you slay. Our customer service agents are always available to help you look perfect in case you are not sure and all accessories are of high quality.",
  },
];
export { data, categories };
