import styled from 'styled-components';
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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid ${palette.alpha600};
  border-radius: 4px;
`;

export const MappingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  max-height: 53vh;
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
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 35px;
  width: 50%;
  margin-top: 20px;
  background-color: ${palette.alpha600};
  color: white;
`;
