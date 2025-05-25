import { formatPrice } from "@utils/functions";
import { or } from "firebase/firestore";
import React, { memo, useRef } from "react";
import usePaginate from "shared/hooks/usePaginate";
import styled from "styled-components";

function Orders({ orders }) {
  const orderRef = useRef(null);

  const { Pagination, paginated } = usePaginate(orders, 7, 1, true, onScroll);

  function onScroll() {
    window.scrollTo(0, Number(orderRef.current.offsetTop) - 100);
  }

  return (
    <Wrapper ref={orderRef}>
      {paginated.length > 0 ? (
        paginated.map((item, index) => {
          const { name, amount, price, ref, date } = item;
          return (
            <OrderReviewItem key={index} className="order-item">
              <OrderReviewHeader>
                <ItemTitle>
                  <AmountBadge>{amount}x</AmountBadge>
                  <ItemName>{name}</ItemName>
                </ItemTitle>
                <DateTag>{date}</DateTag>
              </OrderReviewHeader>

              <OrderDetails>
                <PriceSection>
                  <PriceLabel>Total Price</PriceLabel>
                  <PriceValue>{formatPrice(price)}</PriceValue>
                </PriceSection>
                <RefSection>
                  <RefLabel>Order ID</RefLabel>
                  <RefValue>#{ref}</RefValue>
                </RefSection>
              </OrderDetails>
            </OrderReviewItem>
          );
        })
      ) : (
        <NoOrdersReviews>
          <EmptyIcon>📦</EmptyIcon>
          <EmptyTitle>No Orders Yet</EmptyTitle>
          <EmptySubtitle>
            Your order history will appear here once you make your first
            purchase
          </EmptySubtitle>
        </NoOrdersReviews>
      )}

      <PaginationWrapper>
        {orders.length > 0 && <Pagination />}
      </PaginationWrapper>
    </Wrapper>
  );
}

export default memo(Orders);

export const Wrapper = styled.div`
  padding: 20px 0;
  max-width: 100%;
`;

export const OrderReviewItem = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-image: linear-gradient(135deg, #fbcfe8, #f9a8d4, #e9d5ff);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
    border-color: #d1d5db;
  }

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 12px;
  }
`;

export const OrderReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

const AmountBadge = styled.span`
  background-image: linear-gradient(135deg, var(--blue), #f9a8d4, #e9d5ff);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
  flex-shrink: 0;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const DateTag = styled.span`
  background: #f3f4f6;
  color: #6b7280;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 480px) {
    align-self: flex-start;
  }
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PriceLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PriceValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #059669;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const RefSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const RefLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RefValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  font-family: "Courier New", monospace;
  background: #f9fafb;
  padding: 2px 6px;
  border-radius: 4px;
`;

export const NoOrdersReviews = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: #fafafa;
  border-radius: 16px;
  border: 2px dashed #e5e7eb;
  margin: 20px 0;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.7;

  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 12px;
  }
`;

export const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const EmptySubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  max-width: 400px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const PaginationWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;
