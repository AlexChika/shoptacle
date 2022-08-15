import React from "react";
import styled from "styled-components";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
const FilterProducts = () => {
  function handleThis() {
    console.log("wahala");
  }
  return (
    <Wrapper className="center mt30">
      <article className="category-brand-bar f j-between">
        <div className="category">
          <h2 className="c-blue">Category</h2>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <li key={index} className="f fcenter">
                <button className={`${index == 0 ? "active" : ""}`}>
                  {item + "Basic Phones"}
                </button>
              </li>
            );
          })}
        </div>
        <h2 className="display">Filter Products</h2>
        <div className="brand">
          <h2 className="c-blue">Brand</h2>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <li key={index} className="f fcenter">
                <button>{"samsung"}</button>
                <span className={index == 0 ? "active" : ""}>
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
            <h4>300 </h4>
            <input
              onChange={handleThis}
              type="range"
              value={500}
              min={40}
              max={1000}
              name=""
              id=""
            />
            <h4>1000</h4>
          </div>
          <h3>500</h3>
        </div>
        <div className="side-right">
          <div>
            <div className="f align j-between">
              <span>Max :</span>
              <input type="number" name="" id="" />
            </div>
            <div className="f align j-between mt10">
              <span>Min :</span>
              <input type="number" name="" id="" />
            </div>
          </div>
          <button className="mt10">apply</button>
        </div>
      </article>
      <article className="search-sort-bar f align j-between mt10">
        <form className="search-bar f align j-between">
          <p>Search</p>
          <input placeholder="search by name" type="text" name="" id="" />
        </form>
        <form className="sort-container f align">
          <p>Sort By:</p>
          <select name="" id="">
            <option value="hey">Price Low to High</option>
            <option value="hey">Price High to Low</option>
            <option value="hey">Alphabet A-Z</option>
            <option value="hey">Alphabet Z-A</option>
          </select>
        </form>
      </article>
      <article className="feedback-bar f align j-between mt10">
        <div className="view-container f align">
          <p>View :</p>
          <button>
            <BsFillGrid3X3GapFill />
          </button>
          <button>
            <FaList />
          </button>
        </div>
        <p>{"23 products found"}</p>
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
  .feedback-bar {
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
    button:focus + span,
    button:hover,
    button:focus {
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
      p {
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
      p {
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
    }
  }
  .range {
    text-align: center;
    .side-left,
    .side-right {
      width: 45%;
      max-width: 300px;
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
`;
