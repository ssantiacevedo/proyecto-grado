import React from 'react';
import step1 from '../../assets/step1.svg';
import step2 from '../../assets/step2.svg';
import step3 from '../../assets/step3.svg';
import { Header, HeaderTitle, CardContainer, Title, SubTitle } from './StepCard.styled';

const StepCard = ({
  number, title, description, children, expanded,
}) => {

  const source = {
    1: step1,
    2: step2,
    3: step3,
  };

  return (
    <CardContainer expanded={expanded}>
      <Header>
        <HeaderTitle>
          <img src={source[number]} alt="Step" />
            <Title>{title}</Title>
        </HeaderTitle>
      </Header>
      <SubTitle>{description}</SubTitle>
      {children}
    </CardContainer>
  );
};

export default StepCard;