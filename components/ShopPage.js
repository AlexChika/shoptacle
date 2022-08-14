import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { seedData, collections } from "../utils/data";

const ProductRow = ({ collection }) => {
  const { name, blob } = collection;
  let count = 0;
  const scrollForward = (e) => {
    const container = e.currentTarget.parentElement;
    const cardArray = [...container.querySelectorAll(".card")];
    count = count + 5;
    if (count >= cardArray.length) {
      count = cardArray.length - 5;
    }
    cardArray[count].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  const scrollBackward = (e) => {
    const container = e.currentTarget.parentElement;
    const cardArray = [...container.querySelectorAll(".card")];
    count = count - 5;
    if (count < 0) {
      count = 0;
    }
    cardArray[count].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  return (
    <ProductRowWrapper>
      <div className="header f align j-between">
        <h1>
          <Link href={`/shop/${blob}`}>{name}</Link>
        </h1>
        <Link href={`/shop/${blob}`}>
          <button className="f fcenter">
            See All{" "}
            <span>
              <FaAngleRight />
            </span>
          </button>
        </Link>
      </div>
      <div className="container">
        <div className="card-container center">
          {[...seedData, ...seedData].map((product, index) => {
            return (
              <article key={index} className="card">
                <ProductCard product={product} />
              </article>
            );
          })}
        </div>
        <button
          onClick={scrollBackward}
          className="prev-btn f fcenter"
          type="button"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollForward}
          className="next-btn f fcenter"
          type="button"
        >
          <FaAngleRight />
        </button>
      </div>
    </ProductRowWrapper>
  );
};

const ProductsPage = () => {
  return (
    <Wrapper className="center">
      {collections.map((col, index) => {
        return <ProductRow key={index} collection={col} />;
      })}
    </Wrapper>
  );
};
export default ProductsPage;
const ProductRowWrapper = styled.section`
  margin-bottom: 30px;
  background-color: white;
  .container {
    position: relative;
    button {
      display: none;
    }
  }
  .header {
    padding: 15px;
    background-color: var(--pink);
    background-color: var(--gray);
    background-color: #fee2cc;
    color: var(--blue);
    button {
      font-size: 18px;
      span {
        font-size: 20px;
        margin: 0px 3px;
      }
    }
  }
  .card-container {
    scroll-snap-align: start;
    scroll-snap-type: x mandatory;
    scroll-snap-type: mandatory;
    -webkit-scroll-snap-type: mandatory;
    overflow: auto;
    padding-bottom: 5px;
    max-width: 1160px;
    padding: 5px 0px;
    white-space: nowrap;
    background-color: white;
    .card {
      width: 232px;
      height: 320px;
      display: inline-block;
      scroll-snap-stop: always;
      scroll-snap-align: start;
    }
    .card:hover,
    .card:focus {
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1),
        -1px -1px 2px rgba(0, 0, 0, 0.1);
    }
  }
  @media screen and (min-width: 1170px) {
    .container {
      button {
        position: absolute;
        color: white;
        background-color: rgba(0, 0, 0, 0.1);
        top: 50%;
        height: 50px;
        width: 50px;
        font-size: 20px;
        border-radius: 50%;
        border: 2px solid white;
      }
      .prev-btn {
        left: 6%;
      }
      .next-btn {
        right: 6%;
      }
    }
    .container:hover button {
      display: flex;
    }
    .card-container::-webkit-scrollbar {
      -webkit-appearance: none;
      display: none;
    }
  }
`;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding: 30px 0px;
  max-width: 1170px;
`;
