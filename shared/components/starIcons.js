import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

/**
 * Returns an array of JSX elements representing star icons based on the given rating.
 *
 * @param {number} star - The rating value, between 0 and 5.
 * @returns {Array<JSX.Element>} An array of star icons, where filled stars are represented by BsStarFill,
 * half-filled stars are represented by BsStarHalf, and empty stars are represented by BsStar.
 */
function starIcons(star) {
  const starArray = [];
  while (star > 0) {
    if (star - 1 >= 0) {
      starArray.push(<BsStarFill />);
    } else if (star - 1 > -1) {
      starArray.push(<BsStarHalf />);
    }
    star--;
  }

  // fill remaining empty stars
  const len = 5 - starArray.length;
  for (let i = 0; i < len; i++) {
    starArray.push(<BsStar />);
  }

  return starArray;
}

export default starIcons;
