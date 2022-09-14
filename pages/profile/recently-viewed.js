import React from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import ProductPage from "../../components/ProductPage";
const Recent = () => {
  const { recent } = Store();

  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar />
      <div className="mt30">
        <ProductPage products={recent} />
      </div>
    </Wrapper>
  );
};

export default Recent;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;
  color: var(--blue);
`;
