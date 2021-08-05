import React from 'react';

import MappingPage from '../../components/MappingPage';
import StepCard from '../../components/StepCard';

import DBDataDisplay from '../../components/DBDataDisplay';
import OntoDataDisplay from '../../components/OntoDataDisplay';

import { useDataContext } from '../../context/Context';

const Mappings = () => {
  const { ontologyElements, dbElements } = useDataContext();

  return (
    <MappingPage>
      <StepCard expanded number={1} title={'Database Elements'} description={'Upload your input ontologies in .owl'}>
        <DBDataDisplay data={dbElements} />
      </StepCard>
      <StepCard expanded number={2} title={'Ontologies Elements'} description={'Upload your .sql for database'}>
        <OntoDataDisplay data={ontologyElements}/>
      </StepCard>
    </MappingPage>
  );
};

export default Mappings;