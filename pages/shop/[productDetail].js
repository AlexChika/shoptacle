import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { useRouter } from "next/router";
import NavBar from "shared/components/NavBar";
import SideBar from "shared/components/SideBar";
import HeroBar from "shared/components/HeroBar";
import ProductDetail from "components/productDetail/ProductDetail";
import { getProduct, getSubDocs, searchProduct } from "utils/firebase";
const Index = () => {
  const router = useRouter();
  const { Logger, setRecent } = Store();

  //local states
  const [refresh, setRefresh] = useState(0); // refresh state
  const [id, setId] = useState(null); //product Id
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [product, setProduct] = useState(null); // product
  const [reviews, setReviews] = useState(null); //product reviews
  const [errorText, setErrorText] = useState("");
  const [status, setStatus] = useState({
    loading: true,
    error: false,
    success: false,
  });

  // get product and reviews from db
  useEffect(() => {
    let isSubscribed = true;

    if (!id) return;

    getSingleProduct(id, isSubscribed).catch((error) => {
      if (!isSubscribed) return;
      setStatus({ loading: false, error: true, success: false });
      setErrorText("Probably your internet connection is down. Please retry.");
      Logger(error.message || "Error fetching product", "error");
    });

    return () => {
      isSubscribed = false;
      setStatus({ loading: true, error: false, success: false });
    };
  }, [id, refresh]);

  async function getSingleProduct(id, isSubscribed) {
    const [product, reviews] = await Promise.all([
      getProduct(id),
      getSubDocs("products", id, "reviews"),
    ]);

    if (!isSubscribed) return;

    if (product) {
      const related = await searchProduct("category", product.category);
      setProduct(product);
      setReviews(reviews);
      setRelatedProducts(related);
      setRecent({ ...product, id });
      setStatus({ loading: false, error: false, success: true });
    } else {
      setStatus({ loading: false, error: true, success: false });
      setErrorText(
        "We don't seem to find this resource. Please check the URL and retry."
      );
    }
  }

  // get Id from url
  useEffect(() => {
    if (router.query.productDetail) {
      const id = router.query.productDetail.split("_").at(-1);
      setId(id);
    }
  }, [router]);

  return (
    <Wrapper className="layout">
      <NavBar />
      <SideBar />
      <HeroBar />

      {status.loading && (
        <section className="loading f fcenter">
          <div className="spinner sm"></div>
          <h2 className="mt10">Please wait ...</h2>
        </section>
      )}

      {status.error && (
        <section className="error f fcenter">
          <h2>There was an error fetching this product</h2>
          <p className="mt10">{errorText}</p>
          <button className="mt10" onClick={() => router.reload()}>
            Reload
          </button>
        </section>
      )}

      {status.success && (
        <ProductDetail
          data={{ product, reviews, relatedProducts, id, setRefresh }}
        />
      )}
    </Wrapper>
  );
};

export default Index;
const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding-bottom: 30px;

  .loading,
  .error {
    & * {
      font-size: 20px;
    }

    flex-direction: column;
    color: var(--blue);
    min-height: 80vh;
    text-align: center;

    button {
      color: white;
      background-color: var(--pink);
      padding: 10px 30px;
      font-size: 16px;
    }
  }
`;
