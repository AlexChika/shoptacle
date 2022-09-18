import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Store } from "../store/Context";
import { BsStarFill, BsStar } from "react-icons/bs";
import { calculateStars, displayStar, paginateFn } from "../utils/functions";
import Paginate from "./Paginate";
import { addSubDocs, getProduct, updateProduct } from "../utils/firebase";

// app
const UserReviews = ({ data }) => {
  const { Logger, user } = Store();
  const { product, reviews, id, refresh, setRefresh } = data;
  const { rating, name } = product;
  const router = useRouter();
  // local states
  const [selectStarRating, setSelectStarRating] = useState(0);
  const [formInput, setFormInput] = useState({
    title: "",
    experience: "",
  });
  const [currentBtn, setCurrentBtn] = useState(0);
  const reviewRef = useRef(null);
  const [paginateUserReviews, setPaginateUserReviews] = useState(
    paginateFn(reviews, 5).items.reverse()
  );

  // local funcs
  const handlePaginate = (val) => {
    const newItems = paginateFn(reviews, 5, val).items.reverse();
    setPaginateUserReviews(newItems);
    setCurrentBtn(val);
    reviewRef.current.scrollTo(0, 0);
  };

  function handleFormInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    const el = e.target;
    if (value.length < 5) {
      el.style.border = "2px solid red";
    } else {
      el.style.border = "2px solid green";
    }
    setFormInput({ ...formInput, [name]: value });
  }

  async function handleRateProduct(e) {
    e.preventDefault();
    const spinner = e.target.querySelector(".spinner");
    const experience = formInput.experience.trim();
    const title = formInput.title.trim();

    // check for star rating
    if (selectStarRating < 1) {
      return Logger("Please select atleast one star", "error");
    }

    // check for inputs fields
    if (experience.length < 5 || title.length < 5) {
      return Logger("Please Fill Input Fields", "error");
    }

    // check if user is logged in
    if (!user) {
      Logger("You must be signed in to make reviews", "error");
      router.push("/profile");
      return;
    }

    // activate spinner
    spinner.style.display = "block";

    let type; //get the equivalent key of rating object
    switch (selectStarRating) {
      case 1:
        type = "one";
        break;
      case 2:
        type = "two";
        break;
      case 3:
        type = "three";
        break;
      case 4:
        type = "four";
        break;
      case 5:
        type = "five";
        break;
      default:
        break;
    }

    // review object to add to reviews collection
    const review = {
      name: `${user.firstName} ${user.lastName}`,
      star: selectStarRating,
      date: new Date().toDateString(),
      title,
      experience,
    };
    try {
      // get current product rating
      const product = await getProduct(id);

      // new rating object
      const newRating = {
        rating: { ...product.rating, [type]: rating[type] + 1 },
      };
      await updateProduct(id, newRating);
      await addSubDocs("products", id, "reviews", review);
      await addSubDocs("customers", user.email, "reviews", review);
      spinner.style.display = "none";

      // clear form
      setFormInput({
        title: "",
        experience: "",
      });
      setSelectStarRating(0);
      Logger("We have added your review", "success");
      // update product and reviews
      setRefresh(refresh + 1);
    } catch (error) {
      spinner.style.display = "none";
      Logger("We encountered an error, pls try again", "error");
    }
  }

  // update paginate reviews in case reviews changes
  useEffect(() => {
    setPaginateUserReviews(paginateFn(reviews, 5).items.reverse());
  }, [reviews]);

  // values
  const stars = calculateStars(rating).stars;
  const totalRating = calculateStars(rating).totalRating;

  // jsx
  return (
    <Wrapper className="mt30">
      <div className="heading center">
        <h1>Verified User Reviews</h1>
        <p className="f mt10">
          <span>{stars}/5</span>&nbsp;
          <span>
            {displayStar(stars).map((star, index) => {
              return <span key={index}>{star}</span>;
            })}
          </span>
          &nbsp; &nbsp;
          <span>{totalRating}</span>&nbsp;
          <span>verified ratings</span>
        </p>
      </div>

      <div className="content f">
        {/* form section */}
        <form onSubmit={handleRateProduct} className="center f align j-around">
          <h2>Rate {name}</h2>
          <div className="star-con">
            {[1, 2, 3, 4, 5].map((btn) => {
              return btn <= selectStarRating ? (
                <button key={btn} type="button">
                  <BsStarFill
                    style={{ color: "var(--pink)" }}
                    onClick={() => setSelectStarRating(btn)}
                  />
                </button>
              ) : (
                <button key={btn} type="button">
                  <BsStar onClick={() => setSelectStarRating(btn)} />
                </button>
              );
            })}
          </div>
          <input
            onChange={handleFormInput}
            value={formInput.title}
            placeholder="Comment Title"
            type="text"
            name="title"
            required
            data-id="title"
          />
          <textarea
            placeholder="Describe Your Experience"
            name="experience"
            value={formInput.experience}
            onChange={handleFormInput}
            cols="30"
            rows="10"
            required
            data-id="experience"
          ></textarea>
          <div className="spinner stop mt20"></div>
          <button className="submit-btn mt30 center" type="submit">
            Submit
          </button>
        </form>

        {/* reviews section */}
        <article className="review-con center">
          <p className="title capitalize">
            {reviews.length} Reviews For {name}
          </p>
          <div ref={reviewRef} className="reviews">
            {paginateUserReviews.length > 0 ? (
              paginateUserReviews.map((review) => {
                const { experience, date, title, name, star, id } = review;

                return (
                  <div key={id} className="review-row">
                    <div className="star-con">
                      {displayStar(star).map((star, index) => {
                        return <span key={index}>{star}</span>;
                      })}
                    </div>
                    <h3 className="mt10">{title}</h3>
                    <p className="text mt10">{experience}</p>
                    <p className="mt10">
                      <span>{date}</span> &nbsp; by &nbsp; <span>{name}</span>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="minvh c-blue f fcenter">
                <h1>This product have no ratings</h1>
              </div>
            )}
          </div>

          <Paginate
            paginateFn={paginateFn}
            array={reviews}
            itemsPerPage={5}
            currentBtn={currentBtn}
            handlePaginate={handlePaginate}
          />
        </article>
      </div>
    </Wrapper>
  );
};

export default UserReviews;
const Wrapper = styled.section`
  color: var(--blue);
  .heading {
    background-color: white;
    padding: 10px;
    width: 95%;
    border-bottom: 2px solid var(--pink-light);
    h1 {
      font-family: "Libre Baskerville", serif;
      letter-spacing: 0.12rem;
      font-size: 20px;
    }
    p {
      color: var(--pink);
      letter-spacing: 0.12rem;
    }
  }
  .content {
    flex-direction: column;
    min-height: 500px;
    width: 100%;
  }
  form {
    order: 1;
    height: 500px;
    width: 95%;
    background-color: white;
    padding: 10px;
    color: var(--blue);
    flex-direction: column;
    h2 {
      text-align: center;
    }
    .star-con {
      width: 100%;
      text-align: center;
    }
    .star-con button {
      font-size: 30px;
      margin: 0px 10px;
    }
    input,
    textarea {
      display: block;
      background: transparent;
      border: 1px solid black;
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }
    input {
      /* margin-bottom: 30px; */
    }
    textarea {
      max-width: 100%;
      min-width: 100%;
      max-height: 150px;
      min-height: 150px;
    }
    .submit-btn {
      display: block;
      background-color: var(--blue-light);
      color: white;
      width: 12em;
      padding: 15px 25px;
    }
  }
  .review-con {
    max-height: 670px;
    width: 95%;
    background-color: white;
    border-bottom: 2px solid var(--gray);
    .title {
      letter-spacing: 0.12rem;
      text-align: center;
      padding: 10px 0px;
    }
    .reviews {
      overflow-y: scroll;
      max-height: 550px;
      padding: 10px;
      .review-row {
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
        font-size: 16px;
      }
    }
  }
  @media screen and (min-width: 768px) {
    .heading {
      width: 100%;
      h1 {
        font-size: 25px;
      }
    }
    .content {
      flex-direction: row;
    }
    form {
      width: 40%;
      order: 0;
    }
    .review-con {
      width: 60%;
      height: 500px;
      border-left: 2px solid var(--gray);
      border-bottom: 0px;
      .reviews {
        height: 400px;
      }
    }
  }
`;
