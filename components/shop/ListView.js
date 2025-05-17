import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { MdStarRate } from "react-icons/md";
import { formatPrice, calculateStars } from "utils/functions";
import usePaginate from "shared/hooks/usePaginate";

// list component
function ListCard({ product }) {
  const { desc, name, price, imgOne, id, rating } = product;

  return (
    <Link href={`/shop/${name}_${id}`} passHref>
      <ListCardWrapper>
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
      </ListCardWrapper>
    </Link>
  );
}

const ListCardWrapper = styled.a`
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
const ListView = ({ products }) => {
  const { Pagination, paginated } = usePaginate(products, 15, 1, true);

  function onPageChange() {
    window.scrollTo(0, 70);
  }

  useEffect(() => {
    onPageChange();
  }, [paginated]);

  return (
    <ListViewWrapper className="center mt30">
      {paginated.map((x, index) => {
        return <ListCard product={x} key={index} />;
      })}

      <Pagination />
    </ListViewWrapper>
  );
};

export default ListView;
const ListViewWrapper = styled.main`
  max-width: 1170px;
  background-color: white;
`;
