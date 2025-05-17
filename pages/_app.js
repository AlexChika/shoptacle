import Header from "shared/components/Header";
import "@styles/globals.css";
import StoreProvider from "@store/Context";
import Footer from "shared/components/Footer";
import "@components/projectOverview/projectOverview.css";
import ProjectOverview from "@components/projectOverview";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ProjectOverview />
    </StoreProvider>
  );
}
export default MyApp;
