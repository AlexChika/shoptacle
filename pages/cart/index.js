import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import NavBar from "shared/components/NavBar";
import SideBar from "shared/components/SideBar";
import HeroBar from "shared/components/HeroBar";
import Cart from "@components/cart/Cart";

// firebase import
import { getCartItem } from "utils/firebase";
const CartPage = () => {
  let { cart, Logger } = Store();

  // states
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    tax: 0,
    delivery: 0,
    subtotal: 0,
    total: 0,
  });

  // get updated cart items
  useEffect(() => {
    let isSubscribed = true;

    async function getCart(cart) {
      try {
        setLoading(true);
        const newCartItems = await getCartItem(cart);
        if (!isSubscribed) return;
        setCartItems(newCartItems);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Logger(
          "We could not fetch your cart, check your connection and try again",
          "error"
        );
      }
    }

    if (isSubscribed) {
      getCart(cart);
    }

    return () => {
      isSubscribed = false;
    };
  }, [cart, refresh, Logger]);

  // update cartTotals
  useEffect(() => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.amount;
    });
    let tax = (subtotal * 2) / 100; //2% of subtotal
    let delivery = (subtotal * 5) / 100; //5% of subtotal
    let total = subtotal + tax + delivery;
    setCartTotals({
      tax,
      delivery,
      subtotal,
      total,
    });
  }, [cartItems]);

  return (
    <Wrapper className="layout">
      <NavBar page={"cart"} />
      <SideBar />
      <HeroBar />
      <Cart
        data={{ loading, cart: cartItems, cartTotals, setRefresh, refresh }}
      />
    </Wrapper>
  );
};

export default CartPage;
const Wrapper = styled.main`
  padding-bottom: 30px;
  background-color: var(--pink-light);
`;
