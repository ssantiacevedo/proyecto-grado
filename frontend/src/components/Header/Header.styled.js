import styled from 'styled-components';
import { palette } from '../../theme/palette';

const Logo = styled.img`
  height: 16vh;
  @media (min-width: 768px) {
    height: 11vh;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 16vh;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  line-height: 1.6rem;
  background: ${palette.alpha600};

  @media (min-width: 768px) {
    height: 11vh;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const TopContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const HelpButton = styled.button`
  
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  right: 2rem;
  margin-top: 0;
  border: none;
  font-family: 'Roboto';
  font-size: 1rem;
  padding: 0.5rem 3rem;
  color: ${palette.alpha600};
`;

const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  padding: 0.5rem;
  color: ${palette.alpha600};
  width: 100%;
  height: 100%;
`;

const Rule = styled.div`
  display: flex;
  font-family: 'RobotoBold';
  flex-direction: column;
  padding: 0.5rem;
  color: ${palette.alpha600};
  width: 100%;
  height: 100%;
`;

const RuleDescription = styled.div`
  color: ${palette.black};
  font-family: 'Roboto';
  font-size: 1rem;
  padding-left: 0.3rem;
`;

export {
  Logo,
  Container,
  TopContainer,
  HelpButton,
  RulesContainer,
  Rule,
  RuleDescription,
};