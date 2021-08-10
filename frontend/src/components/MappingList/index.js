import React, { Fragment } from "react";
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
} from "./MappingList.styled";
import { useDataContext } from "../../context/Context";
const MappingList = () => {
  const { mappedElements, deleteMappingElement } = useDataContext();
  return (
    <DBDataDisplayContainer>
      <Text>Your Mapped Elements</Text>
      <MappingContainer>
        {mappedElements?.map((mapped, i) => (
          <MappingRow key={`mapped-element-${i}`}>
            <Left>
              <ElementText>{mapped?.leftSide}</ElementText>
            </Left>
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              style={{ width: "5%" }}
            />
            <Right>
              {mapped?.rightSide?.map((elem) => (
                <RightRow>
                 <ElementText>{elem}</ElementText>
                </RightRow>
              ))}
            </Right>
            <FontAwesomeIcon icon={faTrash} style={{ width: "5%", cursor: 'pointer' }} onClick={() => deleteMappingElement(i)} />
          </MappingRow>
        ))}
      </MappingContainer>
      <SubmitButton>Submit your mappings</SubmitButton>
    </DBDataDisplayContainer>
  );
};

export default MappingList;
