import React, { useContext, useEffect, useReducer } from "react";
const AppContext = React.createContext();
import { useRouter } from "next/router";
import reducer from "./Reducer";
import * as actionTypes from "./actionTypes";
const initialState = {
  modalOpen: false,
  preRoute: "",
  currRoute: "",
};
const StoreProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  function handleCloseModal() {
    dispatch({ type: actionTypes.HANDLE_MODAL });
  }
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_CURRENT_ROUTE,
      payload: router.pathname,
    });
    const handleRouteChange = (url, { shallow }) => {
      dispatch({ type: actionTypes.ROUTE_CHANGE, payload: url });
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <AppContext.Provider value={{ ...state, handleCloseModal, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export const Store = () => useContext(AppContext);
export default StoreProvider;
