import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import Paginate from "./Paginate";
import { paginateFn } from "../utils/functions";
const ProductPage = ({ products }) => {
  const pageRef = useRef(null);
  const [currentBtn, setCurrentBtn] = useState(0);
  const [productList, setProductList] = useState(
    paginateFn(products, 20).items
  );

  const handlePaginate = (val) => {
    const newItems = paginateFn(products, 20, val).items;
    setProductList(newItems);
    setCurrentBtn(val);
    window.scrollTo(0, Number(pageRef.current.offsetTop));
  };

  useEffect(() => {
    // updates prducts list
    setProductList(paginateFn(products, 20).items);
  }, [products]);

  return (
    <>
      <Wrapper ref={pageRef} className="center mt10">
        {productList.map((product, index) => {
          return (
            <article className="card" key={index}>
              <ProductCard product={product} />
            </article>
          );
        })}
      </Wrapper>
      <Paginate
        paginateFn={paginateFn}
        array={products}
        itemsPerPage={20}
        currentBtn={currentBtn}
        handlePaginate={handlePaginate}
      />
    </>
  );
};

export default ProductPage;
const Wrapper = styled.main`
  max-width: 1170px;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  .card {
    height: 320px;
    background-color: white;
  }
  .card:hover,
  .card:focus {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(0, 0, 0, 0.2);
  }
  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1170px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
