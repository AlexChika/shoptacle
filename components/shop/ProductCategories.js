import styled from "styled-components";
import ProductRow from "shared/components/ProductRow";

const ProductCategories = ({ products }) => {
  return (
    <Wrapper className="center">
      {products.map((item, index) => {
        let { name, blob, product, color } = item;
        return (
          <ProductRow
            key={index}
            params={{ name, blob, color }}
            products={product}
          />
        );
      })}
    </Wrapper>
  );
};
export default ProductCategories;

const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding: 30px 0px;
  max-width: 1170px;
`;
