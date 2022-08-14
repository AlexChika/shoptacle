import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
const PageHero = ({ path, curr, pre, banner }) => {
  return (
    <Wrapper className="f mt30">
      <div className="content center">
        <h3>
          <Link href={path}>
            <span className="trans">{pre} </span>
          </Link>
          / {curr}
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
