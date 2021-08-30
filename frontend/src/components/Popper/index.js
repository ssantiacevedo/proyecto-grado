import React, { useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

import { palette } from "../../theme/palette";

const StyledPopper = styled.div`
  z-index: 3;

  min-width: 15rem;
  max-width: 25rem;
  min-height: 5rem;
  padding: 0 1rem 1rem 1rem;

  background-color: ${({ white }) =>
    white ? palette.white : palette.alpha600};
  color: ${palette.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &[data-popper-placement^="top"] > #arrow {
    bottom: -5px;
  }
`;

const StyledArrow = styled.div`
  &,
  &:before {
    position: absolute;
    width: 0.9rem;
    height: 0.9rem;
    z-index: 2;
  }

  ::before {
    border: ${({ white }) =>
      white ? `solid 1px ${palette.white}` : `solid 1px ${palette.alpha600}`};
    border-top: none;
    border-right: none;
    background-color: ${({ white }) =>
      white ? palette.white : palette.alpha600};

    content: "";
    transform: rotate(135deg);
  }
`;

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
