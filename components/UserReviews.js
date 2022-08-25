import React, { useState, useRef } from "react";
import styled from "styled-components";
import { BsStarFill, BsStar } from "react-icons/bs";
import { calculateStars, displayStar, paginateFn } from "../utils/functions";
import Paginate from "./Paginate";
const UserReviews = ({ rating, name }) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [selectStarRating, setSelectStarRating] = useState(0);
  const [currentBtn, setCurrentBtn] = useState(0);
  const reviewRef = useRef(null);
  const [paginateUserReviews, setPaginateUserReviews] = useState(
    paginateFn(array, 5).items
  );
  const handlePaginate = (val) => {
    const newItems = paginateFn(array, 5, val).items;
    setPaginateUserReviews(newItems);
    setCurrentBtn(val);
    reviewRef.current.scrollTo(0, 0);
  };
  return (
    <Wrapper className="mt30">
      <div className="heading center">
        <h1>Verified User Reviews</h1>
        <p className="f mt10">
          <span>{calculateStars(rating).stars}/5</span>&nbsp;
          <span>
            {displayStar(calculateStars(rating).stars).map((star, index) => {
              return <span key={index}>{star}</span>;
            })}
          </span>
          &nbsp; &nbsp;
          <span>{calculateStars(rating).totalRating}</span>&nbsp;
          <span>verified ratings</span>
        </p>
      </div>
      <div className="content f">
        {/* form section */}
        <form className="center f align j-around">
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
          <input placeholder="Comment Title" type="text" />
          <textarea
            placeholder="Describe Your Experience"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button className="submit-btn mt30 center" type="button">
            Submit
          </button>
        </form>
        {/* reviews section */}
        <article className="review-con center">
          <p className="title capitalize">
            {"435"} Reviews For {name}
          </p>
          <div ref={reviewRef} className="reviews">
            {paginateUserReviews.map((review, index) => {
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsam corporis voluptatum quia tempora deserunt consequatur
                    aperiam, dolores eaque numquam ad.
                  </p>
                  <p className="mt10">
                    <span>{"12 / 22 / 2022"}</span> &nbsp; by &nbsp;{" "}
                    <span>{"Alex Chika"}</span>
                  </p>
                </div>
              );
            })}
          </div>
          <Paginate
            paginateFn={paginateFn}
            array={array}
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
      max-height: 80px;
      min-height: 80px;
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
    height: 600px;
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
      height: 500px;
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
      }
    }
  }
  @media screen and (min-width: 768px) {
    .heading {
      width: 100%;
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
