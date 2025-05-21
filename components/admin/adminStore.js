import { Store } from "@store/Context";
import React, { useContext, useEffect, useReducer } from "react";
import * as actionTypes from "store/actionTypes";
import { getAllCustomers, getAllProducts } from "utils/firebase";

// initial state
const initialState = {
  products: [],
  customers: [],
  editId: "",
  refreshState: 0,
};

// reducer
function reducer(state, action) {
  if (action.type == actionTypes.ADMIN_FETCH_ALL_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }

  if (action.type == actionTypes.ADMIN_FETCH_ALL_CUSTOMERS) {
    return {
      ...state,
      customers: action.payload,
    };
  }

  if (action.type == actionTypes.ADMIN_REFRESH_STATE) {
    return {
      ...state,
      refreshState: state.refreshState + 1,
    };
  }

  if (action.type == actionTypes.ADMIN_SET_ID) {
    return {
      ...state,
      editId: action.payload,
    };
  }

  return state;
}

const AdminContext = React.createContext();

const AdminProvider = ({ children }) => {
  const { user } = Store();
  const [state, dispatch] = useReducer(reducer, initialState);

  function refreshState() {
    dispatch({ type: actionTypes.ADMIN_REFRESH_STATE });
  }

  function findProductById(id) {
    return state.products.find((item) => item.id === id);
  }

  useEffect(() => {
    let isSubscribed = true;

    try {
      if (isSubscribed) {
        const promises = [getAllProducts(), getAllCustomers()];

        Promise.all(promises).then((values) => {
          console.log({ values });

          if (!isSubscribed) return;
          dispatch({
            type: actionTypes.ADMIN_FETCH_ALL_PRODUCTS,
            payload: values[0],
          });
          dispatch({
            type: actionTypes.ADMIN_FETCH_ALL_CUSTOMERS,
            payload: values[1],
          });
        });
      }
    } catch {
      Logger("There was an error reaching the database", "error");
    }
    return () => {
      isSubscribed = false;
    };
  }, [state.refreshState, user]);

  return (
    <AdminContext.Provider
      value={{ ...state, dispatch, refreshState, findProductById }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
export const AdminStore = () => useContext(AdminContext);
