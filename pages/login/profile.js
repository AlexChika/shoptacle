import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import ProfilePageComponent from "../../components/ProfilePageComponent";

const Index = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <Wrapper className="layout">
      <NavBar page={"profile"} />
      <SideBar />
      <HeroBar />
      <ProfilePageComponent />
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;
`;
