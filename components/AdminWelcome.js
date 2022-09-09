import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Store } from "../store/Context";
import NavBar from "./NavBar";
import HeroBar from "./HeroBar";

const AdminWelcome = () => {
  // const { Logger, user } = Store();
  // Logger("You must be logged in to access this page", "error");
  return (
    <Wrapper>
      <NavBar page="admin" />
      <HeroBar path="/" pre={"Home"} curr={"Admin"} />
      <section className="section f align j-around center">
        <h1>Welcome To Shoptacle</h1>

        <p className="center">
          This is an Admin page, you need to be logged in to access this page.
          Create an account for free and manage shoptacle
        </p>

        <span>
          To Make Edits or Add products, please send a
          <a href="mailto:i.am.alex.chika@gmail.com">
            {" "}
            mail here (i.am.alex.chika@gmail.com){" "}
          </a>{" "}
          for admin access
        </span>

        <span>
          We are eager to receive your reviews. Please report issues / errors or
          get in contact{" "}
          <a href="mailto:i.am.alex.chika@gmail.com">
            here (i.am.alex.chika@gmail.com){" "}
          </a>
        </span>

        <Link href="/login" passHref>
          <a className="btn">Continue to Login</a>
        </Link>
      </section>
    </Wrapper>
  );
};

export default AdminWelcome;
const Wrapper = styled.main`
  background: var(--pink-light);
  color: var(--blue);

  .section {
    flex-direction: column;
    max-width: 1170px;
    min-height: 75vh;
    padding: 20px;

    h1 {
      text-align: center;
    }
    p,
    span,
    a {
      font-size: 16px;
      max-width: 400px;
    }
    p {
      color: red;
      text-align: center;
    }

    span {
      color: blue;
      text-align: center;
    }

    a {
      color: purple;
    }
    a.btn {
      border: 2px solid purple;
      padding: 10px;
    }
  }
`;
