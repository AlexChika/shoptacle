import styled from "styled-components";
import ProductRow from "shared/components/ProductRow";

const ShopPageComponent = ({ products }) => {
  return (
    <Wrapper className="center">
      {products.map((item, index) => {
        let { name, blob, product } = item;
        return (
          <ProductRow
            key={index}
            params={{ name, blob, color: "#fee2cc" }}
            products={product}
          />
        );
      })}
    </Wrapper>
  );
};
export default ShopPageComponent;

const Wrapper = styled.main`
  background-color: var(--pink-light);
  padding: 30px 0px;
  max-width: 1170px;
`;
