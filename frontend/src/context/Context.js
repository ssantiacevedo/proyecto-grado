/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import {
  CREATE_DB,
  CREATE_ONTOLOGY,
  VALIDATION,
  ONTOLOGY_GENERATOR,
  MAPPING_PROCESS,
} from "../axios/routes";

const DataContext = createContext({
  dbElements: [],
  ontologyElements: [],
  mappedElements: [],
  uuid: null,
  loadingOntologyFile: false,
  loadingOntologyUri: false,
  loadingValidation: false,
  loadingDB: false,
  currentDbMapping: "",
  currentOntoMapping: [],
  isMapping: false,
  stepsAmount: 2,
  mappingName: "",
  mappingProcess: [],
  getDbElements: () => {},
  getOntoElementsWithUris: () => {},
  getOntoElementsWithFile: () => {},
  resetOntologyElements: () => {},
  resetDbElements: () => {},
  deleteMappingElement: () => {},
  addMappingElement: () => {},
  startNewMapping: () => {},
  setCurrentDbMapping: () => {},
  setCurrentOntoMapping: () => {},
  setIsMapping: () => {},
  setLoadingValidation: () => {},
  validateMappings: () => {},
  setMappedElements: () => {},
  setStepsAmount: () => {},
  setMappingName: () => {},
  clearAllData: () => {},
  getOntologyForDownload: () => {},
  getMappingProcess: () => {},
  setMappingProcess: () => {},
});

function DataContextProvider(props) {
  const [dbElements, setDbElements] = useState([]);
  const [ontologyElements, setOntologyElements] = useState([]);
  const [isMapping, setIsMapping] = useState(false);
  const [loadingOntologyFile, setLoadingOntologyFile] = useState(false);
  const [loadingOntologyUri, setLoadingOntologyUri] = useState(false);
  const [loadingValidation, setLoadingValidation] = useState(false);
  const [loadingDB, setLoadingDB] = useState(false);
  const [mappedElements, setMappedElements] = useState([]);
  const [currentDbMapping, setCurrentDbMapping] = useState("");
  const [stepsAmount, setStepsAmount] = useState(2);
  const [mappingName, setMappingName] = useState("");
  const [mappingProcess, setMappingProcess] = useState([]);
  const [currentOntoMapping, setCurrentOntoMapping] = useState([]);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const uuidV4 = uuidv4();
    setUuid(uuidV4);
  }, []);

  const history = useHistory();

  const notifySuccess = (successText) =>
    toast.success(<div>{successText}</div>, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const notifyError = (errorText) =>
    toast.error(<div>{errorText}</div>, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const notifyErrorPersisted = (errorText) =>
    toast.error(<div>{errorText}</div>, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const resetOntologyElements = () => setOntologyElements([]);
  const resetDbElements = () => setDbElements([]);

  const clearAllData = () => {
    resetOntologyElements();
    resetDbElements();
    setMappedElements([]);
    setCurrentDbMapping("");
    setCurrentOntoMapping([]);
    setMappingName('');
  };

  const getDbElements = (dbName, dbUser, dbPort, dbPass) => {
    setDbElements([]);
    setLoadingDB(true);
    axiosInstance
      .post(CREATE_DB, {
        uuid,
        name: dbName,
        user: dbUser,
        port: dbPort,
        password: dbPass,
        steps: stepsAmount,
        mappingName: mappingName,
      })
      .then((res) => {
        setDbElements(res?.data);
      })
      .catch(() => {
        notifyError("Error connecting to Postgres DB");
      })
      .finally(() => {
        setLoadingDB(false);
      });
  };

  const getOntoElementsWithFile = (files) => {
    const blob = new File([], uuid);
    files.append("uuid", blob);
    setLoadingOntologyFile(true);
    axiosInstance
      .post(CREATE_ONTOLOGY, files, {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        },
      })
      .then((res) => {
        setOntologyElements((old) => [...old, ...res?.data]);
      })
      .catch(() => {
        notifyError("Error while loading Ontology file");
      })
      .finally(() => {
        setLoadingOntologyFile(false);
      });
  };

  const getOntoElementsWithUris = (uris) => {
    setLoadingOntologyUri(true);
    axiosInstance
      .post(CREATE_ONTOLOGY, {
        uuid,
        uris,
      })
      .then((res) => {
        setOntologyElements((old) => [...old, ...res?.data]);
      })
      .catch(() => {
        notifyError("Error while loading Ontology URIs");
      })
      .finally(() => {
        setLoadingOntologyUri(false);
      });
  };

  const deleteMappingElement = (index) => {
    const list = [...mappedElements];
    list.splice(index, 1);
    setMappedElements(list);
  };

  const addMappingElement = () => {
    const list = [...mappedElements];
    const newObj = {};
    newObj[currentDbMapping] = currentOntoMapping;
    const newList = [newObj, ...list];
    setMappedElements(newList);
    setIsMapping(false);
  };

  const startNewMapping = () => {
    setCurrentDbMapping("");
    setCurrentOntoMapping([]);
    setMappingName('');
    setIsMapping(true);
  };

  const getOntologyForDownload = () => {
    setCurrentDbMapping("");
    setLoadingOntologyFile(true);
    axiosInstance
      .post(ONTOLOGY_GENERATOR, {
        uuid,
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "OntologyGenerated.owl");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((e) => {
        if (e?.response?.data?.error) {
          notifyErrorPersisted(e?.response?.data?.error);
        } else {
          notifyError("Something went wrong");
        }
      })
      .finally(() => {
        setLoadingOntologyFile(false);
      });
  };

  const validateMappings = () => {
    setLoadingValidation(true);
    axiosInstance
      .post(VALIDATION, {
        uuid,
        mapping: mappedElements,
      })
      .then((res) => {
        notifySuccess("Mapping correct");
        console.log(history);
        history.push("/download");
      })
      .catch((e) => {
        if (e?.response?.data?.errors) {
          e.response.data.errors.forEach((error) =>
            notifyErrorPersisted(error)
          );
        } else {
          notifyError("Something went wrong");
        }
      })
      .finally(() => {
        setLoadingValidation(false);
      });
  };

  const getMappingProcess = () => {
    axiosInstance
      .get(MAPPING_PROCESS)
      .then((res) => {
        setMappingProcess(res?.data);
      })
      .catch((e) => {
        console.log(e);
        if (e?.response?.data?.error) {
          notifyErrorPersisted(e?.response?.data?.error);
        } else {
          notifyError("Something went wrong");
        }
        setMappingProcess([]);
      });
  };

  return (
    <DataContext.Provider
      value={{
        dbElements,
        ontologyElements,
        mappedElements,
        loadingOntologyFile,
        loadingOntologyUri,
        loadingDB,
        currentDbMapping,
        currentOntoMapping,
        loadingValidation,
        isMapping,
        stepsAmount,
        mappingName,
        mappingProcess,
        setCurrentDbMapping,
        setCurrentOntoMapping,
        getDbElements,
        getOntoElementsWithUris,
        getOntoElementsWithFile,
        resetOntologyElements,
        resetDbElements,
        deleteMappingElement,
        addMappingElement,
        startNewMapping,
        setIsMapping,
        validateMappings,
        setMappedElements,
        setStepsAmount,
        clearAllData,
        setMappingName,
        getOntologyForDownload,
        getMappingProcess,
        uuid,
      }}
      {...props}
    />
  );
}

const useDataContext = () => useContext(DataContext);

export { DataContextProvider, useDataContext };
