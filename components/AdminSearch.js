import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Modal from "./Modal";
import Logo from "../public/ada.png";
const AdminSearch = ({ handleSetTab }) => {
  // states
  const [modal, setModal] = useState(false);
  // funcs
  const handleEditBtn = (id) => {
    // go to edit page
    handleSetTab(3);
    // get item object and set it
  };

  const handleViewBtn = () => {
    setModal(true);
  };

  return (
    <Wrapper className="opacity center">
      <form className="f center mt20">
        <input placeholder="Search product by name" type="text" name="" id="" />
        <button type="submit">Submit</button>
      </form>

      <section className="result-con mt30 ">
        <h1 className="title">Search Results</h1>

        <div>
          {false && (
            <div className="no-result center f fcenter mt30">
              <h3>No products found</h3>
            </div>
          )}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, 20).map((result, index) => {
            return (
              <article key={index} className="result center mt20">
                <div>
                  <h3>name of product here and also long name</h3>
                </div>
                <div className="f">
                  <p>
                    ID: <span>id of product</span>
                  </p>
                  <p>
                    PRICE: <span>30000</span>
                  </p>
                </div>
                <div>
                  <button onClick={handleViewBtn} type="button">
                    VIEW
                  </button>
                  <button onClick={handleEditBtn} type="button">
                    EDIT
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <Modal modal={modal} setModal={setModal}>
        <section className="modal mt10">
          <div className="image mt30">
            <Image layout="fill" alt="product image" src={Logo}></Image>
          </div>
          <article>
            <h1>Name of product</h1>
            <h5>
              QTY: &nbsp;<span>30</span>
            </h5>
            <h5>
              BRAND: &nbsp;<span>brand of item</span>
            </h5>
            <h5>
              CATEGORY: &nbsp;<span>category of item</span>
            </h5>
            <h5>
              PRICE: &nbsp;<span>proce of item</span>
            </h5>
            <h5>
              ID: &nbsp;<span>item id</span>
            </h5>
            <h5>
              DESC: &nbsp;
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                quis cumque exercitationem laboriosam sequi, temporibus
                architecto perferendis velit iste aliquam. Accusamus aspernatur
                saepe nobis excepturi enim culpa, magni nemo beatae quibusdam
                eum natus sit quidem voluptatem ex numquam rerum quam! Eius,
                velit esse nisi quia odio vero suscipit quae repellat.
              </span>
            </h5>
          </article>
        </section>
      </Modal>
    </Wrapper>
  );
};
export default AdminSearch;

const Wrapper = styled.main`
  max-width: 1170px;
  color: var(--blue);

  form {
    max-width: 600px;
    input {
      flex: 0.75;
      border: 2px solid gray;
      padding: 10px;
    }
    button {
      flex: 0.25;
      padding: 10px;
      background-color: var(--blue);
      color: white;
    }
  }

  .result-con {
    .title {
      text-align: center;
    }
    .result {
      max-width: 600px;
      padding: 5px;
      p,
      h3 {
        margin: 5px 10px;
      }
      span {
        color: gray;
      }
      button {
        color: white;
        margin: 5px 10px;
        padding: 5px 20px;
      }
      button:nth-of-type(1) {
        background-color: green;
      }
      button:nth-of-type(2) {
        background-color: var(--pink);
      }
    }
    .result:nth-of-type(odd) {
      background-color: var(--gray);
    }
    .result:nth-of-type(even) {
      background-color: var(--pink-light);
    }
    .no-result {
      max-width: 600px;
      min-height: 40vh;
      border: 1px solid gray;
    }
  }

  .modal {
    overflow-y: scroll;
    max-height: 90vh;
    color: var(--blue);
    .image {
      position: relative;
      height: 250px;
      width: 100%;
    }
    h5 {
      margin-top: 5px;
    }
    span {
      letter-spacing: 0.1rem;
      font-size: 15px;
      font-weight: 100;
    }
  }
`;
