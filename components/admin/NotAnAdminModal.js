import styled from "styled-components";
import Modal from "./ModalHoc";

function NotAnAdminModal({ modal, setModal, user }) {
  return (
    <Modal modal={modal} setModal={setModal}>
      <Wrapper>
        <h1 className="capitalize">Hello {user.firstName}</h1>

        <p className="mt10">
          You are not an admin and cannot make changes to SHOPTACLE
        </p>

        <h4 className="mt20">
          However, if you wish to make Edits and add Products to SHOPTACE or to
          Test the app, please send a mail to &nbsp;
          <a href="mailto:contact@alexchika.com">contact@alexchika.com</a>{" "}
          &nbsp;for Admin access using your registered email
        </h4>

        <h3 className="mt20">OR</h3>

        <small className="mt10">Submit the below form</small>
        <form
          action="https://formspree.io/f/xbjbdqbl"
          method="post"
          className="f mt10"
        >
          <input
            defaultValue={user.email}
            required
            type="email"
            name="Email"
            id=""
          />
          <button type="submit">Submit</button>
        </form>
        <small>
          Once we recieve your email, you will be notified as soon as you now
          have admin access
        </small>
      </Wrapper>
    </Modal>
  );
}

export default NotAnAdminModal;

const Wrapper = styled.div`
  padding: 10px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #333;
  font-family: "Roboto" sans-serif;
  text-align: center;

  h1 {
    font-size: 22px;
    font-weight: 600;
    color: #323148;
    line-height: 1.2;
  }

  p {
    font-size: 16px;
    line-height: 1.4;
    color: #555;
  }

  h4 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    color: #444;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #323148;
  }

  small {
    font-size: 13px;
    color: #666;
    line-height: 1.4;

    &:last-child {
      text-align: center;
      margin-top: 16px;
      font-style: italic;
      color: #777;
    }
  }

  a {
    color: #3a7bc8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #1f5aa3;
      text-decoration: underline;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;

    @media (min-width: 400px) {
      flex-direction: row;
    }
  }

  input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background-color: white;

    &:focus {
      outline: none;
      border-color: #3a7bc8;
      box-shadow: 0 0 0 2px rgba(58, 123, 200, 0.1);
    }

    &::placeholder {
      color: #aaa;
    }
  }

  button {
    padding: 10px 20px;
    background-color: #323148;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    white-space: nowrap;

    &:hover {
      background-color: #424260;
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;
