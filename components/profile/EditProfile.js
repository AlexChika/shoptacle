import { useState } from "react";
import { Store } from "@store/Context";
import styled from "styled-components";
import { Validate } from "@utils/functions";
import { SET_USER } from "@store/actionTypes";
import { getDoc, updateDoc } from "firebase/firestore";
import { getCustomerDocRef, uploadImage } from "@utils/firebase";
import { FaAddressBook, FaAddressCard, FaImage } from "react-icons/fa";

const defaultInput = {
  firstName: {
    valid: false,
    value: "",
  },
  lastName: {
    valid: false,
    value: "",
  },
  address: {
    valid: false,
    value: "",
  },
  url: {
    valid: false,
    value: "",
  },
};

function EditProfile() {
  const { user, Logger, dispatch } = Store();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formInput, setFormInput] = useState(defaultInput);

  const validate = new Validate();
  function logError(value, type, element, min, max, name) {
    if (type == "equal") throw new Error(`check type equal directly`);
    let { valid, msg } = validate[type](value, min, max, name);
    if (valid == false) {
      element.textContent = msg;
    } else {
      element.textContent = "";
    }
    return valid;
  }

  function updateState(name, valid, value) {
    setFormInput({
      ...formInput,
      [name]: { ...formInput[name], valid, value },
    });
  }

  function formOnchange(e) {
    const name = e.target.name;
    let value = e.target.value;
    let valid;
    const el = document.querySelector(`[data-name=${name}-errMsg]`);

    if (name == "firstName") {
      valid = logError(value, "text", el);
    }

    if (name == "lastName") {
      valid = logError(value, "text", el);
    }

    if (name == "address") {
      valid = logError(value, "text", el, 12, Infinity, "Address");
    }

    if (name == "url") {
      //   const labelEl = e.target.previousSibling;
      //   labelEl.textContent = "Profile Image";
      const file = e.target.files[0];
      if (!file) {
        valid = false;
        value = "";
        el.textContent = "No images was detected";
      } else {
        // Check if the file is an image.
        if (!file.type.match("image.*")) {
          el.textContent = "file must be an image";
          valid = false;
          value = "";
        } else {
          //   labelEl.textContent = file.name;
          el.textContent = "";
          valid = true;
          value = file;
        }
      }
    }
    updateState(name, valid, value);
  }

  const handleEditDetail = async (e) => {
    e.preventDefault();

    // check for non validated inputs
    for (const key in formInput) {
      if (formInput[key].valid == false) {
        Logger("Invalid entries, Please try again", "error");
        return;
      }
    }

    try {
      // upload image first
      setLoading(true);
      const file = formInput.url.value;
      const filePath = `customers/${user.email}`;
      const url = await uploadImage(file, filePath);

      // uppdate user data
      const docRef = getCustomerDocRef(user.email);
      const newUserDetails = {
        firstName: formInput.firstName.value,
        lastName: formInput.lastName.value,
        address: formInput.address.value,
        url: url,
      };

      await updateDoc(docRef, newUserDetails);
      const snapshot = await getDoc(docRef);

      dispatch({
        type: SET_USER,
        payload: snapshot.data(),
      });

      Logger("Profile updated successfully", "success");
      setFormInput(defaultInput);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Logger(error.message, "error");
    }
  };

  return (
    <Wrapper>
      <h1>Update your profile</h1>

      <Form onSubmit={handleEditDetail}>
        <InputContainer
          className={focusedField === "firstName" ? "focused" : ""}
        >
          <Label>First Name</Label>
          <InputWrapper>
            <InputIcon>
              <FaAddressBook />
            </InputIcon>
            <input
              value={formInput.firstName.value}
              onChange={formOnchange}
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField(null)}
              type="text"
              placeholder={user.firstName || "Enter First Name"}
              name="firstName"
            />
          </InputWrapper>
          <small data-name="firstName-errMsg" className="status mt10"></small>
        </InputContainer>

        <InputContainer
          className={focusedField === "lastName" ? "focused" : ""}
        >
          <Label>Last Name</Label>
          <InputWrapper>
            <InputIcon>
              <FaAddressBook />
            </InputIcon>
            <input
              value={formInput.lastName.value}
              onChange={formOnchange}
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField(null)}
              type="text"
              placeholder={user.lastName || "Enter Last Name"}
              name="lastName"
            />
          </InputWrapper>
          <small data-name="lastName-errMsg" className="status mt10"></small>
        </InputContainer>

        <InputContainer className={focusedField === "address" ? "focused" : ""}>
          <Label>Address</Label>
          <InputWrapper>
            <InputIcon>
              <FaAddressCard />
            </InputIcon>
            <textarea
              placeholder={user.address || "Enter Your Address"}
              name="address"
              value={formInput.address.value}
              onChange={formOnchange}
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField(null)}
            />
          </InputWrapper>
          <small data-name="address-errMsg" className="status mt10"></small>
        </InputContainer>

        <InputContainer className={focusedField === "url" ? "focused" : ""}>
          <Label>Profile Image</Label>
          <InputWrapper>
            <InputIcon>
              <FaImage />
            </InputIcon>
            <input
              onChange={formOnchange}
              onFocus={() => setFocusedField("url")}
              onBlur={() => setFocusedField(null)}
              accept="image/*"
              id="profileImage"
              type="file"
              name="url"
            />
          </InputWrapper>
          <small data-name="url-errMsg" className="status mt10"></small>
        </InputContainer>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? (
            <ButtonContent>
              <Spinner />
              <span>Submitting...</span>
            </ButtonContent>
          ) : (
            <ButtonContent>
              <span>Submit</span>
              <ArrowIcon>☑️</ArrowIcon>
            </ButtonContent>
          )}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
}

export default EditProfile;

const Wrapper = styled.div`
  padding: 40px 10px;
  width: 95%;
  max-width: 500px;
  margin: 0 auto;

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const InputContainer = styled.div`
  position: relative;
  transition: all 0.3s ease;

  small {
    color: red;
    font-size: 12px;
  }

  &.focused {
    transform: translateY(-2px);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:focus-within {
    background: white;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  input,
  textarea {
    flex: 1;
    padding: 10px 10px 10px 48px;
    border: none;
    background: transparent;
    font-size: 16px;
    color: #1f2937;
    outline: none;
    border-radius: inherit;
    resize: none;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  font-size: 18px;
  color: #6b7280;
  z-index: 1;
`;

export const TogglePassword = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }
`;

export const ForgotPassword = styled.div`
  text-align: right;
  margin-top: -8px;

  span {
    font-size: 14px;
    color: #667eea;
    cursor: pointer;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #764ba2;
      text-decoration: underline;
    }
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ArrowIcon = styled.span`
  font-size: 18px;
  transition: transform 0.2s ease;

  ${SubmitButton}:hover & {
    transform: translateX(4px);
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
