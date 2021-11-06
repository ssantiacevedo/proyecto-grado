import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { palette } from "../../theme/palette";
import {
  Step1Container,
  AddButon,
  ButtonContainer,
  IconText,
  Input,
  Label,
  RegisterLink,
} from "./LoginCard.styled";
import { useHistory } from "react-router-dom";

const LoginCard = ({ handleLogin, setEmail, email, setPassword, password }) => {
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
        <RegisterLink onClick={() => history.push("/register")}>
         Don´t have an account?  <a href='/register'>Register</a>
        </RegisterLink>
      </ButtonContainer>
    </Step1Container>
  );
};

export default LoginCard;
