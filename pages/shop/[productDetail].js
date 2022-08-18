import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import PageHero from "../../components/Hero";
import ProductDetail from "../../components/ProductDetail";
import * as actionTypes from "../../store/actionTypes";
import { Store } from "../../store/Context";
const Index = () => {
  const { dispatch } = Store();
  const router = useRouter();
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_CURRENT_ROUTE,
      payload: router.asPath,
    });
  }, [router]);
  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <PageHero />
      <ProductDetail />
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
`;
