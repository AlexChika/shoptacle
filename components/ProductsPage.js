import React from "react";
import styled from "styled-components";
import ProductCards from "./ProductCards";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight, FaTwitter, FaGithub } from "react-icons/fa";
import { seedData } from "../utils/data";
const ProductsPage = () => {
  return (
    <Wrapper className="mt30">
      <section className="mt30">
        <div className="header f align j-between">
          <h1>Clothes</h1>
          <Link href="/">
            <button className="f fcenter">
              See All{" "}
              <span>
                <FaAngleRight />
              </span>
            </button>
          </Link>
        </div>
        <div className="body f">
          {seedData.map((product) => {
            return (
              <article className="sizing">
                <ProductCards product={product} />
              </article>
            );
          })}
        </div>
      </section>
      <section className="mt30">
        <div className="header f align j-between">
          <h1>Clothes</h1>
          <button className="f fcenter">
            See All{" "}
            <span>
              <FaAngleRight />
            </span>
          </button>
        </div>
        <div className="body f">
          {seedData.map((product) => {
            return <ProductCards product={product} />;
          })}
        </div>
      </section>
      <section className="mt30">
        <div className="header f align j-between">
          <h1>Clothes</h1>
          <button className="f fcenter">
            See All{" "}
            <span>
              <FaAngleRight />
            </span>
          </button>
        </div>
        <div className="body f">
          {seedData.map((product) => {
            return <ProductCards product={product} />;
          })}
        </div>
      </section>
    </Wrapper>
  );
};

export default ProductsPage;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  min-height: 100vh;
  .header {
    padding: 25px;
    background-color: var(--pink);
    background-color: var(--gray);
    background-color: #fee2cc;
    button {
      font-size: 18px;
      span {
        font-size: 20px;
        margin: 0px 3px;
      }
    }
  }
  .body {
    overflow: auto;
    /* display: grid; */
    padding: 5px;
    background-color: white;
    /* grid-template-columns: repeat(5, 1fr); */
    .sizing {
      border: 3px solid green;
      position: relative;
      /* height: 500px; */
      /* width: 500px; */
    }
  }
`;
