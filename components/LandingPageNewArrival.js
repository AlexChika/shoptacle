import React from "react";
import styled from "styled-components";
import ProductCards from "./ProductCards";
import { data } from "../utils/data";
const LandingPageNewArrival = () => {
  return (
    <Wrapper id="new-arrival" className="layout">
      <div className="heading center">
        <h1 className="c-blue center">New Arrivals</h1>
      </div>
      <section className="products center">
        {data.map((product) => {
          return <ProductCards key={product.id} product={product} />;
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
    padding-top: 20px;
    h1 {
      width: max-content;
      border-bottom: 3px solid var(--blue);
      font-size: 30px;
      font-family: "Libre Baskerville", serif;
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
      /* margin-top: 80px; */
    }
  }
`;
