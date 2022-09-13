// imports
import React, { useContext, useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import reducer from "./Reducer";
import * as actionTypes from "./actionTypes";
import * as firebase from "../utils/firebase";

// firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import { getCustomerDocRef, getSubDocs, adminsColRef } from "../utils/firebase";

// initial state...
const initialState = {
  user: "",
  isAdmin: "",
  modalOpen: false,
  preRoute: "",
  currRoute: "",
  cart: [],
  recent: [], //recently viewed items
};

// app
const AppContext = React.createContext();
const StoreProvider = ({ setHideFooter, children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [logger, setLogger] = useState({
    text: "",
    success: true,
    showLogger: false,
    timeoutId: "",
  });

  // funcs
  // modal handler
  function handleCloseModal() {
    dispatch({ type: actionTypes.HANDLE_MODAL });
  }

  // error or succes logger
  const Logger = (text, type, time = 4000) => {
    if (type === "success" || type === "error") {
      clearTimeout(logger.timeoutId);
      let success = type === "success";
      const timeout = setTimeout(() => {
        setLogger({
          ...logger,
          text: "",
          show: false,
        });
      }, time);
      setLogger({
        ...logger,
        text,
        show: true,
        success,
        timeoutId: timeout,
      });
      return;
    }
    throw new Error(`wrong type "${type}" at Logger`);
  };

  //sets recently viewed to local storage
  const setRecent = (product) => {
    // first get localstorage
    let recent = JSON.parse(localStorage.getItem("recent")) || [];
    recent = recent.slice(0, 20);
    //second check to see if product exists
    let isAdded = recent.find((items) => items.id === product.id);
    if (isAdded) return;
    recent.unshift(product);
    // update local storage
    localStorage.setItem("recent", JSON.stringify(recent));
    // update state
    dispatch({ type: actionTypes.SET_RECENT, payload: recent });
  };

  // cart funcs
  function addToCart() {}
  function removeCart() {}

  // useEffects
  // monitor route change
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_CURRENT_ROUTE,
      payload: router.pathname,
    });
    const handleRouteChange = (url, { shallow }) => {
      dispatch({ type: actionTypes.ROUTE_CHANGE, payload: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  // removes the navbar when current page is admin page
  useEffect(() => {
    if (state.user && state.currRoute === "/admin") {
      setHideFooter(true);
    } else {
      setHideFooter(false);
    }
  }, [state.user, state.currRoute]);

  // monitors auth state and fetches user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        getDoc(getCustomerDocRef(user.email))
          .then((snapshot) => {
            dispatch({ type: actionTypes.SET_USER, payload: snapshot.data() });
          })
          .catch((err) => {
            Logger("We couldnt fetch your data", "error");
            dispatch({ type: actionTypes.NO_USER });
          });
      } else {
        dispatch({ type: actionTypes.NO_USER });
      }
    });
    return unsubscribe;
  }, []);

  // get cart from firestore and recents from localstorage
  useEffect(() => {
    // get cart
    let cart;
    if (state.user) {
      async function getCart() {
        try {
          cart = await getSubDocs("products", state.user.email, "cart");
        } catch (error) {
          cart = [];
          console.log(error);
        }
      }
      getCart();
    } else {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }

    // get recents
    let recent = JSON.parse(localStorage.getItem("recent")) || [];
    dispatch({ type: actionTypes.GET_CART, payload: cart });
    dispatch({ type: actionTypes.SET_RECENT, payload: recent });
  }, [state.user]);

  // checks if logged in user is admin
  useEffect(() => {
    if (!state.user) return;
    const q = query(adminsColRef, where("email", "==", state.user.email));
    getDocs(q).then((snapshot) => {
      if (snapshot.docs.length > 0) {
        dispatch({ type: actionTypes.SET_ADMIN, payload: true });
      } else {
        dispatch({ type: actionTypes.SET_ADMIN, payload: false });
      }
      // console.log(snapshot.docs[0].data());
    });
  }, [state.user]);

  return (
    <AppContext.Provider
      value={{ ...state, handleCloseModal, dispatch, Logger, setRecent }}
    >
      <Wrapper
        show={logger.show}
        success={logger.success}
        className="center f align"
      >
        <p>{logger.text}</p>
      </Wrapper>
      {children}
    </AppContext.Provider>
  );
};

export const Store = () => useContext(AppContext);
export default StoreProvider;

const Wrapper = styled.div`
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 500;
  min-height: 70px;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  background-color: ${({ success }) =>
    success ? "rgba(47, 255, 0, 1)" : "rgba(253, 51, 91, 1)"};
  color: white;
  max-width: 600px;
  width: 100%;
  z-index: 9;
  visibility: ${({ show }) => (show ? "visible" : "collapse")};
  p {
    width: 100%;
  }
`;
