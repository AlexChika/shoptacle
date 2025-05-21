import styled from "styled-components";
import Modal from "./ModalHoc";
import Image from "next/image";
import { formatPrice } from "@utils/functions";

function SearchProductModal({ product, modal, setModal }) {
  if (!product) return null;

  const { imgOne, price, name, id, quantity, category, brand, desc, arrival } =
    product;

  return (
    <Modal center={false} maxWidth="800px" modal={modal} setModal={setModal}>
      <Wrapper>
        <div className="image mt30">
          <Image layout="fill" alt="product image" src={imgOne}></Image>
        </div>
        <article>
          <h1>{name}</h1>
          <h5>
            QTY: &nbsp;<span>{quantity}</span>
          </h5>
          <h5>
            BRAND: &nbsp;<span>{brand}</span>
          </h5>
          <h5>
            CATEGORY: &nbsp;<span>{category}</span>
          </h5>
          <h5>
            PRICE: &nbsp;<span>{formatPrice(Number(price))}</span>
          </h5>
          <h5>
            ID: &nbsp;<span>{id}</span>
          </h5>
          <h5>
            Arrival: &nbsp;<span>{arrival}</span>
          </h5>

          <h5>
            DESC: &nbsp;<span className="line_clamp clamp5">{desc}</span>
          </h5>
        </article>
      </Wrapper>
    </Modal>
  );
}

export default SearchProductModal;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  padding: 20px 10px;
  width: 100%;
  color: #333;
  font-family: "Roboto", sans-serif;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    /* padding: 30px; */
  }

  .image {
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f5f5f5;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    /* Taller image on larger screens */
    @media (min-width: 768px) {
      height: 400px;
    }

    img {
      object-fit: cover;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    @media (min-width: 768px) {
      padding-top: 0;
    }
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #323148;
    margin: 0 0 20px 0;
    line-height: 1.2;
    text-align: center;
    @media (min-width: 768px) {
      font-size: 24px;
    }
  }

  h5 {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin: 0;
    padding: 10px 0;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    /* Special styling for description */
    &:nth-last-child(1) {
      flex-direction: column;

      span {
        margin-top: 5px;
        line-height: 1.6;
      }
    }
  }

  span {
    font-weight: 400;
    color: #333;
    flex: 1;
  }

  /* Price styling */
  h5:nth-of-type(4) span {
    color: #e63946;
    font-weight: 600;
    font-size: 16px;
  }
`;
