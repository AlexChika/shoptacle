import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import SampleImage from "../public/ada.png";
import { FaTimes } from "react-icons/fa";
import { HiPlus, HiMinus } from "react-icons/hi";
import { formatPrice } from "../utils/functions";
const CartItem = ({ cart }) => {
  return (
    // <Link href={`/shop/${name}-${id}`}>
    // </Link>
    <Wrapper className="f">
      <div className="img">
        <Image layout="fill" src={SampleImage}></Image>
      </div>
      <button className="rem-btn f align">
        <span>Remove</span>
        <FaTimes />
      </button>{" "}
      <div className="detail f j-around">
        <h3 className="capitalize name">
          name of dresss of dress dress {cart}
        </h3>
        <div className="f j-around">
          <p> {formatPrice(2450000)} * 1</p>
          <div className="f">
            <button type="button" className="btn f align">
              <HiPlus />
            </button>
            <button type="button" className="btn f align">
              <HiMinus />
            </button>
          </div>
        </div>
        <div className="f align j-around">
          <p>Sub-Total</p>
          <p>{formatPrice(24509000)}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;
const Wrapper = styled.article`
  position: relative;
  min-height: 150px;
  max-width: 575px;
  margin-bottom: 20px;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
  .img {
    position: relative;
    width: 110px;
    height: 100px;
  }
  .detail {
    flex-direction: column;
    color: var(--blue);
    width: 100%;
    padding: 5px;
    .name {
      letter-spacing: 0.12rem;
      text-align: center;
      border-bottom: 1px solid;
    }
    p {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      /* text-align: center; */
    }
    .btn {
      margin: 0px 5px;
      background-color: var(--pink);
      color: white;
      font-size: 18px;
      align-self: flex-start;
    }
  }
  .rem-btn {
    position: absolute;
    left: 15px;
    top: 120px;
    color: var(--pink);
  }
  @media screen and (min-width: 768px) {
    .detail {
      p {
        font-size: 16px;
      }
    }
  }
`;
