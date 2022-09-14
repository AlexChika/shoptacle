import React from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import Profile from "../../components/ProfilePageComponent";
import Login from "../../components/Login";
import { Store } from "../../store/Context";
const Index = () => {
  const { user } = Store();
  return (
    <Wrapper className="layout">
      <NavBar page={"profile"} />
      <SideBar />
      <HeroBar />
      {user ? <Profile /> : <Login />}
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;
  color: var(--blue);
`;
