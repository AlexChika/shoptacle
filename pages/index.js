import styled from "styled-components";
import Collections from "../components/LandingPageCollections";
import LandingPageHero from "../components/LandingPageHero";
import LandingPageNewArrival from "../components/LandingPageNewArrival";
import { searchProduct } from "../utils/firebase";
export default function Home({ product }) {
  return (
    <>
      <Wrapper>
        <LandingPageHero />
        <LandingPageNewArrival product={product} />
        <Collections />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main``;

export async function getStaticProps() {
  // get new arrival products
  const product = await searchProduct("arrival", "New Arrival");
  return {
    props: {
      product,
    },
  };
}
