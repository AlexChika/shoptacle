import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import NewArrivalCard from "./NewArrivalCard";
import usePaginate from "shared/hooks/usePaginate";

const LandingPageNewArrival = ({ product }) => {
  const { Pagination, paginated } = usePaginate(product, 6, 1, true);

  const pageRef = useRef(null);
  function onPageChange() {
    window.scrollTo(0, Number(pageRef.current.offsetTop));
  }

  useEffect(() => {
    onPageChange();
  }, [paginated]);

  return (
    <Wrapper ref={pageRef} id="new-arrival" className="layout">
      <div className="heading center">
        <h1 className="c-blue center">New Arrivals</h1>
      </div>
      <section className="products center">
        {paginated.map((product) => {
          return <NewArrivalCard key={product.id} product={product} />;
        })}
      </section>

      <Pagination />
    </Wrapper>
  );
};

export default LandingPageNewArrival;
const Wrapper = styled.section`
  background-color: var(--pink-light);
  position: relative;
  min-height: 100vh;
  .heading {
    padding-top: 20px;
    h1 {
      width: max-content;
      border-bottom: 3px solid var(--blue);
      font-size: 30px;
      font-family: "Libre Baskerville", serif;
    }
  }
  .products {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 95%;
    /* place-content: center; */
    /* place-items: center; */
    gap: 1em 1em;
    margin-top: 30px;
  }
  @media screen and (min-width: 500px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
      gap: 2em 1em;
    }
  }
  @media screen and (min-width: 768px) {
    padding-top: 20px;
    .products {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
