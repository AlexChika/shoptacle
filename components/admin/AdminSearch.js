import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { AdminStore } from "./adminStore";
import { FiSearch } from "react-icons/fi";
import { debounce, formatPrice } from "utils/functions";
import { ADMIN_SET_ID, ADMIN_REFRESH_STATE } from "store/actionTypes";
import { deleteProduct } from "utils/firebase";
import NotAnAdminModal from "./NotAnAdminModal";
import SearchProductModal from "./SearchProductModal";

const AdminSearch = ({ handleSetTab }) => {
  const { Logger, isAdmin, user } = Store();
  const { products, dispatch } = AdminStore();

  // states
  const [errModal, setErrModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredproducts, setFilteredProducts] = useState([]);

  // funcs
  // the search handler
  const handleSearch = debounce(function (text) {
    let filtered = products.filter((item) =>
      item.name.toLowerCase().includes(text)
    );
    setFilteredProducts(filtered);
  });

  // the search input onChange
  function searchOnchange(e) {
    const text = e.target.value.toLowerCase();
    setSearchValue(text);
    handleSearch(text);
  }

  const handleViewBtn = (id) => {
    const current = filteredproducts.find((item) => item.id === id);
    setViewProduct(current);
    setModal(true);
  };

  const handleEditBtn = (id) => {
    // go to edit page
    dispatch({ type: ADMIN_SET_ID, payload: id });
    handleSetTab(3);
  };

  const handleDeleteBtn = async (e, id) => {
    if (!isAdmin) return setErrModal(true);
    const spinner =
      e.target.parentElement.parentElement.querySelector(".spinner");

    spinner.classList.remove("stop");
    try {
      // delete the item from db
      await deleteProduct(id);
      setFilteredProducts(filteredproducts.filter((item) => item.id !== id));
      spinner.classList.add("stop");
      dispatch({ type: ADMIN_REFRESH_STATE });
      Logger("Item deleted succesfully", "success");
    } catch (error) {
      spinner.classList.add("stop");
      Logger("There was an error deleting this item", "error");
    }
  };

  return (
    <Wrapper className="opacity center">
      <form onSubmit={(e) => e.preventDefault()} className="f center mt20">
        <input
          onChange={searchOnchange}
          placeholder="Search product by name"
          type="text"
          value={searchValue}
          id="search"
        />
        <label htmlFor="search" className="f fcenter">
          <FiSearch />
        </label>
      </form>

      <section className="result-con">
        <h1 className="page-title">Search Results</h1>
        <p className="instruction">To delete, double-click the delete button</p>

        <div className="results-wrapper">
          {filteredproducts.length < 1 ? (
            <div className="no-result center">
              <h3>No products found</h3>
            </div>
          ) : (
            filteredproducts.slice(0, 20).map((product) => {
              const { id, name, price } = product;
              return (
                <article key={id} className="product-card">
                  <div className="product-header">
                    <h3>{name}</h3>
                    <div className={`spinner sm center stop`}></div>
                  </div>
                  <div className="product-details">
                    <p>
                      ID: <span>{id}</span>
                    </p>
                    <p>
                      Price: <span>{formatPrice(Number(price))}</span>
                    </p>
                  </div>
                  <div className="product-actions">
                    <button onClick={() => handleViewBtn(id)}>View</button>
                    <button onClick={() => handleEditBtn(id)}>Edit</button>
                    <button onDoubleClick={(e) => handleDeleteBtn(e, id)}>
                      Delete
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <SearchProductModal
        modal={modal}
        setModal={setModal}
        product={viewProduct}
      />

      <NotAnAdminModal user={user} modal={errModal} setModal={setErrModal} />
    </Wrapper>
  );
};
export default AdminSearch;

const Wrapper = styled.main`
  max-width: 1170px;
  color: var(--blue);
  .center {
    margin-left: auto;
    margin-right: auto;
  }

  /* Product Search Form */
  form.f.center.mt20 {
    position: relative;
    max-width: 600px;
    margin: 20px auto 30px;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding: 14px 18px;
      padding-right: 50px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    input:focus {
      outline: none;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    }

    input::placeholder {
      color: #aaa;
      font-weight: 400;
    }

    label {
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(45deg, #323148, #4b4a6c);
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    label:hover {
      transform: translateY(-50%) scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    label:active {
      transform: translateY(-50%) scale(0.98);
    }

    /* Search Icon */
    label svg {
      width: 18px;
      height: 18px;
      stroke-width: 2.5;
    }

    /* When the form is actively being used */
    &:focus-within input {
      box-shadow: 0 4px 20px rgba(50, 49, 72, 0.15);
    }

    &:focus-within label {
      background: linear-gradient(45deg, rgb(36, 43, 50), #5291d9);
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 640px) {
    form.f.center.mt20 {
      max-width: 100%;
      padding: 0 20px;

      input {
        padding: 12px 16px;
        padding-right: 46px;
        font-size: 15px;
      }

      label {
        width: 32px;
        height: 32px;
      }
    }
  }

  .result-con {
    padding: 32px 10px;
    max-width: 900px;
    margin: auto;
    color: #333;

    .page-title {
      text-align: center;
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #444;
    }

    .instruction {
      text-align: center;
      color: #777;
      margin-bottom: 32px;
      font-size: 16px;
    }

    .results-wrapper {
      display: grid;
      gap: 24px;
    }

    .product-card {
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      padding: 24px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .product-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        h3 {
          font-size: 20px;
        }
      }

      .product-details {
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
        font-size: 14px;

        p span {
          color: #666;
        }
      }

      .product-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        button {
          background-color: transparent;
          border: 2px solid #323148;
          color: #323148;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.25s ease, color 0.25s ease,
            box-shadow 0.25s ease;

          &:hover {
            background-color: #323148;
            color: #ffffff;
            box-shadow: 0 4px 10px rgba(50, 49, 72, 0.15);
          }
        }
      }
    }
  }

  .no-result {
    text-align: center;
    border: 2px dashed #aaa;
    border-radius: 10px;
    padding: 30px;
    font-size: 18px;
    color: #666;
    width: 90%;
    max-width: 500px;
  }
`;
