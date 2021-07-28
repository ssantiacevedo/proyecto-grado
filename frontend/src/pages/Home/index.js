import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { CREATE_DB } from '../../axios/routes';
import CardPage from '../../components/CardPage';
import StepCard from '../../components/StepCard';

import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import Step3 from '../../components/Step3';

import { useHistory } from 'react-router-dom';

const Home = () => {
  const [dbUploaded, setDbUploaded] = useState(false);
  const [ontologyUploaded, setOntologyUploaded] = useState(false);
  const [inputLists, setInputLists] = useState([{ ontology: '', name: '' }, { ontology: '', name: '' }])
  const [file, setFile ] = useState({file: '', name: ''})

  const history = useHistory();

  const handleContinue = () => {
    // var formData = new FormData();
    // formData.append("db", file);
    // axiosInstance.post(CREATE_DB, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    // }).then(
    //   history.push('/mappings')
    // )
    axiosInstance.post(CREATE_DB, {hola: ''}, {
    });
  }
  const disabledMapping = !dbUploaded || !ontologyUploaded;
  return (
    <CardPage>
      <StepCard number={1} title={'Step 1 - Upload Ontologies'} description={'Upload your input ontologies in .owl'}>
        <Step1 inputLists={inputLists} setInputLists={setInputLists} setUploaded={setDbUploaded}/>
      </StepCard>
      <StepCard number={2} title={'Step 2 - Upload your Database'} description={'Upload your .sql for database'}>
        <Step2 file={file} setFile={setFile} setUploaded={setOntologyUploaded}/>
      </StepCard>
      <StepCard number={3} title={'Step 3 - Confirm your mappings'} description={'Click in the button to define your mappings'}>
        <Step3 disabledMapping={disabledMapping} handleContinue={handleContinue}/>
      </StepCard>
    </CardPage>
  );
};

export default Home;