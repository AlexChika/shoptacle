import React, { useEffect } from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import Navigate from "../../components/Navigate";
import ProfilePageComponent from "../../components/ProfilePageComponent";

const Index = () => {
  const { user } = Store();
  return (
    <Wrapper className="layout">
      <NavBar page={"profile"} />
      <SideBar />
      <HeroBar />
      {user ? <ProfilePageComponent /> : <Navigate path="/login" />}
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;
`;
