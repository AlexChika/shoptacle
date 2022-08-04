import React, { useContext, useReducer } from "react";
const AppContext = React.createContext();
import reducer from "./Reducer";
const initialState = {
  modalOpen: false,
};
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  function handleCloseModal() {
    dispatch({ type: "HANDLE_MODAL" });
  }
  return (
    <AppContext.Provider value={{ ...state, handleCloseModal }}>
      {children}
    </AppContext.Provider>
  );
};
export const Store = () => useContext(AppContext);
export default StoreProvider;
