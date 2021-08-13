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
  SpinnerContainer,
} from "./OntoDataDisplay";

import Spinner from '../Spinner';

const OntoDataDisplay = ({ data, loading }) => {
  return (
    <OntoDataDisplayContainer>
      <Text>Your Ontologies Elements</Text>
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
                      <ColumnNameContainer>
                        <FontAwesomeIcon icon={faMinus} />
                        <Text>{c?.name}</Text>
                      </ColumnNameContainer>
                    ))}
                  </ColumnsContainer>
                  <ColumnsContainer>
                    {x?.object_properties?.map((objectProperty) => (
                      <ColumnNameContainer>
                        <FontAwesomeIcon icon={faMinus} />
                        <Text>{objectProperty?.name}</Text>
                      </ColumnNameContainer>
                    ))}
                  </ColumnsContainer>
                  <ColumnsContainer>
                    {x?.data_properties?.map((dataProperty) => (
                      <ColumnNameContainer>
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
    </OntoDataDisplayContainer>
  );
};

export default OntoDataDisplay;
