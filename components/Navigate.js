import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
const Navigate = ({ path }) => {
  const router = useRouter();
  useEffect(() => {
    if (path) {
      router.push(path);
    }
  }, []);

  return (
    <Wrapper className="f fcenter">
      <div className="spinner"></div>
    </Wrapper>
  );
};

export default Navigate;
const Wrapper = styled.main`
  min-height: 80vh;
`;
