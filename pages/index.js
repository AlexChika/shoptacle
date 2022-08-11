import styled from "styled-components";
import Collections from "../components/LandingPageCollections";
import LandingPageHero from "../components/LandingPageHero";
import LandingPageNewArrival from "../components/LandingPageNewArrival";
export default function Home() {
  return (
    <>
      <Wrapper>
        <LandingPageHero />
        <LandingPageNewArrival />
        <Collections />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main``;
