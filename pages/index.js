import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import LandingPageHero from "../components/LandingPageHero";
export default function Home() {
  return (
    <>
      <Head>
        <title>Shoptacle</title>
        <meta name="description" content="Your one stop for perfect fashion" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Wrapper>
        <LandingPageHero />
        <div className="box brand-shade">
          <div className="box1 small-box"></div>
          <div className="box2 small-box"></div>
          <div className="main-content ">
            <h1>Hello Clementina</h1>
            <div>
              <h1>hi everyone</h1>
            </div>
          </div>
        </div>
        {/* <section className="bra"></section> */}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  .box {
    position: relative;
    float: right;
    width: 500px;
    /* background-color: blue; */
    height: 420px;
  }
  .small-box {
    width: 160px;
    height: 200px;
    margin-left: 30px;
  }
  .box1 {
    background-color: red;
  }
  .box2 {
    background-color: green;
  }
  .main-content {
    position: absolute;
    display: grid;
    width: 100%;
    height: 420px;
    border: 2px solid red;
    top: 0;
    color: white;
    h1 {
      text-align: center;
    }
  }
`;
