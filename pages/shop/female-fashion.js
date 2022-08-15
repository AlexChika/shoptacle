import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Hero from "../../components/Hero";
import ProductPage from "../../components/ProductPage";
import FilterProducts from "../../components/FilterProducts";
import { seedData } from "../../utils/data";
const FemaleFashion = () => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <Hero path="/shop" pre="Shop" curr="Female fashion" />
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
