import { searchProduct } from "../utils/firebase";
import { shuffler } from "../utils/functions";
import Home from "@components/home/Home";

export default function HomePage({ newArrival, products }) {
  return <Home newArrival={newArrival} products={products} />;
}

export async function getStaticProps() {
  // get new arrival products
  const newArrival = await searchProduct("arrival", "New Arrival");

  // get products
  const maleFashion = await searchProduct("collection", "Male Fashion");
  const femaleFashion = await searchProduct("collection", "Female Fashion");
  const unisexShoes = await searchProduct("collection", "Unisex Shoes");
  const smartGadgets = await searchProduct("collection", "Smart Gadgets");

  return {
    revalidate: 160,
    props: {
      newArrival: shuffler(newArrival),
      products: {
        maleFashion: shuffler(maleFashion).slice(0, 15),
        femaleFashion: shuffler(femaleFashion).slice(0, 15),
        unisexShoes: shuffler(unisexShoes).slice(0, 15),
        smartGadgets: shuffler(smartGadgets).slice(0, 15),
      },
    },
  };
}
