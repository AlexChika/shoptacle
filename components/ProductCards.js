import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { MdStarRate } from "react-icons/md";
import { formatPrice, calculateStars } from "../utils/functions";
const ProductCards = ({ product }) => {
  return (
    <Link href="/categories">
      <Wrapper className="trans">
        <Image src={product.url} alt={product.name} />
        <div className="star-con">
          <h1 className="trans">
            <MdStarRate /> <span>{calculateStars(product.rating).stars}</span>
          </h1>
        </div>
        <div className="detail trans f j-around">
          <h1 className="">{product.name}</h1>
          <div className="f align j-between">
            <span className="">{formatPrice(product.price * 100)}</span>
            <button className="trans">Add To Cart</button>
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
  cursor: pointer;
  color: var(--blue);
  .star-con {
    position: absolute;
    top: 20px;
    right: 10px;
    padding: 10px;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2));
    border-radius: 15px 0px;
    h1 {
      font-size: 20px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      color: var(--pink);
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
    }
    span {
      font-size: 20px;
    }
    button {
      border: 2px solid var(--blue);
      padding: 10px;
      font-size: 12px;
    }
  }
  :hover {
    margin-top: -30px;
    color: white;
    .star-con {
      h1 {
        color: white;
      }
    }
    .detail {
      background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3));
      button {
        color: white;
        border: 3px solid white;
      }
    }
  }
`;
