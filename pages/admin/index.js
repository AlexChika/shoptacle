import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import PageHero from "../../components/pageHero";
const Products = () => {
  return (
    <Wrapper className="layout">
      <NavBar page="admin" />
      <SideBar />
      <PageHero pre={"Home"} curr={"Admin"} />
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;
