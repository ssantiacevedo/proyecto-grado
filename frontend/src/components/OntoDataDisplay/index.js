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

  const [referenceElement, setReferenceElement] = useState(null);
  const { popperOpen, togglePopper } = usePopper(`onto-popper`);

  const handleClickOntoElem = (ontoElem) => {
    if (isMapping) {
      if (currentOntoSelected.some((el) => el?.iri === ontoElem?.iri)) {
        setCurrentOntoSelected(
          currentOntoMapping.filter((elem) => elem?.iri !== ontoElem?.iri)
        );
        setCurrentOntoMapping(
          currentOntoMapping.filter((elem) => elem?.iri !== ontoElem?.iri)
        );
      } else {
        setCurrentOntoMapping([
          ...currentOntoMapping,
          { name: ontoElem?.name, iri: ontoElem?.iri },
        ]);
        setCurrentOntoSelected([
          ...currentOntoMapping,
          { name: ontoElem?.name, iri: ontoElem?.iri },
        ]);
      }
    }
  };
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
              <OntologyTitle>
                Ontology Elements: {elements?.name}{" "}
              </OntologyTitle>
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
                        onClick={() => handleClickOntoElem(c)}
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
                        onClick={() => handleClickOntoElem(objectProperty)}
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
                        onClick={() => handleClickOntoElem(dataProperty)}
                        key={dataProperty?.iri}
                        isMapping={isMapping}
                        active={currentOntoSelected.some(
                          (el) => el?.iri === dataProperty?.iri
                        )}
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
