import React from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { FaList } from "react-icons/fa";
import * as actions from "store/actionTypes";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { filterFunc } from "@utils/functions";

// app
const FilterProducts = ({ data }) => {
  const { Logger } = Store();
  const { dispatch, state } = data;
  const { products, filtered, category, brand, grid, min, max, sort, search } =
    state;

  function filterOnchange(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "sort") {
      dispatch({ type: actions.SET_SORT, payload: value });
      return;
    }

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

      min = JSON.parse(min * 100);
      max = JSON.parse(max * 100);

      dispatch({ type: actions.SET_MIN_MAX_RANGE, payload: { min, max } });
    }

    if (name === "search") {
      dispatch({ type: actions.SET_SEARCH, payload: value });
    }

    if (name === "clear") {
      dispatch({ type: actions.CLEAR });
    }

    // finally, sort
    dispatch({ type: actions.SET_SORT, payload: sort });
  }

  // Values...
  const categories = [...new Set(products.map((item) => item.category))];

  const categoryProducts = filterFunc(
    products,
    "category",
    category === "all" ? "" : category
  );

  const brands = [...new Set(categoryProducts.map((item) => item.brand))];

  return (
    <Wrapper className="center mt30">
      <article className="category-brand-bar f j-between">
        <SelectContainer>
          <label htmlFor="category">
            Category: <span className="capitalize">{category}</span>
          </label>

          <select
            id="category"
            onChange={filterOnchange}
            value={category}
            name="category"
          >
            <option value="all">All</option>
            {categories.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              );
            })}
          </select>
        </SelectContainer>

        <SelectContainer>
          <label htmlFor="brand">
            Brand: <span className="capitalize">{brand}</span>
          </label>
          <select
            id="brand"
            onChange={filterOnchange}
            value={brand}
            name="brand"
          >
            <option value="all">All</option>
            {brands.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </SelectContainer>
      </article>

      <article className="range f align mt10">
        <label className="range-label" htmlFor="max-number">
          Range:
        </label>

        <form onSubmit={filterOnchange} name="price-form" value="price-form">
          <SelectContainer className="range-container">
            <label htmlFor="min-number">Min</label>

            <input
              required
              placeholder={min / 100}
              min={min / 100}
              max={max / 100}
              type="number"
              name="min"
              id="min-number"
            />
          </SelectContainer>

          <FaLongArrowAltRight className="arrow" />

          <SelectContainer className="range-container">
            <label htmlFor="max-number">Max</label>

            <input
              required
              placeholder={max / 100}
              min={min / 100}
              max={max / 100}
              type="number"
              name="max"
              id="max-number"
            />
          </SelectContainer>

          <button type="submit" className="shoptacle-btn-pink">
            apply
          </button>
        </form>
      </article>

      <article className="search-sort-bar f align j-between mt10">
        <SelectContainer>
          <label htmlFor="search">Search:</label>

          <input
            value={search}
            onChange={filterOnchange}
            placeholder="search by name"
            type="text"
            name="search"
            id="search"
          />
        </SelectContainer>

        <SelectContainer>
          <label htmlFor="sort">
            Sort By:{" "}
            <span className="capitalize">{sort || "None Selected"}</span>
          </label>

          <select onChange={filterOnchange} value={sort} name="sort" id="sort">
            <option value="low-high">Price Low to High</option>
            <option value="high-low">Price High to Low</option>
            <option value="a-z">Alphabet A-Z</option>
            <option value="z-a">Alphabet Z-A</option>
          </select>
        </SelectContainer>
      </article>

      <article className="feedback-bar f align j-between mt10">
        <div className="f fcenter">
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
        <button
          className="shoptacle-btn-pink"
          name="clear"
          value={"clear"}
          onClick={filterOnchange}
        >
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
    background-color: var(--blue);
    color: var(--pink-light);
    padding: 10px;
    flex-wrap: wrap;
    gap: 15px;

    p {
      margin-top: 7px;
      font-size: 16px;
      color: var(--pink-light);
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

    /* .sort-container {
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
    } */
  }

  .feedback-bar {
    p {
      margin: 0;
    }

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

  .range {
    .range-label {
      color: var(--pink-light);
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      white-space: nowrap;
    }

    form {
      display: flex;
      align-items: center;
      gap: 10px;

      .range-container {
        gap: 5px;

        input {
          width: 70px;
          height: 30px;
          background-color: #ebebeb;
          padding: 10px;
        }
      }

      .arrow {
        font-size: 20px;
      }

      button {
        text-transform: uppercase;
        font-weight: 700;
        height: 33px;
        padding: 0px 10px;
      }
    }
    text-align: center;
    flex-direction: row;

    button {
      width: 100%;
    }
  }

  .clear {
    overflow: hidden;
    button {
      width: 100%;
      background-color: var(--pink);
      text-transform: uppercase;
      font-weight: 700;
      font-size: 14px;
      height: 30px;
      border-radius: 4px;
    }
  }
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  label {
    color: var(--pink-light);
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    white-space: nowrap;

    span {
      color: var(--pink);
    }
  }

  select,
  input {
    background-color: white;
    color: #323148;
    border-radius: 4px;
    padding: 8px 36px 8px 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  /* Custom dropdown arrow */
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23323148' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  /* Hover state */
  select:hover,
  input:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }

  /* Focus state */
  select:focus,
  input:focus {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }

  /* Remove default focus outlines in Firefox */
  select:-moz-focusring,
  input:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #323148;
  }
`;
