/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import {
  CREATE_DB,
  CREATE_ONTOLOGY,
  VALIDATION,
  ONTOLOGY_GENERATOR,
  MAPPING_PROCESS,
  detailMappingProcess,
  LOGIN,
  LOGOUT,
  REGISTER,
  ONTOLOGY_GRAPH,
} from "../axios/routes";

const DataContext = createContext({
  dbElements: [],
  ontologyElements: [],
  mappedElements: [],
  uuid: null,
  loadingOntology: false,
  loadingOntologyGraph: false,
  loadingValidation: false,
  loadingDB: false,
  currentDbMapping: "",
  currentOntoMapping: [],
  isMapping: false,
  stepsAmount: 2,
  mappingName: "",
  mappingProcess: [],
  dbName: "",
  dbPass: "",
  dbUser: "",
  dbPort: "",
  inputLists: [],
  ontologyMethodList: [],
  ontologyUploaded: false,
  token: "",
  currentOntoSelected: [],
  currentDbSelected: [],
  graphToShow: null,
  graph: null,
  file: null,
  showGraphModal: false,
  getDbElements: () => {},
  setUuid: () => {},
  getOntoElements: () => {},
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
  getMappingProcessDetail: () => {},
  setDbName: () => {},
  setDbPass: () => {},
  setDbUser: () => {},
  setDbPort: () => {},
  setInputLists: () => {},
  setOntologyMethod: () => {},
  setOntologyUploaded: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
  setCurrentOntoSelected: () => {},
  setCurrentDbSelected: () => {},
  setGraph: () => {},
  getOntologyGraph: () => {},
  setFile: () => {},
  setGraphToShow: () => {},
  setShowGraphModal: () => {},
});

function DataContextProvider(props) {
  const [dbElements, setDbElements] = useState([]);
  const [ontologyElements, setOntologyElements] = useState([]);

  const [isMapping, setIsMapping] = useState(false);

  const [loadingOntology, setLoadingOntology] = useState(false);
  const [loadingOntologyGraph, setLoadingOntologyGraph] = useState(false);
  const [loadingValidation, setLoadingValidation] = useState(false);
  const [loadingDB, setLoadingDB] = useState(false);

  const [mappedElements, setMappedElements] = useState([]);
  const [currentDbMapping, setCurrentDbMapping] = useState("");
  const [stepsAmount, setStepsAmount] = useState(2);
  const [mappingName, setMappingName] = useState("");
  const [mappingProcess, setMappingProcess] = useState([]);

  const [currentOntoMapping, setCurrentOntoMapping] = useState([]);
  const [currentOntoSelected, setCurrentOntoSelected] = useState([]);
  const [currentDbSelected, setCurrentDbSelected] = useState([]);

  const [graph, setGraph] = useState(null);
  const [file, setFile] = useState(null);
  const [uuid, setUuid] = useState(null);
  const [graphToShow, setGraphToShow] = useState(null);
  const [showGraphModal, setShowGraphModal] = useState(false);

  const [token, setToken] = useState(
    localStorage.getItem("ontology-token") || ""
  );
  // Db Form
  const [dbName, setDbName] = useState("");
  const [dbPass, setDbPass] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [dbPort, setDbPort] = useState("");

  // Step 1 form
  const [inputLists, setInputLists] = useState([{ type: "uri", uri: "" }]);
  const [ontologyMethodList, setOntologyMethod] = useState([{ choice: "uri" }]);

  //Step 3 form
  const [ontologyUploaded, setOntologyUploaded] = useState(false);

  const history = useHistory();

  const notifySuccess = (successText) =>
    toast.success(<div>{successText}</div>, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const notifyError = (errorText) =>
    toast.error(<div>{errorText}</div>, {
      position: "top-right",
      autoClose: 3000,
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
    setMappingName("");
    setDbName("");
    setDbUser("");
    setDbPass("");
    setDbPort("");
    setCurrentOntoSelected([]);
    setCurrentDbSelected([]);
    setGraph(null);
    setFile(null);
    setInputLists([{ type: "uri", uri: "" }]);
    setOntologyMethod([{ choice: "uri" }]);
    setLoadingDB(false);
    setLoadingOntology(false);
    setLoadingOntologyGraph(false);
  };

  const getDbElements = async (dbName, dbUser, dbPort, dbPass) => {
    setDbElements([]);
    setLoadingDB(true);
    await axiosInstance
      .post(
        CREATE_DB,
        {
          uuid,
          name: dbName,
          user: dbUser,
          port: dbPort,
          password: dbPass,
          steps: stepsAmount,
          mappingName: mappingName,
        },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        setDbElements(res?.data);
      })
      .catch((err) => {
        notifyError("Error connecting to Postgres DB");
        throw err;
      })
      .finally(() => {
        setLoadingDB(false);
      });
  };

  const getOntoElements = async (files) => {
    const blob = new File([], uuid);
    files.append("uuid", blob);
    setLoadingOntology(true);
    await axiosInstance
      .post(CREATE_ONTOLOGY, files, {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setOntologyElements(() => [...res?.data]);
      })
      .catch((err) => {
        notifyError("Error while loading Ontology Elements");
        throw err;
      })
      .finally(() => {
        setLoadingOntology(false);
      });
  };

  const deleteMappingElement = (index) => {
    const list = [...mappedElements];
    list.splice(index, 1);
    setMappedElements(list);
  };

  const addMappingElement = () => {
    const list = [...(mappedElements ? mappedElements : [])];

    if (list.some((arrVal) => currentDbMapping === Object.keys(arrVal)?.[0])) {
      const itemToAdd = list.find(
        (arrVal) => currentDbMapping === Object.keys(arrVal)?.[0]
      );
      Object.values(itemToAdd)?.[0]?.push(...Object.values(currentOntoMapping));
    } else {
      const newObj = {};
      newObj[currentDbMapping] = currentOntoMapping;
      const newList = [newObj, ...list];
      setMappedElements(newList);
    }

    setIsMapping(false);
    setCurrentOntoSelected([]);
    setCurrentDbSelected([]);
  };

  const startNewMapping = () => {
    setCurrentDbMapping("");
    setCurrentOntoMapping([]);
    setMappingName("");
    setIsMapping(true);
    setCurrentOntoSelected([]);
    setCurrentDbSelected([]);
  };

  const getOntologyForDownload = () => {
    setCurrentDbMapping("");
    setLoadingOntology(true);
    axiosInstance
      .post(ONTOLOGY_GENERATOR, {
        uuid,
      })
      .then((res) => {
        setGraph(res?.data?.graph);
        setFile(res?.data?.file);
      })
      .catch((e) => {
        if (e?.response?.data?.error) {
          notifyErrorPersisted(e?.response?.data?.error);
        } else {
          notifyError("Something went wrong");
        }
      })
      .finally(() => {
        setLoadingOntology(false);
      });
  };

  const validateMappings = () => {
    setLoadingValidation(true);
    setGraph(null);
    axiosInstance
      .post(VALIDATION, {
        uuid,
        mapping: mappedElements,
      })
      .then((res) => {
        notifySuccess("Mapping correct");
        history.push("/download");
        getOntologyForDownload();
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
      .get(MAPPING_PROCESS, { headers: { Authorization: `Token ${token}` } })
      .then((res) => {
        setMappingProcess(res?.data);
      })
      .catch((e) => {
        if (e?.response?.data?.error) {
          notifyErrorPersisted(e?.response?.data?.error);
        } else {
          notifyError("Something went wrong");
        }
        setMappingProcess([]);
      });
  };

  const getMappingProcessDetail = (uuid) => {
    setLoadingDB(false);
    setLoadingOntology(false);
    setLoadingOntologyGraph(false);
    setUuid(uuid);
    axiosInstance
      .get(detailMappingProcess(uuid), {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setStepsAmount(res?.data?.steps_amount);
        setMappedElements(res?.data?.valid_mapping);
        let ontologyMethodList = [];
        const ontologies = res?.data?.ontologies?.map((onto) => {
          if (onto?.ontology_type === "URI") {
            ontologyMethodList = [...ontologyMethodList, { choice: "uri" }];
            return { type: "uri", uri: onto.ontology_uri, id: onto.id };
          } else {
            ontologyMethodList = [...ontologyMethodList, { choice: "file" }];
            const fileName = onto.ontology_file.substring(
              onto.ontology_file.lastIndexOf("/") + 1
            );
            return {
              type: "file",
              file: onto.ontology_file,
              name: fileName,
              id: onto.id,
            };
          }
        });
        setInputLists(ontologies);
        setOntologyMethod(ontologyMethodList);
        setDbName(res?.data?.relational_db?.relational_db_name);
        setDbPort(res?.data?.relational_db?.relational_db_port || "");
        setDbPass(res?.data?.relational_db?.relational_db_password);
        setDbUser(res?.data?.relational_db?.relational_db_user);
        setMappingName(res?.data?.name);
        setOntologyUploaded(true);
        history.push("/home");
      })
      .catch((e) => {
        if (e?.response?.data?.error) {
          notifyErrorPersisted(e?.response?.data?.error);
        } else {
          notifyError("Something went wrong");
        }
        setMappingProcess([]);
      });
  };

  const getOntologyGraph = (onto) => {
    setLoadingOntologyGraph(true);
    axiosInstance
      .post(ONTOLOGY_GRAPH, {
        url: onto?.name,
        type: onto?.type,
      })
      .then((res) => {
        setGraphToShow(res?.data?.graph);
      })
      .catch((e) => {
        if (e?.response?.data?.error) {
          notifyErrorPersisted(e?.response?.data?.error);
        } else {
          notifyError("Something went wrong");
        }
        setMappingProcess([]);
      })
      .finally(() => {
        setLoadingOntologyGraph(false);
      });
  };

  const login = (email, password) => {
    axiosInstance
      .post(LOGIN, { email, password })
      .then((res) => {
        localStorage.setItem("ontology-token", res?.data?.key);
        setToken(res?.data?.key);
        history.push("/dashboard");
      })
      .catch((err) => {
        if (err?.response?.data) {
          // eslint-disable-next-line array-callback-return
          Object.entries(err?.response?.data).map((error) => {
            notifyError(error?.[1]);
          });
        } else {
          notifyError("Something went wrong");
        }
      });
  };

  const logout = () => {
    axiosInstance
      .post(LOGOUT, { headers: { Authorization: `Token ${token}` } })
      .then(() => {
        localStorage.removeItem("ontology-token");
        setToken("");
        history.push("/login");
      });
  };

  const register = (email, password, confirmPassword) => {
    axiosInstance
      .post(REGISTER, {
        username: email,
        email,
        password1: password,
        password2: confirmPassword,
      })
      .then((res) => {
        login(email, password);
      })
      .catch((err) => {
        if (err?.response?.data) {
          // eslint-disable-next-line array-callback-return
          Object.entries(err?.response?.data).map((error) => {
            notifyError(error?.[1]);
          });
        } else {
          notifyError("Something went wrong");
        }
      });
  };

  return (
    <DataContext.Provider
      value={{
        dbElements,
        ontologyElements,
        mappedElements,
        loadingOntology,
        loadingOntologyGraph,
        loadingDB,
        currentDbMapping,
        currentOntoMapping,
        loadingValidation,
        isMapping,
        stepsAmount,
        mappingName,
        mappingProcess,
        dbName,
        dbPass,
        dbUser,
        dbPort,
        ontologyMethodList,
        inputLists,
        ontologyUploaded,
        token,
        currentDbSelected,
        currentOntoSelected,
        graph,
        file,
        setCurrentDbMapping,
        setCurrentOntoMapping,
        getDbElements,
        getOntoElements,
        resetOntologyElements,
        resetDbElements,
        deleteMappingElement,
        addMappingElement,
        startNewMapping,
        setIsMapping,
        setUuid,
        validateMappings,
        setMappedElements,
        setStepsAmount,
        clearAllData,
        setMappingName,
        getOntologyForDownload,
        getMappingProcess,
        setDbName,
        setDbPass,
        setDbPort,
        setDbUser,
        getMappingProcessDetail,
        setInputLists,
        setOntologyMethod,
        setOntologyUploaded,
        login,
        logout,
        setToken,
        register,
        setCurrentDbSelected,
        setCurrentOntoSelected,
        setGraph,
        setFile,
        uuid,
        graphToShow,
        getOntologyGraph,
        showGraphModal,
        setShowGraphModal,
        setGraphToShow,
      }}
      {...props}
    />
  );
}

const useDataContext = () => useContext(DataContext);

export { DataContextProvider, useDataContext };
