import React, { useState } from 'react';

import CardPage from '../../components/CardPage';
import StepCard from '../../components/StepCard';

import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import Step3 from '../../components/Step3';

const Home = () => {
  const [dbUploaded, setDbUploaded] = useState(false);
  const [ontologyUploaded, setOntologyUploaded] = useState(false);

  const disabledMapping = !dbUploaded || !ontologyUploaded;
  return (
    <CardPage>
      <StepCard number={1} title={'Step 1 - Upload Ontologies'} description={'Upload your input ontologies in .owl'}>
        <Step1 setUploaded={setDbUploaded}/>
      </StepCard>
      <StepCard number={2} title={'Step 2 - Upload your Database'} description={'Upload your .sql for database'}>
        <Step2 setUploaded={setOntologyUploaded}/>
      </StepCard>
      <StepCard number={3} title={'Step 3 - Confirm your mappings'} description={'Click in the button to define your mappings'}>
        <Step3 disabledMapping={disabledMapping}/>
      </StepCard>
    </CardPage>
  );
};

export default Home;