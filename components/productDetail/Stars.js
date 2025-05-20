import React from "react";
import starIcons from "shared/components/starIcons";
import styled from "styled-components";
const Stars = ({ stars, reviews }) => {
  return (
    <Wrapper>
      <div>
        {starIcons(stars).map((star, index) => {
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
  justify-content: center;

  span {
    color: var(--pink);
    font-size: 16px;
    margin-right: 4px;
  }

  p {
    margin-left: 8px;
    margin-bottom: 0;
    color: var(--pink) !important;
  }

  margin-bottom: 8px;
`;
export default Stars;
