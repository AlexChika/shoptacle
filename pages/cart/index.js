import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import CartPageComponent from "../../components/CartPageComponent";

// firebase import
import { getCartItem } from "../../utils/firebase";
const Index = () => {
  let { cart } = Store();
  // states
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  // get updated cart items
  useEffect(() => {
    async function getCart(cart) {
      try {
        setLoading(true);
        const newCartItems = await getCartItem(cart);
        setCartItems(newCartItems);
        console.log(newCartItems);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Logger(error.message, "error");
      }
    }
    getCart(cart);
  }, [cart]);

  return (
    <Wrapper className="layout">
      <NavBar page={"cart"} />
      <SideBar />
      <HeroBar />
      <CartPageComponent loading={loading} cart={cartItems} />
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  padding-bottom: 30px;
  background-color: var(--pink-light);
`;
