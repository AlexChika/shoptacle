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
export { calculateStars, formatPrice };
