import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import FilterProducts from "../../components/FilterProducts";
import ProductPageGrid from "../../components/ProductPageGrid";
import ProductPageList from "../../components/ProductPageList";
import { searchProduct } from "../../utils/firebase";
import { filterReducer } from "../../utils/functions";
import * as actions from "../../store/actionTypes";

const FemaleFashion = ({ products }) => {
  const initialState = {
    filtered: [...products],
    products: products,
    brand: "",
    category: "",
    sort: "a-z",
    search: "",
    grid: true,
    min: Math.min(...products.map((item) => item.price)),
    max: Math.max(...products.map((item) => item.price)),
    priceRange: Math.min(...products.map((item) => item.price)),
  };

  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: actions.SET_SORT, payload: "a-z" });
  }, []);
  return (
    <>
      <Header title="Unisex Shoes, Sneakers, Flip flops , Crocs assorted | Shoptacle">
        <meta
          name="title"
          content="Unisex Shoes, Sneakers, Flip flops , Crocs assorted | Shoptacle"
          key="title"
        />

        <meta
          content="Unisex Shoes, Sneakers, Flip flops , Crocs assorted | Shoptacle"
          property="og:title"
          key="og:title"
        />

        <meta
          content="https://shoptacle.vercel.app/shop/unisex-shoes"
          property="og:url"
          key="og:url"
        />
      </Header>

      <Wrapper className="layout">
        <NavBar />
        <SideBar />
        <HeroBar />
        <FilterProducts data={{ dispatch, state }} />
        {state.grid ? (
          <ProductPageGrid products={state.filtered} />
        ) : (
          <ProductPageList products={state.filtered} />
        )}
      </Wrapper>
    </>
  );
};

export default FemaleFashion;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;

export async function getStaticProps() {
  // get new Unisex Shoes  products
  const products = await searchProduct("collection", "Unisex Shoes");
  return {
    revalidate: 60,
    props: {
      products,
    },
  };
}
