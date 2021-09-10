import styled, { keyframes } from 'styled-components';
import { palette } from '../../theme/palette';

export const Text = styled.span`
  font-family: 'Roboto';
  font-size: 15px;
  text-align: center;
  margin-left: 10px;
`;

export const IconText = styled.span`
  font-family: 'Roboto';
  font-size: 13px;
  margin-left: 10px;
`;

export const DBDataDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  align-items: flex-start;
  z-index: 2;
`;

export const TableNameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;


export const MappingRow = styled.div`
  width: 93%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid ${palette.alpha600};
  border-radius: 4px;
`;

export const MappingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  max-height: 51vh;
  height: 80%;
  z-index: 2;

  & > * {
    margin-bottom: 8px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;


export const Left = styled.div`
  display: flex;
  width: 45%;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  align-items: flex-end;
  justify-content: center;
`;

export const RightRow = styled.div`
  display: flex;
  width: 100%;
`;

export const ElementText = styled.div`
  font-family: 'Roboto';
  font-size: 14px;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const SubmitButton = styled.button`
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


export const AddMappingButton = styled.button`
  text-decoration: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  outline: none;
  border-radius: 8px;
  height: 35px;
  width: 30%;
  margin-top: 0px;
  background-color: ${palette.alpha700};
  color: white;
  opacity: ${props => props.disabled ? '0.7' : '1'};
`;

export const ConfirmMappingButton = styled.button`
  text-decoration: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  outline: none;
  border-radius: 8px;
  height: 35px;
  width: 30%;
  margin-top: 0px;
  background-color: ${palette.gama800Success};
  color: white;
  opacity: ${props => props.disabled ? '0.7' : '1'};
`;


export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;

  & > * {
    margin-right: 10px;
  }
`;

export const HeaderMapping = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  justify-content: space-between;
  font-family: 'Roboto';
  font-size: 10px;
  color: ${palette.beta700gray};
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

export const RightHeaderContainer = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
`;

export const LeftHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
`;

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
  width: 100%;
  height: 80%;
  animation: ${rotate} 2s linear infinite;
  margin: 0 auto;
`;
