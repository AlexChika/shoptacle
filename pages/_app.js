import { useState } from "react";
import Header from "../components/Header";
import "../styles/globals.css";
import StoreProvider from "../store/Context";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }) {
  const [hideFooter, setHideFooter] = useState(false);
  return (
    <StoreProvider setHideFooter={setHideFooter}>
      <Header></Header>
      <Component {...pageProps} />
      <Footer hide={hideFooter} />
    </StoreProvider>
  );
}
export default MyApp;
