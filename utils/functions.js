import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
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
const displayStar = (star) => {
  let starArray = [];
  function recurse(star) {
    if (star - 1 >= 0) {
      starArray.push(<BsStarFill />);
    } else {
      if (star - 1 !== -1) {
        starArray.push(<BsStarHalf />);
      }
      let emptyStar = 5 - starArray.length;
      for (let i = 0; i < emptyStar; i++) {
        starArray.push(<BsStar />);
      }
      return starArray;
    }
    recurse(star - 1);
  }
  recurse(star);
  return starArray;
};
const formatPrice = (price) => {
  const newNumber = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price / 100);
  return newNumber;
};
const fetcher = (url) => fetch(url).then((res) => res.json());

export { calculateStars, formatPrice, displayStar, fetcher };
