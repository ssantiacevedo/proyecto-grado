/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../axios";
import { CREATE_DB, CREATE_ONTOLOGY } from "../axios/routes";

const DataContext = createContext({
  mappingData: [],
  ontologyData: [],
  uuid: null,
  getMappingElements: () => {},
  getOntoElementsWithUri: () => {},
});

function DataContextProvider(props) {
  const [mappingData, setMappingData] = useState([]);
  const [ontologyData, setOntologyData] = useState([]);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const uuidV4 = uuidv4();
    setUuid(uuidV4);
  }, []);

  const getMappingElements = (dbName, dbUser, dbPort, dbPass) => {
    setMappingData([]);
    axiosInstance
      .post(CREATE_DB, {
        uuid,
        name: dbName,
        user: dbUser,
        port: dbPort,
        password: dbPass,
      })
      .then((res) => {
        console.log(res.data);
        setMappingData(res?.data);
      });
  };

  const getOntoElementsWithUri = (owls) => {
    setOntologyData([]);
    axiosInstance
      .post(CREATE_ONTOLOGY, {
        uuid,
        owls: owls,
      })
      .then((res) => {
        console.log(res.data);
        setOntologyData(res?.data);
      });
  };

  return (
    <DataContext.Provider
      value={{
        mappingData,
        ontologyData,
        getMappingElements,
        getOntoElementsWithUri,
        uuid,
      }}
      {...props}
    />
  );
}

const useDataContext = () => useContext(DataContext);

export { DataContextProvider, useDataContext };
