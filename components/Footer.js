import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Icon from "../public/icon.png";
import {
  BsBehance,
  BsGithub,
  BsEnvelopeFill,
  BsGlobe,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

const Footer = ({ hide }) => {
  return (
    <Wrapper hide={hide} className="layout">
      <section className="footerHeader f center">
        <div className="shoptacle f col">
          <Link href="/">
            <div className="f align">
              <span className="image-con">
                <Image alt="Logo" layout="fill" src={Icon} />
              </span>
              <h2>Shoptacle...</h2>
            </div>
          </Link>
          <h5 className="mt10">
            The No 1 shopping platform for everything fashion. Stay premium with
            the best qualities, own the latest fashion when you shop on our
            handpicked massive collections.
          </h5>
        </div>
        <div className="about col f">
          <h3>About Us</h3>
          <h5>Our story</h5>
          <h5>Patners</h5>
          <h5>Staff directory</h5>
          <h5>Events</h5>
        </div>
        <div className="help col f">
          <h3>Get Help</h3>
          <h5>Track order</h5>
          <h5>Shoping info</h5>
          <h5>Return policy</h5>
          <h5>Customer service</h5>
        </div>
        <div className="info col f">
          <h3>Information</h3>
          <h5>Our blog</h5>
          <h5>Subscribe to Newslater</h5>
          <h5>Contact us</h5>
          <h5>Leave a review</h5>
        </div>
        <div className="support col f">
          <h3>Donations</h3>
          <h5>Partner with us</h5>
          <h5>Privacy policy</h5>
          <h5>Refer us</h5>
        </div>
      </section>

      <section className="footerFooter f center">
        <article>
          <h5>
            <a
              href="https://www.behance.net/ClementinaClement"
              target="_blank"
              rel="noreferrer"
            >
              Designed by Clementina Clement <br /> UIUX Designer
            </a>
          </h5>
          <div className="icons mt10">
            <a
              href="https://www.behance.net/ClementinaClement"
              target="_blank"
              rel="noreferrer"
            >
              <BsBehance />
            </a>
            <a
              href="http://twitter.com/tinaclement19"
              target="_blank"
              rel="noreferrer"
            >
              <BsTwitter />
            </a>
            <a
              href="http://linkedin.com/in/clementina-clement"
              target="_blank"
              rel="noreferrer"
            >
              <BsLinkedin />
            </a>
          </div>
        </article>

        <article>
          <h5>
            <a
              href="https://i-am-alex.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Copyright &#169; 2022 Alex Chika <br /> Frontend Developer
            </a>
          </h5>
          <div className="icons mt10">
            <a
              href="https://github.com/AlexChika"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub />
            </a>
            <a href="mailto:i.am.alex.chika@gmail.com">
              <BsEnvelopeFill />
            </a>
            <a
              href="https://i-am-alex.netlify.app"
              target="_blank"
              rel="noreferrer"
            >
              <BsGlobe />
            </a>
          </div>
        </article>
      </section>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.footer`
  display: ${({ hide }) => (hide ? "none" : "block")};
  background: var(--blue);
  color: white;
  padding: 40px 20px 10px 20px;

  .footerHeader {
    flex-wrap: wrap;
    justify-content: space-around;
    .col {
      margin: 0 10px;
      margin-bottom: 20px;
      flex: 1;
      min-height: 100px;
      min-width: 220px;
      max-width: 320px;
      padding: 10px;
    }
  }

  h5 {
    padding: 5px 0;
  }

  .shoptacle {
    h2 {
      font-family: "Lobster", cursive;
      color: var(--pink);
      margin-left: 10px;
      cursor: pointer;
    }
    .image-con {
      position: relative;
      height: 3em;
      width: 3em;
    }
  }
  .shoptacle,
  .help,
  .support,
  .info,
  .about {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .footerFooter {
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 0px;
    margin-top: 30px;
    border-top: 1px solid grey;
    text-align: center;
    h5 {
      margin: 0px 10px;
      color: #bfbfff;
    }
    .icons a {
      font-size: 20px;
      margin: 0px 10px;
    }
  }
  @media screen and (min-width: 546px) {
    .footerFooter {
      justify-content: space-between;
    }
  }
`;
