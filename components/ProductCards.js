import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { MdStarRate } from "react-icons/md";
import { formatPrice, calculateStars } from "../utils/functions";
const ProductCards = ({ product, index }) => {
  return (
    <Link href="/categories">
      <Wrapper index={index}>
        <Image src={product.url} alt={product.name} />
        <div className="star-con">
          <h1>
            <MdStarRate /> <span>{calculateStars(product.rating).stars}</span>
          </h1>
        </div>
        <div className="detail f j-around">
          <h1 className="c-blue trans">{product.name}</h1>
          <div className="f align j-between">
            <span className="c-blue trans">
              {formatPrice(product.price * 100)}
            </span>
            <Link href="/hello">
              <button className="c-blue trans">Add To Cart</button>
            </Link>
          </div>
        </div>
      </Wrapper>
    </Link>
  );
};
// when changing to remote url   <Image src={product.url} width={720} height={960} alt={product.name} />
export default ProductCards;
const Wrapper = styled.article`
  position: relative;
  border-radius: 15px;
  cursor: pointer;
  img {
    /* border-radius: 15px; */
  }
  .star-con {
    position: absolute;
    top: 20px;
    right: 10px;
    padding: 10px;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4));
    border-radius: 15px 0px;
    h1 {
      font-size: 20px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      color: var(--pink);
      color: ${({ index }) => (index === 2 ? "white" : "")};
    }
  }
  .detail {
    position: absolute;
    flex-direction: column;
    height: 130px;
    padding: 10px;
    top: calc(100% - 133px);
    width: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    );
    h1,
    span,
    button {
      font-family: "Inter";
      font-style: normal;
      letter-spacing: 0.12em;
      font-weight: 700;
    }
    h1 {
      font-size: 20px;
      color: ${({ index }) => (index === 2 ? "white" : "")};
    }
    span {
      font-size: 20px;
      color: ${({ index }) => (index === 2 ? "white" : "")};
    }
    button {
      border: 2px solid var(--blue);
      padding: 10px;
      background-color: ${({ index }) => (index === 2 ? "white" : "")};
      border: ${({ index }) => (index === 2 ? "2px solid white" : "")};
      font-size: 12px;
    }
    button:hover,
    button:active,
    button:focus {
      border: 2px solid var(--pink);
      color: var(--pink);
    }
  }
  @media screen and (min-width: 1024px) {
    margin-top: ${({ index }) => (index === 2 ? "-90px" : "")};
  }
`;
