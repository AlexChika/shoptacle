import React from "react";
import styled from "styled-components";

const Paginate = ({
  paginateFn,
  array,
  itemsPerPage,
  currentBtn,
  handlePaginate,
}) => {
  return (
    <Wrapper className="f fcenter mt10">
      {paginateFn(array, itemsPerPage).buttonArray.map((val) => {
        return (
          <button
            className={`f fcenter ${currentBtn === val ? "active" : ""}`}
            onClick={() => {
              handlePaginate(val);
            }}
            key={val}
          >
            {val + 1}
          </button>
        );
      })}
    </Wrapper>
  );
};

export default Paginate;
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
