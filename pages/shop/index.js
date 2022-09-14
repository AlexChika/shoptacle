import React from "react";
import styled from "styled-components";
import HeroBar from "../../components/HeroBar";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ShopPageComponent from "../../components/ShopPageComponent";
import { searchProduct } from "../../utils/firebase";
const Products = ({ products }) => {
  return (
    <Wrapper className="layout">
      <NavBar page="shop" />
      <SideBar />
      <HeroBar path="/" pre={"Home"} curr={"Shop"} />
      <ShopPageComponent products={products} />
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;

export async function getStaticProps() {
  const maleFashion = await searchProduct("collection", "Male Fashion");
  const femaleFashion = await searchProduct("collection", "Female Fashion");
  const unisexShoes = await searchProduct("collection", "Unisex Shoes");
  const smartGadgets = await searchProduct("collection", "Smart Gadgets");
  return {
    revalidate: 60,
    props: {
      products: [
        {
          name: "Male Fashion",
          blob: "/shop/male-fashion",
          product: maleFashion,
        },
        {
          name: "Female Fashion",
          blob: "/shop/female-fashion",
          product: femaleFashion,
        },
        {
          name: "Smart Gadgets",
          blob: "/shop/smart-gadgets",
          product: smartGadgets,
        },
        {
          name: "Unisex Shoes",
          blob: "/shop/unisex-shoes",
          product: unisexShoes,
        },
      ],
    },
  };
}
