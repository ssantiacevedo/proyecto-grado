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
  const [dbUploaded, setDbUploaded] = useState(false);
  const [ontologyUploaded, setOntologyUploaded] = useState(false);
  const [inputLists, setInputLists] = useState([{ type: "uri", uri: "" }]);
  const [ontologyMethodList, setOntologyMethod] = useState([{ choice: "uri" }]);

  const {
    getDbElements,
    getOntoElementsWithFile,
    getOntoElementsWithUris,
    resetOntologyElements,
    setStepsAmount,
    stepsAmount,
  } = useDataContext();
  // DB Form
  const [dbName, setDbName] = useState("");
  const [dbPass, setDbPass] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [dbPort, setDbPort] = useState("");

  const history = useHistory();

  useEffect(() => {
    resetOntologyElements();
  }, []);

  const handleContinue = async () => {
    const uris = [...inputLists].filter((input) => input.type == "uri");
    const files = [...inputLists].filter((input) => input.type == "file");
    var formData = new FormData();

    files.map((file) => {
      formData.append("onto", file?.file);
    });

    await getOntoElementsWithFile(formData);
    await getOntoElementsWithUris(uris);
    await getDbElements(dbName, dbUser, dbPort, dbPass);
    history.push("/mappings");
  };
  const disabledMapping = !dbUploaded || !ontologyUploaded;
  return (
    <CardPage>
      <StepCard
        number={1}
        title={"Step 1 - Upload Ontologies"}
        description={"Upload your input ontologies in .owl or URI"}
      >
        <Step1
          inputLists={inputLists}
          setInputLists={setInputLists}
          ontologyMethodList={ontologyMethodList}
          setOntologyMethod={setOntologyMethod}
          setUploaded={setDbUploaded}
        />
      </StepCard>
      <StepCard
        number={2}
        title={"Step 2 - Upload your Database Connection"}
        description={"Fill your Postgres database information to connect"}
      >
        <Step2
          setUploaded={setOntologyUploaded}
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
        number={3}
        title={"Step 3 - Confirm your mappings"}
        description={"Click in the button to define your mappings"}
      >
        <Step3
          disabledMapping={disabledMapping}
          handleContinue={handleContinue}
          setStepsAmount={setStepsAmount}
          stepsAmount={stepsAmount}
        />
      </StepCard>
    </CardPage>
  );
};

export default Home;
