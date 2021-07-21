import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Logo,
  TopContainer,
} from './Header.styled';

import LogoUdelar2 from '../../assets/udelarLogo2.svg';

const Header = () => {
  return (
    <>
      <Container>
        <TopContainer>
          <Link to="/home">
            <Logo src={LogoUdelar2} alt="Elitegrad logo" />
          </Link>
        </TopContainer>
      </Container>
    </>
  );
};

export default Header;