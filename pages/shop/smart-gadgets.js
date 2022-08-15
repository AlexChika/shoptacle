import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Hero from "../../components/Hero";
import FilterProducts from "../../components/FilterProducts";
import ProductPage from "../../components/ProductPage";
import { seedData } from "../../utils/data";
const FemaleFashion = () => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <Hero path="/shop" pre="Shop" curr="Smart Gadgets" />
      <FilterProducts />
      <ProductPage
        products={[...seedData, ...seedData, ...seedData, ...seedData]}
      />
    </Wrapper>
  );
};

export default FemaleFashion;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
