import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

import { palette } from '../../theme/palette';

const StyledPopper = styled.div`
  z-index: 1;

  width: 15rem;
  height: 5rem;

  background-color: ${palette.alpha600};
  color: ${palette.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &[data-popper-placement^='top'] > #arrow {
    bottom: -5px;
  }
`;

const StyledArrow = styled.div`
  &,
  &:before {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    z-index: -1;
  }

  ::before {
    border: solid 1px ${palette.alpha600};
    border-top: none;
    border-right: none;
    background-color: ${palette.alpha600};

    content: '';
    transform: rotate(135deg);
  }
`;


export const HeaderPopper = ({ show, referenceElement, children }) => {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset: [0, 15] } },
      { name: 'preventOverflow', options: { padding: 20 } },
    ],
  });

  if (!show) return null;

  return (
    <StyledPopper ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      <StyledArrow id="arrow" ref={setArrowElement} style={styles.arrow} {...attributes.arrow} />
      {children}
    </StyledPopper>
  );
};

export default HeaderPopper;
