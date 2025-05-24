import React, { useState } from "react";
import styled from "styled-components";
import { MdEmail } from "react-icons/md";

function Login({
  loginDetails,
  loginOnchange,
  handleUserLogIn,
  loading,
  setSignIn,
}) {
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper className="signin f fcenter trans">
      {/* <BackgroundDecoration /> */}
      <ContentContainer>
        <Heading>
          <span className="welcome">Welcome Back</span>
          <span className="subtitle">Sign in to your account</span>
        </Heading>

        <Form onSubmit={handleUserLogIn}>
          <InputContainer className={focusedField === "email" ? "focused" : ""}>
            <Label>Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <MdEmail />
              </InputIcon>
              <input
                value={loginDetails.email.value}
                onChange={loginOnchange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                type="email"
                placeholder="Enter your email address"
                name="email"
              />
            </InputWrapper>
            <small className="status mt10"></small>
          </InputContainer>

          <InputContainer
            className={focusedField === "password" ? "focused" : ""}
          >
            <Label>Password</Label>
            <InputWrapper>
              <InputIcon>🔒</InputIcon>
              <input
                value={loginDetails.password.value}
                onChange={loginOnchange}
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
            <small className="status mt10"></small>
          </InputContainer>

          <ForgotPassword>
            <span>Forgot your password?</span>
          </ForgotPassword>

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
          Don&apos;t have an account?{" "}
          <SignUpLink
            onClick={() => {
              setSignIn((prev) => !prev);
            }}
          >
            Create one here
          </SignUpLink>
        </Footer>
      </ContentContainer>
    </Wrapper>
  );
}

export default Login;

export const Wrapper = styled.article`
  position: relative;
  height: 100%;
  min-width: 100%;
  border-radius: 24px;
  margin: 0 auto;
  overflow: hidden;
  padding: 10px;
  background: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media screen and (min-width: 768px) {
    box-shadow: none;
    border-radius: 0;
    max-width: unset;
  }
`;

const BackgroundDecoration = styled.div`
  /* border: 2px solid red; */
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;

  /* inset: 0; */
  background: radial-gradient(
      circle at 25% 25%,
      rgba(102, 126, 234, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(118, 75, 162, 0.1) 0%,
      transparent 50%
    );
  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -30px) rotate(120deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(240deg);
    }
  }
`;

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 28px;
  border-radius: 24px;
  max-width: 420px;
  width: 100%;
  height: 100%;
  z-index: 10;
  border: 1px solid rgba(0, 0, 0, 0.05);

  @media screen and (min-width: 768px) {
    border: none;
  }
`;

export const Heading = styled.div`
  text-align: center;
  margin-bottom: 20px;

  .welcome {
    display: block;
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
    letter-spacing: -1px;
  }

  .subtitle {
    display: block;
    font-size: 16px;
    color: #64748b;
    font-weight: 400;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputContainer = styled.div`
  position: relative;
  transition: all 0.3s ease;

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

  input {
    flex: 1;
    padding: 10px 10px 10px 48px;
    border: none;
    background: transparent;
    font-size: 16px;
    color: #1f2937;
    outline: none;
    border-radius: inherit;

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

export const Footer = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-top: 10px;
`;

export const SignUpLink = styled.span`
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;
