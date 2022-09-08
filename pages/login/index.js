import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import Logo from "../../public/icon.png";
import { Store } from "../../store/Context";
import { Validate } from "../../utils/functions";
import { auth, getCustomerDocRef } from "../../utils/firebase";

// firebase imports
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc } from "firebase/firestore";

// app
const Index = () => {
  const { Logger, user } = Store();
  const router = useRouter();
  // states
  const containerRef = useRef(null);
  const [signin, setSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: {
      valid: false,
      value: "",
    },
    password: {
      valid: false,
      value: "",
    },
  });
  const [signUpDetails, setSignUpDetails] = useState({
    ["first name"]: {
      valid: false,
      value: "",
    },
    ["last name"]: {
      valid: false,
      value: "",
    },
    email: {
      valid: false,
      value: "",
    },
    password: {
      valid: false,
      value: "",
    },
  });

  const validate = new Validate();
  // funcs
  function logError(value, type, element, min, max, name) {
    if (type == "equal") throw new Error(`check type equal directly`);
    let { valid, msg } = validate[type](value, min, max, name);
    if (valid == false) {
      element.nextSibling.textContent = msg;
    } else {
      element.nextSibling.textContent = "";
    }
    return valid;
  }

  function loginOnchange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name == "email") {
      let valid = logError(value, "email", e.target);
      setLoginDetails({
        ...loginDetails,
        [name]: { ...loginDetails[name], valid, value },
      });
    }
    if (name == "password") {
      let valid = logError(value, "text", e.target, 6, 15, "password");
      setLoginDetails({
        ...loginDetails,
        [name]: { ...loginDetails[name], valid, value },
      });
    }
  }

  function signUpOnchange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name == "first name") {
      let valid = logError(value, "text", e.target);
      setSignUpDetails({
        ...signUpDetails,
        [name]: { ...signUpDetails[name], valid, value },
      });
    }
    if (name == "last name") {
      let valid = logError(value, "text", e.target);
      setSignUpDetails({
        ...signUpDetails,
        [name]: { ...signUpDetails[name], valid, value },
      });
    }
    if (name == "email") {
      let valid = logError(value, "email", e.target);
      setSignUpDetails({
        ...signUpDetails,
        [name]: { ...signUpDetails[name], valid, value },
      });
    }
    if (name == "password") {
      let valid = logError(value, "text", e.target, 6, 15, "password");
      setSignUpDetails({
        ...signUpDetails,
        [name]: { ...signUpDetails[name], valid, value },
      });
    }
  }

  const handleUserLogIn = async (e) => {
    e.preventDefault();
    for (const key in loginDetails) {
      if (loginDetails[key].valid == false) {
        Logger("Invalid entries, Please try again", "error");
        return;
      }
      const email = loginDetails.email.value;
      const password = loginDetails.password.value;
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Logger("Login successful", "success");
      } catch (error) {
        setLoading(false);
        Logger(error.message, "error");
      }
    }
  };

  const handleUserSignUp = async (e) => {
    e.preventDefault();

    for (const key in signUpDetails) {
      if (signUpDetails[key].valid == false) {
        Logger("Invalid entries, Please try again", "error");
        return;
      }
    }

    const email = signUpDetails.email.value;
    const password = signUpDetails.password.value;

    const userData = {
      firstName: signUpDetails["first name"].value,
      lastName: signUpDetails["last name"].value,
      address:
        "You have not updated your profile, Edit profile to add your full address",
      email,
    };

    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      if (user) {
        const customerDocRef = getCustomerDocRef(email);
        try {
          await setDoc(customerDocRef, userData);
          setLoading(false);
          Logger("Sign Up succesful, please wait", "success");
        } catch (error) {
          setLoading(false);
          Logger(error.message, "error");
          return;
        }
      }
    } catch (error) {
      setLoading(false);
      Logger(error.message, "error");
    }
  };

  useEffect(() => {
    window.scrollTo(0, Number(containerRef.current.offsetTop) - 100);
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/login/profile");
    }
  }, [user]);
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
                    value={loginDetails.email.value}
                    onChange={loginOnchange}
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                  />
                  <small className="status mt10"></small>
                </div>
                <div className="inputCon f mt20">
                  <input
                    value={loginDetails.password.value}
                    onChange={loginOnchange}
                    type="text"
                    placeholder="Enter your password"
                    name="password"
                  />
                  <small className="status mt10"></small>
                </div>
                <div
                  style={{ display: loading ? "block" : "none" }}
                  className="spinner mt10"
                ></div>
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
              <form onSubmit={handleUserSignUp} className="f j-around align">
                {/* name */}
                <div className="inputCon f mt20">
                  <input
                    value={signUpDetails["first name"].value}
                    onChange={signUpOnchange}
                    type="text"
                    placeholder="First Name"
                    name="first name"
                    id=""
                  />
                  <small className="status"></small>
                </div>
                {/* last name */}
                <div className="inputCon f mt20">
                  <input
                    value={signUpDetails["last name"].value}
                    onChange={signUpOnchange}
                    type="text"
                    placeholder="Last Name"
                    name="last name"
                    id=""
                  />
                  <small className="status"></small>
                </div>
                {/* email */}
                <div className="inputCon f mt20">
                  <input
                    value={signUpDetails.email.value}
                    onChange={signUpOnchange}
                    type="email"
                    placeholder="Your Email"
                    name="email"
                  />
                  <small className="status"></small>
                </div>
                {/* password */}
                <div className="inputCon f mt20">
                  <input
                    value={signUpDetails.password.value}
                    onChange={signUpOnchange}
                    type="text"
                    placeholder="Enter your pasword"
                    name="password"
                    id=""
                  />
                  <small className="status"></small>
                </div>

                <div
                  style={{ display: loading ? "block" : "none" }}
                  className="spinner mt10"
                ></div>

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
    input {
      border-bottom: 1px solid var(--blue);
      padding: 10px 0px 5px 0px;
    }

    input::placeholder {
      color: gray;
    }
    span {
      text-decoration: underline;
      cursor: pointer;
    }

    small {
      color: red;
    }

    .inputCon {
      width: 100%;
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
