import { searchProduct } from "utils/firebase";
import FashionPage from "@components/shop/FashionPage";
import Header from "shared/components/Header";

const FemaleFashion = ({ products }) => {
  return (
    <>
      <Header title="Smart Gadgets and Accessories | Shoptacle">
        <meta
          name="title"
          content="Smart Gadgets and Accessories | Shoptacle"
          key="title"
        />

        <meta
          content="Smart Gadgets and Accessories | Shoptacle"
          property="og:title"
          key="og:title"
        />

        <meta
          content="https://shoptacle.vercel.app/shop/smart-gadgets"
          property="og:url"
          key="og:url"
        />
      </Header>

      <FashionPage products={products} />
    </>
  );
};

export default FemaleFashion;

export async function getStaticProps() {
  // get new Smart Gadgets  products
  const products = await searchProduct("collection", "Smart Gadgets");
  return {
    revalidate: 60,
    props: {
      products,
    },
  };
}
