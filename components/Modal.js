import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
const Modal = (props) => {
  const { modal, setModal, children, absolute } = props;

  return (
    <ModalWrap absolute={absolute} modal={modal} className={` `}>
      <div className="modal-body bg">
        <button
          onClick={() => setModal(!modal)}
          className="modal-btn f fcenter red"
        >
          <FaTimes />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </ModalWrap>
  );
};
export default Modal;
const ModalWrap = styled.div`
  position: fixed;
  position: ${({ absolute }) => (absolute ? "absolute" : "fixed")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  display: ${({ modal }) => (modal ? "block" : "none")};
  .modal-body {
    border: 2px solid pink;
    width: 88%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-70%) translateY(-70%);
    opacity: 0;
    /* background: rgb(26, 26, 39); */
    background: white;
    background: var(--pink-light);
    color: white;
    border-radius: 15px;
    /* word-break: break-all; */
    word-wrap: break-word;
    animation: modal 0.3s linear forwards;
  }
  @keyframes modal {
    100% {
      transform: translateX(-50%) translateY(-50%);
      opacity: 1;
    }
  }
  .modal-body .modal-btn {
    position: absolute;
    right: 10px;
    font-weight: 300;
    font-size: 20px;
    padding: 0.5em 1em;
    color: white;
    border: none;
    background: transparent;
  }
  .modal-content {
    width: 88%;
    padding: 0 0.7em 0.7em 0.7em;
    margin: 0 auto;
  }
  @media screen and (min-width: 576px) {
    .modal-body {
      width: 70%;
    }
  }
  @media screen and (min-width: 768px) {
    .modal-body {
      width: 50%;
    }
  }
  @media screen and (min-width: 1200px) {
    .modal-body {
      width: 33%;
    }
  }
`;
