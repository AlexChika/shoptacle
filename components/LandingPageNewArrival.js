import React from "react";
import styled from "styled-components";
import ProductCards from "./ProductCards";
import { data } from "../utils/data";
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
      {/*Room for possible pagination??  */}
      {/* <div className="paginate">
        <Paginate/>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div> */}
    </Wrapper>
  );
};

export default LandingPageNewArrival;
const Wrapper = styled.section`
  background-color: var(--pink-light);
  position: relative;
  min-height: 100vh;
  padding-bottom: 50px;
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
  @media screen and (min-width: 600px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 1024px) {
    padding-top: 20px;
    .products {
      grid-template-columns: repeat(3, 1fr);
      margin-top: 80px;
    }
  }
`;
