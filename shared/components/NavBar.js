import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Store } from "@store/Context";
import { FaUser } from "react-icons/fa";
import { IoMdList } from "react-icons/io";
import { BsCartFill } from "react-icons/bs";
import SearchBar from "shared/components/SearchBar";

function NavBar({ page }) {
  const { handleCloseModal, user, cart } = Store();
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
        <span className={`trans ${page === "home" ? "active" : ""}`}>
          <Link href="/">Home</Link>
        </span>

        <span className={`trans ${page === "shop" ? "active" : ""}`}>
          <Link href="/shop">Shop</Link>
        </span>

        <span className={`trans ${page === "about" ? "active" : ""}`}>
          <Link href="/about">About</Link>
        </span>

        <span className={`trans ${page === "admin" ? "active" : ""}`}>
          <Link href="/admin">Admin</Link>
        </span>
      </div>

      <div className="search-bar">
        <SearchBar />
      </div>

      <div className="navCart-con f fcenter">
        <span>
          {user && user.url ? (
            <Link href="/profile" passHref>
              <a className="image">
                <Image src={user.url} layout="fill" />
              </a>
            </Link>
          ) : (
            <Link href="/profile" passHref>
              <a
                className={`trans ${page === "profile" ? "active" : ""}`}
                type="button"
              >
                <FaUser />
              </a>
            </Link>
          )}
        </span>

        <span>
          <Link href="/cart" passHref>
            <a
              className={`trans ${page === "cart" ? "active" : ""}`}
              type="button"
            >
              <BsCartFill />
              <small>{cart.length}</small>
            </a>
          </Link>
        </span>
      </div>
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = styled.nav`
  max-width: 1170px;
  background-color: inherit;
  z-index: 1;
  width: 100%;
  justify-content: space-between;
  color: ${({ page }) => (page === "home" ? "white" : "var(--blue)")};
  height: 60px;
  padding: 0px 15px;

  .side-modal-btn {
    order: 3;
    font-size: 30px;
  }

  .logo-name {
    order: 1;
    border-bottom: 2px solid;

    h1 {
      font-family: "Lobster", cursive;
      font-size: 25px;
    }
  }

  .search-bar {
    display: none;
  }

  .link-con {
    display: none;
    min-width: 18rem;

    span {
      margin-right: 20px;
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      cursor: pointer;
    }

    span.active {
      border-bottom: 2px solid;
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

    .image {
      display: block;
      position: relative;
      width: 25px;
      height: 25px;
      img {
        border-radius: 50%;
      }
    }

    a {
      font-size: 24px;
      position: relative;
    }

    a.active {
      color: var(--pink);
    }

    small {
      position: absolute;
      top: -12px;
      right: -10px;
      background-color: var(--pink);
      border-radius: 50%;
      padding: 4px;
      font-size: 11px;
      color: white;
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

  @media screen and (min-width: 1200px) {
    padding: 0px;
  }
`;
