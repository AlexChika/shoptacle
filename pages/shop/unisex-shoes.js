import FashionPage from "@components/shop/FashionPage";
import Header from "../../shared/components/Header";
import { searchProduct } from "../../utils/firebase";

const FemaleFashion = ({ products }) => {
  return (
    <>
      <Header title="Unisex Shoes, Sneakers, Flip flops , Crocs assorted | Shoptacle">
        <meta
          name="title"
          content="Unisex Shoes, Sneakers, Flip flops , Crocs assorted | Shoptacle"
          key="title"
        />

        <meta
          content="Unisex Shoes, Sneakers, Flip flops , Crocs assorted | Shoptacle"
          property="og:title"
          key="og:title"
        />

        <meta
          content="https://shoptacle.vercel.app/shop/unisex-shoes"
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
  // get new Unisex Shoes  products
  const products = await searchProduct("collection", "Unisex Shoes");
  return {
    revalidate: 60,
    props: {
      products,
    },
  };
}
