import { formatPrice } from "@utils/functions";
import React, { memo, useRef } from "react";
import usePaginate from "shared/hooks/usePaginate";
import { MdOutlineReviews } from "react-icons/md";
import {
  EmptyIcon,
  EmptySubtitle,
  EmptyTitle,
  NoOrdersReviews,
  PaginationWrapper,
} from "./Orders";
import styled from "styled-components";
import starIcons from "shared/components/starIcons";
import Link from "next/link";

function Reviews({ reviews }) {
  const reviewRef = useRef(null);

  const { Pagination, paginated } = usePaginate(reviews, 7, 1, true, onScroll);

  function onScroll() {
    window.scrollTo(0, Number(reviewRef.current.offsetTop) - 100);
  }

  return (
    <Wrapper ref={reviewRef}>
      {paginated.length > 0 ? (
        paginated.map((item) => {
          const {
            id,
            productId,
            productImage,
            productName,
            star,
            date,
            title: reviewTitle,
            experience: reviewBody,
          } = item;
          const productUrl = `/shop/${productName}_${productId}`;

          return (
            <ReviewItem key={id}>
              <ReviewHeader>
                <ProductSection>
                  <ProductImage
                    src={productImage}
                    alt={productName}
                    onError={(e) => {
                      e.target.src = "/placeholder-product.jpg";
                    }}
                  />
                  <ProductInfo>
                    <ProductName href={productUrl}>{productName}</ProductName>
                    <ReviewDate>{date}</ReviewDate>
                  </ProductInfo>
                </ProductSection>

                <RatingSection>
                  <RatingStars>
                    {starIcons(star).map((starIcon, index) => {
                      return <StarIcon key={index}>{starIcon}</StarIcon>;
                    })}
                  </RatingStars>
                  <RatingText>{star}/5</RatingText>
                </RatingSection>
              </ReviewHeader>

              {reviewTitle && <ReviewTitle>{reviewTitle}</ReviewTitle>}
              {reviewBody && <ReviewBody>{reviewBody}</ReviewBody>}

              <ReviewFooter>
                <Link href={productUrl} passHref>
                  <ViewProductLink>View Product →</ViewProductLink>
                </Link>
              </ReviewFooter>
            </ReviewItem>
          );
        })
      ) : (
        <NoOrdersReviews>
          <EmptyIcon>
            <MdOutlineReviews />
          </EmptyIcon>
          <EmptyTitle>No Reviews Yet</EmptyTitle>
          <EmptySubtitle>
            Your review history will appear here once you make your first review
          </EmptySubtitle>
        </NoOrdersReviews>
      )}

      {reviews.length > 0 && (
        <PaginationWrapper>
          <Pagination />{" "}
        </PaginationWrapper>
      )}
    </Wrapper>
  );
}

export default memo(Reviews);

const Wrapper = styled.div`
  padding: 20px 0;
  max-width: 100%;
`;

const ReviewItem = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
  }

  @media screen and (max-width: 500px) {
    border: 1px solid #e5e7eb;
  }

  @media screen and (min-width: 768px) {
    padding: 16px 24px;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ProductSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #f3f4f6;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
`;

const ProductName = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  line-height: 1.4;
  word-break: break-word;
  transition: color 0.2s ease;

  &:hover {
    color: #3b82f6;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ReviewDate = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const StarIcon = styled.span`
  color: var(--pink);
  font-size: 18px;
  line-height: 1;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const RatingText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  background: #f9fafb;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
`;

const ReviewTitle = styled.h3`
  margin-top: 7px;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ReviewBody = styled.p`
  font-size: 15px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ViewProductLink = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  /* border: 2px solid red; */

  &:hover {
    background: #eff6ff;
    color: #2563eb;
    transform: translateX(2px);
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`;
