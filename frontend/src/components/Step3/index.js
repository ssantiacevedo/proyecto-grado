import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections } from '@fortawesome/free-solid-svg-icons'
import { Step3Container, Text, GoButton, IconText } from './Step3.styled';
import { ButtonContainer } from './Step3.styled';

const Step3 = ({ disabledMapping, handleContinue }) => {
  return (
    <Step3Container>
      <Text>If you already uploaded your ontologies and DB click below to make your mappings</Text>
        <Fragment>
          <ButtonContainer>
            <GoButton onClick={handleContinue} disabled={disabledMapping}>
              <FontAwesomeIcon size="2x" icon={faDirections} /> 
              <IconText>Go to Mappings</IconText>
            </GoButton>
          </ButtonContainer>
        </Fragment>
    </Step3Container>
  )
}

export default Step3;