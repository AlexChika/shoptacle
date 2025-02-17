import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import * as actions from "../store/actionTypes";

// global funcs

// func collects the star rating objec, ouputs total reviews and average star
function calculateStars(rating) {
  let totalRating = 0;
  for (const key in rating) {
    totalRating = totalRating += rating[key];
  }

  const { five, four, three, two, one } = rating;
  let stars = five * 5 + four * 4 + three * 3 + two * 2 + one;
  if (totalRating == 0) {
    return { totalRating, stars: stars.toFixed(1) };
  }
  stars = (five * 5 + four * 4 + three * 3 + two * 2 + one) / totalRating;
  stars = stars.toFixed(1);
  return { totalRating, stars };
}

// func returns an array with star icons arranged depending on star value
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

// converts price to local currency format
const formatPrice = (price) => {
  const newNumber = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price / 100);
  return newNumber;
};

// returns slices and returns array for pagination
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

// shuffles array
const shuffler = (a) => {
  let array = [...a];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// validates strings and numbers
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

// reducer function for filtering products on the shop pages
const filterReducer = (state, action) => {
  if (action.type === actions.SET_CATEGORY) {
    const category = action.payload;
    const array = [
      ...state.products.filter((item) => item.category == category),
    ];
    return {
      ...state,
      category,
      brand: "",
      filtered: array,
    };
  }

  if (action.type === actions.SET_BRAND) {
    const brand = action.payload;
    const array = [...state.filtered.filter((item) => item.brand == brand)];
    return {
      ...state,
      brand,
      filtered: array,
    };
  }

  if (action.type === actions.SET_GRID) {
    return {
      ...state,
      grid: action.payload,
    };
  }

  if (action.type === actions.SET_PRICE_RANGE) {
    const array = [...state.products].filter(
      (item) => item.price <= action.payload
    );
    return {
      ...state,
      priceRange: action.payload,
      filtered: array,
      category: "",
      brand: "",
    };
  }

  if (action.type === actions.SET_MIN_MAX_RANGE) {
    const { min, max } = action.payload;

    const array = [...state.products].filter(
      (item) => item.price <= max && item.price >= min
    );
    return {
      ...state,
      filtered: array,
      category: "",
      brand: "",
    };
  }

  if (action.type === actions.SET_SEARCH) {
    const value = action.payload.toLowerCase();
    const array = [
      ...state.products.filter((item) =>
        item.name.toLowerCase().includes(value)
      ),
    ];
    return {
      ...state,
      filtered: array,
      search: value,
      brand: "",
    };
  }

  if (action.type === actions.SET_SORT) {
    const value = action.payload;
    let array;
    if (value == "a-z") {
      array = [...state.filtered].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
    }
    if (value == "z-a") {
      array = [...state.filtered].sort((a, b) => {
        if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
        return 0;
      });
    }
    if (value == "low-high") {
      array = [...state.filtered].sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (value == "high-low") {
      array = [...state.filtered].sort((a, b) => {
        return b.price - a.price;
      });
    }
    return {
      ...state,
      filtered: array,
      sort: value,
    };
  }

  if (action.type === actions.CLEAR) {
    return {
      ...state,
      filtered: [...state.products],
      category: "",
      brand: "",
      priceRange: Math.min(...state.products.map((item) => item.price)),
      grid: true,
    };
  }

  return state;
};

export {
  calculateStars,
  formatPrice,
  displayStar,
  paginateFn,
  shuffler,
  Validate,
  filterReducer,
};
