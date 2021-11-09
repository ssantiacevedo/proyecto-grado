import styled from 'styled-components';
import { palette } from '../../theme/palette';

export const WizardCard = styled.div`
  display: grid;  
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  box-shadow: none;
  border-radius: 0;
  background-color: ${palette.white};
  margin: 0;
  width: 100%;
  padding: 0 5%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;

  @media (min-width: 768px) {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
`;

export const WizardPage = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: ${palette.white};
  width: 100%;
  height: 100%;
  height: 84vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    justify-content: center;
    padding-top: 0;
    height: 89vh
  }
`;

export const Wizard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
`;