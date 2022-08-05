import React from "react";
import styled from "styled-components";
import ProductCards from "./ProductCards";
import { data } from "../store/tempData";
const LandingPageNewArrival = () => {
  return (
    <Wrapper id="new-arrival" className="layout">
      <div className="heading center">
        <div className="underline">
          <h1 className="c-blue">New Arrivals</h1>
        </div>
      </div>
      <section className="products center">
        {data.map((product, index) => {
          return (
            <ProductCards
              index={index + 1}
              key={product.id}
              product={product}
            />
          );
        })}
      </section>
    </Wrapper>
  );
};

export default LandingPageNewArrival;
const Wrapper = styled.section`
  background-color: var(--pink-light);
  min-height: 100vh;
  .heading {
    width: 10em;
    border-bottom: 3px solid var(--blue);
    padding-top: 20px;
    .underline {
      width: 13em;
      margin-left: -25px;
    }
    h1 {
      font-size: 30px;
      font-family: "Libre Baskerville", serif;
      text-align: center;
    }
  }
  .products {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 95%;
    place-content: center;
    place-items: center;
    gap: 2em 2em;
    margin-top: 30px;
  }
  @media screen and (min-width: 450px) {
    .products {
      width: 90%;
    }
  }
  @media screen and (min-width: 600px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 768px) {
    /* background-color: red; */
  }
  @media screen and (min-width: 1024px) {
    padding-top: 30px;
    .products {
      grid-template-columns: repeat(3, 1fr);
      margin-top: 90px;
    }
  }
`;
