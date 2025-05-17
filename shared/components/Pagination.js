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
  }
  button.active {
    background-color: var(--pink);
    border: 2px solid var(--pink);
    color: white;
  }
`;

export default Pagination;
