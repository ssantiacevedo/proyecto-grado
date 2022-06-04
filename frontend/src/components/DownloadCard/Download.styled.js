import styled from 'styled-components';
import { palette } from '../../theme/palette';

export const IconText = styled.span`
  font-family: 'Roboto';
  font-size: 13px;
  margin-left: 10px;
`;

export const Step1Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  align-items: flex-start;
  z-index: 2;
`;

export const AddButon = styled.button`
  text-decoration: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  outline: none;
  border-radius: 8px;
  height: 35px;
  width: 50%;
  margin-top: 20px;
  background-color: ${palette.alpha600};
  color: white;
  opacity: ${props => props.disabled ? '0.7' : '1'};
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;
