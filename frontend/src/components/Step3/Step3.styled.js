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
  width: 100%;
  max-width: 200px;
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

export const Label = styled.span`
  font-family: 'Roboto';
  font-weight: 600;
  color: ${palette.alpha600};
  font-size: 15px;
  text-align: center;
  margin: 0.5rem 0;
`;

export const Input = styled.input`
  display: inline-block;
  padding: 6px 12px;
  margin: 5px 0;
  font-family: 'Roboto';
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid ${palette.beta800gray};
  color: ${palette.beta800gray};
  outline: none;
  width: 50%;
`;
