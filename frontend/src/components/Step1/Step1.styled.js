import styled from 'styled-components';
import { palette } from '../../theme/palette';
import { RadioGroup, Radio } from "react-radio-group";

export const Text = styled.span`
  font-family: 'Roboto';
  font-size: 15px;
  text-align: center;
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
  z-index: 2;
`;

export const AddButon = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 40px;
  width: 50%;
  max-width: 200px;
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
  width: 50%;
  font-family: 'Roboto';
  font-size: 13px;
  border-radius: 6px;
  margin: 5px 0;
  background-color: ${palette.beta800gray};
  color: white;
`;

export const RadioGroupStyled = styled(RadioGroup)`
  margin-bottom: 1rem;
`;

export const RadioStyled = styled(Radio)`
  margin-right: 0.5rem;

  &:checked{
    background-color: ${palette.alpha600};
    color: ${palette.alpha600};
    border: 1px solid ${palette.beta800gray};
  }

  &:focus{
    background-color: ${palette.alpha600};
    color: ${palette.alpha600};
    border: 1px solid ${palette.beta800gray};
  }
`;

export const TextButton = styled.span`
  font-family: 'Roboto';
  font-size: 15px;
  text-align: center;
  margin-right: 2rem;
`;

export const StyledUri = styled.input`
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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
`;