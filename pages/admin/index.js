import React, { useEffect, useReducer, useContext } from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import AdminDashboard from "../../components/AdminDashboard";
import AdminWelcome from "../../components/AdminWelcome";
import * as actionTypes from "../../store/actionTypes";
import { getAllCustomers, getAllProducts } from "../../utils/firebase";
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

// app
const AdminContext = React.createContext();
const Products = () => {
  const { user } = Store();
  const [state, dispatch] = useReducer(reducer, initialState);

  function refreshState() {
    dispatch({ type: actionTypes.ADMIN_REFRESH_STATE });
  }
  useEffect(() => {
    let isSubscribed = true;
    try {
      if (isSubscribed) {
        getAllProducts().then((products) => {
          dispatch({
            type: actionTypes.ADMIN_FETCH_ALL_PRODUCTS,
            payload: products,
          });
        });

        getAllCustomers().then((customers) => {
          dispatch({
            type: actionTypes.ADMIN_FETCH_ALL_CUSTOMERS,
            payload: customers,
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
    <>
      <Header title="Shoptacle Admin Page">
        <meta name="title" content="Shoptacle Admin Page" key="title" />

        <meta
          content="Shoptacle Admin Page"
          property="og:title"
          key="og:title"
        />

        <meta
          content="https://shoptacle.vercel.app/admin"
          property="og:url"
          key="og:url"
        />

        <meta
          name="description"
          content="Welcome to the Shoptacle admin page. Utilize our powerful dashboard to view, search and manage products, including editting, deleting and updating. Keep track of products and track of shoptacle"
          key="description"
        />
        <meta
          content="Welcome to the Shoptacle admin page. Utilize our powerful dashboard to view, search and manage products, including editting, deleting and updating. Keep track of products and track of shoptacle"
          key="og:description"
        />
      </Header>

      <AdminContext.Provider value={{ ...state, dispatch, refreshState }}>
        <Wrapper className="layout">
          <SideBar />
          {user ? <AdminDashboard /> : <AdminWelcome />}
        </Wrapper>
      </AdminContext.Provider>
    </>
  );
};
export default Products;
export const AdminStore = () => useContext(AdminContext);
const Wrapper = styled.main`
  background: var(--pink-light);
`;
