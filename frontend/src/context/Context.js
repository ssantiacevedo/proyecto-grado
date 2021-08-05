/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../axios";
import { CREATE_DB, CREATE_ONTOLOGY } from "../axios/routes";

const DataContext = createContext({
  dbElements: [],
  ontologyElements: [],
  uuid: null,
  getDbElements: () => {},
  getOntoElementsWithUris: () => {},
  getOntoElementsWithFile: () => {},
  resetOntologyElements: () => {},
  resetDbElements: () => {},
});

function DataContextProvider(props) {
  const [dbElements, setDbElements] = useState([]);
  const [ontologyElements, setOntologyElements] = useState([]);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const uuidV4 = uuidv4();
    setUuid(uuidV4);
  }, []);


  const resetOntologyElements = () => setOntologyElements([]);
  const resetDbElements = () => setDbElements([]);

  const getDbElements = (dbName, dbUser, dbPort, dbPass) => {
    setDbElements([]);
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
      });
  };

  const getOntoElementsWithFile = (files) => {
    const blob = new File([], uuid);
    files.append("uuid", blob);
    axiosInstance
      .post(CREATE_ONTOLOGY, files, {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        },
      })
      .then((res) => {
        setOntologyElements(old => [...old, ...res?.data]);
      });
  };

  const getOntoElementsWithUris = (uris) => {
    axiosInstance
      .post(CREATE_ONTOLOGY, {
        uuid,
        uris,
      })
      .then((res) => {
        setOntologyElements(old => [...old, ...res?.data]);
      });
  };

  return (
    <DataContext.Provider
      value={{
        dbElements,
        ontologyElements,
        getDbElements,
        getOntoElementsWithUris,
        getOntoElementsWithFile,
        resetOntologyElements,
        resetDbElements,
        uuid,
      }}
      {...props}
    />
  );
}

const useDataContext = () => useContext(DataContext);

export { DataContextProvider, useDataContext };
