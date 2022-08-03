import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import Shoptacle from "../svg-components/shoptacle";
import SideBar from "./SideBar";
const LandingPageHero = () => {
  return (
    <Wrapper>
      <div className="hero-logo red">
        <Shoptacle className="red" fill={"#69687C"} />
      </div>
      <div>heyy</div>
      <main className="hero-main-content">
        <NavBar page="home" />
        <SideBar />
      </main>
    </Wrapper>
  );
};
// fill={"#69687C"} width={"161"} height={"847"}
export default LandingPageHero;
const Wrapper = styled.main`
  position: relative;
  min-height: 1024px;
  background-image: url("/mainbg.jfif");
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 10px;
  background-position: 80% 50%;
  .hero-logo {
    display: inline-block;
    margin: 80px 0px 0px 20px;
    svg {
      width: 161px;
      height: 847px;
    }
  }
  .hero-main-content {
    position: absolute;
    /* background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)); */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  @media screen and (min-width: 660px) {
    background-position: 50% 50%;
  }
  @media screen and (min-width: 768px) {
    /* background-position: initial; */
  }
`;
