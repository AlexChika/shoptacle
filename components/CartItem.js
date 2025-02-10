import React from "react";
import styled from "styled-components";
import { Store } from "../store/Context";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { HiPlus, HiMinus } from "react-icons/hi";
import { formatPrice } from "../utils/functions";
const CartItem = ({ cart }) => {
  const { Logger, removeCart, incDecCart } = Store();

  // local state

  // local func
  async function removeCartItem(id) {
    try {
      await removeCart(id);
      Logger("Item removed successfully", "success", 1500);
    } catch (error) {
      Logger("Could not remove item", "success");
    }
  }

  async function incDecCartItem(id, quantity, type) {
    if (quantity < 1) return;
    try {
      await incDecCart(id, quantity, type);
      Logger("Item updated successfully", "success", 1500);
    } catch (error) {
      Logger("Could not update item", "error");
    }
  }

  const { name, price, imgOne, amount, id, quantity } = cart;

  return (
    <Wrapper className="f">
      <div className="img">
        <Image layout="fill" alt="cart item" src={imgOne}></Image>
      </div>

      <button
        onClick={() => removeCartItem(id)}
        type="button"
        className="rem-btn f align"
      >
        <span>Remove</span>
        <FaTimes />
      </button>

      <div className="detail f j-around">
        <h3 className="capitalize name">{name}</h3>

        <div className="f j-around">
          <p>
            {" "}
            {formatPrice(price)} * {amount}
          </p>
          <div className="f">
            <button
              onClick={() => incDecCartItem(id, quantity, "plus")}
              type="button"
              className="btn f align"
            >
              <HiPlus />
            </button>
            <button
              onClick={() => incDecCartItem(id, quantity, "minus")}
              type="button"
              className="btn f align"
            >
              <HiMinus />
            </button>
          </div>
        </div>

        <div className="f align j-around">
          <p>Sub-Total</p>
          {quantity < 1 ? (
            <p>Out Of Stock</p>
          ) : (
            <p>{formatPrice(price * amount)}</p>
          )}
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
      margin: 0px 10px;
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
