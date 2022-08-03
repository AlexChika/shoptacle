import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../store/Context";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { IoMdList } from "react-icons/io";
function NavBar({ page }) {
  const { handleCloseModal } = Store();
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
    <Wrapper className="mt10 f align">
      <button onClick={handleCloseModal} className="side-modal-btn">
        <IoMdList />
      </button>
      <div className="link-con f">
        <Link href="/">
          <span className={`trans ${page === "home" ? "active" : ""}`}>
            {" "}
            Home
          </span>
        </Link>
        <Link href="/categories">
          <span className={`trans ${page === "categories" ? "active" : ""}`}>
            Categories
          </span>
        </Link>
        <Link href="/about">
          <span className={`trans ${page === "about" ? "active" : ""}`}>
            About Us
          </span>
        </Link>
      </div>
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
      <div className="navCart-con f fcenter">
        <span>
          {false ? (
            // <Image src="" />
            <div></div>
          ) : (
            <button type="button">
              <FaUser />
            </button>
          )}
        </span>
        <span>
          <button type="button">
            <BsCartFill />
          </button>
        </span>
      </div>
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = styled.nav`
  justify-content: space-between;
  height: 60px;
  margin: 0 10px;
  .side-modal-btn {
    color: white;
    font-size: 25px;
  }
  .link-con {
    display: none;
    min-width: 18rem;
    flex: 0.45;
    justify-content: flex-end;
    span {
      margin: 0px 10px;
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #ffffff;
    }
    span.active {
      color: black;
      border-bottom: 4px solid grey;
    }
    span:hover {
      color: grey;
    }
  }
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
      color: white;
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
  .navCart-con {
    background: #ffffff;
    border-radius: 30px;
    width: 90px;
    height: 45px;
    span {
      margin: 0px 7px;
    }
    button {
      font-size: 25px;
    }
  }
  @media screen and (min-width: 525px) {
    .search-con.search {
      form {
        width: 15em;
      }
    }
    .navCart-con {
      width: 100px;
    }
  }
  @media screen and (min-width: 768px) {
    .side-modal-btn {
      display: none;
    }
    .link-con {
      display: flex;
    }
    .navCart-con {
      width: 130px;
    }
  }
  @media screen and (min-width: 900px) {
    /* .link-con {
      min-width: 18rem;
      flex: 0.45;
      justify-content: flex-end;
      a {
        font-size: 20px;
      }
    } */
  }
`;
