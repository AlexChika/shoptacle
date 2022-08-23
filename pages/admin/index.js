import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import HeroBar from "../../components/HeroBar";
import SideBar from "../../components/SideBar";
const Products = () => {
  return (
    <Wrapper className="layout">
      <NavBar page="admin" />
      <SideBar />
      <HeroBar path="/" pre={"Home"} curr={"Admin"} />
      <h1>everything will be functional thanks to Firebase</h1>
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;
