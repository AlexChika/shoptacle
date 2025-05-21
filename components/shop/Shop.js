import React from "react";
import SideBar from "shared/components/SideBar";
import styled from "styled-components";
import ProductCategories from "./ProductCategories";
import HeroBar from "shared/components/HeroBar";
import NavBar from "shared/components/NavBar";

function Shop({ products }) {
  return (
    <Wrapper className="layout">
      <NavBar page="shop" />
      <SideBar />
      <HeroBar />
      <ProductCategories products={products} />
    </Wrapper>
  );
}

export default Shop;

const Wrapper = styled.main`
  background: var(--pink-light);
`;
