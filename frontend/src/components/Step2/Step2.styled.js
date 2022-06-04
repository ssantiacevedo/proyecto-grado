import styled from 'styled-components';
import { palette } from '../../theme/palette';

export const Text = styled.span`
  font-family: 'Roboto';
  font-size: 15px;
  margin-bottom: 10px;
  text-align: center;
  margin: 0 auto 1rem;
`;

export const Step2Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  align-items: flex-start;
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