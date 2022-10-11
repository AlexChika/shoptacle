import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { paginateFn } from "../utils/functions";
import Paginate from "./Paginate";
import { MdStarRate } from "react-icons/md";
import { formatPrice, calculateStars } from "../utils/functions";

// list component
const ListView = ({ product }) => {
  const router = useRouter();
  const { desc, name, price, imgOne, id, rating } = product;

  return (
    <Link href={`/shop/${name}_${id}`} passHref>
      <ListWrapper>
        <div className="img">
          <Image layout="fill" alt={name} src={imgOne}></Image>
        </div>

        <div className="details f j-around">
          <h3>{name}</h3>

          <p>{desc.substring(0, 150)}...</p>

          <p>{formatPrice(price)}</p>

          <div className="star-con f j-between">
            <span>{calculateStars(rating).totalRating}&nbsp;ratings</span>
            <span className="f fcenter">
              <MdStarRate />
              &nbsp;
              {calculateStars(rating).stars}
            </span>
          </div>
        </div>
      </ListWrapper>
    </Link>
  );
};

const ListWrapper = styled.a`
  cursor: pointer;
  display: block;
  background-color: white;
  color: var(--blue);
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 5px var(--gray);
  :hover {
    box-shadow: 2px 2px 15px var(--gray);
  }
  .img {
    box-shadow: 1px 1px 5px var(--gray);
    position: relative;
    width: 100%;
    display: block;
    max-width: 300px;
    min-width: 280px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
    img {
      border-radius: 10px;
    }
  }

  .details {
    height: 100%;
    flex-direction: column;
    max-width: 600px;
    min-height: 200px;

    .star-con {
      font-size: 16px;
      color: var(--pink);
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 2rem;
    align-items: center;
  }
`;

// parent
const ProductPageList = ({ products }) => {
  const pageRef = useRef(null);
  const [currentBtn, setCurrentBtn] = useState(0);
  const [productList, setProductList] = useState(
    paginateFn(products, 15).items
  );

  const handlePaginate = (val) => {
    const newItems = paginateFn(products, 15, val).items;
    setProductList(newItems);
    setCurrentBtn(val);
    window.scrollTo(0, Number(pageRef.current.offsetTop));
  };

  useEffect(() => {
    // updates prducts list
    setProductList(paginateFn(products, 15).items);
  }, [products]);

  return (
    <Wrapper ref={pageRef} className="center mt30">
      {productList.map((x, index) => {
        return <ListView product={x} key={index} />;
      })}
      <Paginate
        paginateFn={paginateFn}
        array={products}
        itemsPerPage={15}
        currentBtn={currentBtn}
        handlePaginate={handlePaginate}
      />
    </Wrapper>
  );
};

export default ProductPageList;
const Wrapper = styled.main`
  max-width: 1170px;
  background-color: white;
  /* display: grid; */
  /* row-gap: 1rem; */
`;
