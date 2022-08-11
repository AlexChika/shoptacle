import Head from "next/head";
import "../styles/globals.css";
import StoreProvider from "../store/Context";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Head>
        <title>Shoptacle</title>
        <meta name="description" content="Your one stop for perfect fashion" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </StoreProvider>
  );
}

export default MyApp;
