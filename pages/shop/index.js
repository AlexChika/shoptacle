import Header from "shared/components/Header";
import Shop from "@components/shop/Shop";
import { searchProduct } from "@utils/firebase";
import { shuffler } from "@utils/functions";
const ShopPage = ({ products }) => {
  return (
    <>
      <Header title="Shop male fashion, female wears, smart gadgets here at Shoptacle">
        <meta
          name="title"
          content="Shop male fashion, female wears, smart gadgets here at Shoptacle"
          key="title"
        />

        <meta
          content="Shop male fashion, female wears, smart gadgets here at Shoptacle"
          property="og:title"
          key="og:title"
        />

        <meta
          content="https://shoptacle.vercel.app/shop"
          property="og:url"
          key="og:url"
        />
      </Header>

      <Shop products={products} />
    </>
  );
};
export default ShopPage;

export async function getStaticProps() {
  const maleFashion = await searchProduct("collection", "Male Fashion");
  const femaleFashion = await searchProduct("collection", "Female Fashion");
  const unisexShoes = await searchProduct("collection", "Unisex Shoes");
  const smartGadgets = await searchProduct("collection", "Smart Gadgets");
  return {
    revalidate: 160,
    props: {
      products: [
        {
          name: "Male Fashion",
          blob: "/shop/male-fashion",
          product: shuffler(maleFashion).slice(0, 15),
        },
        {
          name: "Female Fashion",
          blob: "/shop/female-fashion",
          product: shuffler(femaleFashion).slice(0, 15),
        },
        {
          name: "Smart Gadgets",
          blob: "/shop/smart-gadgets",
          product: shuffler(smartGadgets).slice(0, 15),
        },
        {
          name: "Unisex Shoes",
          blob: "/shop/unisex-shoes",
          product: shuffler(unisexShoes).slice(0, 15),
        },
      ],
    },
  };
}
