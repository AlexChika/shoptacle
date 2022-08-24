import React from "react";
import styled from "styled-components";
import { displayStar } from "../utils/functions";
const Stars = ({ stars, reviews }) => {
  return (
    <Wrapper>
      <div className="stars">
        {displayStar(stars).map((star, index) => {
          return <span key={index}> {star} </span>;
        })}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: var(--pink);
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
