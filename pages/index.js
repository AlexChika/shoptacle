import styled from "styled-components";
import Categories from "../components/LandingPageCollections";
import LandingPageHero from "../components/LandingPageHero";
import LandingPageNewArrival from "../components/LandingPageNewArrival";
export default function Home() {
  return (
    <>
      <Wrapper>
        <LandingPageHero />
        <LandingPageNewArrival />
        <Categories />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main``;
