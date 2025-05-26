import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@utils/data";
import ProductRow from "shared/components/ProductRow";

const CollectionCard = ({ collection }) => {
  return (
    <CollectionCardWrapper id={collection.id} className="center f">
      <div className="detail f fcenter">
        <div className="content">
          <div>
            <h1>{collection.id}</h1>
            <h2 className="trans">
              <Link href={collection.blob}>{collection.name}</Link>
            </h2>
          </div>
          <p className="mt20">{collection.desc}</p>
        </div>

        <button className="mt30 center trans">
          <Link href={collection.blob}>Shop Now</Link>
        </button>
      </div>

      <div className="image-con">
        <div className="main-img">
          <Image
            objectFit="cover"
            layout="fill"
            src={collection.img}
            alt={collection.name}
          ></Image>
        </div>
        <div className="rectangle">
          {collection.id % 2 === 1 ? (
            <Image
              layout="fill"
              src="/right-rectangle.png"
              alt={"image decorator"}
            ></Image>
          ) : (
            <Image
              layout="fill"
              src="/left-rectangle.png"
              alt={"image decorator"}
            ></Image>
          )}
        </div>
      </div>
    </CollectionCardWrapper>
  );
};

const CollectionCardWrapper = styled.article`
  background-color: var(--blue);
  width: 95%;
  flex-direction: column;

  .image-con,
  .detail {
    width: 100%;
    aspect-ratio: 16/9;
  }

  .detail {
    order: 1;
    padding: 10px 0px;
    flex-direction: column;

    .content {
      display: flex;
      flex-direction: column;
      height: calc(100% - 50px);
      width: 95%;
    }

    h1,
    h2 {
      border-bottom: 3px solid var(--pink);
      padding: 20px 0px;
    }

    h1 {
      font-size: 40px;
      font-family: "Libre Baskerville", serif;
    }

    h2 {
      font-size: 25px;
      letter-spacing: 0.12em;
      width: 70%;
      cursor: pointer;
    }

    h2:hover,
    h2:focus {
      color: var(--pink);
    }

    p,
    button {
      font-family: "Roboto", sans-serif;
    }

    p {
      font-size: 16px;
      line-height: 35px;
      overflow-y: auto;
    }

    a {
      font-family: "Lobster", cursive !important;
    }

    button {
      display: block;
      font-size: 16px;
      border: 2px solid white;
      padding: 7px 25px;
      width: max-content;
      white-space: nowrap;
      color: inherit;
    }

    button:hover,
    button:focus {
      color: var(--pink);
      border: 2px solid var(--pink);
    }
  }

  .image-con {
    position: relative;
  }

  .main-img,
  .rectangle {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .main-img {
    width: 100%;
    left: 0;
  }

  .rectangle {
    width: 50%;
    right: 0;
    right: ${(props) => (props.id % 2 === 1 ? "0" : "")};
    left: ${(props) => (props.id % 2 === 1 ? "" : "0")};
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    aspect-ratio: 16/7;

    .image-con,
    .detail {
      width: 50%;
    }

    .detail {
      position: relative;
      flex-direction: unset;
      order: ${(props) => (props.id % 2 === 1 ? 1 : 0)};

      .content {
        width: 85%;
        align-self: flex-start;
      }

      button {
        position: absolute;
        bottom: 10px;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .detail {
      .content {
        width: 75%;
      }
      h1,
      h2 {
        padding: 20px 0px;
      }
      h1 {
        font-size: 60px;
      }
      h2 {
        font-size: 30px;
        letter-spacing: 0.12em;
      }
      p {
        font-size: 20px;
        line-height: 40px;
      }
    }
  }
`;

// main app
const Collections = ({ products }) => {
  return (
    <Wrapper className="layout">
      <h1 className="center heading">Collections</h1>
      {collections.map((collection, index) => {
        return (
          <React.Fragment key={collection.id}>
            <CollectionCard collection={collection} />
            <div className="ProductRow center">
              <ProductRow
                params={{
                  color: "var(--blue-light)",
                  name: "",
                  showHeader: false,
                  blob: collection.blob,
                }}
                products={products[collection.alias]}
              />
            </div>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

export default Collections;

const Wrapper = styled.section`
  background-color: var(--pink-light);
  min-height: 100vh;
  padding: 20px 0px 10px 0px;
  color: white;

  .heading {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 35px;
    border-bottom: 3px solid;
    width: max-content;
    font-size: 30px;
    font-family: "Libre Baskerville", serif;
    color: var(--blue);
  }

  .ProductRow {
    width: 95%;
    margin-bottom: 40px;
    padding: 20px;
    background-color: var(--blue);
    & > section {
      max-width: 1170px;
      margin: auto;
    }
  }

  @media screen and (min-width: 768px) {
    .ProductRow {
      margin-bottom: 50px;
    }
  }
`;
