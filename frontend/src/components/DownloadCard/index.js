import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import {
  Step1Container,
  AddButon,
  ButtonContainer,
  IconText,
} from "./Download.styled";

const DownloadCard = ({ handleDownload }) => {
  return (
    <Step1Container>
      <ButtonContainer>
        <AddButon onClick={handleDownload}>
          <FontAwesomeIcon icon={faDownload} />
          <IconText>{"Download"}</IconText>
        </AddButon>
      </ButtonContainer>
    </Step1Container>
  );
};

export default DownloadCard;