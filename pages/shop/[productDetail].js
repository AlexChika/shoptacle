import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import PageHero from "../../components/Hero";
import ProductDetail from "../../components/ProductDetail";
const Index = () => {
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <PageHero />
      <ProductDetail />
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
