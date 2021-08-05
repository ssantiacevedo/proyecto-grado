import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faColumns } from '@fortawesome/free-solid-svg-icons'
import { Text, DBDataDisplayContainer, TableNameContainer, ColumnNameContainer, StyledInput, ColumnsContainer } from './DBDataDisplay.styled';

const DBDisplay = ({ data }) => {

  return (
    <DBDataDisplayContainer>
      <Text>Your DB Elements</Text>
      {data?.map((x, i) => (
        <Fragment key={`db-${i}`}>
          <StyledInput>
            <TableNameContainer>
              <FontAwesomeIcon icon={faTable} />
              {x?.table && <Text>Table: {x.table}</Text>}
            </TableNameContainer>
            <ColumnsContainer>
              {x?.columns.map(column => (
                <ColumnNameContainer>
                  <FontAwesomeIcon icon={faColumns} />
                  <Text>{column.name}</Text>
                </ColumnNameContainer>
              ))}
            </ColumnsContainer>
          </StyledInput>
        </Fragment>
      ))}
    </DBDataDisplayContainer>
  )
}

export default DBDisplay;
