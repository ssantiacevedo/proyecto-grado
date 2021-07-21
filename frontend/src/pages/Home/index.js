import React from 'react';

import CardPage from '../../components/CardPage';
import StepCard from '../../components/StepCard';

import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';

const Home = () => (
  <CardPage>
    <StepCard number={1} title={'Step 1 - Upload Ontologies'} description={'Upload your input ontologies in .owl'}>
      <Step1 />
    </StepCard>
    <StepCard number={2} title={'Step 2 - Upload your Database'} description={'Upload your .sql for database'}>
      <Step2 />
    </StepCard>
    <StepCard number={3} title={'Step 3 - Confirm your mappings'} description={'Click in the button to define your mappings'}/>
  </CardPage>
);

export default Home;