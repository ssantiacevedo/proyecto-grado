import React from "react";
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
  LoginLink,
} from "./RegisterCard.styled";
import { useHistory } from "react-router-dom";

const RegisterCard = ({
  handleRegister,
  setEmail,
  email,
  setPassword,
  password,
  setConfirmPassword,
  confirmPassword,
}) => {
  const history = useHistory();

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
          placeholder="min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <Label>
          Confirm Password <span style={{ color: palette.darkRed }}>*</span>
        </Label>
        <Input
          placeholder="min 8 characters"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          required
        />
        <AddButon disabled={!email || !password || !confirmPassword} onClick={handleRegister}>
          <FontAwesomeIcon icon={faSignInAlt} />
          <IconText>{"Register"}</IconText>
        </AddButon>
        <LoginLink onClick={() => history.push("/login")}>
         Already have an account?  <a href='/login"'>Log in</a>
        </LoginLink>
      </ButtonContainer>
    </Step1Container>
  );
};

export default RegisterCard;
