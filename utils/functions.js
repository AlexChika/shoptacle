import * as actions from "../store/actionTypes";

// global funcs

/**
 * @typedef {Object} StarRatingResult
 * @property {number} totalRating - The sum of all rating values.
 * @property {string} stars - The average star rating, rounded to one decimal place.
 */

/**
 * Calculates the average star rating based on the provided rating object.
 *
 * @param {Object} rating - An object containing rating values with the following properties:
 * @param {number} rating.one - The number of one-star ratings.
 * @param {number} rating.two - The number of two-star ratings.
 * @param {number} rating.three - The number of three-star ratings.
 * @param {number} rating.four - The number of four-star ratings.
 * @param {number} rating.five - The number of five-star ratings.
 * @returns {StarRatingResult} An object containing the total rating and the average star rating.
 */
function calculateStars(rating) {
  const totalRating = Object.keys(rating).reduce(
    (acc, key) => (acc += rating[key]),
    0
  );

  if (totalRating == 0) {
    return { totalRating, stars: "0.0" };
  }

  const numberKeyMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
  };

  const score = Object.keys(rating).reduce((acc, key) => {
    acc += rating[key] * numberKeyMap[key];
    return acc;
  }, 0);

  const stars = score / totalRating;
  return { totalRating, stars: stars.toFixed(1) };
}

/**
 * Creates a debounced version of a function, which delays its execution by a specified amount of time.
 *
 * @param {Function} func The function to debounce.
 * @param {Number} [ms=100] The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, ms = 100) {
  let timeout;

  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, ms);
  };
}

// converts price to local currency format
const formatPrice = (price) => {
  const newNumber = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price / 100);
  return newNumber;
};

// shuffles array
/**
 * Shuffles the elements of the input array and returns a new shuffled array.
 *
 * @param {Array<any>} a The input array to be shuffled.
 * @returns {Array<any>} A new array containing the same elements as the input array, but in a random order.
 */
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
  shuffler,
  Validate,
  filterReducer,
  debounce,
};
