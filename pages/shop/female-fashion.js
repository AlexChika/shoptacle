import FashionPage from "@components/shop/FashionPage";
import Header from "shared/components/Header";
import { searchProduct } from "utils/firebase";

const FemaleFashion = ({ products }) => {
  return (
    <>
      <Header title="Female fashion | all kinds of female wears | Shoptacle">
        <meta
          name="title"
          content="Female fashion | all kinds of female wears | Shoptacle"
          key="title"
        />

        <meta
          content="Female fashion | all kinds of female wears | Shoptacle"
          property="og:title"
          key="og:title"
        />

        <meta
          content="https://shoptacle.vercel.app/shop/female-fashion"
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
  // get new female  products
  const products = await searchProduct("collection", "Female Fashion");
  return {
    revalidate: 60,
    props: {
      products,
    },
  };
}
