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
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;


export {
  Logo,
  Container,
  TopContainer,
};