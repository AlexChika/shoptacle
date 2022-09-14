import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import FilterProducts from "../../components/FilterProducts";
import ProductPage from "../../components/ProductPage";
import { searchProduct } from "../../utils/firebase";
const FemaleFashion = ({ products }) => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar path="/shop" pre="Shop" curr="Smart Gadgets" />
      <FilterProducts />
      <ProductPage products={products} />
    </Wrapper>
  );
};

export default FemaleFashion;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;

export async function getStaticProps() {
  // get new Smart Gadgets  products
  const products = await searchProduct("collection", "Smart Gadgets");
  return {
    props: {
      products,
    },
  };
}
