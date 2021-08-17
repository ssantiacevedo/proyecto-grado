import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faColumns } from "@fortawesome/free-solid-svg-icons";
import {
  Text,
  DBDataDisplayContainer,
  TableNameContainer,
  ColumnNameContainer,
  StyledInput,
  ColumnsContainer,
  DbContainer,
  SpinnerContainer,
} from "./DBDataDisplay.styled";
import { useDataContext } from "../../context/Context";
import Spinner from "../Spinner";

const DBDisplay = ({ data, loading }) => {
  const { setCurrentDbMapping, isMapping } = useDataContext();

  return (
    <DBDataDisplayContainer>
      <Text>Your DB Elements</Text>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          {data?.map((x, i) => (
            <DbContainer key={`db-${i}`}>
              <StyledInput>
                <TableNameContainer
                  isMapping={isMapping}
                  onClick={() => isMapping && setCurrentDbMapping(x?.table)}
                >
                  <FontAwesomeIcon icon={faTable} />
                  {x?.table && <Text>Table: {x.table}</Text>}
                </TableNameContainer>
                <ColumnsContainer>
                  {x?.columns.map((column) => (
                    <ColumnNameContainer
                      onClick={() => isMapping && setCurrentDbMapping(column?.name)}
                      isMapping={isMapping}
                    >
                      <FontAwesomeIcon icon={faColumns} />
                      <Text>{column.name}</Text>
                    </ColumnNameContainer>
                  ))}
                </ColumnsContainer>
              </StyledInput>
            </DbContainer>
          ))}
        </>
      )}
    </DBDataDisplayContainer>
  );
};

export default DBDisplay;
