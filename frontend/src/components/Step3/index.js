import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections } from "@fortawesome/free-solid-svg-icons";
import { Step3Container, Text, GoButton, IconText } from "./Step3.styled";
import {
  ButtonContainer,
  Input,
  Label,
} from "./Step3.styled";
import Spinner from "../Spinner";

const Step3 = ({
  disabledMapping,
  handleContinue,
  setStepsAmount,
  stepsAmount,
  mappingName,
  setMappingName,
  loading,
}) => {
  return (
    <Step3Container>
      <Text>
        If you already uploaded your ontologies select the amount of steps you
        want to iterate and click below to make your mappings
      </Text>
      <Fragment>
        <Label>Steps to iterate</Label>
        <Input
          placeholder="2"
          value={stepsAmount}
          onChange={(e) => setStepsAmount(e.target.value)}
        />
        <Label>Name to identify your process</Label>
        <Input
          placeholder="eg: InCo mapping process"
          value={mappingName}
          onChange={(e) => setMappingName(e.target.value)}
        />
        <ButtonContainer>
          <GoButton onClick={handleContinue} disabled={disabledMapping}>
            {loading ? (
              <Spinner small />
            ) : (
              <>
                <FontAwesomeIcon size="2x" icon={faDirections} />
                <IconText>Go to Mappings</IconText>
              </>
            )}
          </GoButton>
        </ButtonContainer>
      </Fragment>
    </Step3Container>
  );
};

export default Step3;
