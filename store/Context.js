// imports
import React, { useContext, useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import reducer from "./Reducer";
import { FaInfoCircle } from "react-icons/fa";
import * as actionTypes from "./actionTypes";

// firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import {
  getCustomerDocRef,
  getSubDocs,
  adminsColRef,
  updateSubDocs,
  setSubDocs,
  deleteSubDocs,
  auth,
} from "../utils/firebase";

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
    show: false,
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
          success,
        });
      }, time);
      setLogger({
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
    recent = recent.slice(0, 19);
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
  async function addToCart(id) {
    // check if item already exists in cart
    const isAdded = state.cart.find((item) => item.docId === id);
    // user
    if (state.user) {
      if (isAdded) {
        // update cart in db
        await updateSubDocs("customers", state.user.email, "cart", id, {
          amount: isAdded.amount + 1,
        });
        let newCart = [
          ...state.cart.map((item) => {
            if (item.docId == id) {
              item.amount = item.amount + 1;
            }
            return item;
          }),
        ];
        dispatch({ type: actionTypes.ADD_TO_CART, payload: newCart });
      } else {
        let cartData = {
          docId: id,
          amount: 1,
        };
        // add cart to db
        await setSubDocs("customers", state.user.email, "cart", id, cartData);
        let newCart = [...state.cart];
        newCart.unshift(cartData);
        dispatch({
          type: actionTypes.ADD_TO_CART,
          payload: newCart,
        });
      }
    }

    // No user
    else {
      // add cart to local storage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (isAdded) {
        // update cart data
        let newCart = existingCart.map((item) => {
          if (item.docId === id) {
            item.amount = item.amount + 1;
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch({ type: actionTypes.ADD_TO_CART, payload: newCart });
      } else {
        // step 3 add cart data
        existingCart.unshift({
          docId: id,
          amount: 1,
        });
        localStorage.setItem("cart", JSON.stringify(existingCart));
        dispatch({ type: actionTypes.ADD_TO_CART, payload: existingCart });
      }
    }
  }

  async function removeCart(id) {
    await deleteSubDocs("customers", state.user.email, "cart", id);
    const newCart = [...state.cart].filter((item) => item.docId !== id);
    dispatch({ type: actionTypes.REMOVE_CART, payload: newCart });
  }

  async function incDecCart(id, quantity, type) {
    let cartItem = [...state.cart].find((item) => item.docId == id);
    let newCartItem;
    if (type == "plus") {
      let newAmount = Math.min(cartItem.amount + 1, quantity);
      newCartItem = {
        docId: cartItem.docId,
        amount: newAmount,
      };
      updateSubDocs("customers", state.user.email, "cart", id, newCartItem);
      let newCart = [...state.cart].map((item) => {
        if (item.docId === id) {
          let newAmount = Math.min(item.amount + 1, quantity);
          item.amount = newAmount;
        }
        return item;
      });
      dispatch({ type: actionTypes.INC_DEC_CART, payload: newCart });
    }
    if (type == "minus") {
      let newAmount = Math.max(cartItem.amount - 1, 1);
      newCartItem = {
        docId: cartItem.docId,
        amount: newAmount,
      };
      updateSubDocs("customers", state.user.email, "cart", id, newCartItem);
      let newCart = [...state.cart].map((item) => {
        if (item.docId === id) {
          item.amount = newAmount;
        }
        return item;
      });
      dispatch({ type: actionTypes.INC_DEC_CART, payload: newCart });
    }
  }

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
          cart = await getSubDocs("customers", state.user.email, "cart");
        } catch (error) {
          cart = [];
          console.log(error);
        }
        dispatch({ type: actionTypes.GET_CART, payload: cart });
      }
      getCart();
    } else {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch({ type: actionTypes.GET_CART, payload: cart });
    }
    // get recents
    let recent = JSON.parse(localStorage.getItem("recent")) || [];
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
      value={{
        ...state,
        handleCloseModal,
        dispatch,
        Logger,
        setRecent,
        addToCart,
        removeCart,
        incDecCart,
      }}
    >
      <Wrapper show={logger.show} success={logger.success}>
        <div className={`box center trans ${logger.show ? "show" : ""}`}>
          <span>
            <FaInfoCircle />
          </span>
          <p>{logger.text}</p>
        </div>
      </Wrapper>
      {children}
    </AppContext.Provider>
  );
};

export const Store = () => useContext(AppContext);
export default StoreProvider;

const Wrapper = styled.div`
  z-index: 9;
  left: 0;
  right: 0;
  position: fixed;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};

  .box {
    color: white;
    min-height: 70px;
    text-align: center;
    padding: 10px;
    background-color: ${({ success }) =>
      success ? "rgba(47, 255, 0, 1)" : "rgba(253, 51, 91, 1)"};
    max-width: 600px;
    width: 100%;
    border-radius: 15px;
    box-shadow: -4px 0px var(--blue), -6px 0px skyblue, -8px 0px tomato;
    border-bottom: 2px solid var(--blue);
    transform: translateY(-110%);
  }
  .box.show {
    transform: translateY(0%);
  }
  p {
    font-weight: 500;
    font-size: 20px;
  }
`;
