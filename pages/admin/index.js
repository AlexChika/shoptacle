import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import SideBar from "../../components/SideBar";
import AdminDashboard from "../../components/AdminDashboard";
import AdminWelcome from "../../components/AdminWelcome";
import { getAllProcuts, getAllCustomers } from "../../utils/firebase";
// app
const Products = () => {
  const { user, isAdmin, Logger } = Store();
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  // fetch products from db
  useEffect(() => {
    let isSubscribed = true;
    let count = 2;
    async function getDatabaseCollection() {
      try {
        const _products = await getAllProcuts();
        const _customers = await getAllCustomers();
        if (isSubscribed) {
          setCustomers(_customers);
          setProducts(_products);
        }
      } catch (error) {
        if (isSubscribed) {
          count += 2;
          Logger("There was an error reaching the database", "error");
          setTimeout(() => {
            getDatabaseCollection();
          }, count * 1000);
        }
      }
    }
    getDatabaseCollection();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Wrapper className="layout">
      <SideBar />
      {user ? (
        <AdminDashboard data={{ products, customers }} />
      ) : (
        <AdminWelcome />
      )}
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;
