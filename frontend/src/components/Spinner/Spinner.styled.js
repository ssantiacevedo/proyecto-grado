import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const StyledSpinnerImage = styled.img`
display: block;
height: ${props => props.small ? '35px' : '64px'};
width: ${props => props.small ? '35px' : '64px'};
animation: ${rotate} 2s linear infinite;
margin: 0 auto;
`;

export const StyledSpinner = styled.div`
width: 100%;
background-color: transparent;
`;