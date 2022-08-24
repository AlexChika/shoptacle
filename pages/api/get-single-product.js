// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const seedData = [
  {
    name: "Design Snickers",
    id: 1,
    // url: seedShoe,
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
    // url: seedLadyGown,
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
    // url: seedHandBag,
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
    // url: seedWatch,
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
    // url: seedShoe2,
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
    // url: seedJacket,
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

export default function handler(req, res) {
  console.log(req.query);
  res.status(200).json({ msg: req.query.id });
}
