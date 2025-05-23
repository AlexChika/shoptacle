import React from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { FaTimes } from "react-icons/fa";
import { HiPlus, HiMinus } from "react-icons/hi";
import { formatPrice } from "utils/functions";

const CartItem = ({ cart }) => {
  const { Logger, removeCart, incDecCart } = Store();

  // local func
  async function removeCartItem(id) {
    try {
      await removeCart(id);
      Logger("Item removed successfully", "success", 2500);
    } catch (error) {
      Logger("Could not remove item", "success");
    }
  }

  async function incDecCartItem(id, quantity, type) {
    if (quantity < 1) return;
    try {
      const res = await incDecCart(id, quantity, type);
      if (res) return Logger(res.log, "error");
      Logger(
        `Item ${type === "plus" ? "incremented" : "decremented"} successfully`,
        "success",
        2500
      );
    } catch (error) {
      Logger("Could not update item", "error");
    }
  }

  const { name, price, imgOne, amount, id, quantity } = cart;

  return (
    <Wrapper>
      <div className="cart-item-container">
        <div className="image-section">
          <div className="product-image">
            <img alt="cart item" src={imgOne} />
          </div>
          <button
            onClick={() => removeCartItem(id)}
            type="button"
            className="remove-button"
            title="Remove item"
          >
            <FaTimes />
          </button>
        </div>

        <div className="content-section">
          <div className="product-info">
            <h3 className="product-name">{name}</h3>
            <div className="price-info f align">
              <span className="unit-price">{formatPrice(price)}</span>
              <span className="quantity-indicator">× {amount}</span>
            </div>
          </div>

          <div className="controls-section show-lg">
            <div className="quantity-controls f fcenter">
              <button
                onClick={() => incDecCartItem(id, quantity, "minus")}
                type="button"
                className="quantity-btn shoptacle-btn-pink minus-btn"
                disabled={amount <= 1}
              >
                <HiMinus />
              </button>
              <span className="quantity-display">{amount}</span>
              <button
                onClick={() => incDecCartItem(id, quantity, "plus")}
                type="button"
                className="quantity-btn shoptacle-btn-pink plus-btn"
                disabled={quantity < 1}
              >
                <HiPlus />
              </button>
            </div>

            <div className="subtotal-section">
              <span className="subtotal-label">Subtotal:</span>
              <span className="subtotal-amount">
                {quantity < 1 ? (
                  <span className="out-of-stock">Out of Stock</span>
                ) : (
                  formatPrice(price * amount)
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="controls-section show-sm">
        <div className="quantity-controls f fcenter">
          <button
            onClick={() => incDecCartItem(id, quantity, "minus")}
            type="button"
            className="quantity-btn shoptacle-btn-pink minus-btn"
            disabled={amount <= 1}
          >
            <HiMinus />
          </button>
          <span className="quantity-display">{amount}</span>
          <button
            onClick={() => incDecCartItem(id, quantity, "plus")}
            type="button"
            className="quantity-btn shoptacle-btn-pink"
            disabled={quantity < 1}
          >
            <HiPlus />
          </button>
        </div>

        <div className="subtotal-section">
          <span className="subtotal-label">Subtotal:</span>
          <span className="subtotal-amount">
            {quantity < 1 ? (
              <span className="out-of-stock">Out of Stock</span>
            ) : (
              formatPrice(price * amount)
            )}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background-color: white;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.15);
  }

  .cart-item-container {
    display: flex;
    padding: 10px 20px 0px 20px;
    gap: 12px;
  }

  .image-section {
    position: relative;
    flex-shrink: 0;

    .product-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      border: 2px solid whitesmoke;
      overflow: hidden;
      background-color: #f8f9fa;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .remove-button {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: #ff4757;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);

      &:hover {
        background-color: #ff3838;
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  .content-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    gap: 5px;
  }

  .product-info {
    .product-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--blue);
      margin: 0 0 8px 0;
      text-transform: capitalize;
      letter-spacing: 0.4px;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price-info {
      gap: 12px;

      .unit-price {
        font-size: 16px;
        font-weight: 500;
        color: var(--blue);
        font-family: "Roboto", sans-serif;
      }

      .quantity-indicator {
        font-size: 14px;
        color: #6c757d;
        font-family: "Roboto", sans-serif;
      }
    }
  }

  .controls-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    align-items: stretch;

    .quantity-controls {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 4px;
      gap: 8px;

      .quantity-btn {
        padding: 0px;
        width: 32px;
        height: 32px;
        font-size: 16px;
      }

      .quantity-display {
        font-weight: 600;
        font-size: 16px;
        color: var(--blue, #2c3e50);
        min-width: 24px;
        text-align: center;
      }
    }

    .subtotal-section {
      text-align: right;

      .subtotal-label {
        display: block;
        font-size: 14px;
        color: #6c757d;
        margin-bottom: 4px;
        font-family: "Roboto", sans-serif;
      }

      .subtotal-amount {
        font-size: 18px;
        font-weight: 600;
        color: var(--blue, #2c3e50);
        font-family: "Roboto", sans-serif;
      }

      .out-of-stock {
        color: #dc3545;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .controls-section.show-lg {
    display: none;
  }

  .controls-section.show-sm {
    padding: 7px 20px 10px 20px;
  }

  /* lg style */
  @media screen and (min-width: 450px) {
    .cart-item-container {
      padding: 20px;
    }

    .image-section .product-image {
      width: 110px;
      height: 110px;
    }

    .controls-section.show-lg {
      display: flex;
    }

    .controls-section.show-sm {
      display: none;
    }
  }

  /* revert to sm style */
  @media screen and (min-width: 700px) {
    .cart-item-container {
      padding: 10px 20px 0px 20px;
    }

    .image-section .product-image {
      width: 80px;
      height: 80px;
    }

    .controls-section.show-lg {
      display: none;
    }

    .controls-section.show-sm {
      display: flex;
    }
  }

  /* revert to lg style */
  @media screen and (min-width: 850px) {
    .cart-item-container {
      padding: 20px;
    }

    .image-section .product-image {
      width: 110px;
      height: 110px;
    }

    .controls-section.show-lg {
      display: flex;
    }

    .controls-section.show-sm {
      display: none;
    }
  }

  /* Desktop */
  @media screen and (min-width: 1025px) {
    .cart-item-container {
      padding: 24px;
      gap: 24px;
    }

    .image-section .product-image {
      width: 120px;
      height: 120px;
    }

    .product-info .product-name {
      font-size: 20px;
    }

    .price-info .unit-price {
      font-size: 18px;
    }

    .subtotal-section .subtotal-amount {
      font-size: 20px;
    }
  }
`;

export default CartItem;
