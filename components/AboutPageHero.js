import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import SideBar from "./components/SideBar";
import PageHero from "./components/pageHero";
const AboutPageHero = () => {
  return (
    <Wrapper className="layout">
      <NavBar page="about" />
      <SideBar />
      <PageHero pre={"Home"} curr={"About Us"} />
      <section className="body mt30">
        <div className="heading">
          <h1 className="c-blue">Maintaining the Brand Standards</h1>
          <p className="center c-blue">
            Shoptacle offers clothing, shoes and accessories for men and women.
            It was founded in 1995 and has over 340 offline stores in the
            country, while also selling to 96 countries worldwide, through its
            website. Our priority is to ensure that we offer superior design,
            quality and value to the consumer that not only exemplifies our
            lifestyle, but enhances the ability to live it. We will accomplish
            this by being committed to offering great service and real value to
            our business partners and consumers.
          </p>
        </div>
      </section>
    </Wrapper>
  );
};
export default AboutPageHero;
const Wrapper = styled.main`
  background: var(--pink-light);
  .heading {
    text-align: center;
    h1,
    p {
      font-weight: 400;
    }
    h1 {
      font-family: "Libre Baskerville", serif;
      font-size: 30px;
      line-height: 30px;
      letter-spacing: 0.12em;
    }
    p {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      line-height: 20px;
      /* or 200% */

      width: 70%;
      min-width: 300px;
      padding: 10px;
      /* brand color */

      color: #323148;
    }
  }
  @media screen and (min-width: 786px) {
    .heading {
      text-align: center;
      h1 {
        font-family: "Libre Baskerville", serif;
        font-weight: 400;
        font-size: 30px;
        line-height: 52px;
        /* identical to box height */

        letter-spacing: 0.12em;

        /* brand color */

        color: #323148;
      }
      p {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 40px;
        /* or 200% */

        width: 70%;
        min-width: 300px;
        padding: 10px;
        /* brand color */

        color: #323148;
      }
    }
  }
`;
