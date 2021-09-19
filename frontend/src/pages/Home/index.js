import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import CardPage from "../../components/CardPage";
import StepCard from "../../components/StepCard";

import Step1 from "../../components/Step1";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";

import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";

const Home = () => {
  const {
    getDbElements,
    getOntoElements,
    resetOntologyElements,
    setStepsAmount,
    stepsAmount,
    mappingName,
    setMappingName,
    dbName,
    dbPass,
    dbUser,
    dbPort,
    setDbUser,
    setDbPort,
    setDbPass,
    setDbName,
    inputLists,
    ontologyMethodList,
    setInputLists,
    setOntologyMethod,
    ontologyUploaded,
    setOntologyUploaded,
    token,
  } = useDataContext();
  // DB Form

  const history = useHistory();

  if (!token) history.push("/login");

  const handleContinue = async () => {
    const uris = [...inputLists].filter(
      (input) => input.type == "uri" && input.new
    );
    const files = [...inputLists].filter(
      (input) => input.type == "file" && input.new
    );
    var formData = new FormData();

    files.map((file) => {
      formData.append("onto", file?.file);
    });
    formData.append("uris", JSON.stringify(uris));

    await getOntoElements(formData);
    await getDbElements(dbName, dbUser, dbPort, dbPass);
    history.push("/mappings");
  };
  const disabledMapping =
    !ontologyUploaded || !dbUser || !dbName || !dbPass || !mappingName;

  return (
    <CardPage>
      <StepCard
        number={1}
        title={"Upload Database Connection"}
        description={"Fill your Postgres database information to connect"}
      >
        <Step2
          dbName={dbName}
          dbUser={dbUser}
          dbPass={dbPass}
          dbPort={dbPort}
          setDbName={setDbName}
          setDbUser={setDbUser}
          setDbPass={setDbPass}
          setDbPort={setDbPort}
        />
      </StepCard>
      <StepCard
        number={2}
        title={"Upload Context"}
        description={"Upload your context ontologies in .owl or URI"}
      >
        <Step1
          inputLists={inputLists}
          setInputLists={setInputLists}
          ontologyMethodList={ontologyMethodList}
          setOntologyMethod={setOntologyMethod}
          setUploaded={setOntologyUploaded}
        />
      </StepCard>
      <StepCard
        number={3}
        title={"Mappings"}
        description={"Click in the button to navigate to make your mappings"}
      >
        <Step3
          disabledMapping={disabledMapping}
          handleContinue={handleContinue}
          setStepsAmount={setStepsAmount}
          stepsAmount={stepsAmount}
          setMappingName={setMappingName}
          mappingName={mappingName}
        />
      </StepCard>
    </CardPage>
  );
};

export default Home;
