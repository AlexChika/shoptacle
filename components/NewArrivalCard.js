import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { MdStarRate } from "react-icons/md";
import { formatPrice, calculateStars } from "../utils/functions";
const NewArrivalCard = ({ product }) => {
  const { price, name, id, rating, imgOne } = product;
  return (
    <Wrapper className="trans">
      <Image width={720} height={960} src={imgOne} alt={name} />
      <div className="star-con f align">
        <h1 className="trans f align">
          <MdStarRate /> <span>{calculateStars(rating).stars}</span>
        </h1>
      </div>
      <div className="detail trans f j-around">
        <h1 className="">{name}</h1>
        <div className="f align j-between">
          <span className="">{formatPrice(price)}</span>
          <button className="trans">
            <Link href={`/shop/${name}_${id}`}>Add To Cart</Link>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
// when changing to remote url   <Image src={product.url} width={720} height={960} alt={product.name} />
export default NewArrivalCard;
const Wrapper = styled.article`
  position: relative;
  cursor: pointer;
  color: var(--blue);

  .star-con {
    position: absolute;
    top: 20px;
    right: 10px;
    height: 55px;
    width: 55px;
    border-radius: 50%;
    background-color: white;
    padding: 5px;
    h1 {
      font-size: 16px;
      font-family: "Inter", sans-serif;
      font-weight: 500;
      color: var(--pink);
    }
  }
  .detail {
    position: absolute;
    flex-direction: column;
    height: 130px;
    padding: 10px;
    top: calc(100% - 130px);
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
      font-size: 16px;
    }
    span {
      font-size: 16px;
    }
    button {
      border: 2px solid var(--blue);
      padding: 5px 10px;
      font-size: 12px;
    }
  }
  :hover {
    margin-top: -10px;
    color: white;
    .star-con {
      background-color: var(--pink);
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
