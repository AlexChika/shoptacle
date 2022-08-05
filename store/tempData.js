const data = [
  {
    name: "Design Snickers",
    id: 1,
    url: "https://cdn.pixabay.com/photo/2017/07/11/19/50/free-pictures-2494806_960_720.jpg",
    price: 400,
    rating: {
      five: 12,
      four: 10,
      three: 0,
      two: 3,
      one: 5,
    },
  },
  {
    name: "Design Snickers",
    id: 2,
    url: "https://cdn.pixabay.com/photo/2014/01/01/10/55/hand-237142_960_720.jpg",
    price: 500,
    rating: {
      five: 12,
      four: 4,
      three: 0,
      two: 3,
      one: 1,
    },
  },
  {
    name: "Design Snickers",
    id: 3,
    url: "https://cdn.pixabay.com/photo/2019/08/21/11/54/mockup-4420830_960_720.png",
    price: 450,
    rating: {
      five: 12,
      four: 0,
      three: 7,
      two: 3,
      one: 15,
    },
  },
  {
    name: "Design Snickers",
    id: 4,
    url: "https://cdn.pixabay.com/photo/2016/02/28/16/12/lighthouse-1227177_960_720.jpg",
    price: 670,
    rating: {
      five: 12,
      four: 0,
      three: 0,
      two: 30,
      one: 5,
    },
  },
  {
    name: "Design Snickers",
    id: 5,
    url: "https://cdn.pixabay.com/photo/2015/10/06/17/18/bride-and-groom-974845_960_720.jpg",
    price: 800,
    rating: {
      five: 12,
      four: 0,
      three: 10,
      two: 3,
      one: 5,
    },
  },
  {
    name: "Design Snickers",
    id: 6,
    url: "https://cdn.pixabay.com/photo/2016/12/23/17/24/snail-1927644_960_720.jpg",
    price: 300,
    rating: {
      five: 20,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    },
  },
];
function calculateStars(rating) {
  let totalRating = 0;
  for (const key in rating) {
    totalRating = totalRating += rating[key];
  }
  const { five, four, three, two, one } = rating;
  let stars = (five * 5 + four * 4 + three * 3 + two * 2 + one) / totalRating;
  stars = stars.toFixed(1);
  return { totalRating, stars };
}
const formatPrice = (price) => {
  const newNumber = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price / 100);
  return newNumber;
};
export { data, calculateStars, formatPrice };
