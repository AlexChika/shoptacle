import styled from "styled-components";
import LandingPageHero from "./LandingPageHero";
import Collections from "./LandingPageCollections";
import LandingPageNewArrival from "./LandingPageNewArrival";

function Home({ newArrival, products }) {
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

export default Home;
