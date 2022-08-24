import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import FilterProducts from "../../components/FilterProducts";
import ProductPage from "../../components/ProductPage";
import { seedData } from "../../utils/data";
const FemaleFashion = () => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar path="/shop" pre="Shop" curr="Unisex Shoes" />
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
