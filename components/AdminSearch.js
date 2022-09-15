import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "../store/Context";
import { AdminStore } from "../pages/admin";
import Image from "next/image";
import Modal from "./Modal";
import { FiSearch } from "react-icons/fi";
import { formatPrice } from "../utils/functions";
import { ADMIN_SET_ID, ADMIN_REFRESH_STATE } from "../store/actionTypes";
import { deleteProduct } from "../utils/firebase";
const AdminSearch = ({ handleSetTab }) => {
  const { Logger, isAdmin } = Store();
  const { products, dispatch } = AdminStore();

  // states
  const [modal, setModal] = useState(false);
  const [viewProduct, setViewProduct] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredproducts, setFilteredProducts] = useState([]);
  // funcs
  // the search handler
  async function handleSearch(e) {
    const text = e.target.value.toLowerCase();
    let filtered = [...products].filter((item) => {
      if (!text) return false;
      if (item.name.toLowerCase().includes(text)) {
        return item;
      }
    });
    setSearchValue(text);
    setFilteredProducts(filtered);
  }

  const handleViewBtn = (id) => {
    const current = [...filteredproducts].filter((item) => item.id === id);
    setViewProduct(current);
    setModal(true);
  };

  const handleEditBtn = (id) => {
    // go to edit page
    dispatch({ type: ADMIN_SET_ID, payload: id });
    handleSetTab(3);
  };

  const handleDeleteBtn = async (e, id) => {
    if (!isAdmin)
      return Logger(
        "You cannot delete this Item, please request Admin access",
        "error"
      );
    const spinner =
      e.target.parentElement.parentElement.querySelector(".spinner");
    spinner.style.display = "block";
    try {
      // delete the item from db
      await deleteProduct(id);
      setFilteredProducts(filteredproducts.filter((item) => item.id !== id));
      spinner.style.display = "none";
      dispatch({ type: ADMIN_REFRESH_STATE });
      Logger("Item deleted succesfully", "success");
    } catch (error) {
      spinner.style.display = "none";
      Logger("There was an error deleting this item", "error");
    }
  };

  return (
    <Wrapper className="opacity center">
      <form onSubmit={(e) => e.preventDefault()} className="f center mt20">
        <input
          onChange={handleSearch}
          placeholder="Search product by name"
          type="text"
          value={searchValue}
          id="search"
        />
        <label htmlFor="search" className="f fcenter">
          <FiSearch />
        </label>
      </form>

      <section className="result-con mt30 ">
        <h1 className="title">Search Results</h1>
        <p className="title">To delete, Double click the delete button</p>

        <div>
          {filteredproducts.length < 1 ? (
            <div className="no-result center f fcenter mt30">
              <h3>No products found</h3>
            </div>
          ) : (
            filteredproducts.slice(0, 20).map((product) => {
              const { id, name, price } = product;
              return (
                <article key={product.id} className="result center mt20">
                  <div className={`spinner sm center stop`}></div>
                  <div>
                    <h3>{name}</h3>
                  </div>
                  <div className="f">
                    <p>
                      ID: <span>{id}</span>
                    </p>
                    <p>
                      PRICE: <span>{formatPrice(Number(price))}</span>
                    </p>
                  </div>
                  <div>
                    <button onClick={() => handleViewBtn(id)} type="button">
                      VIEW
                    </button>
                    <button onClick={() => handleEditBtn(id)} type="button">
                      EDIT
                    </button>
                    <button
                      onDoubleClick={(e) => handleDeleteBtn(e, id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
      <Modal modal={modal} setModal={setModal}>
        {viewProduct.map((product) => {
          const {
            imgOne,
            price,
            name,
            id,
            quantity,
            category,
            brand,
            desc,
            arrival,
          } = product;
          return (
            <section key={id} className="modal mt10">
              <div className="image mt30">
                <Image layout="fill" alt="product image" src={imgOne}></Image>
              </div>
              <article>
                <h1>{name}</h1>
                <h5>
                  QTY: &nbsp;<span>{quantity}</span>
                </h5>
                <h5>
                  BRAND: &nbsp;<span>{brand}</span>
                </h5>
                <h5>
                  CATEGORY: &nbsp;<span>{category}</span>
                </h5>
                <h5>
                  PRICE: &nbsp;<span>{formatPrice(Number(price))}</span>
                </h5>
                <h5>
                  ID: &nbsp;<span>{id}</span>
                </h5>
                <h5>
                  Arrival: &nbsp;<span>{arrival}</span>
                </h5>
                <h5>
                  DESC: &nbsp;
                  <span>{desc}</span>
                </h5>
              </article>
            </section>
          );
        })}
      </Modal>
    </Wrapper>
  );
};
export default AdminSearch;

const Wrapper = styled.main`
  max-width: 1170px;
  color: var(--blue);

  form {
    max-width: 600px;
    border: 2px solid var(--blue);
    input {
      flex: 0.8;
      padding: 10px;
      font-size: 16px;
    }
    label {
      flex: 0.2;
      font-size: 30px;
      color: gray;
    }
  }

  .result-con {
    .title {
      text-align: center;
      color: var(--gray);
    }
    .result {
      max-width: 600px;
      padding: 5px;
      p,
      h3 {
        margin: 5px 10px;
      }
      span {
        color: gray;
      }
      button {
        color: white;
        margin: 5px 10px;
        padding: 5px 20px;
      }
      button:nth-of-type(1) {
        background-color: green;
      }
      button:nth-of-type(2) {
        background-color: var(--pink);
      }
      button:nth-of-type(3) {
        background-color: tomato;
      }
    }
    .result:nth-of-type(odd) {
      background-color: var(--gray);
    }
    .result:nth-of-type(even) {
      background-color: var(--pink-light);
    }
    .no-result {
      max-width: 600px;
      min-height: 40vh;
      border: 1px solid gray;
    }
  }

  .modal {
    overflow-y: scroll;
    max-height: 90vh;
    color: var(--blue);
    .image {
      position: relative;
      aspect-ratio: 4/3;
      width: 100%;
    }
    h5 {
      margin-top: 5px;
    }
    span {
      letter-spacing: 0.012rem;
      font-size: 15px;
      font-weight: 100;
    }
  }
`;
