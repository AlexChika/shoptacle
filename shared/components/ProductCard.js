import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { MdStarRate } from "react-icons/md";
import { formatPrice, calculateStars } from "@utils/functions";
const ProductCard = ({ product }) => {
  const { id, name, price, rating, imgOne } = product;

  return (
    <Link href={`/shop/${name}_${id}`} passHref>
      <Wrapper className="f align">
        <div className="img">
          <Image alt={name} layout="fill" src={imgOne}></Image>
        </div>
        <div className="detail f align j-around">
          <h2 className="capitalize">{name.toLowerCase()}</h2>
          <h2>{formatPrice(price)}</h2>
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
    </Link>
  );
};

export default ProductCard;
const Wrapper = styled.a`
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
    height: 65%;
    position: relative;
  }
  .detail {
    flex-direction: column;
    text-align: center;
    height: 35%;
    padding: 5px;
    color: var(--blue);
    h2 {
      font-size: 15px;
    }
    .star-con {
      font-size: 15px;
      color: var(--pink);
      width: 100%;
    }
  }
`;
