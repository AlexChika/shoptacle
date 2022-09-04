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
const paginateFn = (array, itemsPerPage, currentPage = 0) => {
  if (!array || !itemsPerPage)
    throw new Error("check parameters at paginateFn");

  let pageNumber = Math.ceil(array.length / itemsPerPage);
  let startIndex = currentPage * itemsPerPage;
  let stopIndex = startIndex + itemsPerPage;
  let items = array.slice(startIndex, stopIndex);
  const pageNumberArray = Array.from({ length: pageNumber }, (v, i) => {
    return i;
  });
  return {
    items,
    buttonArray: pageNumberArray,
  };
};
const fetcher = (url) => fetch(url).then((res) => res.json());
const shuffler = (a) => {
  let array = [...a];
  const j = Math.floor(Math.random() * 6);
  console.log(j);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export {
  calculateStars,
  formatPrice,
  displayStar,
  paginateFn,
  shuffler,
  fetcher,
};
