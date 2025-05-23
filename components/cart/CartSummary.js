import styled from "styled-components";

function CartSummary({ cartTotals, user, handleCheckout, formatPrice }) {
  return (
    <Wrapper>
      <div className="summary-card">
        <div className="card-header">
          <h2 className="summary-title">Order Summary</h2>
        </div>

        <div className="summary-content">
          <div className="summary-section">
            <div className="summary-row">
              <span className="label">Subtotal</span>
              <span className="value">{formatPrice(cartTotals.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="label">Delivery Fee</span>
              <span className="value">{formatPrice(cartTotals.delivery)}</span>
            </div>
            <div className="summary-row">
              <span className="label">Tax Fee</span>
              <span className="value">{formatPrice(cartTotals.tax)}</span>
            </div>
          </div>

          <div className="total-section">
            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-value">
                {formatPrice(cartTotals.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-section">
        {user ? (
          <button onClick={handleCheckout} className="checkout-btn primary">
            <span className="btn-text">Continue To Checkout</span>
            <svg
              className="btn-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12h14m-7-7l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => router.push("/profile")}
            className="checkout-btn secondary"
          >
            <span className="btn-text">Login To See Checkout</span>
            <svg
              className="btn-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4l4-4-4-4m4 4H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </Wrapper>
  );
}

export default CartSummary;
const Wrapper = styled.div`
  color: var(--blue);
  /* max-width: 575px; */
  width: 100%;
  margin: 30px auto 0;
  /* border: 2px solid red; */

  .summary-card {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border: 1px solid #f1f3f4;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }
  }

  .card-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 24px 30px 20px;
    border-bottom: 1px solid #e9ecef;
  }

  .summary-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--blue);
    margin: 0;
    letter-spacing: -0.32px;
  }

  .summary-content {
    padding: 30px;
  }

  .summary-section {
    margin-bottom: 24px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f8f9fa;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #fafbfc;
      margin: 0 -16px;
      padding: 12px 16px;
      border-radius: 8px;
      border-bottom: 1px solid transparent;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .label {
    font-size: 16px;
    color: #6c757d;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
  }

  .value {
    font-size: 16px;
    color: var(--blue, #2c3e50);
    font-weight: 600;
    font-family: "Roboto", sans-serif;
  }

  .total-section {
    border-top: 2px solid #e9ecef;
    padding-top: 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    margin: 0 -30px -30px;
    padding: 24px 30px 30px;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .total-label {
    font-size: 22px;
    font-weight: 700;
    color: var(--blue, #2c3e50);
    letter-spacing: -0.02em;
  }

  .total-value {
    font-size: 24px;
    font-weight: 800;
    color: var(--pink);
    font-family: "Roboto", sans-serif;
  }

  .checkout-section {
    margin-top: 24px;
  }

  .checkout-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 24px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: none;
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &.primary {
      background: linear-gradient(135deg, var(--pink) 0%, #c0392b 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);

      &:hover {
        background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px rgba(231, 76, 60, 0.3);
      }
    }

    &.secondary {
      background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);

      &:hover {
        background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px rgba(108, 117, 125, 0.3);
      }
    }

    &:hover .btn-icon {
      transform: translateX(4px);
    }
  }

  .btn-text {
    position: relative;
    z-index: 2;
  }

  .btn-icon {
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
  }

  /* Mobile Responsive */
  @media screen and (max-width: 576px) {
    margin: 20px auto 0;

    .summary-card {
      border-radius: 12px;
    }

    .card-header {
      padding: 20px 24px 16px;
    }

    .summary-title {
      font-size: 18px;
    }

    .summary-content {
      padding: 24px;
    }

    .total-section {
      margin: 0 -24px -24px;
      padding: 20px 24px 24px;
    }

    .label,
    .value {
      font-size: 15px;
    }

    .total-label {
      font-size: 20px;
    }

    .total-value {
      font-size: 22px;
    }

    .checkout-btn {
      font-size: 15px;
      padding: 14px 20px;
    }
  }

  /* Tablet and Desktop */
  @media screen and (min-width: 768px) {
    width: 45%;
    align-self: flex-start;
    margin-top: 0;
  }

  @media screen and (min-width: 992px) {
    .summary-title {
      font-size: 22px;
    }

    .label,
    .value {
      font-size: 17px;
    }

    .total-label {
      font-size: 24px;
    }

    .total-value {
      font-size: 26px;
    }

    .checkout-btn {
      font-size: 17px;
      padding: 18px 28px;
    }
  }
`;
