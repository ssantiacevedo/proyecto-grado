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

export const OntoDataDisplayContainer = styled.div`
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


export const ColumnNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
`;


export const StyledInput = styled.label`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  margin: 5px 0;
  font-family: 'Roboto';
  font-size: 13px;
  max-width: 90%;
  width: 90%;
  border-radius: 6px;
`;

export const OntoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.alpha50Blue};
  margin: 10px 0;
`;