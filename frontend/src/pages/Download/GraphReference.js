import React from "react";
import {
  ReferenceContainer,
  MappedClass,
  NotMappedClass,
  MappedProperties,
  NotMappedProperties,
  DataProperties,
  SubClass,
  ReferenceTitle,
  Equivalent,
  StyledCardContainer,
  Label,
} from "./Download.styled";

const GraphReference = ({ fixed = false, mappingProcess = false }) => {
  return (
    <StyledCardContainer fixed={fixed}>
      <ReferenceTitle>Reference table:</ReferenceTitle>
      {!mappingProcess && (
        <ReferenceContainer>
          <MappedClass />
          <Label>Mapped Class</Label>
        </ReferenceContainer>
      )}
      <ReferenceContainer>
        <NotMappedClass />
        {mappingProcess ? (
          <Label>Class</Label>
        ) : (
          <Label>Not Mapped Class</Label>
        )}
      </ReferenceContainer>
      {!mappingProcess && (
        <ReferenceContainer>
          <MappedProperties />
          <Label>Mapped Property</Label>
        </ReferenceContainer>
      )}
      <ReferenceContainer>
        <NotMappedProperties />
        {mappingProcess ? (
          <Label>Property</Label>
        ) : (
          <Label>Not Mapped Property</Label>
        )}
      </ReferenceContainer>
      <ReferenceContainer>
        <DataProperties />
        <Label>Data Property Range</Label>
      </ReferenceContainer>
      <ReferenceContainer>
        <SubClass />
        <Label>SubClass</Label>
      </ReferenceContainer>
      {!mappingProcess && (
        <ReferenceContainer>
          <Equivalent />
          <Label>Equivalent</Label>
        </ReferenceContainer>
      )}
    </StyledCardContainer>
  );
};

export default GraphReference;
