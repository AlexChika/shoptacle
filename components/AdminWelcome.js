import React from "react";
import styled from "styled-components";
import Link from "next/link";
import NavBar from "./NavBar";
import HeroBar from "./HeroBar";

const AdminWelcome = () => {
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
          To Make Edits or Add products, please send a mail here
          <a href="mailto:contact@alexchika.com">
            {" "}
            (contact@alexchika.com){" "}
          </a>{" "}
          for admin access
        </span>

        <span>
          We are eager to receive your reviews. Please report issues / errors or
          get in contact here{" "}
          <a href="mailto:contact@alexchika.com">(contact@alexchika.com) </a>
        </span>

        <Link href="/profile" passHref>
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
  padding-bottom: 40px;
  .section {
    flex-direction: column;
    max-width: 1170px;
    min-height: 80vh;
    padding: 20px;
    margin-top: 40px;
    background-color: white;

    h1 {
      text-align: center;
    }
    p,
    span,
    a {
      font-size: 18px;
      max-width: 400px;
    }
    p {
      color: tomato;
      text-align: center;
    }

    span {
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
