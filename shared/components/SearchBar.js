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
        <button className="search-btn fcenter" onClick={handleSearchToggle}>
          <FiSearch />
        </button>
        <form onSubmit={handleSearchOnsubmit}>
          <div className="form-input f fcenter">
            <input
              type="text"
              name=""
              id=""
              value={searchValue}
              onChange={handleSearchOnchange}
              placeholder="Type to search"
            />
            <button className="submit-btn" type="submit">
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
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      display: block;
    }
    form {
      color: var(--blue);
      transition: all 0.2s linear;
      width: 25px;
      overflow: hidden;
      visibility: collapse;
      input {
        width: 80%;
        font-size: 16px;
      }
      .submit-btn {
        width: 20%;
        border-left: 1px solid;
        font-size: 20px;
      }
      .form-input {
        padding: 7px 7px;
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
      width: 100%;
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
