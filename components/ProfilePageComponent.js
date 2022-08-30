import React, { useState, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Logo from "../public/icon.png";
import Paginate from "./Paginate";
import { FaUserEdit } from "react-icons/fa";
import { BsChatSquareText, BsCartFill } from "react-icons/bs";
import { formatPrice, paginateFn, displayStar } from "../utils/functions";
const ProfilePageComponent = () => {
  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const array = [];
  const orderRef = useRef(null);
  const reviewRef = useRef(null);

  const [orderState, setOrderState] = useState({
    paginateOrders: paginateFn(array, 7).items,
    currentBtn: 0,
  });
  const [reviewState, setReviewState] = useState({
    paginateReviews: paginateFn(array, 5).items,
    currentBtn: 0,
  });
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
  const [tabs, setTabs] = useState(0);
  return (
    <Wrapper className="center">
      <h3 className="title">My Profile</h3>
      <article className="header f align">
        <div className="profile-image gray">
          <Image src={Logo} layout="fill" alt="profile image"></Image>
        </div>
        <div className="bio">
          <h1>Alex C.</h1>
          <p>mcluckey1@gmail.com</p>
        </div>
      </article>
      <article className="address center mt20">
        <h1>Address</h1>
        <p className="mt10">
          {false ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum libero
          ipsa tenetur nulla magnam culpa.`}
        </p>
      </article>
      <section className="tabs-con mt30">
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
                  setTabs(index);
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
            <div className="edit gray">
              <h1 className="mt10">Update your profile</h1>
            </div>
          )}
        </article>
      </section>
    </Wrapper>
  );
};

export default ProfilePageComponent;
const Wrapper = styled.main`
  max-width: 620px;
  padding: 10px;
  min-height: 100vh;
  /* box-shadow: 2px 2px 5px var(--gray), -2px -2px 5px var(--gray); */
  /* background-color: white; */
  .title {
    padding: 30px;
    font-style: italic;
    text-align: center;
    text-decoration: underline;
    color: var(--gray);
  }
  .header {
    padding: 10px;
    .profile-image {
      position: relative;
      overflow: hidden;
      width: 100px;
      height: 100px;
      min-width: 80px;
      border-radius: 50%;
      margin-right: 30px;
    }
    h1 {
      color: var(--blue);
      font-style: italic;
    }
    p {
      word-break: break-all;
      color: var(--gray);
    }
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
    box-shadow: 2px 2px 5px var(--gray), -2px -2px 5px var(--gray);
    .nav {
      background-color: white;
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
      background-color: white;
      max-height: 620px;
      overflow: hidden;
      .empty {
        min-height: 30vh;
        color: var(--gray);
        background-color: white;
      }
    }
    .order {
      overflow-y: auto;
      background-color: var(--gray);
      max-height: 550px;
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
      max-height: 550px;
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
      h1 {
        text-align: center;
      }
    }
  }
`;
