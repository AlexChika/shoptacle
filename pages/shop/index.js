import React from "react";
import styled from "styled-components";
import HeroBar from "../../components/HeroBar";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ShopPageComponent from "../../components/ShopPageComponent";
const Products = () => {
  return (
    <Wrapper className="layout">
      <NavBar page="shop" />
      <SideBar />
      <HeroBar path="/" pre={"Home"} curr={"Shop"} />
      <ShopPageComponent />
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;
