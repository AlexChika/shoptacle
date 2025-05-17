import Header from "../../shared/components/Header";
import { searchProduct } from "../../utils/firebase";
import FashionPage from "@components/shop/FashionPage";

// app
const MaleFashion = ({ products }) => {
  return (
    <>
      <Header title="Male fashion | Shoptacle">
        <meta name="title" content="Male fashion | Shoptacle" key="title" />

        <meta
          content="Male fashion | Shoptacle"
          property="og:title"
          key="og:title"
        />

        <meta
          content="https://shoptacle.vercel.app/shop/male-fashion"
          property="og:url"
          key="og:url"
        />
      </Header>

      <FashionPage products={products} />
    </>
  );
};

export default MaleFashion;

export async function getStaticProps() {
  // get new Male Fashion  products
  const products = await searchProduct("collection", "Male Fashion");
  return {
    revalidate: 60,
    props: {
      products,
    },
  };
}
