import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import HeroBar from "./HeroBar";

const AdminWelcome = () => {
  return (
    <Wrapper>
      <NavBar page="admin" />
      <HeroBar path="/" pre={"Home"} curr={"Admin"} />
      <section className="section center red">
        <h1>Welcome here</h1>
      </section>
    </Wrapper>
  );
};

export default AdminWelcome;
const Wrapper = styled.main`
  background: var(--pink-light);
  .section {
    max-width: 1170px;
  }
`;
