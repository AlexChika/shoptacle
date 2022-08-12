import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import PageHero from "../../components/PageHero";
import ProductsPage from "../../components/ProductsPage";
const Products = () => {
  return (
    <Wrapper className="layout">
      <NavBar page="shop" />
      <SideBar />
      <PageHero path="/" pre={"Home"} curr={"Shop"} />
      <ProductsPage />
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;
