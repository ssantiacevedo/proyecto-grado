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

const DashboardCard = ({ handleCreateNew, processes, handleLoad }) => {
  return (
    <Step1Container>
      <ButtonContainer>
        <AddButon onClick={handleCreateNew}>
          <FontAwesomeIcon icon={faPlusSquare} />
          <IconText>{"Or create a new one"}</IconText>
        </AddButon>
        <ListContainer>
          {processes?.map((p) => (
            <CardContainer key={p?.uuid} onClick={() => handleLoad(p?.uuid)}>{`${p?.name || ''}`}</CardContainer>
          ))}
        </ListContainer>
      </ButtonContainer>
    </Step1Container>
  );
};

export default DashboardCard;
