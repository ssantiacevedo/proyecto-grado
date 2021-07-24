import styled from 'styled-components';
import { palette } from '../../theme/palette';

export const Text = styled.span`
  font-family: 'Roboto';
  font-size: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

export const IconText = styled.span`
  font-family: 'Roboto';
  font-size: 16px;
  margin-left: 10px;
`;

export const Step3Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  align-items: flex-start;
`;

export const GoButton = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 50px;
  width: 50%;
  margin-top: 20px;
  background-color: ${palette.alpha600};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  :disabled{
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: center;
`;
