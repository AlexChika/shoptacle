import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Store } from "../store/Context";
import Logo from "../public/icon.png";
import Modal from "./Modal";
// import { statusText } from "../utils/utils";
const AdminDashboard = () => {
  // const navigate = useNavigate();
  const router = useRouter();
  // const { logout, dispatch } = Store();
  const [sideBar, setSideBar] = useState(true);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState({ text1: "", text2: "" });
  let isDashboard = false;
  const handleLogout = () => {
    console.log("hello");
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
    <DashboardWrapper className="f">
      <section className={`sideBar trans ${sideBar ? "" : "close"}`}>
        <span onClick={() => setSideBar(!sideBar)} className="arrow">
          {sideBar ? "left" : "right"}
        </span>
        <div className="linkCon">
          <button
            onClick={() => setSideBar(false)}
            className={isDashboard === "dashboard" ? "active" : ""}
          >
            <span className="icon">A</span>
            <span className="text">Add Item</span>
          </button>
          <button onClick={() => setSideBar(false)}>
            <span className="icon">E</span>
            <span className="text">Edit Item</span>
          </button>
          <button onClick={() => setSideBar(false)} href="/dashboard/profile">
            <span className="icon">D</span>
            <span className="text">Dashboard</span>
          </button>
          <button onClick={handleLogout}>
            <span className="icon">L</span>
            <span className="text">Exit</span>
          </button>
          <button onClick={handleLogout}>
            <span className="icon">L</span>
            <span className="text">Log out</span>
          </button>
          <button onClick={handleLogout}>
            <span className="icon">L</span>
            <span className="text">etc</span>
          </button>
        </div>
      </section>
      <section className="content">
        <button
          onClick={() => setSideBar(!sideBar)}
          className={`navigation ${sideBar ? "hide" : ""}`}
        >
          <span className="icon">
            <i className="bi bi-list"></i>{" "}
          </span>
        </button>

        <main>
          everything here
          {/* <Outlet /> */}
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
  .icon {
    font-size: 50px;
    color: inherit;
  }
  .arrow {
    padding: 10px;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 30px;
    animation: blink 2s linear infinite;
  }
  .navigation {
    position: fixed;
    /* color: ${(props) => props.theme.color}; */
    color: white;
    top: 5px;
    font-size: 30px;
    color: chocolate;
  }
  .navigation.hide {
    display: none;
  }
  @keyframes blink {
    50% {
      color: tomato;
    }
  }
  .sideBar {
    background: var(--pink);
    transform: translateX(0px);
    border-top-right-radius: 50px;
    width: 100%;
    position: fixed;
    z-index: 7;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    .heading {
      .logo {
        img {
          display: block;
          height: 6em;
          margin: 0 auto;
        }
      }
    }
    .linkCon {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: calc(100% - 212px);
      margin-top: 50px;
      color: var(--blue);
      a,
      div {
        padding: 5px 10px;
        display: block;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .text {
        font-size: 30px;
        flex: 0.8;
      }
      .icon {
        padding-left: 10px;
      }
      .active {
        color: ${(props) => props.theme.color};
        background-color: ${(props) => props.theme.bg};
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
      }
    }
  }
  .sideBar.close {
    transform: translateX(-100%);
    width: 120px;
    min-width: 120px;
    .linkCon {
      .text {
        display: none;
      }
    }
  }
  .content {
    padding: 50px 10px;
    /* background: linear-gradient(
      to right,
      #a080a0,
      ${(props) => props.theme.kodecamp}
    ); */
    // overflow-y: auto;
    width: 100%;
  }
  @media screen and (min-width: 548px) {
    .sideBar {
      max-width: 500px;
      width: 80%;
      min-width: 300px;
    }
  }
  @media screen and (min-width: 768px) {
    .navigation {
      display: none;
    }
    .sideBar {
      max-width: 500px;
      width: 30%;
      min-width: 300px;
      position: sticky;
    }
    .sideBar.close {
      transform: translateX(0px);
      width: 120px;
      min-width: 120px;
      .linkCon {
        .text {
          display: none;
        }
      }
    }
  }
`;
