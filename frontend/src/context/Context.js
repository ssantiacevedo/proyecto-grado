/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../axios";
import { CREATE_DB, CREATE_ONTOLOGY } from "../axios/routes";
import { dataMapping } from "../data/dummy";

const DataContext = createContext({
  dbElements: [],
  ontologyElements: [],
  mappedElements: [],
  uuid: null,
  loadingOntologyFile: false,
  loadingOntologyUri: false,
  loadingDB: false,
  currentDbMapping: "",
  currentOntoMapping: [],
  isMapping: false,
  getDbElements: () => {},
  getOntoElementsWithUris: () => {},
  getOntoElementsWithFile: () => {},
  resetOntologyElements: () => {},
  resetDbElements: () => {},
  deleteMappingElement: () => {},
  addMappingElement: () => {},
  startNewMapping: () => {},
  setIsMapping: () => {},
});

function DataContextProvider(props) {
  const [dbElements, setDbElements] = useState([]);
  const [ontologyElements, setOntologyElements] = useState([]);
  const [isMapping, setIsMapping] = useState(false);
  const [loadingOntologyFile, setLoadingOntologyFile] = useState(false);
  const [loadingOntologyUri, setLoadingOntologyUri] = useState(false);
  const [loadingDB, setLoadingDB] = useState(false);
  const [mappedElements, setMappedElements] = useState(dataMapping);
  const [currentDbMapping, setCurrentDbMapping] = useState("");
  const [currentOntoMapping, setCurrentOntoMapping] = useState([]);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const uuidV4 = uuidv4();
    setUuid(uuidV4);
  }, []);

  const notifySuccess = (successText) =>
    toast.error(<div>{successText}</div>, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const notifyError = (errorText) =>
    toast.success(<div>{errorText}</div>, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const resetOntologyElements = () => setOntologyElements([]);
  const resetDbElements = () => setDbElements([]);

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
    newObj[currentDbMapping] = currentOntoMapping
    const newList = [newObj, ...list];
    setMappedElements(newList);
    setIsMapping(false);
  };

  const startNewMapping = () => {
    setCurrentDbMapping('');
    setCurrentOntoMapping([]);
    setIsMapping(true);
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
        isMapping,
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
        uuid,
      }}
      {...props}
    />
  );
}

const useDataContext = () => useContext(DataContext);

export { DataContextProvider, useDataContext };
