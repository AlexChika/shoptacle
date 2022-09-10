import React from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import SideBar from "../../components/SideBar";
import AdminDashboard from "../../components/AdminDashboard";
import AdminWelcome from "../../components/AdminWelcome";
const Products = () => {
  const { user, isAdmin } = Store();
  return (
    <Wrapper className="layout">
      <SideBar />
      {user ? (
        <AdminDashboard isAdmin={isAdmin} user={user} />
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
