import React from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import NavBar from "shared/components/NavBar";
import SideBar from "shared/components/SideBar";
import HeroBar from "shared/components/HeroBar";
import GridView from "components/shop/GridView";

const Recent = () => {
  const { recent } = Store();

  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar />

      <div className="mt30">
        <GridView products={recent} />
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
