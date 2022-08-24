import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
const Index = () => {
  return (
    <Wrapper className="layout">
      <NavBar page={"profile"} />
      <SideBar />
      <HeroBar />
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
