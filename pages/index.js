import Head from "next/head";
import styled from "styled-components";
import Categories from "../components/LandingPageCategories";
import LandingPageHero from "../components/LandingPageHero";
import LandingPageNewArrival from "../components/LandingPageNewArrival";
export default function Home() {
  return (
    <>
      <Head>
        <title>Shoptacle</title>
        <meta name="description" content="Your one stop for perfect fashion" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Wrapper>
        <LandingPageHero />
        <LandingPageNewArrival />
        <Categories />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main``;
