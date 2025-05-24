import Image from "next/image";
import styled from "styled-components";

function SideBanner() {
  return (
    <Wrapper className="f fcenter">
      <div className="content f fcenter">
        <div className="logo center">
          <Image
            width={80}
            height={80}
            src="/logowhite.svg"
            alt="logo icon"
          ></Image>
        </div>
        <p>Your one stop for perfect fashion</p>
      </div>
    </Wrapper>
  );
}

export default SideBanner;

const Wrapper = styled.article`
  background: var(--pink);
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  display: none;
  text-align: center;
  color: var(--blue);
  /* height: 100%; */
  width: 100%;

  .content {
    flex-direction: column;
    height: 200px;
    width: 200px;
    background-color: var(--blue);
    border-radius: 50%;
    padding: 10px;
  }

  p {
    font-style: italic;
    color: white;
    font-size: 14px;
  }

  @media screen and (min-width: 768px) {
    display: flex;
  }

  @media screen and (min-width: 1000px) {
    width: 50%;
  }
`;
