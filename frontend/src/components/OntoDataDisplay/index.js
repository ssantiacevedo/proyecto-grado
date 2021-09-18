import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThList,
  faMinus,
  faCube,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import {
  Text,
  OntoDataDisplayContainer,
  TableNameContainer,
  ColumnNameContainer,
  StyledInput,
  ColumnsContainer,
  OntoContainer,
  OntologyTitle,
  SpinnerContainer,
  PopperContainer,
} from "./OntoDataDisplay";
import Popper from "../Popper";
import { usePopper } from "../../helpers/usePopper";
import { useDataContext } from "../../context/Context";
import Spinner from "../Spinner";

const OntoDataDisplay = ({ data, loading }) => {
  const {
    setCurrentOntoMapping,
    currentOntoMapping,
    isMapping,
    currentDbMapping,
    currentOntoSelected,
    setCurrentOntoSelected,
  } = useDataContext();

  console.log(currentOntoSelected);
  const [referenceElement, setReferenceElement] = useState(null);
  const { popperOpen, togglePopper } = usePopper(`onto-popper`);
  return (
    <OntoDataDisplayContainer>
      <Text ref={setReferenceElement}>Your Ontologies Elements</Text>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          {data?.map((elements, i) => (
            <OntoContainer key={`ontology-${i}`}>
              <OntologyTitle>Ontology Elements: </OntologyTitle>
              {elements?.data?.map((x, i) => (
                <StyledInput htmlFor={`file-upload-${i}`}>
                  <TableNameContainer>
                    {x?.classes && (
                      <>
                        <FontAwesomeIcon icon={faThList} />
                        <Text>Classes:</Text>
                      </>
                    )}
                    {x?.object_properties && (
                      <>
                        <FontAwesomeIcon icon={faCube} />
                        <Text>Object Properties:</Text>
                      </>
                    )}
                    {x?.data_properties && (
                      <>
                        <FontAwesomeIcon icon={faDatabase} />
                        <Text>Data Properties:</Text>
                      </>
                    )}
                  </TableNameContainer>
                  <ColumnsContainer>
                    {x?.classes?.map((c) => (
                      <ColumnNameContainer
                        onClick={() => {
                          isMapping &&
                            setCurrentOntoMapping([
                              ...currentOntoMapping,
                              { name: c?.name, iri: c?.iri },
                            ]);
                          isMapping &&
                            setCurrentOntoSelected([
                              ...currentOntoMapping,
                              { name: c?.name, iri: c?.iri },
                            ]);
                        }}
                        key={c?.iri}
                        active={currentOntoSelected.some(
                          (el) => el?.iri === c?.iri
                        )}
                        isMapping={isMapping}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                        <Text>{c?.name}</Text>
                      </ColumnNameContainer>
                    ))}
                  </ColumnsContainer>
                  <ColumnsContainer>
                    {x?.object_properties?.map((objectProperty) => (
                      <ColumnNameContainer
                        onClick={() => {
                          isMapping &&
                            setCurrentOntoMapping([
                              ...currentOntoMapping,
                              {
                                name: objectProperty?.name,
                                iri: objectProperty?.iri,
                              },
                            ]);
                          isMapping &&
                            setCurrentOntoSelected([
                              ...currentOntoMapping,
                              {
                                name: objectProperty?.name,
                                iri: objectProperty?.iri,
                              },
                            ]);
                        }}
                        active={currentOntoSelected.some(
                          (el) => el?.iri === objectProperty?.iri
                        )}
                        key={objectProperty?.iri}
                        isMapping={isMapping}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                        <Text>{objectProperty?.name}</Text>
                      </ColumnNameContainer>
                    ))}
                  </ColumnsContainer>
                  <ColumnsContainer>
                    {x?.data_properties?.map((dataProperty) => (
                      <ColumnNameContainer
                        onClick={() =>
                          isMapping &&
                          setCurrentOntoMapping([
                            ...currentOntoMapping,
                            {
                              name: dataProperty?.name,
                              iri: dataProperty?.iri,
                            },
                          ])
                        }
                        key={dataProperty?.iri}
                        isMapping={isMapping}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                        <Text>{dataProperty?.name}</Text>
                      </ColumnNameContainer>
                    ))}
                  </ColumnsContainer>
                </StyledInput>
              ))}
            </OntoContainer>
          ))}
        </>
      )}
      <Popper
        show={isMapping && currentDbMapping}
        referenceElement={referenceElement}
      >
        <PopperContainer>
          Select at least one element from your Context
        </PopperContainer>
      </Popper>
    </OntoDataDisplayContainer>
  );
};

export default OntoDataDisplay;
