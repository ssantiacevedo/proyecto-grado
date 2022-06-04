import React, { useState } from "react";
import { usePopper } from "react-popper";

import { StyledArrow, StyledPopper } from "./Popper.styled";

export const HeaderPopper = ({
  show,
  referenceElement,
  children,
  white = false,
}) => {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 15] } },
      { name: "preventOverflow", options: { padding: 40 } },
    ],
  });

  if (!show) return null;

  return (
    <StyledPopper
      ref={setPopperElement}
      white={white}
      style={styles.popper}
      {...attributes.popper}
    >
      <StyledArrow
        id="arrow"
        ref={setArrowElement}
        white={white}
        style={styles.arrow}
        {...attributes.arrow}
      />
      {children}
    </StyledPopper>
  );
};

export default HeaderPopper;
