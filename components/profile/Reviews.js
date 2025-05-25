import { formatPrice } from "@utils/functions";
import React, { memo, useRef } from "react";
import usePaginate from "shared/hooks/usePaginate";
import { MdOutlineReviews } from "react-icons/md";
import {
  EmptyIcon,
  EmptySubtitle,
  EmptyTitle,
  ItemTitle,
  NoOrdersReviews,
  OrderReviewHeader,
  OrderReviewItem,
  PaginationWrapper,
  Wrapper,
} from "./Orders";

function Reviews({ reviews }) {
  const reviewRef = useRef(null);

  const testArr = [];

  const { Pagination, paginated } = usePaginate(reviews, 7, 1, true, onScroll);

  console.log({ reviews });

  function onScroll() {
    window.scrollTo(0, Number(reviewRef.current.offsetTop) - 100);
  }

  return (
    <Wrapper ref={reviewRef}>
      {paginated.length > 0 ? (
        paginated.map((item, index) => {
          const { name, title, star, experience, id, date } = item;

          return (
            <OrderReviewItem key={index}>
              <OrderReviewHeader>
                <ItemTitle>{name}</ItemTitle>
              </OrderReviewHeader>
            </OrderReviewItem>
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

      <PaginationWrapper>
        {reviews.length > 0 && <Pagination />}
      </PaginationWrapper>
    </Wrapper>
  );
}

export default memo(Reviews);
