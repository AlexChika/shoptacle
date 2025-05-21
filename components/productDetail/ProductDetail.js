import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";
import UserReviews from "./userReviews/UserReviews";
import ProductRow from "shared/components/ProductRow";
import { MdStarRate } from "react-icons/md";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { formatPrice, calculateStars } from "utils/functions";

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
      console.error(error.message);
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
            <div className="heading-con">
              <div className="heading">
                <h1 className="c-blue capitalize">{name.toLowerCase()}</h1>

                <div className="mt20">
                  <Stars
                    stars={calculateStars(rating).stars}
                    reviews={calculateStars(rating).totalRating}
                  />
                  <p>
                    Brand:{" "}
                    <span className="capitalize">{brand.toLowerCase()}</span>
                  </p>
                </div>
              </div>

              <div className="price-qual-con f j-between mt20">
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
                      <FiPlusCircle />
                    </button>
                    <p>{amount}</p>
                    <button
                      onClick={() => handleAmount("minus")}
                      type="button"
                      className="f align"
                    >
                      <FiMinusCircle />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="desc mt20">
              <p>{desc}</p>
            </div>

            <div
              className={`spinner sm center mt20 ${loading ? "" : "stop"}`}
            ></div>
          </div>

          <div className="btn-con">
            {quantity < 1 ? (
              <button className="add-to-cart-btn center">Out Of Stock</button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="add-to-cart-btn center"
              >
                Add To Cart
              </button>
            )}

            <button className="go-to-cart-btn center">
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
    padding: 10px;
    > img {
      object-fit: cover;
    }

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
      box-shadow: 1px 1px 5px var(--gray);
      padding: 5px;
      h1 {
        font-size: 16px;
        font-family: "Roboto", sans-serif;
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
    padding: 15px 0px;
    position: relative;
    flex-direction: column;

    .content {
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      width: 95%;
      padding: 20px 0px;
    }

    .heading {
      h1 {
        font-family: "Libre Baskerville", serif;
        letter-spacing: 2px;
        font-size: 18px;
        text-align: center;
      }

      p {
        font-family: "Roboto", sans-serif;
        font-size: 16px;
        color: var(--gray);
        text-align: center;
      }
    }

    .price-qual-con {
      h3 {
        font-family: "Libre Baskerville", serif;
        padding-bottom: 10px;
        font-size: 16px;
        letter-spacing: 2px;
      }

      p {
        color: var(--pink);
        font-family: "Roboto", sans-serif;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 2px;
      }

      button,
      span {
        font-size: 20px;
      }
    }

    .desc {
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 30px;
      overflow-y: auto;
      max-height: 300px;
      opacity: 0.7;
    }

    .btn-con {
      bottom: 10px;
      width: 100%;
      display: flex;
      gap: 20px;
      width: 95%;

      .add-to-cart-btn {
        background-color: var(--blue);
        color: white;
      }

      .add-to-cart-btn,
      .go-to-cart-btn {
        display: block;
        width: 100%;
        white-space: nowrap;
        font-weight: 600;
        font-size: 14px;
        padding: 10px 24px;
        border-radius: 6px;
      }

      .add-to-cart-btn:focus,
      .go-to-cart-btn:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(17, 28, 42, 0.3);
      }

      .add-to-cart-btn:hover {
        background-color: var(--blue-light);
      }

      .go-to-cart-btn {
        a {
          font-weight: 600;
        }
        color: var(--blue);
        border: 2px solid;
      }

      .go-to-cart-btn:hover {
        background-color: whitesmoke;
      }
    }
  }

  @media screen and (min-width: 768px) {
    padding: 0 15px;

    .product-card {
      flex-direction: row;
      aspect-ratio: 2/1;
    }

    .image-section,
    .detail-section {
      width: 50%;
    }

    .detail-section {
      border-left: 1px solid var(--blue);

      .content {
        padding: 0px 0px;
        width: 80%;
        height: calc(100% - 45px);
        max-height: calc(100% - 45px);
      }

      .desc {
        height: 100%;
        max-height: unset;
      }

      .btn-con {
        position: absolute;
        width: 80%;
      }
    }
  }

  @media screen and (min-width: 1170px) {
    padding: 0;
  }
`;
