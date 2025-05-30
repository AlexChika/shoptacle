import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import NavBar from "shared/components/NavBar";
import Shoptacle from "@svg-components/shoptacle";
import SideBar from "shared/components/SideBar";
import { FaAngleLeft, FaAngleRight, FaTwitter, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { backgrounds } from "@utils/data";
const LandingPageHero = () => {
  const [index, setIndex] = useState(null);
  const backgroundImages = backgrounds[index] || backgrounds[0];

  function changeBackground(dir) {
    setIndex((prev) => {
      // preventing changeOfbackground untill image is fully loaded and startDynamicBg func changes index to zero

      if (prev === null) return prev;

      if (dir === "left") {
        const newIndex = prev - 1 < 0 ? backgrounds.length - 1 : prev - 1;
        return newIndex;
      }
      const newIndex = prev + 1 > backgrounds.length - 1 ? 0 : prev + 1;

      return newIndex;
    });
  }

  const loadImage = useCallback(function (src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      function onload() {
        resolve(img);
        // prevent memory leak
        img.removeEventListener("load", onload);
        img.removeEventListener("error", onerror);
      }

      function onerror() {
        reject(img);
        // prevent memory leak
        img.removeEventListener("error", onerror);
        img.removeEventListener("load", onload);
      }
      img.src = src;
      img.addEventListener("load", onload);
      img.addEventListener("error", onerror);
    });
  }, []);

  const loadAllImages = useCallback(
    async function () {
      let images = [];
      for (let i = 0; i < backgrounds.length; i++) {
        images.push(loadImage(backgrounds[i].primary.src));
        images.push(loadImage(backgrounds[i].secondary1.src));
        images.push(loadImage(backgrounds[i].secondary2.src));
      }

      try {
        await Promise.all(images);
        images.length = 0; // free memory
        return true;
      } catch (error) {
        // an image failed to load
        return false;
      }
    },
    [loadImage]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      changeBackground("right");
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function startDynamicBg() {
      const allLoaded = await loadAllImages();

      if (allLoaded) {
        setIndex((prev) => 0);
        return;
      }

      setTimeout(() => {
        startDynamicBg();
      }, 20000); // retry after 20 second
    }

    startDynamicBg();
  }, [loadAllImages]);

  return (
    <Wrapper $bg={backgroundImages} className="layout">
      {/* backgrounds */}
      <section className="background-layout trans">
        <div className="hero-logo minvh f fcenter">
          <Shoptacle fill={backgroundImages.theme} />
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
              <button
                onClick={() => changeBackground("left")}
                className="f fcenter"
                type="button"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={() => changeBackground("right")}
                className="f fcenter"
                type="button"
              >
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
              <a className="mt30 trans" href="mailto:contact@alexchika.com">
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
  background-image: ${({ $bg }) => `url(${$bg.primary.src})`};
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
      text-align: center;
      color: white;
      font-style: normal;
      font-weight: 400;
      h1,
      h2,
      h3 {
        font-family: "lobster", cursive;
      }
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
      font-family: "Roboto", sans-serif;
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
          /* background-image: url("/heroImage2.jfif"); */
          background-image: ${({ $bg }) => `url(${$bg.secondary1.src})`};
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 60% 50%;
          background-position: top;
        }
        .image-two {
          /* background-image: url("/heroImage3.jfif"); */
          background-image: ${({ $bg }) => `url(${$bg.secondary2.src})`};
          background-repeat: no-repeat;
          background-size: cover;
          /* background-position: 80% 50%; */
          background-position: top;
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
