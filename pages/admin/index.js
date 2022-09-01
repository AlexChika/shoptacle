import React from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import SideBar from "../../components/SideBar";
import AdminDashboard from "../../components/AdminDashboard";
import AdminWelcome from "../../components/AdminWelcome";
const Products = () => {
  const { dispatch } = Store();
  let user = true;
  const { Logger } = Store();
  return (
    <Wrapper className="layout">
      <SideBar />
      {user ? <AdminDashboard /> : <AdminWelcome />}
    </Wrapper>
  );
};
export default Products;
const Wrapper = styled.main`
  background: var(--pink-light);
`;
