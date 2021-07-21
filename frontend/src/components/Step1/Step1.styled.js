import styled from 'styled-components';
import { palette } from '../../theme/palette';

export const Text = styled.span`
  font-family: 'Roboto';
  font-size: 15px;
  margin-bottom: 10px;
`;

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
`;

export const AddButon = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 35px;
  width: 50%;
  margin-top: 20px;
  background-color: ${palette.alpha600};
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  
  & > * {
    margin: 0 5px;
  }
  & > :first-child {
    margin-left: 0;
  }
  & > :last-child {
    margin-right: 0;
  }
`;

export const StyledInput = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  margin: 5px 0;
  font-family: 'Roboto';
  font-size: 13px;
  border-radius: 6px;
  background-color: ${palette.beta800gray};
  color: white;
`;
