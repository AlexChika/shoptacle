import Header from "../components/Header";
import "../styles/globals.css";
import StoreProvider from "../store/Context";
import Footer from "../components/Footer";
import "../components/project/projectOverview.css";
import ProjectOverview from "../components/project";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Header></Header>
      <Component {...pageProps} />
      <Footer />
      <ProjectOverview />
    </StoreProvider>
  );
}
export default MyApp;
