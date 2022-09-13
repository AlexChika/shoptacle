import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Store } from "../store/Context";
import { AdminStore } from "../pages/admin";
import Paginate from "./Paginate";
import { paginateFn } from "../utils/functions";

// app
const AdminDasnBoardHome = () => {
  const { products, customers } = AdminStore();
  const { Logger } = Store();

  // states
  const [tab, setTab] = useState("Male Fashion");
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentBtn, setCurrentBtn] = useState(0);
  const [tableProduct, setTableProduct] = useState(
    filter("collection", "Male Fashion")
  );
  const [paginateProducts, setPaginateProducts] = useState(
    paginateFn(tableProduct, 50).items
  );

  // helper tp filter products
  function filter(type, value) {
    type = type.toLowerCase();
    let newProducts = products.filter((product, index) => {
      console.log(index);
      if (product[type].toLowerCase() === value.toLowerCase()) {
        return product;
      }
    });
    return newProducts;
  }

  // funcs changes selected tabs and update table products
  const handleTabs = (value) => {
    setTab(value);
    if (value === "Brand" || value === "Category") {
      setTableProduct([]);
      setShowForm(true);
      return;
    }
    setShowForm(false);
    const product = filter("collection", value);
    setTableProduct(product);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!searchValue.trim())
      return Logger(`The input field for ${tab} is empty`, "error");
    const product = filter(tab, searchValue);
    setTableProduct(product);
  };

  const handlePaginate = (val) => {
    let newItem = paginateFn(tableProduct, 50, val).items;
    setPaginateProducts(newItem);
    setCurrentBtn(val);
  };

  useEffect(() => {
    setPaginateProducts(paginateFn(tableProduct, 50).items);
  }, [tableProduct]);

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
          <h3>0</h3>
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
          {tab} ({tableProduct.length} Products )
        </h1>

        {showForm && (
          <form onSubmit={handleForm} className="f center mt30">
            <input
              placeholder={`Enter ${tab} Name`}
              type="text"
              name=""
              id=""
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <button type="submit">Submit</button>
          </form>
        )}
        {tableProduct.length < 1 ? (
          <div className="empty f fcenter mt30">
            <h2>No products found</h2>
            {showForm && (
              <h3 className="mt20">Please check parameters and try again</h3>
            )}
          </div>
        ) : (
          <>
            <div className="table mt30">
              <div className="row">
                <p>No.</p>
                <p>Name</p>
                <p>Price (kB)</p>
                <p>Brand</p>
                <p>Qty</p>
              </div>

              {paginateProducts.map((product, index) => {
                console.log(product);
                return (
                  <div key={index} className="row">
                    <span className="serial">{index + 1}.</span>
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                    <span>{product.brand}</span>
                    <span>{product.quantity}</span>
                  </div>
                );
              })}
            </div>
            <Paginate
              paginateFn={paginateFn}
              currentBtn={currentBtn}
              handlePaginate={handlePaginate}
              itemsPerPage={50}
              array={tableProduct}
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

    .empty {
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
          minmax(60px, 150px);

        p {
          border: 1px solid gray;
          padding: 10px;
          text-align: center;
          border-bottom: 3px solid;
          font-size: 20px;
        }

        span {
          border: 1px solid gray;
          padding: 10px;
          font-size: 16px;
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
