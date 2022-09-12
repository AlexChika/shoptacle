import React, { useState } from "react";
import styled from "styled-components";
import { AdminStore } from "../pages/admin";
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
  const { products, customers } = AdminStore();

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
      return;
    }
    setShowForm(false);

    // call a firebase func to update our object.
  };

  const handleForm = () => {
    // call firebase func with category/brand param
    // set seed again
  };

  // update state with firebase func
  const getProducts = () => {
    // call firebase
    // update the state
  };

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
          <h3>{products.length}</h3>
        </div>
        <div>
          <h3>Out of Stock</h3>
          <h3>1000</h3>
        </div>
        <div>
          <h3>Total Customers </h3>
          <h3>{customers.length}</h3>
        </div>
      </section>
      {/* table-con */}
      <section className="table-con mt30">
        <div className="header">
          <h3>All Products</h3>
        </div>

        <div className="tabs mt20">
          <span onClick={() => handleTabs("Male Fashion")}>
            <h1 className={tab == "Male Fashion" ? "active" : ""}>
              Male Fashion
            </h1>
          </span>

          <span onClick={() => handleTabs("Female Fashion")}>
            <h1 className={tab == "Female Fashion" ? "active" : ""}>
              Female Fashion
            </h1>
          </span>

          <span onClick={() => handleTabs("Unisex Shoes")}>
            <h1 className={tab == "Unisex Shoes" ? "active" : ""}>
              Unisex Shoes
            </h1>
          </span>

          <span onClick={() => handleTabs("Smart Gadgets")}>
            <h1 className={tab == "Smart Gadgets" ? "active" : ""}>
              Smart Gadgets
            </h1>
          </span>

          <span onClick={() => handleTabs("Brand")}>
            <h1 className={tab == "Brand" ? "active" : ""}>Brand</h1>
          </span>

          <span onClick={() => handleTabs("Category")}>
            <h1 className={tab == "Category" ? "active" : ""}>Category</h1>
          </span>
        </div>

        <h1 className="title mt30">
          {tab} ({seed.length} Products )
        </h1>

        {showForm && (
          <form className="f center mt30">
            <input
              placeholder={`Enter ${tab} Name`}
              type="text"
              name=""
              id=""
            />
            <button type="submit">Submit</button>
          </form>
        )}
        {/* <div className="loading f fcenter mt30">
          <div className="spinner"></div>
          <h3 className="mt20">Please Wait...</h3>
        </div>
        <div className="loading f fcenter mt30">
          <h2>There was an error</h2>
          <h3 className="mt20">Please check parameters and try again</h3>
        </div> */}

        {seed && (
          <>
            <div className="table mt30">
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
      grid-template-columns: repeat(6, minmax(165px, 1fr));
      overflow-x: auto;
      gap: 0 10px;

      span {
        cursor: pointer;
        h1 {
          background-color: var(--blue);
          color: white;
          padding: 10px;
          text-align: center;
          font-size: 17px;
          border: 2px solid var(--blue);
          transition: all 0.3s linear;
        }
        h1.active {
          background-color: white;
          color: var(--blue);
        }
      }
    }

    .title {
      text-align: center;
    }

    .loading {
      flex-direction: column;
      min-height: 40vh;
      border: 2px solid gray;
    }

    form {
      max-width: 600px;
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

      .row:nth-of-type(odd) .serial {
        background-color: var(--gray);
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
