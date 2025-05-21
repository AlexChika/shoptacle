import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { AdminStore } from "./adminStore";
import { formatPrice } from "utils/functions";
import usePaginate from "shared/hooks/usePaginate";

// app
const AdminDasnBoardHome = () => {
  const { products, customers } = AdminStore();
  const { Logger } = Store();

  // states
  const [tab, setTab] = useState("Male Fashion");
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [outOfStock, setOutOfStock] = useState([]);
  const [tableProduct, setTableProduct] = useState(
    filter("collection", "Male Fashion")
  );

  const { Pagination, paginated } = usePaginate(
    tableProduct,
    50,
    1,
    true,
    handleScroll
  );

  // helper to filter products
  function filter(type, value) {
    type = type.toLowerCase();

    let newProducts = products
      .filter((product) => {
        return product[type].toLowerCase() === value.toLowerCase();
      })
      .map((p, i) => ({ ...p, index: i + 1 }));

    return newProducts;
  }

  function handleScroll() {
    window.scrollTo(0, 0);
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
    setTableProduct(filter("collection", value));
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!searchValue.trim())
      return Logger(`The input field for ${tab} is empty`, "error");
    setTableProduct(filter(tab, searchValue));
  };

  useEffect(() => {
    // updates the out of stock array
    let _oufOfStoc = products.filter((p) => p.quantity < 1);
    setOutOfStock(_oufOfStoc);
  }, [products]);

  return (
    <Wrapper className="opacity center">
      <section className="counters mt20">
        <div className="counter-card">
          <h3>Total Products</h3>
          <h3>{products.length}</h3>
        </div>

        <div className="counter-card">
          <h3>Out of Stock</h3>
          <h3>{outOfStock.length}</h3>
        </div>

        <div className="counter-card">
          <h3>Total Customers</h3>
          <h3>{customers.length}</h3>
        </div>
      </section>

      {/* table-container */}
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
                <p>Price </p>
                <p>Brand</p>
                <p>Qty</p>
              </div>

              {paginated.map((product, index) => {
                return (
                  <div key={index} className="row">
                    <span className="serial">{product.index}.</span>
                    <span>{product.name}</span>
                    <span>{formatPrice(product.price)}</span>
                    <span>{product.brand}</span>
                    <span>{product.quantity}</span>
                  </div>
                );
              })}
            </div>
            <Pagination />
          </>
        )}
      </section>
    </Wrapper>
  );
};
export default AdminDasnBoardHome;

const Wrapper = styled.main`
  max-width: 1170px;

  /* Counter Cards Container */
  .counters {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px auto;

    div {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px 10px;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    /* Hover effect */
    div:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
    }

    /* Background gradient styles for each card */
    div:nth-of-type(1) {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    div:nth-of-type(2) {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
    }

    div:nth-of-type(3) {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    div h3:first-child {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.5px;
      margin: 0 0 12px 0;
      opacity: 0.9;
      text-transform: uppercase;
    }

    div h3:last-child {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }

    div::before,
    div::after {
      content: "";
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.12);
      z-index: 1;
    }

    div::before {
      top: -20px;
      right: -20px;
    }

    div::after {
      bottom: -35px;
      left: -35px;
    }
  }

  @media (max-width: 500px) {
    .counters {
      gap: 5px;

      div h3:first-child {
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        letter-spacing: 0.5px;
        margin: 0 0 8px 0;
        opacity: 0.9;
        text-transform: uppercase;
      }

      div h3:last-child {
        font-size: 25px;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.5px;
      }
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

      .row:nth-of-type(odd) * {
        background-color: rgba(231, 231, 231, 0.61);
      }
    }
  }
`;
