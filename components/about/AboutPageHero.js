import styled from "styled-components";
import Image from "next/image";
import NavBar from "shared/components/NavBar";
import HeroBar from "shared/components/HeroBar";
import SideBar from "shared/components/SideBar";
import { testimony } from "utils/data";

const AboutPageHero = () => {
  return (
    <Wrapper className="layout">
      <NavBar page="about" />
      <SideBar />
      <HeroBar />

      <section className="body center mt30">
        <div className="heading">
          <h1 className="c-blue">Maintaining the Brand Standards</h1>

          <p className="center c-blue mt20">
            Shoptacle offers clothing, shoes and accessories for men and women.
            It was founded in 1995 and has over 340 offline stores in the
            country, while also selling to 96 countries worldwide, through its
            website. Our priority is to ensure that we offer superior design,
            quality and value to the consumer that not only exemplifies our
            lifestyle, but enhances the ability to live it. We will accomplish
            this by being committed to offering great service and real value to
            our business partners and consumers.
            <span className="box box-left display"></span>
            <div className="box box-right display"></div>
          </p>
        </div>

        <div className="testimony-section mt30">
          <h1 className="c-blue center">Testimonies</h1>

          <section className="testimonies f align mt30">
            {testimony.map((testimony, index) => {
              return (
                <article key={index} className="testimony-card">
                  <div className="background">
                    <div className="empty-space"></div>
                    <div className="text f">
                      <h1>{testimony.name}</h1>
                    </div>
                  </div>
                  <div className="image-con">
                    <Image alt={testimony.name} src={testimony.img}></Image>
                  </div>
                  <div className="text-con f fcenter">
                    <p>{testimony.desc}</p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </Wrapper>
  );
};
export default AboutPageHero;
const Wrapper = styled.main`
  background: var(--pink-light);
  .body {
    width: 95%;
  }

  .heading {
    h1,
    p {
      font-weight: 400;
      text-align: justify;
    }
    h1 {
      font-family: "Libre Baskerville", serif;
      font-size: 25px;
      line-height: 40px;
      text-align: center;
    }
    p {
      font-family: "Roboto", sans-serif;
      font-size: 16px;
      line-height: 30px;
      padding: 10px;
    }
  }

  .testimony-section {
    h1 {
      font-size: 30px;
      font-family: "Libre Baskerville", serif;
      width: max-content;
      border-bottom: 3px solid var(--blue);
    }
  }

  .testimonies {
    flex-direction: column;
  }

  .testimony-card {
    position: relative;
    width: 100%;
    height: 350px;
    margin: 40px 10px;
    .image-con,
    .text-con,
    .background {
      position: absolute;
    }
    .image-con {
      bottom: 30%;
      right: 5%;
      width: 75%;
    }

    .background {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: "emptySpace emptySpace text";
      width: 85%;
      height: 65%;
      background-color: var(--blue);
      right: 0;
      bottom: 0;
      .empty-space {
        grid-area: emptySpace;
      }
      .text {
        grid-area: text;
        align-items: flex-end;
        justify-content: center;
        color: white;
        font-size: 18px;
      }
    }

    .text-con {
      left: 0;
      bottom: 0;
      height: 35%;
      width: 70%;
      background-color: var(--pink-light);
      text-align: center;
      p {
        font-family: "Libre Baskerville", serif;
        font-style: italic;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: var(--blue);
      }
    }
  }

  @media screen and (min-width: 600px) {
    .heading {
      p {
        font-size: 14px;
        line-height: 32px;
      }
    }
    .testimony-card {
      width: 80%;
      height: 500px;
      .text-con {
        p {
          font-size: 14px;
          line-height: 32px;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .heading {
      text-align: center;
      position: relative;
      padding: 60px 0px;

      h1 {
        font-size: 30px;
        line-height: 52px;
        letter-spacing: 0.12em;
      }

      p {
        font-size: 18px;
        line-height: 35px;
        max-width: 65%;
        min-width: 650px;
        position: relative;
      }

      .box {
        position: absolute;
        width: 90px;
        height: 90px;
      }

      .box-left {
        top: calc(100% - 40px);
        left: -40px;
        border-left: 2px solid var(--pink);
        border-bottom: 2px solid var(--pink);
      }

      .box-right {
        bottom: calc(100%);
        right: -40px;
        border-right: 2px solid var(--pink);
        border-top: 2px solid var(--pink);
      }
    }

    .testimonies {
      flex-direction: row;
    }

    .testimony-card {
      width: 50%;
    }
  }
`;
