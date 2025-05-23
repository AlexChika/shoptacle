import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

function EmptyCart() {
  return (
    <Wrapper className="mt30">
      <div className="icon center f fcenter">
        <Image
          alt="empty cart logo"
          src="/trolley.png"
          width={44}
          height={44}
        />
      </div>
      <h1 className="mt20">Your Cart Is Empty</h1>
      <p className="mt20">
        Browse through our collections and discover our best deals!
      </p>
      <button className="mt20 shoptacle-btn-pink" type="button">
        <Link href="/shop">Start Shopping</Link>
      </button>
    </Wrapper>
  );
}

export default EmptyCart;

const Wrapper = styled.section`
  flex-direction: column;
  padding: 30px 10px;
  background-color: white;
  color: var(--blue);
  letter-spacing: 0.12rem;
  text-align: center;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--pink-light);
  }
  h1 {
    font-family: "Libre Baskerville", serif;
    font-size: 24px;
  }
  p {
    font-size: 16px;
    opacity: 0.7;
    max-width: 450px;
    margin: 20px auto;
  }
  button {
    margin: 20px auto;
  }
`;
