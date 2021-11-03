import React from "react";
import styled, { keyframes } from "styled-components";

import spinnerImage from "../../assets/spinner.svg";

export const Spinner = ({ small }) => {
  return (
    <StyledSpinner>
      <StyledSpinnerImage small={small} src={spinnerImage} />
    </StyledSpinner>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinnerImage = styled.img`
  display: block;
  height: ${props => props.small ? '35px' : '64px'};
  width: ${props => props.small ? '35px' : '64px'};
  animation: ${rotate} 2s linear infinite;
  margin: 0 auto;
`;

const StyledSpinner = styled.div`
  width: 100%;
  background-color: transparent;
`;

export default Spinner;
