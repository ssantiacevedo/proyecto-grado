import React, { useState } from "react";
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

  const { getMappingElements, getOntoElementsWithUri } = useDataContext();
  // DB Form
  const [dbName, setDbName] = useState("");
  const [dbPass, setDbPass] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [dbPort, setDbPort] = useState("");

  const history = useHistory();

  const handleContinue = async () => {
    // var formData = new FormData();
    // formData.append("onto", inputLists[0].file);
    // axiosInstance
    //   .post("/mapping/ontologies/", formData, {
    //     headers: {
    //       "Content-Type":
    //         "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    //     },
    //   })
    //   .then(history.push("/mappings"));

    await getMappingElements(dbName, dbUser, dbPort, dbPass);
    await getOntoElementsWithUri(inputLists);
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
        title={"Step 2 - Upload your Database"}
        description={"Fill your database information to connect"}
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
        />
      </StepCard>
    </CardPage>
  );
};

export default Home;
