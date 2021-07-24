import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { Text, Step1Container, AddButon, ButtonContainer, StyledInput, IconText } from './Step1.styled';

const Step1 = ({ setUploaded }) => {
  const [inputLists, setInputLists] = useState([{ ontology: '', name: '' }, { ontology: '', name: '' }])

  const handleAddClick = () => {
    setInputLists([...inputLists, { ontology: ''  }]);
  };

  const handleRemoveClick = index => {
    const list = [...inputLists];
    list.splice(index, 1);
    console.log(list);
    setInputLists(list);
  };

  const handleInputChange = (e, index) => {
    setUploaded(true);
    const { files } = e.target;
    const list = [...inputLists];
    list[index] = {file: files?.[0], name: files?.[0].name};
    setInputLists(list);
  };

  return (
    <Step1Container>
      <Text>Upload your ontologies (minimum 2)</Text>
      {inputLists.map((x, i) => (
        <Fragment key={i}>
          <StyledInput htmlFor={`file-upload-${i}`}>
            <FontAwesomeIcon icon={faCloudUploadAlt} /><IconText> Upload Ontology</IconText>
          </StyledInput>
          {x?.name && <Text>File name: {x.name}</Text>}
          <input onChange={e => handleInputChange(e, i)} id={`file-upload-${i}`} name={`ontology-${i}`} type="file" accept=".owl, .txt" style={{display: 'none'}}/>
        </Fragment>
      ))}
      <ButtonContainer>
        <AddButon onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlusSquare} /> 
          <IconText>Add more ontologies</IconText>
        </AddButon>
        {inputLists?.length > 2 && (
        <AddButon onClick={() => handleRemoveClick(inputLists?.length - 1)}>
          <FontAwesomeIcon icon={faMinusSquare} /> 
          <IconText>Remove last ontology</IconText>
        </AddButon>
        )}
      </ButtonContainer>
    </Step1Container>
  )
}

export default Step1;
