// seedData images
import seedShoe from "../public/shoe.png";
import seedJacket from "../public/jacket.png";
import seedLadyGown from "../public/lady-gown.png";
import seedWatch from "../public/watch.png";
import seedShoe2 from "../public/shoe2.png";
import seedHandBag from "../public/hand-bag.png";
// collection images
import CollectionMale from "../public/collectionMale.jpg";
import CollectionFemale from "../public/collectionFemale.jpg";
import CollectionGadget from "../public/collectionGadget.jpg";
import CollectionShoe from "../public/collectionShoe.png";
// testimony images
import testimonyRay from "../public/ray.png";
import testimonyVickky from "../public/vickky.png";
// team images
import teamJasmine from "../public/jasmine.png";
import teamAda from "../public/ada.png";
import teamDan from "../public/dan.png";
const seedData = [
  {
    name: "Design Snickers",
    id: 1,
    url: seedShoe,
    images: [seedLadyGown, seedShoe, seedHandBag],
    desc: " This designer ball gown is one of the most formal female attire for social occasions. It is traditionally a full-skirted gown reaching the floor, made of luxurious fabric, delicately and exotically trimmed.",
    category: "gown",
    price: 19800,
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
    url: seedLadyGown,
    images: [seedLadyGown, seedShoe, seedHandBag],
    desc: " This designer ball gown is one of the most formal female attire for social occasions. It is traditionally a full-skirted gown reaching the floor, made of luxurious fabric, delicately and exotically trimmed.",
    category: "gown",
    price: 140000,
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
    url: seedHandBag,
    images: [seedLadyGown, seedShoe, seedHandBag],
    desc: " This designer ball gown is one of the most formal female attire for social occasions. It is traditionally a full-skirted gown reaching the floor, made of luxurious fabric, delicately and exotically trimmed.",
    category: "gown",
    price: 40000,
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
    url: seedWatch,
    images: [seedLadyGown, seedShoe, seedHandBag],
    category: "gown",
    desc: " This designer ball gown is one of the most formal female attire for social occasions. It is traditionally a full-skirted gown reaching the floor, made of luxurious fabric, delicately and exotically trimmed.",
    price: 85000,
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
    url: seedShoe2,
    images: [seedLadyGown, seedShoe, seedHandBag],
    category: "gown",
    desc: " This designer ball gown is one of the most formal female attire for social occasions. It is traditionally a full-skirted gown reaching the floor, made of luxurious fabric, delicately and exotically trimmed.",
    price: 23000,
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
    url: seedJacket,
    images: [seedLadyGown, seedShoe, seedHandBag],
    category: "gown",
    desc: " This designer ball gown is one of the most formal female attire for social occasions. It is traditionally a full-skirted gown reaching the floor, made of luxurious fabric, delicately and exotically trimmed.",
    price: 76000,
    rating: {
      five: 20,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    },
  },
];
const collections = [
  {
    id: 1,
    name: "Male Fashion",
    blob: "male-fashion",
    img: CollectionMale,
    desc: "Here at Shoptacle we believe Fashion is a form of self-expression and autonomy in a specific context, of clothing. We have over ten thousand clothes available for you to choose from designer wears to your favorite small brands. We have clothes for fashionable men and women. ",
  },
  {
    id: 2,
    name: "Female Fashion",
    blob: "female-fashion",
    img: CollectionFemale,
    desc: "Explore different designer Shoes and bags that would be perfect for your clothes and fit the occasion. Enjoy two years warranty for any designer shoes or bag you buy with express delivery to anywhere in the country. Slay any day effortlessly with our trendy shoes and bags.",
  },
  {
    id: 3,
    name: "Unisex Shoes",
    blob: "unisex-shoes",
    img: CollectionShoe,
    desc: "Pick accessories to match what you are wearing. Here at Shoptacle, it is our priority to help you in any way we can and it is our greatest joy to see you slay. Our customer service agents are always available to help you look perfect in case you are not sure and all accessories are of high quality.",
  },
  {
    id: 4,
    name: "Smart Gadgets",
    blob: "smart-gadgets",
    img: CollectionGadget,
    desc: "Pick accessories to match what you are wearing. Here at Shoptacle, it is our priority to help you in any way we can and it is our greatest joy to see you slay. Our customer service agents are always available to help you look perfect in case you are not sure and all accessories are of high quality.",
  },
];
const testimony = [
  {
    name: "Ray",
    img: testimonyRay,
    desc: "“Getting to know about shoptacle is one of the best things that ever happened to me. The beautiful interface and smooth checkout process makes me so happy”",
  },
  {
    name: "Vicky",
    img: testimonyVickky,
    desc: "“I have always been skeptical about online shopping but Shoptacle changed my mindset. They sell high quality, Luxury products and they are also honest and efficient’’",
  },
];
const team = [
  {
    name: "Jasmine",
    position: "CEO",
    img: teamJasmine,
    desc: "“I have always been skeptical about online shopping but Shoptacle changed my mindset. They sell high quality, Luxury products and they are also honest and efficient’’",
  },
  {
    name: "Dan",
    position: "Manager",
    img: teamDan,
    desc: "‘’Fashion business is  an ever growing field with enormous opportunities everyday’’",
  },
  {
    name: "Ada",
    position: "Chief Stylist",
    img: teamAda,
    desc: "‘’I love fashion and love helping people look good, I have a degree in Art and design’’",
  },
];
const _category = {
  ["Male Fashion"]: [
    "shoes",
    "sandals",
    "shirts",
    "suits",
    "trousers",
    "hoodies",
    "sweaters",
    "boxers",
    "short sleeves",
    "long sleeves",
  ],
  ["Female Fashion"]: [
    "shoes",
    "sandals",
    "heels",
    "gowns",
    "blouse",
    "shirts",
    "trousers",
    "bra",
    "pants",
    "mini skirts",
    "high waist",
  ],
  ["Smart Gadgets"]: [
    "smart phones",
    "basic phones",
    "laptops",
    "chargers",
    "home appliance",
    "consoles",
  ],
  ["Unisex Shoes"]: ["sneakers", "boots", "crocs", "flip flops"],
};
export { seedData, collections, testimony, team, _category };
