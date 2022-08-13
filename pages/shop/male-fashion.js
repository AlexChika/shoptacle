import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Hero from "../../components/Hero";
import ProductPage from "../../components/ProductPage";
import FilterProducts from "../../components/FilterProducts";
const MaleFashion = () => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <Hero path="/shop" pre="Shop" curr="Male fashion" />
      <FilterProducts />
      <ProductPage />
    </Wrapper>
  );
};

export default MaleFashion;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
