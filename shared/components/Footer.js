import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {
  BsBehance,
  BsGithub,
  BsEnvelopeFill,
  BsGlobe,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { Store } from "@store/Context";

const Footer = () => {
  const { hideFooter: hide } = Store();

  return (
    <Wrapper hide={hide} className="layout">
      <section className="footerHeader">
        <div className="col-wrapper">
          <div className="shoptacle f col">
            <Link href="/">
              <span>
                <Image
                  width={300}
                  height={70}
                  alt="Logo"
                  src="/logowhite.svg"
                />
              </span>
            </Link>

            <h5>
              The No 1 shopping platform for everything fashion. Stay premium
              and own the latest fashion when you shop on our handpicked massive
              collections.
            </h5>
          </div>

          <div className="about col f">
            <h3>About Us</h3>
            <h5>Our story</h5>
            <h5>Patners</h5>
            <h5>Staff directory</h5>
            <h5>Events</h5>
          </div>
        </div>

        <div className="col-wrapper">
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
        </div>
      </section>

      <section className="footerFooter f center">
        <article>
          <h5>
            <a
              href="https://www.behance.net/gallery/146232213/E-commerce-Store"
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
              href="https://www.alexchika.com"
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
            <a href="mailto:contact@alexchika.com">
              <BsEnvelopeFill />
            </a>
            <a
              href="https://www.alexchika.com"
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
  padding: 20px 0px;

  h5 {
    padding: 3px 0;
    text-align: center;
    font-size: 14px;
  }

  h3 {
    font-size: 18px;
    font-family: "Libre Baskerville", serif;
  }

  .footerHeader {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    flex-direction: column;
    gap: 0px 10px;

    .col-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      width: 100%;
      gap: 10px;
    }

    .col {
      width: 100%;
      min-height: 200px;
      background-color: #3c3b51;
      padding: 10px;
    }

    .shoptacle h5 {
      line-height: 25px;
    }
  }

  .shoptacle,
  .help,
  .info,
  .about {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .footerHeader,
  .footerFooter {
    margin: 0 auto;
    width: 95%;
  }

  .footerFooter {
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 0px;
    border-top: 2px solid #3c3b51;
    text-align: center;
    gap: 10px;

    h5 {
      margin: 0px 10px;
      color: rgb(255, 255, 255);
      font-size: 14px;
      a {
        font-family: "Libre Baskerville", serif;
        font-size: 12px;
      }
    }

    .icons a {
      font-size: 20px;
      margin: 0px 10px;
    }
  }

  @media screen and (min-width: 500px) {
    .footerHeader {
      .col-wrapper {
        flex-direction: row;
      }
    }
  }

  @media screen and (min-width: 546px) {
    .footerFooter {
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 1000px) {
    .footerHeader {
      flex-direction: row;
    }
  }
`;
