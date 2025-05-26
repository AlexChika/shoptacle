import styled from "styled-components";
import NavBar from "shared/components/NavBar";
import SideBar from "shared/components/SideBar";
import HeroBar from "shared/components/HeroBar";
import FilterProducts from "components/shop/FilterProducts";
import { filterReducer } from "utils/functions";
import * as actions from "@store/actionTypes";
import GridView from "@components/shop/GridView";
import ListView from "@components/shop/ListView";
import { useEffect, useReducer } from "react";

function FashionPage({ products }) {
  const initialState = {
    filtered: [...products],
    products: products,
    brand: "all",
    category: "all",
    sort: "a-z",
    search: "",
    grid: true,
    min: Math.min(...products.map((item) => item.price)),
    max: Math.max(...products.map((item) => item.price)),
  };

  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: actions.SET_SORT, payload: "a-z" });
  }, []);

  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar />
      <FilterProducts data={{ dispatch, state }} />
      {state.grid ? (
        <GridView products={state.filtered} />
      ) : (
        <ListView products={state.filtered} />
      )}
    </Wrapper>
  );
}

export default FashionPage;

const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
