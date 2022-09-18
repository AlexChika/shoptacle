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

const collections = [
  {
    id: 1,
    name: "Male Fashion",
    blob: "/shop/male-fashion",
    img: CollectionMale,
    desc: "Here at Shoptacle we believe Fashion is a form of self-expression and autonomy in a specific context, of clothing. We have over ten thousand clothes available for you to choose from designer wears to your favorite small brands. We have clothes for fashionable men and women. ",
  },
  {
    id: 2,
    name: "Female Fashion",
    blob: "/shop/female-fashion",
    img: CollectionFemale,
    desc: "Explore different designer Shoes and bags that would be perfect for your clothes and fit the occasion. Enjoy two years warranty for any designer shoes or bag you buy with express delivery to anywhere in the country. Slay any day effortlessly with our trendy shoes and bags.",
  },
  {
    id: 3,
    name: "Unisex Shoes",
    blob: "/shop/unisex-shoes",
    img: CollectionShoe,
    desc: "Pick accessories to match what you are wearing. Here at Shoptacle, it is our priority to help you in any way we can and it is our greatest joy to see you slay. Our customer service agents are always available to help you look perfect in case you are not sure and all accessories are of high quality.",
  },
  {
    id: 4,
    name: "Smart Gadgets",
    blob: "/shop/smart-gadgets",
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
    "jackets",
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
    "bags",
    "pants",
    "mini skirts",
    "high waist",
  ],
  ["Smart Gadgets"]: [
    "smart phones",
    "smart watches",
    "basic phones",
    "laptops",
    "chargers",
    "home appliance",
    "consoles",
  ],
  ["Unisex Shoes"]: ["sneakers", "boots", "crocs", "flip flops"],
};
export { collections, testimony, team, _category };
