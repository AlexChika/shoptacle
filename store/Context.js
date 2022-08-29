import React, { useContext, useState, useEffect, useReducer } from "react";
import styled from "styled-components";
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
  const [logger, setLogger] = useState({
    text: "",
    success: true,
    showLogger: false,
    timeoutId: "",
  });
  function handleCloseModal() {
    dispatch({ type: actionTypes.HANDLE_MODAL });
  }
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
  return (
    <AppContext.Provider
      value={{ ...state, handleCloseModal, dispatch, Logger }}
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
  min-height: 80px;
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
