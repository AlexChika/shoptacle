import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import ProductPage from "../../components/ProductPage";
import FilterProducts from "../../components/FilterProducts";
import { seedData } from "../../utils/data";
const MaleFashion = () => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar path="/shop" pre="Shop" curr="Male fashion" />
      <FilterProducts />
      <ProductPage
        products={[...seedData, ...seedData, ...seedData, ...seedData]}
      />
    </Wrapper>
  );
};

export default MaleFashion;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
