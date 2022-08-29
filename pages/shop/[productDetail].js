import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import SingleProductDetail from "../../components/SingleProductDetail";

const Index = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  useEffect(() => {
    if (router.query.productDetail) {
      const id = router.query.productDetail.split("-").at(-1);
      setId(id);
    }
  }, [router]);

  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar />
      {id ? (
        <SingleProductDetail id={id} />
      ) : (
        <div className="spinner center mt30"></div>
      )}
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;
`;
