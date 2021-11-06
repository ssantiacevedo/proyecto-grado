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

  const handleClickTable = (x) => {
    if (isMapping) {
      if (currentDbSelected.some((el) => el?.table === x?.table)) {
        setCurrentDbSelected(
          currentDbSelected.filter((elem) => elem?.table !== x?.table)
        );
        setCurrentDbMapping("");
      } else {
        setCurrentDbMapping(x?.table);
        setCurrentDbSelected([x]);
      }
    }
  };

  const handleClickColumn = (x, column) => {
    if (isMapping) {
      if (
        currentDbSelected.some(
          (el) => el?.name === `${x?.table}-${column?.name}`
        )
      ) {
        setCurrentDbSelected(
          currentDbSelected.filter(
            (elem) => elem?.name !== `${x?.table}-${column?.name}`
          )
        );
        setCurrentDbMapping("");
      } else {
        setCurrentDbMapping(`${x?.table}-${column?.name}`);
        setCurrentDbSelected([{ name: `${x?.table}-${column?.name}` }]);
      }
    }
  };

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
                    onClick={() => handleClickTable(x)}
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
                        onClick={() => handleClickColumn(x, column)}
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
