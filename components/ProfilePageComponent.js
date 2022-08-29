import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Logo from "../public/icon.png";

const ProfilePageComponent = () => {
  return (
    <Wrapper className="center">
      <h3 className="title">My Profile</h3>
      <article className="header f align gray">
        <div className="profile-image gray">
          <Image src={Logo} layout="fill" alt="profile image"></Image>
        </div>
        <div className="bio">
          <h1>Alex C.</h1>
          <p>mcluckey1@gmail.com</p>
        </div>
      </article>
      <section className="red">
        <h1>hello</h1>
      </section>
    </Wrapper>
  );
};

export default ProfilePageComponent;
const Wrapper = styled.main`
  max-width: 1170px;
  min-height: 100vh;
  /* background-color: white; */
  .title {
    padding: 30px;
    font-style: italic;
    text-align: center;
    text-decoration: underline;
    color: var(--gray);
  }
  .header {
    padding: 10px;
    .profile-image {
      position: relative;
      overflow: hidden;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 30px;
    }
    h1 {
      color: var(--blue);
      font-style: italic;
    }
    p {
      color: var(--gray);
    }
  }
`;
