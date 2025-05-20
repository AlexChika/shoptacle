import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "@store/Context";
const HeroBar = () => {
  const router = useRouter();
  const { currRoute, preRoute } = Store();

  function pathNames(path) {
    if (path === "/shop/[productDetail]") {
      path = router.asPath;
    }
    let pageName = path.split("/").at(-1).split("_").at(0);
    path = pageName === "" ? "/" : path;
    pageName = pageName === "" ? "Home" : pageName.replace(/\d|[%-]/gi, " ");
    return {
      path: path,
      name: pageName.substring(0, 50),
    };
  }
  return (
    <Wrapper className="f align center mt30">
      <div className="hero-content center">
        <h3 className="capitalize">
          <Link href={pathNames(preRoute).path}>
            <span className="trans">{pathNames(preRoute).name}..&nbsp;</span>
          </Link>
          /&nbsp;{pathNames(currRoute).name}..
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--blue-light);
  width: 100%;
  /* min-height: 100px; */
  color: white;
  .hero-content {
    width: 100%;
    max-width: 1170px;
    padding: 15px 15px;
  }
  span {
    color: var(--pink);
    cursor: pointer;
  }
  span:hover {
    color: var(--pink-light);
  }
  h3 {
    font-size: 16px;
  }

  @media screen and (min-width: 500px) {
    h3 {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 1200px) {
    .hero-content {
      padding: 15px 0px;
    }
  }
`;

export default HeroBar;
