import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import ProductPage from "../../components/ProductPage";
import FilterProducts from "../../components/FilterProducts";
import { searchProduct } from "../../utils/firebase";
const FemaleFashion = ({ products }) => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar path="/shop" pre="Shop" curr="Female fashion" />
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
  // get new female  products
  const products = await searchProduct("collection", "Female Fashion");
  return {
    revalidate: 60,
    props: {
      products,
    },
  };
}
