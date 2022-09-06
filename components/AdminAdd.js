import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
const AdminAdd = () => {
  return (
    <Wrapper className="opacity center">
      <h1 className="title">Add Products</h1>

      <form className="center mt20">
        <div className="formInput f mt10">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter product name" />
        </div>
        <div className="formInput f">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" placeholder="Enter product price" />
        </div>
        <div className="formInput f">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter item Quantity"
          />
        </div>
        <div className="formInput f mt10">
          <label htmlFor="name">Brand</label>
          <input type="text" id="brand" placeholder="Enter  brand eg samsung" />
        </div>
        <div className="formInput f mt10">
          <label htmlFor="collection">Name</label>
          <select name="collection" id=""></select>
        </div>
      </form>
    </Wrapper>
  );
};

export default AdminAdd;
const Wrapper = styled.main`
  max-width: 1170px;

  .title {
    text-align: center;
  }

  form {
    max-width: 600px;
    overflow-x: scroll;

    /* span {
      flex-wrap: wrap;
    } */
    .formInput {
      margin-bottom: 10px;
      width: 100%;
      height: 35px;
      label {
        display: flex;
        align-items: center;
        background-color: gray;
        padding: 0px 20px;
        height: 100%;
        color: white;
        width: 8em;
      }
      input {
        display: block;
        padding: 10px;
        font-size: 16px;
        border: 1px solid gray;
        width: 100%;
        min-width: 180px;
      }
    }
  }
`;
