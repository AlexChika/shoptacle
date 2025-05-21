import styled from "styled-components";
import Header from "shared/components/Header";
import SideBar from "shared/components/SideBar";
import AdminDashboard from "components/admin/AdminDashboard";
import AdminWelcome from "@components/admin/AdminWelcome";
import AdminProvider from "@components/admin/adminStore";
import { Store } from "@store/Context";

const AdminPage = () => {
  const { user } = Store();

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

      <AdminProvider>
        <Wrapper className="layout">
          <SideBar />
          {user ? <AdminDashboard /> : <AdminWelcome />}
        </Wrapper>
      </AdminProvider>
    </>
  );
};
export default AdminPage;

const Wrapper = styled.main`
  background: var(--pink-light);
`;
