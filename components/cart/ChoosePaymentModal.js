import Modal from "@components/admin/ModalHoc";
import Image from "next/image";
import styled from "styled-components";

function ChoosePaymentModal({
  modal,
  setModal,
  handlePayWithPaystack,
  handlePayWithStripe,
  stripeLoading,
}) {
  return (
    <Modal modal={modal} setModal={setModal}>
      <Wrapper>
        <Header>
          <h2>Choose Payment Method</h2>
          <p>Select your preferred payment provider to continue</p>
        </Header>

        {stripeLoading && (
          <LoadingOverlay>
            <div className="spinner sm center" />
          </LoadingOverlay>
        )}

        <PaymentOptions>
          <PaymentCard onClick={handlePayWithPaystack}>
            <div className="payment-info">
              <h3>Paystack</h3>
              <p>Fast and secure payments</p>
            </div>
            <div className="payment-button">
              <Image
                objectFit="contain"
                layout="fill"
                alt="Paystack"
                src="/paystack.png"
              />
            </div>
          </PaymentCard>

          <PaymentCard
            onClick={handlePayWithStripe}
            disabled={stripeLoading}
            className={stripeLoading ? "loading" : ""}
          >
            <div className="payment-info">
              <h3>Stripe</h3>
              <p>Global payment processing</p>
            </div>
            <div className="payment-button">
              <Image
                objectFit="contain"
                layout="fill"
                alt="Stripe"
                src="/stripe.png"
              />
            </div>
          </PaymentCard>
        </PaymentOptions>

        <Footer>
          <p>🔒 Your payment information is secure and encrypted</p>
        </Footer>
      </Wrapper>
    </Modal>
  );
}

export default ChoosePaymentModal;

const Wrapper = styled.div`
  padding: 20px 10px;
  background: white;
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    padding: 15px 10px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    color: #1e293b;
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
  }

  p {
    color: #64748b;
    font-size: 16px;
    margin: 0;
    font-weight: 400;
  }
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

const PaymentCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px solid transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
  }

  &:hover .payment-info h3 {
    color: white;
  }

  &:hover .payment-info p {
    color: rgba(255, 255, 255, 0.9);
  }

  &:active {
    transform: translateY(-2px);
  }

  &.loading {
    cursor: not-allowed;
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
  }

  .payment-info {
    text-align: center;
    margin-bottom: 5px;
    z-index: 2;

    h3 {
      color: #1e293b;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 6px 0;
      transition: color 0.3s ease;
    }

    p {
      color: #64748b;
      font-size: 14px;
      margin: 0;
      font-weight: 400;
      transition: color 0.3s ease;
    }
  }

  .payment-button {
    /* border: 2px solid red; */
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 80px;
    width: 100%;

    img {
      display: block;
      border-radius: inherit;
    }
  }

  &:hover .payment-button {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Footer = styled.div`
  text-align: center;

  p {
    color: #64748b;
    font-size: 14px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  z-index: 10;
`;
