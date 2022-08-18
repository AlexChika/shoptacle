import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "../store/Context";
const PageHero = () => {
  const router = useRouter();
  const { currRoute, preRoute } = Store();
  console.log(`curr ${currRoute} pre ${preRoute}`);
  function pathNames(path) {
    if (path === "/shop/[productDetail]") {
      path = router.asPath;
    }
    let pageName = path.split("/").at(-1);
    path = pageName === "" ? "/" : path;
    pageName = pageName === "" ? "Home" : pageName.replace(/\d|[%-]/gi, " ");
    return {
      path: path,
      pageName,
    };
  }
  return (
    <Wrapper className="f mt30">
      <div className="content center">
        <h3 className="capitalize">
          <Link href={pathNames(preRoute).path}>
            <span className="trans">{pathNames(preRoute).pageName} </span>
          </Link>
          / {pathNames(currRoute).pageName}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--blue-light);
  width: 100%;
  min-height: 20vh;
  align-items: center;
  color: white;
  .content {
    width: 100%;
    max-width: 1170px;
    padding: 0px 10px;
  }
  span {
    color: var(--pink);
    cursor: pointer;
  }
  span:hover {
    color: var(--pink-light);
  }
  h3 {
    font-size: 30px;
  }
`;

export default PageHero;
