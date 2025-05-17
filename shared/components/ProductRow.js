import React from "react";
import styled from "styled-components";
import Link from "next/link";
import ProductCard from "shared/components/ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ProductRow = ({ params, products }) => {
  const { name, blob, color, showHeader = true } = params;
  let count = 0;

  const scrollForward = (e) => {
    const container = e.currentTarget.parentElement;
    const cardArray = [...container.querySelectorAll(".card")];
    count = count + 5;
    if (count >= cardArray.length) {
      count = count - 5;
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
    <ProductRowWrapper $showHeader={showHeader} $color={color}>
      <div className="header f align j-between">
        <h1>{blob ? <Link href={blob}>{name}</Link> : name}</h1>
        {blob && (
          <Link href={blob}>
            <button className="f fcenter">
              See All{" "}
              <span>
                <FaAngleRight />
              </span>
            </button>
          </Link>
        )}
      </div>

      <div className="container">
        <div className="card-container center">
          {products.slice(0, 15).map((product, index) => {
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

export default ProductRow;

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
    display: ${({ $showHeader }) => ($showHeader ? "flex" : "none")};
    padding: 15px;
    background-color: ${({ $color }) => $color};
    color: var(--blue);
    font-family: "Libre Baskerville", serif;
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
    white-space: nowrap; //this applies to all child elements
    background-color: white;
    .card {
      white-space: normal; // must reset this
      width: 232px;
      height: 320px;
      display: inline-block;
      scroll-snap-stop: always;
      scroll-snap-align: start;
    }
    .card:hover,
    .card:focus {
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2),
        -1px -1px 2px rgba(0, 0, 0, 0.2);
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
