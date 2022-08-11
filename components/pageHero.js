import React from "react";
import styled from "styled-components";
import Link from "next/link";
const PageHero = ({ curr, pre }) => {
  return (
    <Wrapper className="mt30">
      <div className="content center">
        <h3>
          <Link href="/">
            <span className="trans"> {pre} </span>
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
  display: flex;
  align-items: center;
  color: white;
  .content {
    width: 90%;
  }
  span {
    color: var(--pink);
    padding: 0.5rem;
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
