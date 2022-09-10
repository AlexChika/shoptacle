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
const paginateFn = (array = [], itemsPerPage, currentPage = 0) => {
  if (!itemsPerPage) throw new Error("check parameters at paginateFn");

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

const sampleUser = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  reviews: {
    title: "title",
    experience: "whatever fuck you think",
    star: 3,
    date: "date",
  },
  orders: {
    name: "name of product",
    amount: 2,
    price: 2000,
    date: "date",
  },
};

const sampleProduct = {
  name: "name of product",
  price: 200,
  rating: {
    five: 0,
    four: 0,
    three: 0,
    two: 0,
    one: 0,
  },
  brand: "brand name",
  category: "category name",
  collection: "collection name",
  desc: "what the fuck ever you wanna say about this product",
  quantity: 200,
  url: "main image url",
  images: ["array of other images url"],
};

class Validate {
  text(input, min = 3, max = Infinity, name = "text") {
    let valid = true;
    let msg = `input is valid`;
    if (input.trim().length < min) {
      msg = `${name} cannot be less than ${min} characters`;
      valid = false;
    }
    if (input.length > max) {
      msg = `${name} cannot be greater than ${max}`;
      valid = false;
    }
    return { valid, msg };
  }
  email(input, name = "email") {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(input)) {
      return { valid: true, msg: `${name} is valid` };
    } else {
      return { valid: false, msg: `the ${name} provided is not valid` };
    }
  }
  number(input, min = 0, max = Infinity, name = "number") {
    let valid = true;
    let msg = `the ${name} is valid`;
    if (!input || typeof input !== "number") {
      valid = false;
      msg = `the ${name} entered is not a number`;
    }
    if (input < min) {
      valid = false;
      msg = `the ${name} is less than ${min}`;
    }
    if (input > max) {
      valid = false;
      msg = `the ${name} is greater than ${max}`;
    }

    return {
      valid,
      msg,
    };
  }
  equal(a, b, name = "values") {
    if (a === b) {
      return {
        equal: true,
        msg: `the two ${name} are same`,
      };
    } else {
      return {
        equal: false,
        msg: `the two ${name} are not thesame`,
      };
    }
  }
}
export {
  calculateStars,
  formatPrice,
  displayStar,
  paginateFn,
  shuffler,
  fetcher,
  Validate,
};
