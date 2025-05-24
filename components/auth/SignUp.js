import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  ArrowIcon,
  ButtonContent,
  ContentContainer,
  Footer,
  Form,
  Heading,
  InputContainer,
  InputIcon,
  InputWrapper,
  Label,
  SignUpLink,
  Spinner,
  SubmitButton,
  TogglePassword,
  Wrapper,
} from "./Login";
import { useState } from "react";

function SignUp({
  signUpDetails,
  setSignIn,
  handleUserSignUp,
  signUpOnchange,
  loading,
}) {
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper className="signup f fcenter trans">
      <ContentContainer>
        <Heading>
          <span className="welcome">Hello There, Welcome</span>
          <span className="subtitle">Create an account for free</span>
        </Heading>

        <Form onSubmit={handleUserSignUp}>
          <InputContainer
            className={focusedField === "first name" ? "focused" : ""}
          >
            <Label>First Name</Label>
            <InputWrapper>
              <InputIcon>
                <FaAddressBook />
              </InputIcon>
              <input
                value={signUpDetails["first name"].value}
                onChange={signUpOnchange}
                onFocus={() => setFocusedField("first name")}
                onBlur={() => setFocusedField(null)}
                type="text"
                placeholder="Enter First Name"
                name="first name"
              />
            </InputWrapper>
            <small
              data-name="first name-errMsg"
              className="status mt10"
            ></small>
          </InputContainer>

          <InputContainer
            className={focusedField === "last name" ? "focused" : ""}
          >
            <Label>Last Name</Label>
            <InputWrapper>
              <InputIcon>
                <FaAddressBook />
              </InputIcon>
              <input
                value={signUpDetails["last name"].value}
                onChange={signUpOnchange}
                onFocus={() => setFocusedField("last name")}
                onBlur={() => setFocusedField(null)}
                type="text"
                placeholder="Enter Last Name"
                name="last name"
              />
            </InputWrapper>
            <small data-name="last name-errMsg" className="status mt10"></small>
          </InputContainer>

          <InputContainer className={focusedField === "email" ? "focused" : ""}>
            <Label>Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <MdEmail />
              </InputIcon>
              <input
                value={signUpDetails.email.value}
                onChange={signUpOnchange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                type="email"
                placeholder="Enter your email address"
                name="email"
              />
            </InputWrapper>
            <small data-name="email-errMsg" className="status mt10"></small>
          </InputContainer>

          <InputContainer
            className={focusedField === "password" ? "focused" : ""}
          >
            <Label>Password</Label>
            <InputWrapper>
              <InputIcon>🔒</InputIcon>
              <input
                value={signUpDetails.password.value}
                onChange={signUpOnchange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
              />
              <TogglePassword
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </TogglePassword>
            </InputWrapper>
            <small data-name="password-errMsg" className="status mt10"></small>
          </InputContainer>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <ButtonContent>
                <Spinner />
                <span>Signing in...</span>
              </ButtonContent>
            ) : (
              <ButtonContent>
                <span>Sign In</span>
                <ArrowIcon>→</ArrowIcon>
              </ButtonContent>
            )}
          </SubmitButton>
        </Form>

        <Footer>
          You own an account ? please{" "}
          <SignUpLink
            onClick={() => {
              setSignIn((prev) => !prev);
            }}
          >
            Sign in here
          </SignUpLink>
        </Footer>
      </ContentContainer>
    </Wrapper>
  );
}

export default SignUp;
