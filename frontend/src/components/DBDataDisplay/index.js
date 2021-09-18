import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popper from "../Popper";
import { faTable, faColumns } from "@fortawesome/free-solid-svg-icons";
import { usePopper } from "../../helpers/usePopper";
import {
  Text,
  DBDataDisplayContainer,
  TableNameContainer,
  ColumnNameContainer,
  StyledInput,
  ColumnsContainer,
  DbContainer,
  SpinnerContainer,
  PopperContainer,
} from "./DBDataDisplay.styled";
import { useDataContext } from "../../context/Context";
import Spinner from "../Spinner";

const DBDisplay = ({ data, loading }) => {
  const {
    setCurrentDbMapping,
    isMapping,
    currentDbMapping,
    currentOntoMapping,
    currentDbSelected,
    setCurrentDbSelected,
  } = useDataContext();
  const [referenceElement, setReferenceElement] = useState(null);
  const { popperOpen, togglePopper } = usePopper(`db-popper`);
  console.log(data);
  return (
    <>
      <DBDataDisplayContainer>
        <Text ref={setReferenceElement}>Your DB Elements</Text>
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
                    onClick={() => {
                      isMapping && setCurrentDbMapping(x?.table);
                      isMapping &&
                      setCurrentDbSelected([...currentDbSelected, x]);
                    }}
                    active={currentDbSelected.some(
                      (el) => el?.table === x?.table
                    )}
                  >
                    <FontAwesomeIcon icon={faTable} />
                    {x?.table && <Text>Table: {x.table}</Text>}
                  </TableNameContainer>
                  <ColumnsContainer>
                    {x?.columns.map((column) => (
                      <ColumnNameContainer
                        onClick={() => {
                          isMapping && setCurrentDbMapping(column?.name);
                          isMapping &&
                          setCurrentDbSelected([...currentDbSelected, { name: `${x?.table}-${column?.name}` }]);
                        }}
                        active={currentDbSelected.some(
                          (el) => el?.name === `${x?.table}-${column?.name}`
                        )}
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
      <Popper
        show={isMapping && !currentDbMapping && currentOntoMapping.length == 0}
        referenceElement={referenceElement}
      >
        <PopperContainer>Select one element from your Database</PopperContainer>
      </Popper>
    </>
  );
};

export default DBDisplay;
