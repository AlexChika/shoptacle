import React from "react";
import styled from "styled-components";
import PageHero from "../../components/Hero";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ShopPage from "../../components/ShopPage";
const Products = () => {
  return (
    <Wrapper className="layout">
      <NavBar page="shop" />
      <SideBar />
      <PageHero path="/" pre={"Home"} curr={"Shop"} />
      <ShopPage />
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;