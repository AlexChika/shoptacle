import React from "react";
import styled from "styled-components";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Store } from "../store/Context";
import { FaUser } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { IoMdList } from "react-icons/io";
function NavBar({ page }) {
  const { handleCloseModal } = Store();

  return (
    <Wrapper page={page} className="f align center">
      <button onClick={handleCloseModal} className="side-modal-btn">
        <IoMdList />
      </button>
      <div className="logo-name">
        <Link href="/">
          <h1>Shoptacle</h1>
        </Link>
      </div>
      <div className="link-con f">
        <Link href="/">
          <span className={`trans ${page === "home" ? "active" : ""}`}>
            {" "}
            Home
          </span>
        </Link>
        <Link href="/shop">
          <span className={`trans ${page === "shop" ? "active" : ""}`}>
            Shop
          </span>
        </Link>
        <Link href="/about">
          <span className={`trans ${page === "about" ? "active" : ""}`}>
            About
          </span>
        </Link>
        <Link href="/admin">
          <span className={`trans ${page === "admin" ? "active" : ""}`}>
            Admin
          </span>
        </Link>
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="navCart-con f fcenter">
        <span>
          {false ? (
            // <Image src="" />
            <div></div>
          ) : (
            <button
              className={`trans ${page === "profile" ? "active" : ""}`}
              type="button"
            >
              <Link href="/login/profile">
                <FaUser />
              </Link>
            </button>
          )}
        </span>
        <span>
          <button
            className={`trans ${page === "cart" ? "active" : ""}`}
            type="button"
          >
            <Link href="/cart">
              <BsCartFill />
            </Link>
          </button>
        </span>
      </div>
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = styled.nav`
  max-width: 1170px;
  justify-content: space-between;
  color: ${({ page }) => (page === "home" ? "white" : "var(--blue)")};
  height: 60px;
  padding: 0px 10px;
  .side-modal-btn {
    order: 3;
    font-size: 30px;
  }
  .logo-name {
    order: 1;
    font-family: "Lobster", cursive;
    border-bottom: 2px solid;
  }
  .search-bar {
    display: none;
  }
  .link-con {
    display: none;
    min-width: 18rem;
    /* justify-content: flex-end;
    flex: 0.45; */
    span {
      margin-right: 20px;
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      cursor: pointer;
    }
    span.active {
      border-bottom: 2px solid var(--pink);
    }
    span:hover {
      color: var(--pink);
    }
  }
  .navCart-con {
    order: 2;
    background: #ffffff;
    border-radius: 30px;
    width: 100px;
    height: 40px;
    padding: 10px;
    span {
      margin: 0px 7px;
    }
    button {
      font-size: 23px;
    }
    button.active {
      color: var(--pink);
    }
    color: black;
  }
  @media screen and (min-width: 525px) {
    .navCart-con {
      width: 110px;
    }
  }
  @media screen and (min-width: 768px) {
    .side-modal-btn {
      display: none;
    }
    .logo-name {
      display: none;
    }
    .search-bar {
      display: block;
    }
    .link-con {
      display: flex;
    }
    .navCart-con {
      width: 130px;
      order: 4;
    }
  }
`;
