import Shoptacle from "@svg-components/shoptacle";
import React from "react";
import styled from "styled-components";
import { team } from "utils/data";

const AboutPageTeam = () => {
  return (
    <Wrapper className="layout">
      <div className="heading">
        <h1 className="center">Meet The Team</h1>
        <p className="mt20 center">
          We have an amazing team at Shoptacle, who work effieciently well
          alongside each other. All of our staff and stylists are fully trained,
          and are renowned for their customer care, thorough treatments and
          working enviroment
        </p>
      </div>

      <section className="team-cards center f">
        {team.map((team, index) => {
          return (
            <article
              key={index}
              className={`f team-card center ${index === 1 ? "order" : ""}`}
            >
              <div className={`team-img ${index === 1 ? "order" : ""}`}>
                <img alt={team.name} src={team.img.src} />
              </div>

              <div className="body f align j-around">
                <div className="title">
                  <h1>{team.name}</h1>
                  <span>{team.position}</span>
                </div>

                <div className="text">
                  <p>{team.desc}</p>
                </div>
                <button>Learn more</button>
              </div>

              <div className={`shoptacle ${index === 1 ? "order" : ""}`}>
                <Shoptacle fill="var(--blue-light)" />
              </div>
            </article>
          );
        })}
      </section>
    </Wrapper>
  );
};

export default AboutPageTeam;
const Wrapper = styled.main`
  background: var(--blue);
  min-height: 100vh;
  padding: 50px 0px;

  .heading {
    color: white;
    text-align: center;

    h1 {
      font-family: "Libre Baskerville", serif;
      font-weight: 400;
      font-size: 30px;
      width: max-content;
      border-bottom: 3px solid white;
      font-size: 25px;
    }
    p {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 16px;
      padding: 30px 10px;
    }
  }

  .team-cards {
    padding: 0px 15px;
    margin-top: 50px;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
  }

  .team-card {
    width: 100%;
    max-width: 500px;
    flex: 1;
    flex-direction: column;
    background-color: var(--pink-light);
    gap: 0px 10px;
    position: relative;

    .team-img {
      width: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .body {
      position: absolute;
      flex-direction: column;
      text-align: center;
      color: var(--blue);
      padding: 10px;
      bottom: 0%;
      width: 100%;
      background-color: var(--pink-light);

      .title {
        position: relative;
        width: 100%;
        padding: 5px;

        h1 {
          font-family: "Libre Baskerville", serif;
          font-weight: 400;
          font-size: 20px;
          letter-spacing: 2px;
        }

        span {
          position: absolute;
          font-family: "Roboto", sans-serif;
          font-size: 14px;
          top: 50%;
          transform: translateY(-50%);
          right: 5%;
          opacity: 0.6;
        }
      }

      .text {
        p {
          font-family: "Libre Baskervville";
          font-style: italic;
          font-size: 16px;
          line-height: 25px;
          padding: 10px;
        }
      }

      button {
        font-family: "Roboto", sans-serif;
        font-weight: 500;
        font-size: 22px;
        text-align: center;
        letter-spacing: 2px;
        color: var(--pink);
        border-bottom: 3px solid var(--pink);
      }
    }

    .shoptacle {
      position: absolute;
      width: 100px;
      top: 50%;
      left: 102%;
      transform: translate(0%, -50%);

      &.order {
        left: -22%;
        /* transform: translate(-100%, 0%); */
      }
    }
  }

  @media screen and (max-width: 500px) {
    .team-card {
      .body {
        position: unset;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .heading {
      h1 {
        font-size: 30px;
      }
      p {
        font-size: 18px;
        line-height: 35px;
        max-width: 70%;
        min-width: 768px;
      }
    }

    .team-cards {
      flex-direction: row;
      gap: 0px;
    }

    .team-card {
      width: 33%;
      aspect-ratio: unset;

      .team-img {
        &.order {
          order: 1;
        }
      }

      .body {
        position: unset;
      }

      .shoptacle {
        display: none;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .team-card {
      p {
        font-size: 18px;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .team-cards {
      padding: 0px;
    }
  }
`;
