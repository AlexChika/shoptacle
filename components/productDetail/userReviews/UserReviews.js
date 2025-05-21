import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Store } from "store/Context";
import { BsStarFill, BsStar } from "react-icons/bs";
import { calculateStars } from "utils/functions";
import { addSubDocs, getProduct, updateProduct } from "utils/firebase";
import UserReviewHeading from "./UserReviewHeading";
import Reviews from "./Reviews";

// app
const UserReviews = ({ data }) => {
  const { Logger, user } = Store();
  const { product, reviews, id, setRefresh } = data;
  const { rating, name: productName } = product;
  const router = useRouter();
  // local states
  const [selectedStar, setSelectedStar] = useState(0);
  const [formInput, setFormInput] = useState({
    title: "",
    experience: "",
  });

  function handleFormInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    const el = e.target;

    if (value.length < 5) {
      el.style.border = "1px solid red";
    } else if (name == "title" && value.length > 120) {
      el.style.border = "1px solid red";
    } else if (name == "experience" && value.length > 500) {
      el.style.border = "1px solid red";
    } else {
      el.style.border = "1px solid green";
    }
    setFormInput({ ...formInput, [name]: value });
  }

  async function handleRateProduct(e) {
    e.preventDefault();
    const spinner = e.target.querySelector(".spinner");
    const experience = formInput.experience.trim();
    const title = formInput.title.trim();

    // check for star rating
    if (selectedStar < 1) {
      return Logger("Please select atleast one star", "error");
    }

    // check for inputs fields
    if (experience.length < 5 || title.length < 5) {
      return Logger(
        "Title and experience cannot be less than 5 characters",
        "error"
      );
    }

    if (experience.length > 500) {
      return Logger("Experience cannot be more than 500 characters", "error");
    }

    if (title.length > 120) {
      return Logger(
        "Comment title cannot be more than 120 characters ",
        "error"
      );
    }

    // check if user is logged in
    if (!user) {
      Logger("You must be signed in to make reviews", "error");
      router.push("/profile");
      return;
    }

    // activate spinner
    spinner.classList.remove("stop");

    const starMap = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
    };

    let type = starMap[selectedStar]; //get the equivalent key of rating object

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

      const promises = [
        updateProduct(id, newRating),
        addSubDocs("products", id, "reviews", review),
        addSubDocs("customers", user.email, "reviews", review),
      ];

      await Promise.all(promises);
      spinner.classList.add("stop");
      Logger("We have added your review", "success");

      // clear form
      setFormInput({
        title: "",
        experience: "",
      });
      setSelectedStar(0);
      setRefresh((prev) => prev + 1); // update product and reviews
    } catch (error) {
      spinner.classList.add("stop");
      Logger("We encountered an error, pls try again", "error");
    }
  }

  // values
  const stars = calculateStars(rating).stars;
  const totalRating = calculateStars(rating).totalRating;

  // jsx
  return (
    <Wrapper className="mt30">
      <UserReviewHeading stars={stars} totalRating={totalRating} />

      <div className="content f">
        {/* form section */}
        <form onSubmit={handleRateProduct} className="center f align j-between">
          <div className="form-container">
            <div>
              <h2 className="form-title capitalize">
                Rate {productName.toLowerCase()}
              </h2>

              <div className="star-con">
                {[1, 2, 3, 4, 5].map((no) => {
                  return no <= selectedStar ? (
                    <button key={no} type="button">
                      <BsStarFill
                        style={{ color: "var(--pink)" }}
                        onClick={() => setSelectedStar(no)}
                      />
                    </button>
                  ) : (
                    <button key={no} type="button">
                      <BsStar onClick={() => setSelectedStar(no)} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="input-wrapper mt20">
              <label htmlFor="form-title">Comment Title</label>
              <input
                onChange={handleFormInput}
                value={formInput.title}
                placeholder="Comment Title"
                type="text"
                name="title"
                required
                id="form-title"
                data-id="title"
              />

              <label htmlFor="form-experience">Describe Your Experience</label>
              <textarea
                placeholder="Describe Your Experience"
                name="experience"
                value={formInput.experience}
                onChange={handleFormInput}
                cols="30"
                rows="10"
                required
                id="form-experience"
                data-id="experience"
              ></textarea>
            </div>

            <button className="f submit-btn mt20 center" type="submit">
              Submit Review <span className="spinner center sm stop"></span>
            </button>
          </div>
        </form>

        {/* reviews section */}
        <Reviews reviews={reviews} productName={productName} />
      </div>
    </Wrapper>
  );
};

export default UserReviews;

const Wrapper = styled.section`
  color: var(--blue);

  .content {
    flex-direction: column;
    min-height: 500px;
    width: 100%;
  }

  form {
    order: 1;
    width: 95%;
    background-color: white;
    padding: 10px 10px;
    color: var(--blue);
    flex-direction: column;

    .form-container {
      height: 100%;
      width: 100%;
      margin: 0 auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: "Roboto", sans-serif;
    }

    .form-title {
      text-align: center;
      font-size: 18px;
    }

    .star-con {
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }

    .star-con button {
      font-size: 26px;
      margin: 0px 10px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;
    }

    .input-wrapper label {
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 14px;
      color: #333;
    }

    .input-wrapper input,
    .input-wrapper textarea {
      padding: 12px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 16px;
      transition: border-color 0.2s ease;
      background-color: #fafafa;
    }

    input {
      margin-bottom: 20px;
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      max-height: 130px;
      min-height: 130px;
    }

    .input-wrapper input:focus,
    .input-wrapper textarea:focus {
      outline: none;
      border-color: var(--blue);
      box-shadow: 0 0 0 2px rgba(26, 31, 36, 0.1);
    }

    .input-wrapper input::placeholder,
    .input-wrapper textarea::placeholder {
      color: var(--gray);
    }

    /* Textarea specific styles */
    .input-wrapper textarea {
      min-height: 150px;
      resize: none;
    }

    /* Button Styles */
    .submit-btn {
      gap: 5px;
      align-items: center;
      justify-content: center;
      background-color: var(--blue);
      color: white;
      font-weight: 600;
      font-size: 14px;
      padding: 10px 24px;
      border-radius: 6px;
      transition: background-color 0.2s ease;
      width: 100%;
      max-width: 200px;
    }

    .submit-btn:hover {
      background-color: var(--blue-light);
    }

    .submit-btn:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(17, 28, 42, 0.3);
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      flex-direction: row;
    }

    form {
      height: 500px;
      width: 45%;
      order: 0;
    }
  }
`;
