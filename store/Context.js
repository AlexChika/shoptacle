// imports
import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
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
  cart: [], //user cart (productIds and amount)
  recent: [], //recently viewed items
};

// app
const AppContext = React.createContext();
const StoreProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hideFooter, setHideFooter] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [logger, setLogger] = useState({
    text: "",
    success: true,
    show: false,
    timeoutId: "",
  });

  // funcs
  // modal handler
  const handleCloseModal = useCallback(function () {
    dispatch({ type: actionTypes.HANDLE_MODAL });
  }, []);

  // error or succes logger
  const Logger = useCallback(function (text, type, time = 4000) {
    if (type === "success" || type === "error") {
      setLogger((prev) => {
        clearTimeout(prev.timeoutId);
        let success = type === "success";

        const timeout = setTimeout(() => {
          setLogger((prev) => ({
            ...prev,
            show: false,
          }));
        }, time);

        return {
          text,
          show: true,
          success,
          timeoutId: timeout,
        };
      });

      return;
    }
    throw new Error(`wrong type "${type}" at Logger`);
  }, []);

  //sets recently viewed to local storage
  const setRecent = useCallback(function (product) {
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
  }, []);

  // cart funcs
  const addToCart = useCallback(
    async function (id, amount) {
      // check if item already exists in cart
      const isAdded = state.cart.find((item) => item.docId === id);
      // user
      if (state.user) {
        if (isAdded) {
          // update cart in db
          await updateSubDocs("customers", state.user.email, "cart", id, {
            amount: isAdded.amount + 1,
          });

          // uodate cart in state
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
            amount: amount,
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
            amount: amount,
          });
          localStorage.setItem("cart", JSON.stringify(existingCart));
          dispatch({ type: actionTypes.ADD_TO_CART, payload: existingCart });
        }
      }
    },
    [state.user, state.cart]
  );

  const removeCart = useCallback(
    async function (id) {
      await deleteSubDocs("customers", state.user.email, "cart", id);
      const newCart = [...state.cart].filter((item) => item.docId !== id);
      dispatch({ type: actionTypes.REMOVE_CART, payload: newCart });
    },
    [state.user.email, state.cart]
  );

  const incDecCart = useCallback(
    async function (id, quantity, type) {
      let cartItem = [...state.cart].find((item) => item.docId == id);
      let newCartItem;

      if (type == "plus") {
        let intendedIncAmount = cartItem.amount + 1;
        if (intendedIncAmount > quantity)
          return { status: false, log: "Max quantity reached" };

        let newAmount = Math.min(intendedIncAmount, quantity);
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

      if (type == "minus") {
        let intendedDecAmount = cartItem.amount - 1;
        if (intendedDecAmount < 1)
          return { status: false, log: "Min quantity reached" };

        let newAmount = Math.max(intendedDecAmount, 1);
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
    },
    [state.user.email, state.cart]
  );

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
  }, [refresh, Logger]);

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
          console.eroor(error);
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
    });
  }, [state.user]);

  // a constantly running effect that checks online status and re-fetches data by udating setRefresh
  useEffect(() => {
    const listenerOnline = () => {
      setRefresh("online");
    };
    const listenerOffline = () => {
      setRefresh("offline");
    };
    window.addEventListener("online", listenerOnline);
    window.addEventListener("offline", listenerOffline);
    return () => {
      window.removeEventListener("online", listenerOnline);
      window.removeEventListener("offline", listenerOffline);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        hideFooter,
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 50px;
    padding: 10px;
    border: 2px solid
      ${({ success }) =>
        success ? "rgba(47, 255, 0, 1)" : "rgba(253, 51, 91, 1)"};
    background-color: white;
    width: max-content;
    max-width: 90%;
    border-radius: 15px;
    transform: translateY(-110%);
  }
  .box.show {
    transform: translateY(20px);
  }
  p {
    color: var(--blue);
    font-weight: 500;
    font-size: 16px;
    width: max-content;
  }

  span {
    color: ${({ success }) =>
      success ? "rgba(47, 255, 0, 1)" : "rgba(253, 51, 91, 1)"};
  }
`;
