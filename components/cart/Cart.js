import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { useRouter } from "next/router";
import CartItem from "./CartItem";
import ProductRow from "shared/components/ProductRow";
import { formatPrice } from "utils/functions";

// stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { usePaystack } from "payment/paystack";
import StripeCheckout from "payment/StripeCheckout";
import usePaginate from "shared/hooks/usePaginate";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import ChoosePaymentModal from "./ChoosePaymentModal";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Cart = ({ data }) => {
  const router = useRouter();
  const { Paystack } = usePaystack();
  const { Logger, recent, user } = Store();
  const [modal, setModal] = useState(false);
  const [clientSecret, setClientSecrete] = useState(null);
  const [stripeLoading, setStripeLoading] = useState(false);
  const { cart, loading, cartTotals, setRefresh, refresh } = data;

  const { paginated, Pagination } = usePaginate(cart, 5, 1, true, onPageChange);

  // stripe
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // local funcs
  function onPageChange() {
    window.scrollTo(0, 70);
  }

  const handleCheckout = () => {
    if (!user) {
      Logger("Please Login To See Checkout", "error");
      router.push("/profile");
      return;
    }

    // this would refresh the cart incase of any out of stock
    setRefresh(refresh + 1);
    setModal(true);
  };

  const handlePayWithPaystack = async () => {
    setModal(false);

    const d = {
      email: user.email,
      amount: cartTotals.total,
      Logger,
    };

    const p = new Paystack();
    if (!p.hasLoaded()) return;
    p.payWithPaystack(d);
  };

  const handlePayWithStripe = async (e) => {
    setStripeLoading(true);
    try {
      const res = await fetch("/api/stripe-create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotals.total }),
      });
      const { clientSecret } = await res.json();
      setStripeLoading(false);
      setClientSecrete(clientSecret);
      setModal(false);
      localStorage.setItem("checkout", JSON.stringify(cart));
    } catch (error) {
      Logger("There was an error", "error");
      console.error(error.message);
    }
  };

  const cancelPaymentModal = () => {
    setModal(false);
    setStripeLoading(false);
    setClientSecrete(null);
    Logger("Payment was not completed. Window closed", "error");
  };

  return (
    <Wrapper className="center mt20">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckout
            cancelPaymentModal={cancelPaymentModal}
            Logger={Logger}
          />
        </Elements>
      )}

      <ChoosePaymentModal
        modal={modal}
        setModal={setModal}
        handlePayWithPaystack={handlePayWithPaystack}
        handlePayWithStripe={handlePayWithStripe}
        stripeLoading={stripeLoading}
      />

      {loading && <div className="spinner center sm" />}

      {cart.length < 1 ? (
        <EmptyCart />
      ) : (
        <section className="cart f j-between">
          <div className="cart-items">
            {paginated.map((cart) => {
              return <CartItem cart={cart} key={cart.id} />;
            })}
            <Pagination />
          </div>

          <CartSummary
            cartTotals={cartTotals}
            handleCheckout={handleCheckout}
            user={user}
            formatPrice={formatPrice}
          />
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

export default Cart;
const Wrapper = styled.main`
  padding: 0px 5px;
  max-width: 1170px;

  .cart {
    flex-direction: column;
    padding: 10px;
  }

  @media screen and (min-width: 700px) {
    .cart {
      flex-direction: row;
      gap: 20px;
      .cart-items {
        width: 50%;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    padding: 0px;
  }
`;
