import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  Text,
  Step1Container,
  AddButon,
  ButtonContainer,
  StyledInput,
  IconText,
  RadioGroupStyled,
  RadioStyled,
  TextButton,
  StyledUri,
} from "./Step1.styled";

const Step1 = ({
  setUploaded,
  inputLists,
  setInputLists,
  ontologyMethodList,
  setOntologyMethod,
}) => {
  const handleAddClick = () => {
    setInputLists([...inputLists, { type: "uri", uri: "", new: true }]);
    setOntologyMethod([...ontologyMethodList, { choice: "uri" }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputLists];
    list.splice(index, 1);
    setInputLists(list);
  };

  const handleInputChange = (e, index) => {
    setUploaded(true);
    const list = [...inputLists];
    if (ontologyMethodList[index].choice === "file") {
      const { files } = e.target;
      list[index] = { type: "file", file: files?.[0], name: files?.[0].name, new: true };
    } else {
      const { value } = e.target;
      list[index] = { type: "uri", uri: value, new: true };
    }
    setInputLists(list);
  };

  const handleChangeButton = (e, index) => {
    const list = [...ontologyMethodList];
    const inputList = [...inputLists];
    list[index] = { choice: e.target.value };

    if (e.target.value === "file") {
      inputList[index] = { type: "file", file: "", name: "", new: true };
    } else {
      inputList[index] = { type: "uri", uri: "", new: true };
    }

    setInputLists(inputList);
    setOntologyMethod(list);
  };

  return (
    <Step1Container>
      <Text>
        Upload your ontologies. You can set a list of URIs or update your .owl
        files
      </Text>
      <>
        {inputLists.map((x, i) => (
          <Fragment key={i}>
            {ontologyMethodList[i]?.choice === "file" && (
              <Fragment>
                <StyledInput htmlFor={`file-upload-${i}`}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                  <IconText>Upload Ontology</IconText>
                </StyledInput>
                {x?.name && <Text>Name: {x.name}</Text>}
                <input
                  onChange={(e) => handleInputChange(e, i)}
                  id={`file-upload-${i}`}
                  name={`ontology-${i}`}
                  type="file"
                  accept=".owl, .txt, .xml, .ttl"
                  style={{ display: "none" }}
                />
              </Fragment>
            )}
            {ontologyMethodList[i]?.choice === "uri" && (
              <StyledUri
                type="text"
                placeholder="URI"
                onChange={(e) => handleInputChange(e, i)}
                value={x?.uri}
                key={x}
              />
            )}
            <>
              <RadioGroupStyled
                name={`method-${i}`}
                selectedValue={ontologyMethodList[i]?.choice}
              >
                <Text>Type: </Text>
                <RadioStyled
                  onChange={(e) => handleChangeButton(e, i)}
                  value="uri"
                />
                <TextButton>URI</TextButton>
                <RadioStyled
                  onChange={(e) => handleChangeButton(e, i)}
                  value="file"
                />
                <TextButton>File</TextButton>
              </RadioGroupStyled>
            </>
          </Fragment>
        ))}
      </>
      <ButtonContainer>
        {inputLists?.length > 1 && (
          <AddButon onClick={() => handleRemoveClick(inputLists?.length - 1)}>
            <FontAwesomeIcon icon={faMinusSquare} />
            <IconText>{"Remove last ontology"}</IconText>
          </AddButon>
        )}
        <AddButon onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlusSquare} />
          <IconText>{"Add more ontologies"}</IconText>
        </AddButon>
      </ButtonContainer>
    </Step1Container>
  );
};

export default Step1;
