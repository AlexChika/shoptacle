import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { Validate } from "utils/functions";
import { auth, getCustomerDocRef } from "utils/firebase";

// firebase imports
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc } from "firebase/firestore";
import SideBanner from "./SideBanner";
import Login from "./Login";
import SignUp from "./SignUp";

// app
const Auth = () => {
  const { Logger } = Store();

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
      element.textContent = msg;
    } else {
      element.textContent = "";
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
      let valid = logError(value, "text", e.target, 6, 20, "password");
      setLoginDetails({
        ...loginDetails,
        [name]: { ...loginDetails[name], valid, value },
      });
    }
  }

  function signUpOnchange(e) {
    const name = e.target.name;
    let value = e.target.value;
    const errEl = document.querySelector(`[data-name="${name}-errMsg"]`);

    if (name == "first name") {
      let valid = logError(value, "text", errEl);
      setSignUpDetails({
        ...signUpDetails,
        [name]: { ...signUpDetails[name], valid, value },
      });
    }
    if (name == "last name") {
      let valid = logError(value, "text", errEl);
      setSignUpDetails({
        ...signUpDetails,
        [name]: { ...signUpDetails[name], valid, value },
      });
    }
    if (name == "email") {
      let valid = logError(value, "email", errEl);
      setSignUpDetails({
        ...signUpDetails,
        [name]: { ...signUpDetails[name], valid, value },
      });
    }
    if (name == "password") {
      let valid = logError(value, "text", errEl, 6, 20, "password");
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

    const email = signUpDetails.email.value.toLowerCase();
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

  return (
    <Wrapper className="layout">
      <main className="body f fcenter center mt30">
        <section ref={containerRef} className="container f center">
          <SideBanner />

          {/* signin and sign up  */}
          <div className={`auth-wrapper ${signin ? "" : "active"} center`}>
            <Login
              loading={loading}
              setSignIn={setSignIn}
              loginDetails={loginDetails}
              loginOnchange={loginOnchange}
              handleUserLogIn={handleUserLogIn}
            />

            <SignUp
              signUpDetails={signUpDetails}
              setSignIn={setSignIn}
              handleUserSignUp={handleUserSignUp}
              signUpOnchange={signUpOnchange}
              loading={loading}
            />
          </div>
        </section>
      </main>
    </Wrapper>
  );
};

export default Auth;
const Wrapper = styled.main`
  .body {
    padding: 30px 15px;
    max-width: 1170px;
  }

  .body .container {
    width: 100%;

    .auth-wrapper {
      width: 100%;
      border-radius: 24px;
      overflow-x: auto;
      overflow: hidden;
      display: flex;
      max-width: 420px;

      .signin,
      .signup {
        transform: translateX(0%);
      }
    }

    .auth-wrapper.active,
    .auth-wrapper.active {
      .signin,
      .signup {
        transform: translateX(-100%);
      }
    }
  }

  @media screen and (min-width: 768px) {
    .body {
      min-height: 100vh;
    }

    .body .container {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-radius: 10px;

      .auth-wrapper {
        box-shadow: none;
        max-width: unset;
        border-radius: 0px;
      }
    }
  }

  @media screen and (min-width: 1000px) {
    .body .container {
      aspect-ratio: unset;

      .auth-wrapper {
        width: 50%;
        aspect-ratio: unset;
      }
    }
  }
`;
