import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
const AdminAdd = () => {
  return (
    <Wrapper className="opacity center">
      <h1 className="title mt20">Add Products</h1>

      <form className="center mt30">
        <div className="fullwrap">
          <div className="formInput f mt10">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter product name" />
          </div>
          <p className="status"></p>
        </div>

        <div className="fullwrap">
          <div className="formInput f">
            <label htmlFor="collection">Collection</label>
            <select name="collection" id="collection">
              <option disabled value="">
                Select a collection
              </option>
              <option value="Male Fashion">Male Fashion</option>
              <option value="Female Fashion">Female Fashion</option>
              <option value="Unisex Shoes">Unisex Shoes</option>
              <option value="Smart Gadgets">Smart Gadgets</option>
            </select>
          </div>
          <p className="status"></p>
        </div>

        <span className="f j-between">
          <div className="halfwrap">
            <div className="formInput f">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Enter product price"
              />
            </div>
            <p className="status"></p>
          </div>
          <div className="halfwrap">
            <div className="formInput f">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter item Quantity"
              />
            </div>
            <p className="status"></p>
          </div>
        </span>

        <span className="f j-between">
          <div className="halfwrap">
            <div className="formInput f mt10">
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" placeholder="Eg samsung" />
            </div>
            <p className="status"></p>
          </div>
          <div className="halfwrap">
            <div className="formInput f mt10">
              <label htmlFor="category">Category</label>
              <input type="text" id="category" placeholder="Eg Men Suits" />
            </div>
            <p className="status"></p>
          </div>
        </span>

        <div className="fullwrap">
          <textarea
            placeholder="Enter product detail"
            name="desc"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <p className="status"></p>
        </div>

        <div className="image">
          <img
            src="https://images.pexels.com/photos/1809609/pexels-photo-1809609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
        </div>

        <div className="fullwrap">
          <div className="formInput f">
            <label htmlFor="image">Image</label>
            <input type="file" name="" id="image" />
          </div>
          <p className="status"></p>
        </div>

        <div className="fullwrap">
          <button type="submit">ADD PRODUCT</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AdminAdd;
const Wrapper = styled.main`
  max-width: 1170px;
  color: var(--blue);
  padding-bottom: 30px;

  .title {
    text-align: center;
  }

  form {
    max-width: 600px;

    span {
      flex-wrap: wrap;
    }
    .fullwrap {
      margin-bottom: 25px;
    }
    .halfwrap {
      width: 100%;
      margin-bottom: 25px;
    }

    .formInput {
      width: 100%;
      height: 40px;

      label,
      input,
      select {
        border: 1px solid gray;
        font-size: 16px;
        display: flex;
        align-items: center;
      }

      label {
        padding: 0px 20px;
        height: 100%;
        min-width: 7em;
        max-width: 7em;
      }

      input,
      select {
        padding: 0px 15px;
        width: 100%;
      }

      input[type="file"] {
        padding: 5px;
      }
    }

    .status {
      color: red;
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      min-height: 200px;
      max-height: 200px;
      border: 1px solid gray;
      font-size: 16px;
      padding: 10px;
    }

    .image {
      margin-bottom: 25px;
      display: none;
      img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: fill;
      }
    }

    button {
      background-color: var(--blue);
      width: 100%;
      padding: 10px;
      color: white;
      border-radius: 10px;
    }
  }
  @media screen and (min-width: 600px) {
    form {
      .halfwrap {
        width: 48%;
      }
    }
  }
`;
