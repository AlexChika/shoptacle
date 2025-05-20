import React from "react";
import styled from "styled-components";
import Image from "next/image";
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
      <section className="container center f">
        {team.map((team, index) => {
          return (
            <article key={index} className="f team-cards center">
              <div className={`img ${index === 1 ? "order" : ""}`}>
                <Image alt={team.name} layout="fill" src={team.img} />
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
    }
  }
  .container {
    width: 95%;
    margin-top: 50px;
    flex-direction: column;
  }
  .team-cards {
    height: 650px;
    width: 100%;
    max-width: 500px;
    margin-bottom: 30px;
    flex-direction: column;
    background-color: var(--pink-light);
    .img {
      height: 65%;
      position: relative;
      object-fit: cover;
    }
    .body {
      height: 35%;
      flex-direction: column;
      text-align: center;
      color: var(--blue);
    }
    .title {
      position: relative;
      width: 100%;
    }
    h1 {
      font-family: "Libre Baskerville", serif;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 2px;
    }
    p {
      font-family: "Libre Baskervville";
      font-style: italic;
      font-size: 16px;
      line-height: 25px;
    }
    span {
      position: absolute;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      top: 10%;
      right: 5%;
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
    .container {
      flex-direction: row;
    }
    .order {
      order: 1;
    }
  }
  @media screen and (min-width: 1024px) {
    .team-cards {
      p {
        font-size: 18px;
      }
    }
  }
`;
