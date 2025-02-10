import styled from "styled-components";
import Collections from "../components/LandingPageCollections";
import LandingPageHero from "../components/LandingPageHero";
import LandingPageNewArrival from "../components/LandingPageNewArrival";
import { searchProduct } from "../utils/firebase";
import { shuffler } from "../utils/functions";

export default function Home({ newArrival, products }) {
  return (
    <>
      <Wrapper>
        <LandingPageHero />
        <LandingPageNewArrival product={newArrival} />
        <Collections products={products} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main``;

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
