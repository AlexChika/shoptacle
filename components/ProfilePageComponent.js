import React, { useState, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../public/icon.png";
import Paginate from "./Paginate";
import { FaUserEdit } from "react-icons/fa";
import { BsChatSquareText, BsCartFill } from "react-icons/bs";
import { formatPrice, paginateFn, displayStar } from "../utils/functions";

// firebase imports
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

// app
const ProfilePageComponent = () => {
  const router = useRouter();
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const array = [];
  // refs
  const orderRef = useRef(null);
  const reviewRef = useRef(null);
  const tabRef = useRef(null);

  // states
  const [tabs, setTabs] = useState(0);
  const [orderState, setOrderState] = useState({
    paginateOrders: paginateFn(array, 7).items,
    currentBtn: 0,
  });
  const [reviewState, setReviewState] = useState({
    paginateReviews: paginateFn(array, 5).items,
    currentBtn: 0,
  });

  // handlers
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handlePaginateOrder = (val) => {
    const newItems = paginateFn(array, 7, val).items;
    setOrderState({
      paginateOrders: newItems,
      currentBtn: val,
    });
    orderRef.current.scrollTo(0, 0);
  };
  const handlePaginateReviews = (val) => {
    const newItems = paginateFn(array, 5, val).items;
    setReviewState({
      paginateReviews: newItems,
      currentBtn: val,
    });
    reviewRef.current.scrollTo(0, 0);
  };

  const handleSwitchTabs = (index) => {
    setTabs(index);
    window.scrollTo(0, Number(tabRef.current.offsetTop));
  };
  const handleEditDetail = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper className="center mt30">
      <h3 className="title">My Profile</h3>
      <article className="header center">
        <div className="f ">
          <span className="profile-image">
            <Image src={Logo} layout="fill" alt="profile image"></Image>
          </span>
          <div>
            <h1>Chinazaram C.</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </article>
      <p className="email mt10">mcluckey1@gmail.com</p>
      <article className="address center mt20">
        <h1>Address</h1>
        <p className="mt10">
          {false ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum libero
          ipsa tenetur nulla magnam culpa.`}
        </p>
      </article>
      <section ref={tabRef} className="tabs-con center mt30">
        {/* tabs navigation */}
        <div className="nav f j-between" aria-roledescription="nav">
          {[
            { name: "Order", icon: <BsCartFill /> },
            { name: "Reviews", icon: <BsChatSquareText /> },
            { name: "Edit", icon: <FaUserEdit /> },
          ].map((nav, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  handleSwitchTabs(index);
                }}
                className={`f fcenter trans ${tabs === index ? "active" : ""}`}
              >
                {nav.icon} &nbsp; {nav.name}
              </span>
            );
          })}
        </div>
        {/* tabs content */}
        <article className="content">
          {/*  order  */}
          {tabs === 0 && (
            <div>
              <div ref={orderRef} className="order">
                {orderState.paginateOrders.length > 0 ? (
                  orderState.paginateOrders.map((item, index) => {
                    return (
                      <div key={index} className="order-item mt10">
                        <h3> 2 x name of item</h3>
                        <div className="f j-between mt10">
                          <p>Price : {formatPrice(34000)} </p>
                          <small>25th march 2022</small>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty f fcenter ">
                    <h1>You are yet to make orders</h1>
                  </div>
                )}
              </div>
              <Paginate
                paginateFn={paginateFn}
                array={array}
                itemsPerPage={7}
                currentBtn={orderState.currentBtn}
                handlePaginate={handlePaginateOrder}
              />
            </div>
          )}
          {/* reviews */}
          {tabs === 1 && (
            <div>
              <div ref={reviewRef} className="review">
                {reviewState.paginateReviews.length > 0 ? (
                  reviewState.paginateReviews.map((review, index) => {
                    return (
                      <div key={index} className="review-row">
                        <div className="star-con">
                          {displayStar(5).map((star, index) => {
                            return <span key={index}>{star}</span>;
                          })}
                        </div>
                        <h3 className="mt10">
                          {"Excellent Product"}
                          {review}
                        </h3>
                        <p className="text mt10">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Ipsam corporis voluptatum quia tempora deserunt
                          consequatur aperiam, dolores eaque numquam ad.
                        </p>
                        <p className="mt10">
                          <span>{"Rated on"}</span> &nbsp;
                          <span>{"12 / 22 / 2022"}</span>
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty f fcenter ">
                    <h1>You are yet to Review a product</h1>
                  </div>
                )}
              </div>
              <Paginate
                paginateFn={paginateFn}
                array={array}
                itemsPerPage={5}
                currentBtn={reviewState.currentBtn}
                handlePaginate={handlePaginateReviews}
              />
            </div>
          )}
          {/* edit */}
          {tabs === 2 && (
            <div className="edit">
              <h1>Update your profile</h1>
              <form
                className="f j-around align center"
                onSubmit={handleEditDetail}
              >
                <div className="inputCon f mt20">
                  <input type="text" placeholder="First Name" name="" id="" />
                  <code className="status"></code>
                </div>
                <div className="inputCon f mt20">
                  <input type="text" placeholder="Last Name" name="" id="" />
                  <code className="status"></code>
                </div>
                <div className="inputCon f mt20">
                  <textarea
                    placeholder="Your Address"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                  <code className="status"></code>
                </div>
                <div className="inputCon f mt20">
                  <input type="file" name="" id="" />
                  <code className="status"></code>
                </div>
                <button className="mt20" type="submit">
                  Submit
                </button>
              </form>
            </div>
          )}
        </article>
      </section>
      <div className="btns center f j-around">
        <Link href="/cart">
          <button>Go to cart</button>
        </Link>
        <Link href="/shop">
          <button>Continue shopping</button>
        </Link>
        <Link href="/">
          <button>Home</button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ProfilePageComponent;
const Wrapper = styled.main`
  max-width: 1170px;
  background-color: white;
  .title {
    padding: 30px;
    font-style: italic;
    text-align: center;
    text-decoration: underline;
    color: var(--gray);
  }
  .header {
    max-width: 650px;
    padding: 10px;
    border-bottom: 1px solid var(--gray);
    .profile-image {
      position: relative;
      overflow: hidden;
      width: 80px;
      height: 80px;
      min-width: 80px;
      border-radius: 50%;
      margin-right: 15px;
    }
    div {
      align-self: center;
    }
    h1 {
      color: var(--blue);
      font-style: italic;
    }
    button {
      width: 100%;
      color: var(--pink);
      text-decoration: underline;
    }
  }

  .email {
    color: var(--gray);
    text-align: center;
  }

  .address {
    padding: 10px;
    text-align: center;
    max-width: 400px;
    h1 {
      color: var(--blue);
      text-decoration: underline;
    }
  }
  .tabs-con {
    max-width: 650px;
    .nav {
      span {
        flex: 1;
        text-align: center;
        padding: 15px 10px;
        color: white;
        cursor: pointer;
        background-color: gray;
      }
      span.active {
        background-color: var(--blue-light);
        color: var(--pink);
      }
    }
    .content {
      border: 1px solid gray;

      max-height: 600px;
      overflow: hidden;
      padding: 0px 10px;
      .empty {
        min-height: 30vh;
        color: var(--gray);
      }
    }
    .order {
      overflow-y: auto;
      max-height: 530px;
      .order-item {
        padding: 10px;
        border-bottom: 2px solid var(--pink-light);
        color: var(--blue);
      }
      .order-item:nth-of-type(even) {
        background-color: var(--pink-light);
      }
      .order-item:nth-of-type(odd) {
        background-color: white;
      }
      h3 {
        letter-spacing: 0.12rem;
        font-style: italic;
      }
      small {
        color: gray;
      }
    }
    .review {
      color: var(--blue);
      overflow-y: auto;
      max-height: 530px;
      .review-row {
        padding: 10px;
        border-bottom: 2px solid var(--gray);
        margin-bottom: 20px;
      }
      .star-con {
        color: var(--pink);
      }
      .text {
        min-width: 280px;
        max-width: 400px;
      }
      p {
        line-height: 30px;
      }
    }
    .edit {
      color: var(--blue);
      padding: 20px 0px;
      h1 {
        text-align: center;
        text-decoration: underline;
      }
      form {
        flex-direction: column;
        max-width: 400px;
        width: 90%;
      }
      .inputCon {
        width: 100%;
        padding: 0;
        flex-direction: column;
      }
      input,
      textarea {
        background-color: whitesmoke;
        color: black;
        padding: 10px;
      }
      textarea {
        max-width: 100%;
        min-width: 100%;
        max-height: 150px;
        min-height: 150px;
      }
      input::placeholder {
        color: gray;
      }
      button {
        background-color: var(--pink);
        width: 100%;
        padding: 10px 20px;
        border-radius: 20px;
        color: white;
      }
    }
  }
  .btns {
    max-width: 650px;
    padding: 30px 10px;
    flex-wrap: wrap;
    button {
      background-color: red;
      color: white;
      flex: 1;
      font-size: 16px;
      min-width: 10em;
      padding: 10px 10px;
      margin-top: 10px;
    }
    button:nth-of-type(1) {
      background-color: var(--blue);
    }
    button:nth-of-type(2) {
      background-color: var(--gray);
    }
    button:nth-of-type(3) {
      background-color: var(--pink);
    }
  }
`;
