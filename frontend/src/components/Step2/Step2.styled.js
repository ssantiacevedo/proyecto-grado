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
  font-size: 13px;
  margin-left: 10px;
`;

export const Step2Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  align-items: flex-start;
`;

export const StyledInput = styled.label`
  border: 1px solid ${palette.beta800gray};
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
