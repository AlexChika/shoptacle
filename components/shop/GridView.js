import styled from "styled-components";
import ProductCard from "shared/components/ProductCard";
import usePaginate from "shared/hooks/usePaginate";

const GridView = ({ products }) => {
  const { Pagination, paginated } = usePaginate(
    products,
    20,
    1,
    true,
    onPageChange
  );

  function onPageChange() {
    window.scrollTo(0, 70);
  }

  return (
    <>
      <Wrapper className="center mt10">
        {paginated.map((product, index) => {
          return (
            <article className="card" key={index}>
              <ProductCard product={product} />
            </article>
          );
        })}
      </Wrapper>

      <Pagination />
    </>
  );
};

export default GridView;
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
