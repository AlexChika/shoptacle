import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Store } from "../store/Context";
import Link from "next/link";
import Image from "next/image";
import Paginate from "./Paginate";
import Modal from "./Modal";
import emptyCartImage from "../public/trolley.png";
import paystackIcon from "../public/paystack.png";
import stripeIcon from "../public/stripe.png";
import { ProductRow } from "./ShopPageComponent";
import CartItem from "./CartItem";
import { paginateFn, formatPrice } from "../utils/functions";
const CartPageComponent = ({ data }) => {
  const { Logger, recent } = Store();
  const { cart, loading, cartTotals } = data;
  const cartRef = useRef(null);
  const [currentBtn, setCurrentBtn] = useState(0);
  const [modal, setModal] = useState(false);
  const [paginateCartItems, setPaginateCartItems] = useState(
    paginateFn(cart, 5).items
  );

  // local funcs
  const handlePaginate = (val) => {
    const newItems = paginateFn(cart, 5, val).items;
    setPaginateCartItems(newItems);
    setCurrentBtn(val);
    window.scrollTo(0, Number(cartRef.current.offsetTop));
  };

  const handleCheckout = () => {
    setModal(true);
  };

  const handleSelectCheckout = () => {
    Logger("Checkout would be the last implementation", "success");
  };

  // update paginate array
  useEffect(() => {
    setPaginateCartItems(paginateFn(cart, 5).items);
  }, [cart]);

  return (
    <Wrapper className="center mt30">
      <Modal modal={modal} setModal={setModal}>
        <div className="modal">
          <h2>Choose Your Payment Method</h2>
          <div className="mt20">
            <h3>Paystack</h3>
            <button onClick={handleSelectCheckout} className="mt10">
              <Image alt="paystack icon" src={paystackIcon} />
            </button>
          </div>
          <div className="mt20">
            <h3>Stripe</h3>
            <button onClick={handleSelectCheckout} className="mt10">
              <Image alt="stripe icon" src={stripeIcon} />
            </button>
          </div>
        </div>
      </Modal>
      <main className="loading">
        {loading ? <div className="spinner center sm"></div> : ""}
      </main>

      {cart.length < 1 ? (
        <section className="cart-empty">
          <div className="icon center f fcenter">
            <Image
              alt="empty cart logo"
              src={emptyCartImage}
              width={64}
              height={64}
            />
          </div>
          <h1 className="mt20">Your Cart Is Empty</h1>
          <p className="mt20">
            Browse through our collections and discover our best deals!
          </p>
          <button className="mt20" type="button">
            <Link href="/shop">Start Shopping</Link>
          </button>
        </section>
      ) : (
        <section ref={cartRef} className="cart f j-between">
          <div className="cart-items">
            {paginateCartItems.map((cart) => {
              return <CartItem cart={cart} key={cart.id} />;
            })}
            <Paginate
              paginateFn={paginateFn}
              array={cart}
              itemsPerPage={5}
              currentBtn={currentBtn}
              handlePaginate={handlePaginate}
            />
          </div>
          <div className="cart-summary">
            <div className="content">
              <article className="summary">
                <div className="f j-between">
                  <p>Sub Total</p>
                  <p>{formatPrice(cartTotals.subtotal)}</p>
                </div>
                <div className="f j-between mt20">
                  <p>Delivery Fee</p>
                  <p>{formatPrice(cartTotals.delivery)}</p>
                </div>
                <div className="f j-between mt20">
                  <p>Tax Fee</p>
                  <p>{formatPrice(cartTotals.tax)}</p>
                </div>
              </article>
              <article className="total">
                <div className="f j-between mt20">
                  <h1>Total</h1>
                  <h1>{formatPrice(cartTotals.total)}</h1>
                </div>
              </article>
            </div>
            <button onClick={handleCheckout} className="mt30">
              Continue To Checkout
            </button>
          </div>
        </section>
      )}

      <section className="recently-viewed mt30">
        <ProductRow
          params={{
            color: "#f2f9f9",
            name: "Recently Viewed",
            blob: `/profile/recently-viewed`,
          }}
          products={recent}
        />
      </section>
    </Wrapper>
  );
};

export default CartPageComponent;
const Wrapper = styled.main`
  max-width: 1170px;
  .modal {
    padding-top: 20px;
    text-align: center;
    color: var(--blue);
    h3 {
      color: skyblue;
    }
    button {
      width: 100%;
      border: 2px solid var(--gray);
      border-radius: 10px;
    }
  }

  .loading {
    height: 30px;
  }

  .cart {
    flex-direction: column;
    padding: 10px;
    .cart-summary {
      color: var(--blue);
      max-width: 575px;
      margin-top: 30px;
      .content {
        background-color: white;
        padding: 30px;
        .summary {
          border-bottom: 2px solid;
          padding-bottom: 15px;
        }
        .total {
          font-size: 20px;
        }
      }
      button {
        width: 100%;
        background-color: var(--pink);
        padding: 10px 20px;
        color: white;
        font-size: 16px;
      }
    }
  }

  .cart-empty {
    flex-direction: column;
    padding: 30px 0px;
    background-color: white;
    color: var(--blue);
    letter-spacing: 0.12rem;
    text-align: center;
    .icon {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: var(--pink-light);
    }
    h1 {
      font-family: "Libre Baskerville", serif;
    }
    p {
      font-size: 16px;
    }
    button {
      color: white;
      background-color: var(--pink);
      padding: 15px 20px;
      font-size: 16px;
    }
  }

  @media screen and (min-width: 768px) {
    .cart {
      flex-direction: row;
      .cart-items {
        width: 50%;
      }
      .cart-summary {
        width: 45%;
        align-self: flex-start;
        margin-top: 0px;
      }
    }
  }
`;
