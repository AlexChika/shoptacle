import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import Shoptacle from "../svg-components/shoptacle";
import SideBar from "./SideBar";
import { FaAngleLeft, FaAngleRight, FaTwitter, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
const LandingPageHero = () => {
  return (
    <Wrapper className="layout">
      {/* backgrounds */}
      <section className="background-layout trans">
        <div className="hero-logo minvh f fcenter">
          <Shoptacle fill={"#9A9489"} />
        </div>
        <div className="smallImages minvh display">
          <div className="image-one"></div>
          <div className="image-two"></div>
        </div>
        <div className="emptySpace minvh"></div>
      </section>

      {/* main page content */}
      <main className="hero-main-content">
        <NavBar page="home" />
        <SideBar />

        <section className="body">
          <div className="emptySpace minvh"></div>

          <div className="mainContent minvh f fcenter">
            <div className="hero-title">
              <h1>Think Fashion? Think Us</h1>
              <h2 className="mt10">Luxury / Efficiency / Honesty</h2>
              <h3 className="mt30 center">Explore</h3>
            </div>
            <div className="hero-nav f">
              <button className="f fcenter" type="button">
                <FaAngleLeft />
              </button>
              <button className="f fcenter" type="button">
                <FaAngleRight />
              </button>
            </div>
          </div>

          <div className="socialCon minvh f j-around align">
            <a href="#new-arrival" className="side-text trans">
              <h1>Trending Collections</h1>
            </a>
            <div className="social-icons">
              <a className="trans" href="https://twitter.com/Your_Own_Alex">
                <FaTwitter />
              </a>
              <a className="mt30 trans" href="https://github.com/AlexChika">
                <FaGithub />
              </a>
              <a className="mt30 trans" href="mailto:i.am.alex.chika@gmail.com">
                <IoIosMail />
              </a>
            </div>
          </div>
        </section>
      </main>
    </Wrapper>
  );
};
export default LandingPageHero;
const Wrapper = styled.main`
  position: relative;
  height: 100vh;
  background-image: url("/heroImage.jfif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 80% 50%;
  .background-layout {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: "shoptacle  emptySpace  emptySpace ";
    .hero-logo {
      grid-area: shoptacle;
      svg {
        width: 100px;
        height: 500px;
      }
    }
    .emptySpace {
      grid-area: emptySpace;
    }
  }
  .hero-main-content {
    position: absolute;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .body {
      min-height: calc(100% - 60px);
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-areas: "emptySpace mainContent mainContent mainContent mainContent mainContent socialCon";
    }
    .emptySpace {
      grid-area: emptySpace;
    }
    .mainContent {
      flex-direction: column;
      grid-area: mainContent;
      font-family: "lobster", cursive;
      text-align: center;
      color: white;
      font-style: normal;
      font-weight: 400;
      h1 {
        font-size: 25px;
        line-height: 40px;
        letter-spacing: 0.05em;
      }
      h2,
      h3 {
        font-size: 16px;
        line-height: 25px;
        letter-spacing: 0.12em;
      }
      h3 {
        width: max-content;
        border-bottom: 3px solid;
      }
      .hero-nav {
        margin-top: 70px;
        button {
          color: white;
          font-size: 35px;
          margin: 0px 30px;
          height: 80px;
          width: 80px;
        }
        button:hover,
        button:active {
          border-radius: 50%;
          border: 2px solid white;
        }
      }
    }
    .socialCon {
      grid-area: socialCon;
      flex-direction: column;
      font-family: "Inter";
      font-style: normal;
      color: white;
      .side-text {
        writing-mode: vertical-lr;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.14em;
        padding: 5px;
      }
      h1 {
        border-left: 3px solid white;
        cursor: pointer;
      }
      a {
        font-size: 18px;
        display: block;
      }
      a:hover,
      a:active,
      a:focus {
        color: grey;
      }
    }
  }
  @media screen and (min-width: 576px) {
    .hero-main-content {
      .mainContent {
        h1 {
          font-size: 45px;
          line-height: 55px;
        }
        h2,
        h3 {
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 0.12em;
        }
        .hero-nav {
          margin-top: 90px;
        }
      }
      .socialCon {
        .side-text {
          font-size: 14px;
        }
        a {
          font-size: 20px;
        }
      }
    }
  }
  @media screen and (min-width: 660px) {
    background-position: 50% 50%;
  }
  @media screen and (min-width: 768px) {
    height: 1000px;
    .background-layout {
      grid-template-columns: repeat(7, 1fr);
      grid-template-areas: "shoptacle smallImages smallImages emptySpace emptySpace emptySpace emptySpace ";
      .hero-logo {
        grid-area: shoptacle;
        padding: 0px 20px;
        svg {
          width: 141px;
          height: 800px;
        }
      }
      .smallImages {
        .image-one,
        .image-two {
          height: 50%;
          width: 100%;
        }
        .image-one {
          background-image: url("/heroImage2.jfif");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 60% 50%;
        }
        .image-two {
          background-image: url("/heroImage3.jfif");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 80% 50%;
        }
        grid-area: smallImages;
      }
    }
    .hero-main-content {
      .mainContent {
        h1 {
          font-size: 50px;
          line-height: 99px;
        }
        h2,
        h3 {
          font-size: 25px;
          line-height: 41px;
        }
        .hero-nav {
          margin-top: 100px;
        }
      }
      .socialCon {
        .side-text {
          font-size: 16px;
        }
        a {
          font-size: 25px;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .background-layout {
      .hero-logo {
        svg {
          width: 161px;
          height: 847px;
        }
      }
    }
  }
`;
