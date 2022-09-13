import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import HeroBar from "../../components/HeroBar";
import SingleProductDetail from "../../components/SingleProductDetail";
import { getProduct, getSubDocs, searchProduct } from "../../utils/firebase";
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
    async function getSingleProduct(id) {
      try {
        const product = await getProduct(id);
        if (product) {
          const reviews = await getSubDocs("products", id, "reviews");
          const related = await searchProduct("category", product.category);
          setProduct(product);
          setReviews(reviews);
          setRelatedProducts(related);
          setRecent({ ...product, id });
          setStatus({
            loading: false,
            error: false,
            success: true,
          });
        } else {
          setStatus({
            loading: false,
            error: true,
            success: false,
          });
          setErrorText(
            "We don't seem to find this resource. Pls check the url and retry"
          );
        }
      } catch (error) {
        setStatus({
          loading: false,
          success: false,
          error: true,
        });
        setErrorText("Probably your internet connection is down, pls retry");
        Logger("There was an error fetching this product", "error");
      }
    }
    if (isSubscribed && id) {
      getSingleProduct(id);
    }
    return () => {
      isSubscribed = false;
      setStatus({
        loading: true,
        error: false,
        success: false,
      });
    };
  }, [id, refresh]);

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
          <div className="spinner"></div>
          <h2 className="mt10">Please wait ...</h2>
        </section>
      )}

      {status.error && (
        <section className="error f fcenter">
          <h2>There was an error fetching this product</h2>
          <p className="mt10">{errorText}</p>
          <button className="mt30" onClick={() => router.reload()}>
            Reload
          </button>
        </section>
      )}

      {status.success && (
        <SingleProductDetail
          data={{ product, reviews, relatedProducts, id, refresh, setRefresh }}
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
    flex-direction: column;
    color: var(--blue);
    min-height: 80vh;

    button {
      color: white;
      background-color: var(--pink);
      padding: 10px 30px;
    }
  }
`;
