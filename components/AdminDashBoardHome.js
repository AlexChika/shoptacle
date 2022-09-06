import React, { useState } from "react";
import styled from "styled-components";
import Paginate from "./Paginate";
import { paginateFn } from "../utils/functions";
let seed = [
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
  { name: "radio", price: 120000, quantity: 3400, brand: "tv and co" },
  { name: "radio", price: 120000, quantity: 3400, brand: "tv and co" },
  { name: "radio", price: 120000, quantity: 3400, brand: "tv and co" },
  { name: "radio", price: 120000, quantity: 3400, brand: "tv and co" },
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
  const [tab, setTab] = useState("Male Fashion");
  const [showForm, setShowForm] = useState(false);
  const [currentBtn, setCurrentBtn] = useState(0);
  const [paginateProducts, setPaginateProducts] = useState(
    paginateFn(newData, 100).items
  );

  // funcs
  const handleTabs = (type) => {
    setTab(type);
    if (type === "Brand" || type === "Category") {
      setShowForm(true);
      // seed =[];
      return;
    }
    // call a firebase func to update our object.
  };

  const handleForm = () => {
    // call firebase func with category/brand param
    // set seed again
  };

  // update state with firebase func

  const handlePaginate = (val) => {
    let newItem = paginateFn(newData, 100, val).items;
    setPaginateProducts(newItem);
    setCurrentBtn(val);
  };
  return (
    <Wrapper className="opacity center">
      {/* counters */}
      <section className="counters f j-between mt20">
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
          <span onClick={() => handleTabs("Male Fashion")}>
            <h1 className="active">Male Fashion</h1>
          </span>

          <span onClick={() => handleTabs("Female Fashion")}>
            <h1>Female Fashion</h1>
          </span>

          <span onClick={() => handleTabs("Unisex Shoes")}>
            <h1>Unisex Shoes</h1>
          </span>

          <span onClick={() => handleTabs("Smart Gadgets")}>
            <h1>Smart Gadgets</h1>
          </span>

          <span onClick={() => handleTabs("Brand")}>
            <h1>Brand</h1>
          </span>

          <span onClick={() => handleTabs("Category")}>
            <h1>Category</h1>
          </span>
        </div>

        <h1 className="title mt30">{tab}</h1>

        {showForm && (
          <form className="f center mt30">
            <input
              placeholder="Enter Brand or Category"
              type="text"
              name=""
              id=""
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {seed && (
          <>
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
                    <span className="serial">{seed.no + 1}.</span>
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
          </>
        )}
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
      grid-template-columns: repeat(6, minmax(160px, 1fr));
      overflow-x: auto;
      gap: 0 10px;

      span {
        cursor: pointer;
        h1 {
          background-color: var(--blue);
          color: white;
          padding: 10px;
          text-align: center;
          font-size: 18px;
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

      .row:nth-of-type(odd) {
        background-color: var(--gray);
      }
    }

    form {
      max-width: 600px;
      margin-bottom: 30px;
      input {
        flex: 0.75;
        border: 2px solid gray;
        padding: 10px;
      }
      button {
        flex: 0.25;
        padding: 10px;
        background-color: gray;
      }
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
