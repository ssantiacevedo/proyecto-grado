import React, { useState } from "react";
import CardPage from "../../components/CardPage";
import StepCard from "../../components/StepCard";
import LoginCard from "../../components/LoginCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useDataContext();

  const history = useHistory();
  if (token) history.push("/dashboard");

  const handleLogin = () => {
    login(
      email,
      password
    );
  };

  return (
    <CardPage>
      <div />
      <StepCard number={1} title={"Login into your account"}>
        <LoginCard
          handleLogin={handleLogin}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </StepCard>
      <div />
    </CardPage>
  );
};

export default Login;
