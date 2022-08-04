import React from "react";
import styled from "styled-components";
const LandingPageNewArrival = () => {
  return (
    <Wrapper className="layout red">
      <h1 className="heading c-blue">New Arrivals</h1>
      <section></section>
    </Wrapper>
  );
};

export default LandingPageNewArrival;
const Wrapper = styled.section`
  background-color: var(--pink-light);
  .heading {
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 52px;
    letter-spacing: 0.12em;
    border: 1.3px solid #323148;
    font-family: "Libre Baskerville", serif;
  }
`;
