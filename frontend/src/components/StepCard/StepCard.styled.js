import styled from 'styled-components';
import { palette } from '../../theme/palette';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 46px;
    margin-bottom: 16px;
  }
`;

export const Title = styled.div`
  font-family: 'RobotoBold';
  font-size: 18px;
  text-align: center;
`;

export const SubTitle = styled.div`
  font-family: 'Roboto';
  font-size: 15px;
  text-align: center;
  color: ${palette.darkGray};
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0.5%;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05); 
  max-height: 30rem;
  height: 100%;
  padding: 0px 30px 10px 30px;
  overflow-y: auto;
`;