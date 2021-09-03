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

const DashboardCard = ({ handleCreateNew }) => {
  return (
    <Step1Container>
      <ButtonContainer>
        <AddButon onClick={handleCreateNew}>
          <FontAwesomeIcon icon={faPlusSquare} />
          <IconText>{"Or create a new one"}</IconText>
        </AddButon>
        <ListContainer>
          <CardContainer>Process: Hola</CardContainer>
          <CardContainer>Process: Chau</CardContainer>
          <CardContainer>Process: Nose </CardContainer>
          <CardContainer>Process: Nos vemos</CardContainer>
          <CardContainer>Process: Rota</CardContainer>
          <CardContainer>Process: No se</CardContainer>
        </ListContainer>
      </ButtonContainer>
    </Step1Container>
  );
};

export default DashboardCard;
