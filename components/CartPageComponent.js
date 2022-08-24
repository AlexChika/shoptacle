import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import emptyCartImage from "../public/trolley.png";
import { ProductRow } from "./ShopPageComponent";
import CartItem from "./CartItem";
const CartPageComponent = ({ cart }) => {
  return (
    <Wrapper className="center">
      {cart.length < 1 ? (
        <section className="cart-empty mt30">
          <div className="icon center f fcenter">
            <Image
              alt="empty cart logo"
              src={emptyCartImage}
              width={64}
              height={64}
            />
          </div>
          <h1 className="mt20">Your Cart Is Empty</h1>
          <p className="mt20">
            Browse through our collections and discover our best deals!
          </p>
          <button className="mt20" type="button">
            <Link href="/shop">Start Shopping</Link>
          </button>
        </section>
      ) : (
        <section className="cart mt30">
          <div className="cart-items">
            {cart.map((cart, index) => {
              // remember to change key from index to id
              return <CartItem key={index} />;
            })}
          </div>
          <div className="cart-summary">hello here</div>
        </section>
      )}
      <section className="recently-viewed mt30">
        <ProductRow
          color={`white`}
          collection={{ name: "Recently Viewed", blob: `cart` }}
        />
      </section>
    </Wrapper>
  );
};

export default CartPageComponent;
const Wrapper = styled.main`
  max-width: 1170px;
  .cart {
    background-color: white;
  }
  .cart-empty {
    flex-direction: column;
    padding: 30px 0px;
    background-color: white;
    color: var(--blue);
    letter-spacing: 0.12rem;
    text-align: center;
    .icon {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: var(--pink-light);
    }
    h1 {
      font-family: "Libre Baskerville", serif;
    }
    p {
      font-size: 16px;
    }
    button {
      color: white;
      background-color: var(--pink);
      padding: 15px 20px;
      font-size: 16px;
    }
  }
`;
