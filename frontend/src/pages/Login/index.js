import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../axios";
import CardPage from "../../components/CardPage";
import StepCard from "../../components/StepCard";
import Spinner from "../../components/Spinner";
import LoginCard from "../../components/LoginCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";

const Download = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { resetOntologyElements, uuid } = useDataContext();

  const history = useHistory();

  const handleLogin = () => {
    console.log(email, password);
    // make the request to login
    resetOntologyElements();
    history.push('/dashboard');
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

export default Download;
