import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper className="layout brand-shade">
      <h1>hello Dev </h1>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.footer`
  display: grid;
  min-height: 50vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  padding: 10px;
`;
