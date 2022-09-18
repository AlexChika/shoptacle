import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "../store/Context";
import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";
import UserReviews from "./UserReviews";
import { ProductRow } from "./ShopPageComponent";
import { MdStarRate } from "react-icons/md";
import { HiPlus, HiMinus } from "react-icons/hi";
import { formatPrice, calculateStars } from "../utils/functions";
const ProductDetail = ({ data }) => {
  const { Logger, recent, addToCart } = Store();
  const { product, relatedProducts, id } = data;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [currentImage, setCurrentImage] = useState(product.imgOne);

  // funcs
  const handleAddToCart = async () => {
    if (product.quantity < 1) return;
    try {
      setLoading(true);
      await addToCart(id, amount);
      setLoading(false);
      Logger("we added your product to the cart", "success", 2000);
    } catch (error) {
      setLoading(false);
      Logger("Couldn't add item to cart, please check your internet", "error");
      console.log(error.message);
    }
  };

  // sets cart amount
  const handleAmount = (type) => {
    let max = product.quantity;
    if (type == "plus") {
      setAmount(Math.min(amount + 1, max));
    }
    if (type == "minus") {
      setAmount(Math.max(amount - 1, 1));
    }
  };

  const {
    name,
    quantity,
    price,
    desc,
    brand,
    imgOne,
    imgTwo,
    imgThree,
    imgFour,
    rating,
  } = product;

  const images = [imgOne, imgTwo, imgThree, imgFour];
  return (
    <Wrapper className="center">
      <section className="product-card f mt30">
        <article className="image-section center">
          <Image alt={name} src={currentImage} layout="fill"></Image>
          <div className="sub-image-con">
            {images.map((img, index) => {
              if (img) {
                return (
                  <div
                    onClick={() => {
                      setCurrentImage(img);
                    }}
                    className="sub-image"
                    key={index}
                  >
                    <Image alt={name} layout="fill" src={img} />
                  </div>
                );
              }
            })}
          </div>
          <div className="star-con f align">
            <h1 className="trans f align">
              <MdStarRate /> <span>{calculateStars(rating).stars}</span>
            </h1>
          </div>
        </article>

        <article className="detail-section f align center">
          <div className="content center">
            <div className="heading">
              <h1 className="c-blue capitalize">{name}</h1>
              <div className="mt30">
                <Stars
                  stars={calculateStars(rating).stars}
                  reviews={calculateStars(rating).totalRating}
                />
                <p>
                  Brand : <span>{brand}</span>
                </p>
              </div>
            </div>

            <div className="price-qual-con f j-between mt30">
              <div>
                <h3>Price</h3>
                <p>{formatPrice(price)}</p>
              </div>
              <div>
                <h3>Quantity</h3>
                <div className="f align j-around">
                  <button
                    onClick={() => handleAmount("plus")}
                    type="button"
                    className="f align"
                  >
                    <HiPlus />
                  </button>
                  <span>{amount}</span>
                  <button
                    onClick={() => handleAmount("minus")}
                    type="button"
                    className="f align"
                  >
                    <HiMinus />
                  </button>
                </div>
              </div>
            </div>

            <div className="desc mt30">
              <p>{desc}</p>
            </div>

            <div
              className={`spinner sm center mt20 ${loading ? "" : "stop"}`}
            ></div>

            {quantity < 1 ? (
              <button className="cart-btn center mt30">Out Of Stock</button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="cart-btn center mt30"
              >
                Add To Cart
              </button>
            )}

            <button className="btn center mt30">
              <Link href="/cart">Go To Cart</Link>
            </button>
          </div>
        </article>
      </section>

      <UserReviews data={data} />

      <section className="related-products mt30">
        <ProductRow
          params={{
            color: `var(--gray)`,
            name: "Related Products",
            blob: null,
          }}
          products={relatedProducts}
        />
      </section>
      <section className="recently-viewed mt30">
        <ProductRow
          params={{
            color: "#b3d9b3",
            name: "Recently Viewed",
            blob: `/profile/recently-viewed`,
          }}
          products={recent}
        />
      </section>
    </Wrapper>
  );
};
export default ProductDetail;
const Wrapper = styled.main`
  max-width: 1170px;
  color: var(--blue);
  .product-card {
    flex-direction: column;
  }
  .image-section,
  .detail-section {
    width: 95%;
  }
  .image-section {
    position: relative;
    aspect-ratio: 1/1;
    object-fit: cover;
    .sub-image-con {
      position: absolute;
      width: 100%;
      visibility: hidden;
      height: 6.65rem;
      top: calc(100% - 6.65rem);
      white-space: nowrap;
      overflow-x: auto;
      text-align: center;
      .sub-image {
        position: relative;
        display: inline-block;
        width: 90px;
        height: 6rem;
        margin: 0px 10px;
        /* margin: 0 auto; */
        object-fit: cover;
      }
    }
    .star-con {
      position: absolute;
      top: 20px;
      right: 10px;
      height: 55px;
      width: 55px;
      border-radius: 50%;
      background-color: white;
      padding: 10px;
      h1 {
        font-size: 16px;
        font-family: "Inter", sans-serif;
        font-weight: 500;
        color: var(--pink);
      }
    }
  }
  .image-section:hover .sub-image-con,
  .image-section:focus .sub-image-con {
    visibility: visible;
  }
  .detail-section {
    background-color: white;
    padding: 10px 0px;
    max-height: 650px;

    .content {
      max-height: 600px;
      overflow-y: auto;
      width: 95%;
      padding: 20px 0px;
    }
    .heading {
      h1 {
        font-family: "Libre Baskerville", serif;
        letter-spacing: 0.12em;
        font-size: 20px;
        text-align: center;
      }
      p {
        font-family: "Inter", sans-serif;
        font-size: 20px;
        color: var(--gray);
      }
    }
    .price-qual-con {
      h3 {
        font-family: "Lobster", cursive;
        font-family: "Libre Baskerville", serif;
        padding-bottom: 20px;
        font-size: 20px;
        letter-spacing: 0.12em;
      }
      p {
        color: var(--pink);
        font-family: "Inter", sans-serif;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.12em;
      }
      span {
        font-weight: 900;
      }
      button,
      span {
        font-size: 20px;
      }
    }
    .desc {
      font-family: "Inter", sans-serif;
      font-size: 16px;
      line-height: 30px;
    }
    .cart-btn {
      display: block;
      background-color: var(--blue-light);
      color: white;
      width: 12em;
      padding: 15px 25px;
    }
    .btn {
      display: block;
      width: max-content;
      color: pink;
      border-bottom: 2px solid;
    }
  }

  @media screen and (min-width: 768px) {
    .product-card {
      flex-direction: row;
    }
    .image-section,
    .detail-section {
      width: 50%;
    }
    .detail-section {
      .content {
        padding: 0px;
        width: 80%;
      }
    }
  }
`;
