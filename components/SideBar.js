import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Store } from "../store/Context";
import { TbPlaylistX } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import SearchBar from "./SearchBar";
import profileImage from "../public/icon.png";
const SideBar = () => {
  const { modalOpen, handleCloseModal } = Store();
  return (
    <Wrapper modal={modalOpen} className="trans">
      <div className="logo-con f align j-around">
        {true ? (
          <button type="button" className="profile-img">
            <Image src={profileImage} alt="profile image" />
          </button>
        ) : (
          <button className="user-btn" type="button">
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
      <SearchBar />
      <h1 className="mt20">welcome to SideBar</h1>
    </Wrapper>
  );
};

export default SideBar;
const Wrapper = styled.section`
  position: fixed;
  background-color: var(--pink-light);
  z-index: 10;
  margin-top: -70px;
  min-height: calc(100vh + 70px);
  max-width: 465px;
  width: 100%;
  .logo-con {
    padding: 20px 10px;
    text-align: center;
    font-family: "Lobster", cursive;
    box-shadow: 0px 1px 5px rgba(154, 148, 137, 0.4);
    .profile-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      img {
        border-radius: 50%;
      }
    }
  }
  .close-btn {
    font-size: 30px;
  }
  .user-btn {
    font-size: 25px;
  }
  transform: ${(props) =>
    props.modal ? "translateX(0)" : "translateX(-110%)"};
  @media screen and (min-width: 768px) {
    transform: translateX(-110%);
  }
`;
