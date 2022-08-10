import React from "react";
import styled from "styled-components";
import AboutPageHero from "../../components/AboutPageHero";
import AboutPageTeam from "../../components/AboutPageTeam";
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
