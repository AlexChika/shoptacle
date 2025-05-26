import { useRef } from "react";
import starIcons from "shared/components/starIcons";
import usePaginate from "shared/hooks/usePaginate";
import styled from "styled-components";

function Reviews({ reviews, productName }) {
  const reviewRef = useRef(null);

  const { Pagination, paginated } = usePaginate(
    reviews,
    5,
    1,
    true,
    onPageChange
  );

  function onPageChange() {
    reviewRef.current.scrollTo(0, 0);
  }

  return (
    <Wrapper className="center">
      <p className="title capitalize">
        {reviews.length} Reviews For {productName.toLowerCase()}
      </p>

      <div ref={reviewRef} className="reviews hide__scroll__bar">
        {paginated.length > 0 ? (
          paginated.reverse().map((review) => {
            const { experience, date, title, name, star, id } = review;

            return (
              <div key={id} className="review-row">
                <div className="star-con">
                  {starIcons(star).map((star, index) => {
                    return <span key={index}>{star}</span>;
                  })}
                </div>
                <h3 className="review-title">{title}</h3>

                <p className="review-experience mt10">{experience}</p>

                <p className="review-date mt10">
                  <span>{date}</span> &nbsp; by &nbsp;{" "}
                  <span className="capitalize">{name}</span>
                </p>
              </div>
            );
          })
        ) : (
          <div className="minvh c-blue f fcenter">
            <h1
              style={{
                fontSize: "18px",
                color: "gray",
              }}
            >
              This product have no ratings
            </h1>
          </div>
        )}
      </div>

      <Pagination />
    </Wrapper>
  );
}

export default Reviews;
const Wrapper = styled.article`
  max-height: 670px;
  width: 95%;
  background-color: white;
  border-bottom: 4px solid var(--pink-light);

  .title {
    letter-spacing: 2px;
    text-align: center;
    padding: 10px 0px;
    font-size: 16px;
    font-family: "Libre Baskerville", serif;
  }

  .reviews {
    overflow-y: scroll;
    max-height: 550px;
    padding: 10px 20px;

    .review-row {
      border-bottom: 2px solid var(--pink-light);
      margin-bottom: 20px;
    }

    .star-con {
      color: var(--pink);
      span {
        font-size: 16px;
      }
    }

    .review-title {
      margin: 5px 0px;
      font-size: 16px;
      font-weight: 600;
    }

    .review-experience {
      min-width: 280px;
      text-wrap: balance;
      font-weight: 300;
    }

    p {
      line-height: 30px;
      font-size: 14px;
    }

    .review-date {
      opacity: 0.5;
    }
  }

  @media screen and (min-width: 768px) {
    width: 55%;
    height: 500px;
    border-left: 4px solid var(--pink-light);
    border-bottom: 0px;
    .reviews {
      height: 400px;
    }
  }
`;
