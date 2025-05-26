import { Store } from "store/Context";
import styled from "styled-components";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";

// firebase imports
import { addSubDocs, updateProduct } from "utils/firebase";

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
      {loading ? (
        <Loading>
          <div className="spinner center"></div>
          <div className="background f align">
            <div>
              <img src="/lady-flower.png" alt="logo background" />
            </div>
          </div>
        </Loading>
      ) : success ? (
        <Success className="f j-around">
          <h1>Yipee , Your order has been Placed Successfully</h1>

          <div className="img center">
            <img src="/celebrate.png" alt="celebration icon" />
          </div>

          <p>
            {user?.firstName}, thank you for placing your order with us You
            Rock!!. A confirmation email and summary of order has been sent to
            you. If you have any queries, feel free to reach us at Shoptacle
          </p>

          <button onClick={backToShop} className="center shoptacle-btn-pink">
            Back to Shop
          </button>

          <div className="background f align">
            <div>
              <img src="/lady-flower.png" alt="logo background" />
            </div>
          </div>
        </Success>
      ) : (
        <Error className="f j-around">
          <div className="icon f fcenter">
            <BsExclamationLg />
          </div>

          <div>
            <h1>This payment failed</h1>
            <p>Please try again</p>
          </div>

          <button onClick={backToCart} className="center shoptacle-btn-blue">
            Back to Cart
          </button>
        </Error>
      )}
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = styled.main`
  background-color: var(--pink-light);
  color: var(--blue);
  height: 100vh;
  min-height: 500px;
  position: relative;
  flex-direction: column;

  .background {
    position: absolute;
    inset: 0;
    flex-direction: column;
    justify-content: flex-end;
    pointer-events: none;

    div {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
`;

const Loading = styled.div``;

const Error = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 26px;

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    font-size: 36px;
    font-weight: 600;
    color: white;
    background-color: darkred;
    animation: bounce 1s ease infinite;
  }

  .btns {
    width: 100%;
  }

  h1 {
    font-size: 32px;
    font-weight: 600;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    opacity: 0.7;
  }

  button {
    width: 250px;
  }
`;

const Success = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 95%;
  gap: 50px;

  h1,
  p {
    font-family: "Libre Baskerville", sans-serif;
  }

  h1 {
    font-size: 20px;
    max-width: 700px;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    opacity: 0.7;
    line-height: 2.2;
    max-width: 600px;
  }

  button {
    width: 250px;
  }

  .img {
    width: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (min-width: 768px) {
    h1 {
      font-size: 30px;
    }
  }
`;
