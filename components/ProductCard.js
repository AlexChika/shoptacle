import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Router from "next/router";
import { MdStarRate } from "react-icons/md";
import { formatPrice, calculateStars } from "../utils/functions";
const ProductCard = ({ product }) => {
  const { id, url, name, price, rating } = product;
  const handleNavigate = () => {
    console.log(id);
  };
  return (
    <Wrapper onClick={handleNavigate} className="f align">
      <div className="img">
        <Image layout="fill" src={url}></Image>
      </div>
      <div className="detail f align j-around">
        <h2>{name}</h2>
        <h2>{formatPrice(price * 100)}</h2>
        <div className="star-con f j-around">
          <span>{calculateStars(rating).totalRating}&nbsp;ratings</span>
          <span className="f fcenter">
            <MdStarRate />
            &nbsp;
            {calculateStars(rating).stars}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductCard;
const Wrapper = styled.article`
  width: 100%;
  height: 100%;
  padding: 10px;
  flex-direction: column;
  cursor: pointer;
  .img,
  .detail {
    width: 100%;
  }
  .img {
    height: 70%;
    position: relative;
  }
  .detail {
    flex-direction: column;
    height: 30%;
    padding: 5px;
    color: var(--blue);
    h2 {
      font-size: 16px;
    }
    .star-con {
      font-size: 16px;
      color: var(--pink);
      width: 100%;
    }
  }
`;
