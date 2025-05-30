import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "@store/Context";
import { TbPlaylistX } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import SearchBar from "shared/components/SearchBar";
import { signOut } from "firebase/auth";
import { auth } from "@utils/firebase";
const SideBar = () => {
  const router = useRouter();
  const { modalOpen, handleCloseModal, user } = Store();

  const handleRoute = (url) => {
    if (typeof url !== "string")
      throw new Error(`the url ${url} is an invalid input or not a string`);
    handleCloseModal();
    router.push(url);
  };

  const handleLogout = async () => {
    handleCloseModal();
    await signOut(auth);
  };

  return (
    <Wrapper modal={modalOpen} className="trans">
      <div className="header f align j-between">
        {user && user.url ? (
          <button
            onClick={() => {
              handleRoute("/profile");
            }}
            type="button"
            className="profile-img"
          >
            <Image layout="fill" src={user.url} alt="profile image" />
          </button>
        ) : (
          <button
            onClick={() => {
              handleRoute("/profile");
            }}
            className="user-btn"
            type="button"
          >
            <FaUser />
          </button>
        )}

        <Link href="/">
          <h1 className="c-color">Shoptacle</h1>
        </Link>

        <button
          onClick={handleCloseModal}
          type="button"
          className="close-btn c-color"
        >
          <TbPlaylistX />
        </button>
      </div>
      <section className="sidebar-content">
        <h3 className="f align">
          <span>Search</span>
          <span>
            <SearchBar />
          </span>
        </h3>
        <button className="link" onClick={() => handleRoute("/")}>
          Home
        </button>{" "}
        <button className="link" onClick={() => handleRoute("/shop")}>
          Shop
        </button>
        <h3>Category</h3>
        <button
          className="link"
          onClick={() => handleRoute("/shop/male-fashion")}
        >
          Male Fashion
        </button>
        <button
          className="link"
          onClick={() => handleRoute("/shop/female-fashion")}
        >
          Female fashion
        </button>
        <button
          className="link"
          onClick={() => handleRoute("/shop/unisex-shoes")}
        >
          Unisex shoes
        </button>
        <button
          className="link"
          onClick={() => handleRoute("/shop/smart-gadgets")}
        >
          Smart gadgets
        </button>
        <h3>Account</h3>
        <button className="link" onClick={() => handleRoute("/cart")}>
          Cart
        </button>
        <button className="link" onClick={() => handleRoute("/profile")}>
          Profile
        </button>
        {user ? (
          <button className="link" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <button className="link" onClick={() => handleRoute("/profile")}>
            Login
          </button>
        )}
        <h3>Contact</h3>
        <button className="link" onClick={() => handleRoute("/about")}>
          About
        </button>
        <button className="link" onClick={() => handleRoute("/admin")}>
          Admin
        </button>
      </section>
    </Wrapper>
  );
};

export default SideBar;
const Wrapper = styled.main`
  position: fixed;
  background-color: var(--pink-light);
  z-index: 10;
  top: 0;
  min-height: calc(100vh);
  max-width: 465px;
  width: 100%;

  .header {
    padding: 10px 15px;
    text-align: center;
    box-shadow: 0px 1px 5px rgba(154, 148, 137, 0.4);
    .profile-img {
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      img {
        border-radius: 50%;
      }
    }
    h1 {
      font-size: 25px;
      font-family: "Lobster", cursive;
    }
    .close-btn {
      font-size: 30px;
    }
    .user-btn {
      font-size: 25px;
    }
  }

  .sidebar-content {
    height: calc(100vh - 80px);
    overflow-y: auto;
    padding: 30px 10px;

    h3 {
      background-color: var(--blue);
      padding: 10px;
      color: white;
      margin-top: 20px;
      font-size: 20px;
      border-radius: 8px;
    }

    span {
      padding-right: 10px;
      color: white;
    }

    .link {
      font-size: 16px;
      display: block;
      margin-top: 20px;
      color: var(--blue);
      opacity: 0.9;
      padding: 5px 20px;
      border-radius: 10px;
      text-decoration: underline;
    }
  }

  transform: ${(props) =>
    props.modal ? "translateX(0)" : "translateX(-110%)"};
  @media screen and (min-width: 768px) {
    left: -100%;
  }
`;
