import React from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
import * as actions from "store/actionTypes";
import { formatPrice } from "utils/functions";
// app
const FilterProducts = ({ data }) => {
  const { Logger } = Store();
  const { dispatch, state } = data;
  const {
    products,
    filtered,
    category,
    brand,
    grid,
    min,
    max,
    priceRange,
    sort,
    search,
  } = state;

  function filterOnchange(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      dispatch({ type: actions.SET_CATEGORY, payload: value });
    }

    if (name === "brand") {
      dispatch({ type: actions.SET_BRAND, payload: value });
    }

    if (name === "grid") {
      dispatch({ type: actions.SET_GRID, payload: true });
    }

    if (name === "list") {
      dispatch({ type: actions.SET_GRID, payload: false });
    }

    if (name === "price-range") {
      dispatch({ type: actions.SET_PRICE_RANGE, payload: value });
    }

    if (name === "price-form") {
      e.preventDefault();
      let min = e.target.querySelector("#min-number").value;
      let max = e.target.querySelector("#max-number").value;

      // check for invalid inputs
      if (!min || !max)
        return Logger(
          "Pls fill the Max and Min fields for maximum and minimum price ranges",
          "error"
        );

      min = JSON.parse(min);
      max = JSON.parse(max);

      dispatch({ type: actions.SET_MIN_MAX_RANGE, payload: { min, max } });
    }

    if (name === "search") {
      dispatch({ type: actions.SET_SEARCH, payload: value });
    }

    if (name === "sort") {
      dispatch({ type: actions.SET_SORT, payload: value });
    }

    if (name === "clear") {
      dispatch({ type: actions.CLEAR });
      return;
    }
  }

  // Values...
  const brands = [...new Set(filtered.map((item) => item.brand))];
  const categories = [...new Set(products.map((item) => item.category))];

  return (
    <Wrapper className="center mt30">
      <article className="category-brand-bar f j-between">
        <div className="category">
          <h2 className="c-blue">Category</h2>
          {categories.map((item, index) => {
            return (
              <li key={index} className="f fcenter">
                <button
                  name="category"
                  value={item}
                  onClick={filterOnchange}
                  className={`capitalize ${category == item ? "active" : ""}`}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </div>

        <h2 className="display">Filter Products</h2>

        <div className="brand">
          <h2 className="c-blue">Brand</h2>
          {brands.map((item, index) => {
            return (
              <li key={index} className="f fcenter">
                <button
                  className="capitalize"
                  onClick={filterOnchange}
                  name="brand"
                  value={item}
                >
                  {item}
                </button>
                <span className={brand == item ? "active" : ""}>
                  <ImCheckboxChecked />
                </span>
              </li>
            );
          })}
        </div>
      </article>

      <article className="range f align j-between mt10">
        <div className="side-left">
          <h3>Price #</h3>
          <div className="f align j-between">
            <h4>{formatPrice(min)}</h4>
            <input
              onChange={filterOnchange}
              type="range"
              value={priceRange}
              min={min}
              max={max}
              name="price-range"
            />
            <h4>{formatPrice(max)}</h4>
          </div>
          <h3>{formatPrice(priceRange)}</h3>
        </div>

        <div className="side-right">
          <form onSubmit={filterOnchange} name="price-form" value="price-form">
            <div className="f align j-between">
              <label htmlFor="max-number">Max :</label>
              <input
                min={min / 100}
                max={max / 100}
                type="number"
                name="max"
                id="max-number"
              />
            </div>
            <div className="f align j-between mt10">
              <label htmlFor="min-number">Min :</label>
              <input
                min={min / 100}
                max={max / 100}
                type="number"
                name="min"
                id="min-number"
              />
            </div>
            <button type="submit" className="mt10">
              apply
            </button>
          </form>
        </div>
      </article>

      <article className="search-sort-bar f align j-between mt10">
        <div className="search-bar f align j-between">
          <label htmlFor="search">Search</label>
          <input
            value={search}
            onChange={filterOnchange}
            placeholder="search by name"
            type="text"
            name="search"
            id="search"
          />
        </div>
        <div className="sort-container f align">
          <label htmlFor="sort">Sort By:</label>
          <select onChange={filterOnchange} value={sort} name="sort" id="sort">
            <option value="low-high">Price Low to High</option>
            <option value="high-low">Price High to Low</option>
            <option value="a-z">Alphabet A-Z</option>
            <option value="z-a">Alphabet Z-A</option>
          </select>
        </div>
      </article>

      <article className="feedback-bar f align j-between mt10">
        <div className="view-container f align">
          <p>View :</p>
          <button
            name="grid"
            value="grid"
            onClick={filterOnchange}
            className={grid ? "active" : ""}
          >
            <BsFillGrid3X3GapFill />
          </button>
          <button
            name="list"
            value="list"
            onClick={filterOnchange}
            className={grid ? "" : "active"}
          >
            <FaList />
          </button>
        </div>
        <p>{filtered.length} products found</p>
      </article>

      <article className="clear mt10">
        <button name="clear" value={"clear"} onClick={filterOnchange}>
          clear all filters
        </button>
      </article>
    </Wrapper>
  );
};

export default FilterProducts;
const Wrapper = styled.section`
  max-width: 1170px;
  .range,
  .category-brand-bar,
  .search-sort-bar,
  .feedback-bar,
  .clear {
    background-color: var(--gray);
    color: var(--pink-light);
    padding: 10px;
  }
  .category-brand-bar {
    flex-wrap: wrap;
    .category,
    .brand {
      max-width: 270px;
      min-width: 130px;
      text-align: center;
      height: 100px;
      overflow-y: auto;
      padding: 0px 10px;
    }
    li {
      width: 100%;
      height: 35px;
    }
    button {
      letter-spacing: 0.12rem;
    }
    button.active {
      color: var(--pink);
      border-bottom: 2px solid var(--pink);
    }
    span {
      margin: 0px 5px;
    }
    span.active {
      color: var(--pink);
    }
    button:hover + span,
    button:hover {
      color: var(--pink);
    }
  }

  .search-sort-bar {
    flex-wrap: wrap;
    .search-bar,
    .sort-container {
      width: 90%;
      margin-bottom: 10px;
    }
    .search-bar {
      input {
        padding: 10px 5px;
        flex: 0.7;
        width: 100%;
        background-color: white;
        color: var(--blue);
      }
      label {
        font-size: 18px;
        flex: 0.3;
        color: var(--pink-light);
      }
    }
    .sort-container {
      select {
        flex: 0.7;
        padding: 10px 0px;
        background-color: white;
        color: var(--blue);
      }
      label {
        flex: 0.3;
        color: var(--pink-light);
      }
    }
  }

  .feedback-bar {
    .view-container {
      width: 50%;
      button {
        margin: 0px 7px;
        font-size: 20px;
      }
      button.active {
        color: var(--pink);
      }
      button:focus,
      button:hover {
        color: var(--pink);
      }
      svg,
      path {
        user-select: none;
        pointer-events: none;
      }
    }
  }

  .range {
    text-align: center;
    flex-direction: column;
    .side-left,
    .side-right {
      width: 100%;
    }
    .side-right {
      margin-top: 30px;
      label {
        border: 1px solid var(--pink-light);
        width: 6em;
        color: gray;
        background-color: var(--pink-light);
      }
    }

    input {
      background-color: white;
      width: 100%;
      flex: 0.8;
      color: var(--blue);
      padding: 5px;
    }
    button {
      border-radius: 10px;
      border: 2px solid var(--pink);
      padding: 5px 30px;
      background-color: var(--pink);
    }
    button:hover {
      background-color: var(--gray);
    }
  }

  .clear {
    button {
      width: 100%;
      background-color: var(--pink);
      padding: 10px;
      text-transform: uppercase;
      border-radius: 15px;
      font-weight: 700;
    }
  }

  @media screen and (min-width: 425px) {
    .search-sort-bar {
      .search-bar,
      .sort-container {
        width: 47%;
        max-width: 250px;
        margin-bottom: 0px;
      }
    }
  }

  @media screen and (min-width: 600px) {
    .range {
      flex-direction: row;
      .side-left,
      .side-right {
        width: 45%;
        max-width: 300px;
      }

      .side-right {
        margin-top: 0px;
      }
    }
  }
`;
