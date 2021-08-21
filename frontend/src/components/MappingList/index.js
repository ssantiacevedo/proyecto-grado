import React, { Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Text,
  MappingContainer,
  MappingRow,
  DBDataDisplayContainer,
  Left,
  Right,
  RightRow,
  ElementText,
  SubmitButton,
  AddMappingButton,
  ButtonContainer,
  ConfirmMappingButton,
  HeaderMapping,
  InfoContainer,
  RightHeaderContainer,
  LeftHeaderContainer,
} from "./MappingList.styled";
import { useDataContext } from "../../context/Context";
const MappingList = () => {
  const {
    mappedElements,
    deleteMappingElement,
    currentDbMapping,
    currentOntoMapping,
    addMappingElement,
    startNewMapping,
    setCurrentDbMapping,
    setCurrentOntoMapping,
    setIsMapping,
    isMapping,
  } = useDataContext();

  useEffect(() => {
    setIsMapping(false);
    setCurrentOntoMapping([]);
    setCurrentDbMapping("");
  }, []);

  const handleConfirm = () => {
    console.log(mappedElements);
  };

  return (
    <DBDataDisplayContainer>
      <ButtonContainer>
        <AddMappingButton onClick={startNewMapping}>
          Add new mapping
        </AddMappingButton>
        <ConfirmMappingButton
          disabled={
            !currentDbMapping || !currentOntoMapping?.length > 0 || !isMapping
          }
          onClick={() => {
            currentDbMapping &&
              currentOntoMapping?.length > 0 &&
              isMapping &&
              addMappingElement();
          }}
        >
          Confirm mapping
        </ConfirmMappingButton>
      </ButtonContainer>
      <MappingContainer>
        {mappedElements?.map((mapped, i) => (
          <>
            <MappingRow key={`mapped-element-${i}`}>
              <HeaderMapping>
                <LeftHeaderContainer>DB Element</LeftHeaderContainer>
                <RightHeaderContainer>
                  <span>Ontology Elements</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ width: "5%", cursor: "pointer" }}
                    onClick={() => deleteMappingElement(i)}
                  />
                </RightHeaderContainer>
              </HeaderMapping>
              <InfoContainer>
                <Left>
                  <ElementText>{Object.keys(mapped)}</ElementText>
                </Left>
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  style={{ width: "5%" }}
                />
                <Right>
                  {Object.values(mapped)?.[0]?.map((elem) => (
                    <RightRow>
                      <ElementText>{elem?.name}</ElementText>
                    </RightRow>
                  ))}
                </Right>
              </InfoContainer>
            </MappingRow>
          </>
        ))}
      </MappingContainer>
      <SubmitButton
        onClick={handleConfirm}
        disabled={mappedElements?.length === 0}
      >
        Submit your mappings
      </SubmitButton>
    </DBDataDisplayContainer>
  );
};

export default MappingList;
