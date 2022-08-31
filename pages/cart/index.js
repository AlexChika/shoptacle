import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import CartPageComponent from "../../components/CartPageComponent";
const Index = () => {
  let cart = [];
  return (
    <Wrapper className="layout">
      <NavBar page={"cart"} />
      <SideBar />
      <HeroBar />
      <CartPageComponent cart={cart} />
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  padding-bottom: 30px;
  background-color: var(--pink-light);
`;
