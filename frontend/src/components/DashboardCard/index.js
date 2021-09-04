import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import {
  Step1Container,
  AddButon,
  ButtonContainer,
  IconText,
  ListContainer,
  CardContainer,
} from "./DashboardCard.styled";

const DashboardCard = ({ handleCreateNew, process }) => {
  console.log(process);
  return (
    <Step1Container>
      <ButtonContainer>
        <AddButon onClick={handleCreateNew}>
          <FontAwesomeIcon icon={faPlusSquare} />
          <IconText>{"Or create a new one"}</IconText>
        </AddButon>
        <ListContainer>
          {process?.map((p) => (
            <CardContainer>{`Process: ${p?.uuid}`}</CardContainer>
          ))}
        </ListContainer>
      </ButtonContainer>
    </Step1Container>
  );
};

export default DashboardCard;
