import React from "react";
import styled from "styled-components";
import NavBar from "shared/components/NavBar";
import SideBar from "shared/components/SideBar";
import HeroBar from "shared/components/HeroBar";
import Auth from "components/auth/Auth";
import { Store } from "store/Context";
import Profile from "@components/profile/Profile";

const ProfilePage = () => {
  const { user } = Store();
  return (
    <Wrapper className="layout">
      <NavBar page={"profile"} />
      <SideBar />
      <HeroBar />

      {user ? <Profile /> : <Auth />}
    </Wrapper>
  );
};

export default ProfilePage;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;
  color: var(--blue);
`;
