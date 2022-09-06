import React, { useState } from "react";
import styled from "styled-components";
import Paginate from "./Paginate";
import { paginateFn } from "../utils/functions";
const seed = [
  {
    name: "hello wrold and people and name is long",
    price: 120000,
    quantity: 34,
    brand: "samsung",
  },
  { name: "world", price: 120000, quantity: 34, brand: "thermacool" },
  { name: "people", price: 120000, quantity: 34, brand: "lg lg" },
  { name: "Jesus", price: 120000, quantity: 34, brand: "logo m" },
  { name: "radio", price: 120000, quantity: 3400, brand: "tv and co" },
];
// app
const AdminDasnBoardHome = () => {
  //  add no property to our data
  let newData = seed.map((seed, index) => {
    return {
      ...seed,
      no: index,
    };
  });

  // states
  const [currentBtn, setCurrentBtn] = useState(0);
  const [paginateProducts, setPaginateProducts] = useState(
    paginateFn(newData, 100).items
  );

  // funcs
  const handlePaginate = (val) => {
    let newItem = paginateFn(newData, 100, val).items;
    setPaginateProducts(newItem);
    setCurrentBtn(val);
  };
  return (
    <Wrapper className="opacity center">
      {/* counters */}
      <section className="counters f j-around mt20">
        <div>
          <h3>Total Products</h3>
          <h3>1000</h3>
        </div>
        <div>
          <h3>Out of Stock</h3>
          <h3>1000</h3>
        </div>
        <div>
          <h3>Total Customers </h3>
          <h3>1000</h3>
        </div>
      </section>
      {/* table-con */}
      <section className="table-con mt30">
        <div className="header">
          <h3>All Products</h3>
        </div>

        <div className="tabs mt20">
          <span>
            <h1 className="active">Male Fashion</h1>
          </span>

          <span>
            <h1>Female Fashion</h1>
          </span>

          <span>
            <h1>Unisex Shoes</h1>
          </span>

          <span>
            <h1>Smart Gadgets</h1>
          </span>

          <span>
            <h1>Brand</h1>
          </span>

          <span>
            <h1>Category</h1>
          </span>
        </div>

        <h1 className="title mt30">NAME OF TAB</h1>

        <div className="table">
          <div className="row">
            <p>No.</p>
            <p>Name</p>
            <p>Price</p>
            <p>Brand</p>
            <p>Qty</p>
          </div>

          {paginateProducts.map((seed, index) => {
            return (
              <div key={index} className="row">
                <span>{seed.no + 1}.</span>
                <span>{seed.name}</span>
                <span>{seed.price}</span>
                <span>{seed.brand}</span>
                <span>{seed.quantity}</span>
              </div>
            );
          })}
        </div>
        <Paginate
          paginateFn={paginateFn}
          currentBtn={currentBtn}
          handlePaginate={handlePaginate}
          itemsPerPage={100}
          array={seed}
        />
      </section>
    </Wrapper>
  );
};
export default AdminDasnBoardHome;

const Wrapper = styled.main`
  max-width: 1170px;
  .counters {
    div {
      background-color: var(--gray);
      padding: 10px;
      margin: 0px 5px;
      text-align: center;
      border-radius: 10px;
      color: white;
    }
    div:nth-of-type(1) {
      background-color: skyblue;
    }
    div:nth-of-type(2) {
      background-color: tomato;
    }
    div:nth-of-type(3) {
      background-color: green;
    }
    h3 {
      font-size: 14px;
    }
  }

  .table-con {
    width: 100%;

    .header {
      text-align: center;
      color: gray;
    }

    .tabs {
      display: grid;
      grid-template-columns: repeat(6, minmax(150px, 1fr));
      overflow-x: auto;
      gap: 0 10px;

      span {
        h1 {
          background-color: var(--blue);
          color: white;
          padding: 10px;
          text-align: center;
        }
        h1.active {
          background-color: white;
          color: var(--blue);
          border: 2px solid var(--blue);
        }
      }
    }

    .title {
      text-align: center;
    }

    .table {
      overflow-x: auto;
      padding: 10px;
      .row {
        display: grid;
        grid-template-columns:
          minmax(50px, 100px) minmax(200px, 1fr) minmax(200px, 1fr) minmax(
            200px,
            1fr
          )
          minmax(50px, 150px);
        p {
          border: 1px solid gray;
          padding: 10px;
          text-align: center;
          border-bottom: 3px solid;
        }
        span {
          border: 1px solid gray;
          padding: 10px;
        }
      }
    }

    .brandcategory {
    }
  }
  @media screen and (min-width: 375px) {
    .counters {
      div {
        padding: 20px;
      }
      h3 {
        font-size: 16px;
      }
    }
  }
  @media screen and (min-width: 600px) {
    .counters {
      div {
        padding: 30px;
      }
      h3 {
        font-size: 18px;
      }
    }
  }
`;
