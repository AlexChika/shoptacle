import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
const SearchBar = () => {
  const [searchBtn, setSearchBtn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [timeoutId, setTimeoutId] = useState("");
  const handleSearchOnchange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      setSearchBtn(true);
      clearTimeout(timeoutId);
    } else {
      setSearchBtn(false);
    }
  };
  const handleSearchToggle = () => {
    setSearchBtn(!searchBtn);
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      if (searchValue) return;
      setSearchBtn(false);
    }, 4000);
    setTimeoutId(timeout);
  };
  const handleSearchOnsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      <div className={`search-con ${searchBtn ? "search" : ""}`}>
        <button className="search-btn" onClick={handleSearchToggle}>
          <FiSearch />
        </button>
        <form onSubmit={handleSearchOnsubmit}>
          <div className="form-input f ">
            <input
              type="text"
              name=""
              id=""
              value={searchValue}
              onChange={handleSearchOnchange}
              placeholder="Type to search"
            />
            <button type="submit">
              <FiSearch />
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default SearchBar;
const Wrapper = styled.div`
  .search-con {
    position: relative;
    button {
      font-size: 25px;
    }
    .search-btn {
      text-align: 2px 2px black;
      position: absolute;
      top: 0%;
      transform: translateY(25%);
      font-size: 30px;
      display: block;
    }
    form {
      transition: all 0.2s linear;
      width: 25px;
      overflow: hidden;
      visibility: collapse;
      input {
        width: 75%;
      }
      button {
        width: 25%;
      }
      .form-input {
        height: 45px;
        padding: 0px 7px;
        background-color: white;
        border-radius: 5px;
      }
    }
  }
  .search-con.search {
    .search-btn {
      display: none;
    }
    form {
      visibility: visible;
      width: 10em;
      overflow: visible;
    }
  }
  @media screen and (min-width: 525px) {
    .search-con.search {
      form {
        width: 15em;
      }
    }
  }
`;
