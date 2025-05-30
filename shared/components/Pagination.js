import React from "react";
import styled from "styled-components";

const Pagination = ({ noOfpages, currentPage, handlePaginate }) => {
  return (
    <Wrapper className="f fcenter mt10">
      {Array.from({ length: noOfpages }, (v, i) => i + 1).map((val) => {
        return (
          <button
            className={`f fcenter ${currentPage === val ? "active" : ""}`}
            onClick={() => {
              handlePaginate(val);
            }}
            key={val}
          >
            {val}
          </button>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  text-align: center;
  button {
    margin: 0px 5px;
    height: 20px;
    width: 20px;
    padding: 10px;
    border-radius: 50%;
    border: 2px solid var(--blue);
    font-size: 12px;

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &:hover:not(:disabled) {
      border: 2px solid var(--blue);
      transform: scale(1.05);
    }
  }

  button.active {
    border: 2px solid var(--pink);
    color: white;
    background-image: linear-gradient(135deg, var(--blue), #f9a8d4, #e9d5ff);

    &:hover:not(:disabled) {
      background-color: var(--pink-dark);
      border: 2px solid var(--pink-dark);
      transform: scale(1.05);
    }
  }
`;

export default Pagination;
