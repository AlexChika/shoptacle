import React from "react";
import styled from "styled-components";
import AboutPageHero from "components/about/AboutPageHero";
import AboutPageTeam from "components/about/AboutPageTeam";
const Products = () => {
  return (
    <Wrapper>
      <AboutPageHero />
      <AboutPageTeam />
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main``;
