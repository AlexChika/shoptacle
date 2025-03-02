import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Store } from "../../store/Context";
import Image from "next/image";
import { useRouter } from "next/router";
import ladyFlower from "../../public/lady-flower.png";
import celebrate from "../../public/celebrate.png";
// firebase imports
import { addSubDocs, updateProduct } from "../../utils/firebase";

// app
const Confirm = () => {
  const { user, Logger } = Store();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // btn handlers ....
  const backToCart = () => {
    router.push("/cart");
  };
  const backToShop = () => {
    router.push("/shop");
  };

  // check payment status
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get(
      "redirect_status"
    );
    if (param === "succeeded") {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, []);

  // update user orders in  db ...
  useEffect(() => {
    const paymentIntent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );

    let cart = JSON.parse(localStorage.getItem("checkout")) || [];
    // console.log(cart);
    let email = user.email;

    if (!email) {
      return;
    }

    async function updateOrders() {
      for (let i = 0; i < cart.length; i++) {
        // console.log("running");

        if (cart[i].quantity < 1) continue;
        let amount = cart[i].amount;
        let quantity = cart[i].quantity;

        // order object
        const order = {
          name: cart[i].name, // of product
          price: cart[i].price, // price of item
          amount, // amount of item
          ref: paymentIntent, //ref(paystack) or paymentIntent(stripe)
          date: new Date().toDateString(),
        };

        // add to db
        await addSubDocs("customers", email, "orders", order);
        // update product quantity
        await updateProduct(cart[i].id, { quantity: quantity - amount });
      }
      // console.log("finished");

      // reset localstorage
      localStorage.setItem("checkout", "[]");
      setLoading(false);
    }

    if (success) {
      updateOrders();
    }
  }, [success, user]); // added user as a dependency in case of a disconnection during confirmation or lag in state. useEffect will rerun when connection is restored

  return (
    <Wrapper className="layout f fcenter">
      <div className="background f align">
        <div>
          <Image src={ladyFlower} alt={"logo background"}></Image>
        </div>
      </div>

      {loading ? (
        <div className="loading f j-around">
          <div className="spinner center"></div>
        </div>
      ) : success ? (
        <section className="box success f j-around">
          <h1>Yipee , Your order has been Placed Successfully</h1>

          <div className="small-image center">
            <Image src={celebrate} alt="celebration icon"></Image>
          </div>

          <p>
            {user?.firstName}, thank you for placing your order with us You
            Rock!!. A confirmation email and summary of order has been sent to
            you. If you have any queries, feel free to reach us at Shoptacle
          </p>

          <div className="f j-around">
            <button onClick={backToCart} className="center">
              Back to Cart
            </button>
            <button onClick={backToShop} className="center">
              Back to Shop
            </button>
          </div>
        </section>
      ) : (
        <section className="box f j-around">
          <h1>This payment failed... Please try again</h1>
          <div className="f j-around">
            <button onClick={backToCart} className="center">
              Back to Cart
            </button>
            <button onClick={backToShop} className="center">
              Back to Shop
            </button>
          </div>
        </section>
      )}
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = styled.main`
  background-color: var(--pink-light);
  color: var(--blue);
  height: 100vh;
  position: relative;
  flex-direction: column;

  .box,
  .loading {
    max-width: 945px;
    width: 90%;
    height: 80vh;
    min-height: 500px;
    background-color: white;
    flex-direction: column;
    text-align: center;
    padding: 10px;

    .small-image {
      width: 250px;
    }

    h1,
    p {
      font-family: "Libre Baskerville", serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 30px;
    }

    button {
      max-width: 250px;
      padding: 10px 20px;
      color: white;
      background-color: var(--blue-light);
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    pointer-events: none;
  }

  @media screen and (min-width: 768px) {
    .box {
      h1,
      p {
        font-size: 20px;
        line-height: 35px;
      }
    }
  }
  @media screen and (min-width: 1000px) {
    .box {
      h1,
      p {
        font-size: 25px;
        line-height: 50px;
      }
    }
  }
`;
