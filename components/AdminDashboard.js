import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "../store/Context";
import AdminDashBoardHome from "./AdminDashBoardHome";
import AdminAdd from "./AdminAdd";
import AdminEdit from "./AdminEdit";
import AdminSearch from "./AdminSearch";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsFillFileEarmarkPlusFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { IoMdList } from "react-icons/io";
import { MdDashboard, MdExitToApp } from "react-icons/md";
import { FaSearch, FaEdit, FaTimes } from "react-icons/fa";

// app
const AdminDashboard = ({ user }) => {
  const [currentTab, setCurrentTab] = useState(0);
  // const { logout, dispatch } = Store();
  const [sideBar, setSideBar] = useState(true);

  // local funcs
  const handleLogout = () => {
    console.log("hello");
  };
  const handleSetTab = (tab) => {
    setCurrentTab(tab);
    setSideBar(false);
  };
  // const handleLogout = async () => {
  //   setStatus({
  //     text1: statusText.logoutWaiting1,
  //     text2: "",
  //   });
  //   setModal(true);
  //   try {
  //     await logout();
  //     dispatch({ type: "NO_USER" });
  //     setModal(true);
  //     setStatus({
  //       text1: statusText.logoutSuccess1,
  //       text2: "",
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     setStatus({
  //       text1: error.message,
  //       text2: "Please Try Again",
  //     });
  //     setModal(true);
  //   }
  // };
  // const handleTheme = () => {
  //   dispatch({ type: "THEME" });
  // };
  return (
    <DashboardWrapper className="f opacity">
      <section className={`sideBar trans ${sideBar ? "" : "close"}`}>
        <span onClick={() => setSideBar(!sideBar)} className="arrow">
          {sideBar ? <BsArrowLeftCircleFill /> : <BsArrowRightCircleFill />}
        </span>
        <div className="linkCon">
          <button
            className={currentTab == 0 ? "active" : ""}
            onClick={() => handleSetTab(0)}
          >
            <span className="icon">
              <MdDashboard />
            </span>
            <span className="text">Dashboard</span>
          </button>
          <button
            className={currentTab == 1 ? "active" : ""}
            onClick={() => handleSetTab(1)}
          >
            <span className="icon">
              <FaSearch />
            </span>
            <span className="text">Search</span>
          </button>
          <button
            className={currentTab == 2 ? "active" : ""}
            onClick={() => handleSetTab(2)}
          >
            <span className="icon">
              <BsFillFileEarmarkPlusFill />
            </span>
            <span className="text">Add</span>
          </button>
          <button
            className={currentTab == 3 ? "active" : ""}
            onClick={() => handleSetTab(3)}
          >
            <span className=" icon">
              <FaEdit />
            </span>
            <span className="text">Edit</span>
          </button>
          <button
            className={currentTab == 4 ? "active" : ""}
            onClick={() => handleSetTab(4)}
          >
            <span className="icon">
              <MdExitToApp />
            </span>
            <span className="text">Log out</span>
          </button>
        </div>
      </section>
      <section className="content">
        <div className="heading">
          <button
            onClick={() => setSideBar(!sideBar)}
            className={`navigation ${sideBar ? "hide" : ""}`}
          >
            <span className="icon">
              <IoMdList />
            </span>{" "}
          </button>
          {user ? (
            <h3 className="f align center">
              <span style={{ color: "green" }}>
                <BsFillCheckCircleFill />
              </span>{" "}
              &nbsp; Admin {"Alex"}
            </h3>
          ) : (
            <h3 className="f align center">
              <span style={{ color: "tomato" }}>
                <FaTimes />
              </span>{" "}
              &nbsp; Admin {"Alex"}
            </h3>
          )}
        </div>
        <main className="mt10">
          {currentTab == 0 && <AdminDashBoardHome />}
          {currentTab == 1 && <AdminSearch />}
          {currentTab == 2 && <AdminAdd />}
          {currentTab == 3 && <AdminEdit />}
        </main>
      </section>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
const DashboardWrapper = styled.main`
  background-color: white;
  color: var(--blue);
  min-height: 100vh;
  position: relative;

  .sideBar {
    background: var(--blue);
    transform: translateX(0px);
    border-top-right-radius: 50px;
    width: 100%;
    position: fixed;
    z-index: 7;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    .arrow {
      color: var(--blue);
      padding: 10px;
      display: block;
      width: 100%;
      text-align: center;
      font-size: 30px;
      animation: blink 2s linear infinite;
    }
    @keyframes blink {
      50% {
        color: white;
      }
    }
    .linkCon {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: calc(100% - 110px);
      color: white;

      button {
        display: flex;
        padding: 10px 0px 10px 20px;
        text-align: justify;
        align-items: center;
        transition: all 0.3s linear;
      }
      .text {
        font-size: 30px;
      }
      .icon {
        display: flex;
        align-items: center;
        padding-right: 40px;
        font-size: 40px;
      }
      .active {
        color: var(--blue);
        background-color: white;
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
      }
    }
  }
  .sideBar.close {
    transform: translateX(-100%);
    width: 100px;
    .linkCon {
      .text {
        display: none;
      }
    }
  }
  .content {
    padding: 0px 10px;
    width: 100%;
    overflow-y: auto;
    .heading {
      padding: 5px;
      h3 {
        border-bottom: 1px solid var(--gray);
        width: max-content;
      }
      .navigation {
        position: fixed;
        color: red;
        font-size: 30px;
      }
      .navigation.hide {
        display: none;
      }
    }
    main {
    }
  }
  @media screen and (min-width: 320px) {
    .sideBar {
      width: 300px;
    }
  }
  @media screen and (min-width: 768px) {
    .navigation {
      display: none;
    }
    .sideBar {
      position: sticky;
      width: 350px;
    }
    .sideBar.close {
      transform: translateX(0px);
    }
  }
`;
