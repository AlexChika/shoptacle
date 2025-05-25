import React, { useEffect } from "react";
import styled from "styled-components";
import { Store } from "store/Context";
import { UPDATE_USER } from "store/actionTypes";

// firebase imports
import { signOut } from "firebase/auth";
import { auth, getSubDocs } from "utils/firebase";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileMenu from "./profile/ProfileMenu";

// app
const ProfilePageComponent = () => {
  const { user, Logger, dispatch } = Store();

  const reviews = user.reviews || [];
  const orders = user.orders || [];

  // handlers
  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!user || user.reviews) return;
    async function updateUser() {
      try {
        const reviews = await getSubDocs("customers", user.email, "reviews");
        const orders = await getSubDocs("customers", user.email, "orders");
        dispatch({ type: UPDATE_USER, payload: { reviews, orders } });
      } catch (error) {
        Logger("Couldn't fetch Details, Please try again", "error");
      }
    }
    updateUser();
  }, [user, dispatch]);

  return (
    <Wrapper className="center mt30">
      <Container>
        <Content>
          <ProfileHeader
            noOfReviews={reviews.length}
            noOfOrders={orders.length}
            user={user}
            handleLogout={handleLogout}
          />

          <ProfileMenu reviews={reviews} orders={orders} />
        </Content>
      </Container>
    </Wrapper>
  );
};

export default ProfilePageComponent;
const Wrapper = styled.main`
  max-width: 1170px;
  background-color: white;
  padding: 0 15px;

  .tabs-con {
    max-width: 650px;
    border: 1px solid var(--gray);

    .nav {
      span {
        flex: 1;
        text-align: center;
        padding: 15px 10px;
        color: Var(--blue);
        cursor: pointer;
        background-color: #d9ecec;
        border: 1px solid white;
      }
      span.active {
        background-color: var(--blue);
        color: white;
      }
    }

    .content {
      max-height: 600px;
      overflow: hidden;
      padding: 0px 10px;
      .empty {
        height: 100%;
        color: var(--gray);
      }
    }

    .order {
      overflow-y: auto;
      height: 530px;

      .order-item {
        padding: 5px;
        border-bottom: 2px solid var(--pink-light);
        color: var(--blue);
      }

      h3,
      p {
        font-style: italic;
      }

      h3 {
        letter-spacing: 0.12rem;
      }

      small {
        color: gray;
      }
    }

    .review {
      color: var(--blue);
      overflow-y: auto;
      height: 530px;
      .review-row {
        padding: 10px;
        border-bottom: 2px solid var(--gray);
        margin-bottom: 20px;
      }
      .star-con {
        color: var(--pink);
      }
      .text {
        min-width: 280px;
        max-width: 400px;
      }
      p {
        line-height: 30px;
        font-size: 15px;
      }
    }

    .edit {
      color: var(--blue);
      height: 530px;
      padding: 20px 0px;
      h1 {
        text-align: center;
        text-decoration: underline;
      }
      form {
        flex-direction: column;
        max-width: 400px;
        width: 90%;
      }
      .inputCon {
        width: 100%;
        padding: 0;
        flex-direction: column;
      }
      label,
      input,
      textarea {
        background-color: whitesmoke;
        color: black;
        padding: 10px;
      }
      textarea {
        max-width: 100%;
        min-width: 100%;
        max-height: 150px;
        min-height: 150px;
      }
      label {
        color: grey;
        cursor: pointer;
      }
      input[type="file"] {
        display: none;
      }
      input::placeholder {
        color: gray;
      }
      small {
        color: red;
        font-size: 14px;
      }
      button {
        background-color: var(--blue);
        width: 100%;
        padding: 10px 20px;
        border-radius: 20px;
        color: white;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    padding: 0px;
  }
`;

const Container = styled.div`
  background-color: #f9fafb;
  padding-top: 16px;

  @media (min-width: 768px) {
    padding: 24px 12px;
  }

  @media (min-width: 1024px) {
    padding: 32px;
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.1),
    0 16px 32px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;
