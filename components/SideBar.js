import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Store } from "../store/Context";
import { TbPlaylistX } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import SearchBar from "./SearchBar";
const SideBar = () => {
  const { modalOpen, handleCloseModal } = Store();
  return (
    <Wrapper modal={modalOpen} className="trans">
      <div className="logo-con f align j-around">
        {
          <span>
            {false ? (
              // <Image src="" />
              <div></div>
            ) : (
              <button className="user-btn" type="button">
                <FaUser />
              </button>
            )}
          </span>
        }
        <h1 className="logo-color">Shoptacle</h1>
        <button onClick={handleCloseModal} type="button" className="close-btn">
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
    /* font-family: "qanect elegant"; */
    font-family: "Lobster", cursive;
    box-shadow: 0px 1px 5px rgba(154, 148, 137, 0.4);
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
