import React, { useState } from "react";
import axiosInstance from "../../axios";
import { CREATE_DB } from "../../axios/routes";
import CardPage from "../../components/CardPage";
import StepCard from "../../components/StepCard";

import Step1 from "../../components/Step1";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";

import { useHistory } from "react-router-dom";

const Home = () => {
  const [dbUploaded, setDbUploaded] = useState(false);
  const [ontologyUploaded, setOntologyUploaded] = useState(false);
  const [inputLists, setInputLists] = useState([{ type: "file", ontology: "", name: "" }]);
  const [ontologyMethodList, setOntologyMethod] = useState([{ choice: "uri" }]);

  // DB Form
  const [dbName, setDbName] = useState("");
  const [dbPass, setDbPass] = useState("");
  const [dbUser, setDbUser] = useState("");

  const history = useHistory();

  const handleContinue = () => {
    // var formData = new FormData();
    // formData.append("db", file);
    // axiosInstance.post(CREATE_DB, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    // }).then(
    //   history.push('/mappings')
    // )
    // TODO: Add ontologies to send that with an uuid
    // axiosInstance.post(CREATE_DB, { 
    //   name: dbName,
    //   user: dbUser,
    //   password: dbPass 
    // });
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
        title={"Step 2 - Upload your Database"}
        description={"Fill your database information to connect"}
      >
        <Step2
          setUploaded={setOntologyUploaded}
          dbName={dbName}
          dbUser={dbUser}
          dbPass={dbPass}
          setDbName={setDbName}
          setDbUser={setDbUser}
          setDbPass={setDbPass}
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
        />
      </StepCard>
    </CardPage>
  );
};

export default Home;
