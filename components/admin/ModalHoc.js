import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const Modal = (props) => {
  const {
    modal,
    setModal,
    children,
    center = true,
    maxWidth = "420px",
  } = props;

  return (
    <ModalWrap $maxWidth={maxWidth} $center={center} modal={modal}>
      <div className="modal-body bg">
        <button
          onClick={() => setModal(!modal)}
          className="modal-btn f fcenter"
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
  overflow-y: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3); //optional
  display: ${({ modal }) => (modal ? "block" : "none")};

  .modal-body {
    margin: ${({ $center }) => ($center ? "" : "30px 0px")};
    width: 96%;
    position: relative;
    left: 50%;
    top: ${({ $center }) => ($center ? "50%" : "20px")};
    opacity: 0;
    max-width: ${({ $maxWidth }) => $maxWidth};
    background-color: white;
    color: white;
    border-radius: 15px;
    word-wrap: break-word;
    animation: modal 0.3s linear forwards;
  }

  @keyframes modal {
    100% {
      translate: ${({ $center }) => ($center ? "-50% -50%" : "-50% 0%")};
      opacity: 1;
    }
  }

  .modal-btn {
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 20px;
    z-index: 8;
    color: var(--blue);
    background: transparent;
  }

  .modal-content {
    margin: 0 auto;
  }
`;
