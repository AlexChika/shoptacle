import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Hero from "../../components/Hero";
import ProductPage from "../../components/ProductPage";
const FemaleFashion = () => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <Hero path="/shop" pre="Shop" curr="Smart Gadgets" />
      <ProductPage />
    </Wrapper>
  );
};

export default FemaleFashion;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
