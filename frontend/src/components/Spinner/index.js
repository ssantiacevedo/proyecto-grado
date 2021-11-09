import React from "react";

import spinnerImage from "../../assets/spinner.svg";

import { StyledSpinner, StyledSpinnerImage } from "./Spinner.styled";

export const Spinner = ({ small }) => {
  return (
    <StyledSpinner>
      <StyledSpinnerImage small={small} src={spinnerImage} />
    </StyledSpinner>
  );
};



export default Spinner;
