import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { Step2Container, Text, StyledInput, IconText } from './Step2.styled';

const Step2 = () => {
  const [file, setFile ] = useState({file: '', name: ''})

  const handleInputChange = (e) => {
    const { files } = e.target;
    setFile({file: files?.[0], name: files?.[0].name});
  };

  return (
    <Step2Container>
      <Text>Upload your Database</Text>
        <Fragment>
          <StyledInput htmlFor='file-upload'>
            <FontAwesomeIcon icon={faDatabase} />
            <IconText> Upload Database</IconText>
          </StyledInput>
          {file?.name && <Text>File name: {file.name}</Text>}
          <input onChange={e => handleInputChange(e)} id='file-upload' name='database' type="file" accept="application/sql, text/sql, .sql, .txt" style={{display: 'none'}}/>
        </Fragment>
    </Step2Container>
  )
}

export default Step2;