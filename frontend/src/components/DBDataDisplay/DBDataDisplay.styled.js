import styled from "styled-components";
import { palette } from "../../theme/palette";

export const Text = styled.span`
  font-family: "Roboto";
  font-size: 15px;
  text-align: center;
  margin-left: 10px;
`;

export const IconText = styled.span`
  font-family: "Roboto";
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
  overflow-y: auto;
`;

export const TableNameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  cursor: ${props => props.isMapping ? 'pointer' : 'normal'};
  color: ${(props => props.active && palette.alpha50Blue)};
`;

export const ColumnNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.isMapping ? 'pointer' : 'normal'};
  color: ${(props => props.active && palette.alpha50Blue)};
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
  font-family: "Roboto";
  font-size: 13px;
  max-width: 90%;
  width: 90%;
  border-radius: 6px;
`;

export const DbContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.alpha600};
  margin: 10px 0;
  padding: 10px;
  width: 90%;
  border-radius: 4px;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20rem;
  justify-content: center;
  width: 100%;
`;

export const PopperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;
