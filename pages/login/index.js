import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import Logo from "../../public/icon.png";
const Index = () => {
  const containerRef = useRef(null);
  const [signin, setSignIn] = useState(true);
  const handleUserLogIn = (e) => {
    e.preventDefault();
    console.log("hello from login");
  };
  useEffect(() => {
    // containerRef.current.focus();
    window.scrollTo(0, Number(containerRef.current.offsetTop) - 100);
  }, []);

  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar />
      <main className="body f fcenter center mt30">
        <section ref={containerRef} className="container f center">
          {/* side banner display */}
          <article className="side-banner f fcenter gray">
            <div className="content f fcenter">
              <div className="logo center">
                <Image layout="fill" src={Logo} alt="logo icon"></Image>
              </div>
              <h1>Shoptacle</h1>
              <p>Your one stop for perfect fashion</p>
            </div>
          </article>
          {/* signin and sign up  */}
          <article className={`login-card ${signin ? "" : "active"} center`}>
            {/* sign in */}
            <div className="signin card f align j-around trans">
              <div>
                <h1>Shoptacle</h1>
                <p className="mt20">Welcome to Shoptacle</p>
                <h3 className="mt30">Login to your account</h3>
              </div>
              <form onSubmit={handleUserLogIn} className="f align j-around">
                <div className="inputCon f mt20">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    name=""
                    id="signin-email"
                  />
                  <code className="status"></code>
                </div>
                <div className="inputCon f mt20">
                  <input
                    type="text"
                    placeholder="Enter your password"
                    name=""
                    id="signin-pass"
                  />
                  <code className="status"></code>
                </div>

                <button className="mt30" type="submit">
                  Login
                </button>
              </form>
              <p>
                Don&apos;t have an account ?{" "}
                <span
                  onClick={() => {
                    setSignIn(!signin);
                  }}
                >
                  Sign up here
                </span>
              </p>
            </div>
            {/* signup  */}
            <div className="card signup f align j-around trans">
              <div>
                <h1>Shoptacle</h1>
                <p className="mt10">Welcome to Shoptacle</p>
                <h3 className="mt20">Create an account for free</h3>
              </div>
              <form onSubmit={handleUserLogIn} className="f j-around align">
                {/* name */}
                <div className="inputCon f mt20">
                  <input type="text" placeholder="First Name" name="" id="" />
                  <code className="status"></code>
                </div>
                {/* last name */}
                <div className="inputCon f mt20">
                  <input type="text" placeholder="Last Name" name="" id="" />
                  <code className="status"></code>
                </div>
                {/* email */}
                <div className="inputCon f mt20">
                  <input type="email" placeholder="Your Email" name="" id="" />
                  <code className="status"></code>
                </div>
                {/* password */}
                <div className="inputCon f mt20">
                  <input
                    type="text"
                    placeholder="Enter your pasword"
                    name=""
                    id=""
                  />
                  <code className="status"></code>
                </div>
                <div className="inputCon f mt20">
                  <input
                    type="text"
                    placeholder="verify your password "
                    name=""
                    id=""
                  />
                  <code className="status"></code>
                </div>
                <button className="mt20" type="submit">
                  Sign up
                </button>
              </form>
              <p>
                You own an account ? please{" "}
                <span
                  onClick={() => {
                    setSignIn(!signin);
                  }}
                >
                  Sign in here
                </span>
              </p>
            </div>
          </article>
        </section>
      </main>
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;
  .body {
    padding: 30px 0px;
    /* margin-bottom: 30px; */
    max-width: 1170px;
  }
  .body .container {
    height: 550px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    article {
      width: 95%;
    }
  }

  /* ........... */
  .side-banner {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url("/heroImage.jfif");
    background-position: 80% 0%;
    display: none;
    text-align: center;
    color: var(--blue);
    /* color: white; */
    .content {
      flex-direction: column;
      height: 200px;
      width: 200px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      padding: 10px;
    }
    .logo {
      position: relative;
      width: 100px;
      aspect-ratio: 4/3;
    }
    h1 {
      font-family: "Lobster", cursive;
      font-size: 25px;
    }
    p {
      font-style: italic;
    }
  }

  /* ......... */
  .login-card {
    overflow: hidden;
    background-color: white;
    /* background-color: rgba(255, 255, 255, 0.3); */

    position: relative;
  }
  .login-card.active .signup,
  .login-card.active .signin {
    transform: translateX(-100%);
  }

  .login-card .signin,
  .login-card .signup {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .login-card .card {
    flex-direction: column;
    color: gray;
    h1 {
      color: var(--blue);
      text-align: center;
      font-family: "Lobster", cursive;
      font-size: 25px;
    }
    p {
      text-align: center;
      font-style: italic;
    }
    input::placeholder {
      color: gray;
    }
    span {
      text-decoration: underline;
      cursor: pointer;
    }
    .inputCon {
      width: 100%;
      padding: 10px 0px 5px 0px;
      border-bottom: 1px solid var(--blue);
      flex-direction: column;
    }
    button {
      background-color: gray;
      width: 10em;
      padding: 10px 20px;
      border-radius: 20px;
      color: white;
    }
    form {
      flex-direction: column;
      max-width: 300px;
      width: 90%;
    }
  }

  .login-card .signup {
    left: 100%;
    .inputCon {
      padding: 0;
      border-bottom: 0px;
    }
    input {
      background-color: whitesmoke;
      color: black;
      padding: 10px;
    }
    input::placeholder {
      color: gray;
    }
  }

  @media screen and (min-width: 768px) {
    .body {
      min-height: 100vh;
    }
    .body .container {
      article {
        width: 50%;
      }
    }
    .side-banner {
      display: flex;
    }
  }
`;
