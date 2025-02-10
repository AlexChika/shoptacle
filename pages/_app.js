import Header from "../components/Header";
import "../styles/globals.css";
import StoreProvider from "../store/Context";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Header></Header>
      <Component {...pageProps} />
      <Footer />
    </StoreProvider>
  );
}
export default MyApp;
