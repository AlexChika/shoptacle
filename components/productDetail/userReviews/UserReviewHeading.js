import starIcons from "shared/components/starIcons";
import styled from "styled-components";

function UserReviewHeading({ stars, totalRating }) {
  return (
    <Wrapper className="center">
      <h1>Verified User Reviews</h1>
      <p className="f mt10">
        <span>{stars}/5</span>&nbsp;
        <span>
          {starIcons(stars).map((star, index) => {
            return <span key={index}>{star}</span>;
          })}
        </span>
        &nbsp; &nbsp;
        <span>{totalRating}</span>&nbsp;
        <span>verified ratings</span>
      </p>
    </Wrapper>
  );
}

export default UserReviewHeading;
const Wrapper = styled.div`
  background-color: white;
  padding: 10px;
  width: 95%;
  border-bottom: 2px solid var(--pink-light);
  h1 {
    font-family: "Libre Baskerville", serif;
    letter-spacing: 2px;
    font-size: 18px;
  }

  p {
    color: var(--pink);
    letter-spacing: 2px;
    font-size: 16px;
  }

  @media screen and (min-width: 768px) {
    width: 100%;
    h1 {
      font-size: 20px;
    }
  }
`;
