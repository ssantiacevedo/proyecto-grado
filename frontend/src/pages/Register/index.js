import React, { useState } from "react";
import CardPage from "../../components/CardPage";
import StepCard from "../../components/StepCard";
import RegisterCard from "../../components/RegisterCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, token } = useDataContext();

  const history = useHistory();

  if (token) history.push("/dashboard");

  const handleRegister = () => {
    register(
      email,
      password,
      confirmPassword,
    );
  };

  return (
    <CardPage>
      <div />
      <StepCard number={1} title={"Create a new account"}>
        <RegisterCard
          handleRegister={handleRegister}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </StepCard>
      <div />
    </CardPage>
  );
};

export default Register;
