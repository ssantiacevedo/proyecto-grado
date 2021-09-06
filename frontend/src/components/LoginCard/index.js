import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { palette } from '../../theme/palette';
import {
  Step1Container,
  AddButon,
  ButtonContainer,
  IconText,
  Input,
  Label,
} from "./LoginCard.styled";

const DownloadCard = ({
  handleLogin,
  setEmail,
  email,
  setPassword,
  password,
}) => {
  return (
    <Step1Container>
      <ButtonContainer>
        <Label>
          Email <span style={{ color: palette.darkRed }}>*</span>
        </Label>
        <Input
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label>
          Password <span style={{ color: palette.darkRed }}>*</span>
        </Label>
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <AddButon disabled={!email || !password} onClick={handleLogin}>
          <FontAwesomeIcon icon={faSignInAlt} />
          <IconText>{"Login"}</IconText>
        </AddButon>
      </ButtonContainer>
    </Step1Container>
  );
};

export default DownloadCard;
