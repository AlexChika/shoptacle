import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Store } from "store/Context";
import { UPDATE_USER, SET_USER } from "store/actionTypes";
import Paginate from "./Paginate";
import { FaUserEdit, FaOpencart } from "react-icons/fa";
import {
  BsChatSquareText,
  BsCartFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import {
  formatPrice,
  paginateFn,
  displayStar,
  Validate,
} from "utils/functions";

// firebase imports
import { signOut } from "firebase/auth";
import { getDoc, updateDoc } from "firebase/firestore";
import {
  auth,
  uploadImage,
  getSubDocs,
  getCustomerDocRef,
} from "utils/firebase";
import starIcons from "shared/components/starIcons";

// app
const ProfilePageComponent = () => {
  const { user, Logger, dispatch } = Store();
  // refs
  const orderRef = useRef(null);
  const reviewRef = useRef(null);
  const tabRef = useRef(null);

  // states
  const [tabs, setTabs] = useState(0);
  const reviews = user.reviews || [];
  const orders = user.orders || [];
  const [loading, setLoading] = useState(false);
  const [orderState, setOrderState] = useState({
    paginateOrders: paginateFn(orders, 7).items,
    currentBtn: 0,
  });
  const [reviewState, setReviewState] = useState({
    paginateReviews: paginateFn(reviews, 5).items,
    currentBtn: 0,
  });
  const [formInput, setFormInput] = useState({
    firstName: {
      valid: false,
      value: "",
    },
    lastName: {
      valid: false,
      value: "",
    },
    address: {
      valid: false,
      value: "",
    },
    url: {
      valid: false,
      value: "",
    },
  });

  useEffect(() => {
    setOrderState({
      paginateOrders: paginateFn(orders, 7).items,
      currentBtn: 0,
    });
    setReviewState({
      paginateReviews: paginateFn(reviews, 5).items,
      currentBtn: 0,
    });
  }, [user]);

  // handlers
  const handleLogout = async () => {
    await signOut(auth);
  };

  const handlePaginateOrder = (val) => {
    const newItems = paginateFn(orders, 7, val).items;
    setOrderState({
      paginateOrders: newItems,
      currentBtn: val,
    });
    orderRef.current.scrollTo(0, 0);
  };

  const handlePaginateReviews = (val) => {
    const newItems = paginateFn(reviews, 5, val).items;
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

  const validate = new Validate();
  function logError(value, type, element, min, max, name) {
    if (type == "equal") throw new Error(`check type equal directly`);
    let { valid, msg } = validate[type](value, min, max, name);
    if (valid == false) {
      element.nextSibling.textContent = msg;
    } else {
      element.nextSibling.textContent = "";
    }
    return valid;
  }

  function updateState(name, valid, value) {
    setFormInput({
      ...formInput,
      [name]: { ...formInput[name], valid, value },
    });
  }

  function formOnchange(e) {
    const name = e.target.name;
    let value = e.target.value;
    let valid;

    if (name == "firstName") {
      valid = logError(value, "text", e.target);
    }

    if (name == "lastName") {
      valid = logError(value, "text", e.target);
    }

    if (name == "address") {
      valid = logError(value, "text", e.target, 12, Infinity, "Address");
    }

    if (name == "url") {
      const labelEl = e.target.previousSibling;
      labelEl.textContent = "Profile Image";
      const file = e.target.files[0];
      if (!file) {
        valid = false;
        value = "";
        e.target.nextSibling.textContent = "No images was detected";
      } else {
        // Check if the file is an image.
        if (!file.type.match("image.*")) {
          e.target.nextSibling.textContent = "file must be an image";
          valid = false;
          value = "";
        } else {
          labelEl.textContent = file.name;
          e.target.nextSibling.textContent = "";
          valid = true;
          value = file;
        }
      }
    }
    updateState(name, valid, value);
  }

  const handleEditDetail = async (e) => {
    e.preventDefault();

    // check for non validated inputs
    for (const key in formInput) {
      if (formInput[key].valid == false) {
        Logger("Invalid entries, Please try again", "error");
        return;
      }
    }

    try {
      // upload image first
      setLoading(true);
      const file = formInput.url.value;
      const filePath = `customers/${user.email}`;
      const url = await uploadImage(file, filePath);

      // uppdate user data
      const docRef = getCustomerDocRef(user.email);
      const newUserDetails = {
        firstName: formInput.firstName.value,
        lastName: formInput.lastName.value,
        address: formInput.address.value,
        url: url,
      };
      await updateDoc(docRef, newUserDetails);
      const snapshot = await getDoc(docRef);
      dispatch({
        type: SET_USER,
        payload: snapshot.data(),
      });
      Logger("Profile updated successfully", "success");
      setFormInput({
        firstName: {
          valid: false,
          value: "",
        },
        lastName: {
          valid: false,
          value: "",
        },
        address: {
          valid: false,
          value: "",
        },
        url: {
          valid: false,
          value: "",
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Logger(error.message, "error");
    }
  };

  useEffect(() => {
    if (!user || user.reviews) return;
    async function updateUser() {
      try {
        const reviews = await getSubDocs("customers", user.email, "reviews");
        const orders = await getSubDocs("customers", user.email, "orders");
        dispatch({ type: UPDATE_USER, payload: { reviews, orders } });
      } catch (error) {
        Logger("Couldn't fetch Details, Please try again", "error");
      }
    }
    updateUser();
  }, [user, Logger, dispatch]);

  return (
    <Wrapper className="center mt30">
      <article className="header center">
        <div className="f j-between align">
          {user.url ? (
            <span className="profile-image">
              <Image src={user.url} layout="fill" alt="profile image"></Image>
            </span>
          ) : (
            <span className="profile-image">
              <Image src="/logo.svg" layout="fill" alt="profile image"></Image>
            </span>
          )}

          <div>
            <h1>
              {user?.firstName || "User"}{" "}
              {user?.lastName?.charAt(0).toUpperCase() || ""}.
            </h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </article>

      <p className="email mt10">{user.email}</p>

      <article className="address center mt20">
        <h1>Address</h1>
        <p className="mt10">{user.address}</p>
      </article>

      <section ref={tabRef} className="tabs-con center mt30">
        {/* tabs navigation */}
        <div className="nav f j-between" aria-roledescription="nav">
          {[
            { name: "Orders", icon: <BsCartFill /> },
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
                    const { name, amount, price, ref, date } = item;
                    return (
                      <div key={index} className="order-item mt10">
                        <h3>
                          {amount} x {name}
                        </h3>
                        <div className="f j-between">
                          <p>Price : {formatPrice(price)} </p>
                          <small>{date}</small>
                        </div>
                        <p>ref: {ref}</p>
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
                array={orders}
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
                  reviewState.paginateReviews.map((review) => {
                    const { name, star, experience, title, date, id } = review;
                    return (
                      <div key={id} className="review-row">
                        <div className="star-con">
                          {starIcons(star).map((star, index) => {
                            return <span key={index}>{star}</span>;
                          })}
                        </div>
                        <h3 className="mt10">{title}</h3>
                        <p className="text mt10">{experience}</p>
                        <p className="mt10">
                          <span>{"Rated on"}</span> &nbsp;
                          <span>{date}</span>
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
                array={reviews}
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
                  <input
                    value={formInput.firstName.value}
                    onChange={formOnchange}
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                  />
                  <small className="status"></small>
                </div>
                <div className="inputCon f mt20">
                  <input
                    value={formInput.lastName.value}
                    onChange={formOnchange}
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                  />
                  <small className="status"></small>
                </div>
                <div className="inputCon f mt20">
                  <textarea
                    placeholder="Your Address"
                    name="address"
                    value={formInput.address.value}
                    onChange={formOnchange}
                    cols="30"
                    rows="10"
                  ></textarea>
                  <small className="status"></small>
                </div>
                <div className="inputCon f mt20">
                  <label htmlFor="profileImage">Profile Image</label>
                  <input
                    onChange={formOnchange}
                    accept="image/*"
                    id="profileImage"
                    type="file"
                    name="url"
                  />
                  <small className="status"></small>
                </div>
                <div className={`spinner mt20 ${loading ? "" : "stop"}`}></div>
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
          <button>
            Go to cart&nbsp; <BsCartFill />
          </button>
        </Link>
        <Link href="/shop">
          <button>
            Continue shopping&nbsp; <FaOpencart />
          </button>
        </Link>
        <Link href="/">
          <button>
            Home&nbsp; <BsFillHouseDoorFill />
          </button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ProfilePageComponent;
const Wrapper = styled.main`
  max-width: 1170px;
  background-color: white;

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
      color: tomato;
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
    border: 1px solid var(--gray);

    .nav {
      span {
        flex: 1;
        text-align: center;
        padding: 15px 10px;
        color: Var(--blue);
        cursor: pointer;
        background-color: #d9ecec;
        border: 1px solid white;
      }
      span.active {
        background-color: var(--blue);
        color: white;
      }
    }

    .content {
      max-height: 600px;
      overflow: hidden;
      padding: 0px 10px;
      .empty {
        height: 100%;
        color: var(--gray);
      }
    }

    .order {
      overflow-y: auto;
      height: 530px;

      .order-item {
        padding: 5px;
        border-bottom: 2px solid var(--pink-light);
        color: var(--blue);
      }

      h3,
      p {
        font-style: italic;
      }

      h3 {
        letter-spacing: 0.12rem;
      }

      small {
        color: gray;
      }
    }

    .review {
      color: var(--blue);
      overflow-y: auto;
      height: 530px;
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
        font-size: 15px;
      }
    }

    .edit {
      color: var(--blue);
      height: 530px;
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
      label,
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
      label {
        color: grey;
        cursor: pointer;
      }
      input[type="file"] {
        display: none;
      }
      input::placeholder {
        color: gray;
      }
      small {
        color: red;
        font-size: 14px;
      }
      button {
        background-color: var(--blue);
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
      background-color: var(--blue);
      color: white;
      display: flex;
      justify-content: center;
      flex: 1;
      font-size: 16px;
      min-width: 10em;
      padding: 10px 10px;
      margin: 10px 2px 0px 2px;
    }
  }
`;
