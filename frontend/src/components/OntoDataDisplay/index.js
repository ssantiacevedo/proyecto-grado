import React, { Fragment } from "react";
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
} from "./OntoDataDisplay";

const OntoDataDisplay = ({ data }) => {
  return (
    <OntoDataDisplayContainer>
      <Text>Your Ontologies Elements</Text>
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
                {x?.classes?.map((name) => (
                  <ColumnNameContainer>
                    <FontAwesomeIcon icon={faMinus} />
                    <Text>{name}</Text>
                  </ColumnNameContainer>
                ))}
              </ColumnsContainer>
              <ColumnsContainer>
                {x?.object_properties?.map((name) => (
                  <ColumnNameContainer>
                    <FontAwesomeIcon icon={faMinus} />
                    <Text>{name}</Text>
                  </ColumnNameContainer>
                ))}
              </ColumnsContainer>
              <ColumnsContainer>
                {x?.data_properties?.map((name) => (
                  <ColumnNameContainer>
                    <FontAwesomeIcon icon={faMinus} />
                    <Text>{name}</Text>
                  </ColumnNameContainer>
                ))}
              </ColumnsContainer>
            </StyledInput>
          ))}
        </OntoContainer>
      ))}
    </OntoDataDisplayContainer>
  );
};

export default OntoDataDisplay;
