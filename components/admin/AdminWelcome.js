import styled from "styled-components";
import Link from "next/link";
import NavBar from "shared/components/NavBar";
import HeroBar from "shared/components/HeroBar";

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
  padding-bottom: 50px;

  /* Section Styles */
  .section {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    max-width: 1170px;
    min-height: 80vh;
    background-color: white;
    padding: 60px 40px;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  /* Typography */
  .section h1 {
    color: #323148;
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 24px;
    position: relative;
    padding-bottom: 16px;
    font-family: "Lobster", cursive;
  }

  .section h1::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 4px;
    background: linear-gradient(90deg, #323148, #585880);
    border-radius: 2px;
  }

  .section p {
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    max-width: 680px;
    margin: 0 auto 40px;
  }

  .section span {
    font-size: 16px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 20px;
    max-width: 680px;
  }

  /* Links */
  .section a {
    color: #3a7bc8;
    text-decoration: none;
    transition: color 0.2s ease, text-decoration 0.2s ease;
    font-weight: 500;
  }

  .section a:hover {
    color: #1f5aa3;
    text-decoration: underline;
  }

  /* Button */
  .section .btn {
    display: inline-block;
    background-color: var(--blue);
    color: white;
    padding: 14px 32px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-top: 20px;
    box-shadow: 0 4px 12px rgba(50, 49, 72, 0.15);
  }

  .section .btn:hover {
    background-color: var(--blue-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(50, 49, 72, 0.2);
    text-decoration: none;
    color: white;
  }

  .section .btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(50, 49, 72, 0.15);
  }

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    .section {
      min-width: 100%;
      padding: 50px 30px;
    }

    .section h1 {
      font-size: 36px;
    }
  }

  @media (max-width: 768px) {
    .section {
      padding: 40px 20px;
    }

    .section h1 {
      font-size: 30px;
    }

    .section p {
      font-size: 16px;
    }

    .section span {
      font-size: 15px;
    }
  }
  /* .section {
    flex-direction: column;
    max-width: 1170px;
    min-height: 80vh;
    padding: 20px;
    margin-top: 40px;
    background-color: white;

    h1 {
      text-align: center;
      font-family: "Lobster", cursive;
    }

    p,
    span,
    a {
      font-size: 18px;
      max-width: 400px;
    }
    p {
      color: red;
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
  } */
`;
