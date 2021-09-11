import React from 'react';

import MappingPage from '../../components/MappingPage';
import StepCard from '../../components/StepCard';

import DBDataDisplay from '../../components/DBDataDisplay';
import OntoDataDisplay from '../../components/OntoDataDisplay';
import MappingList from '../../components/MappingList';
import { dataMapping } from '../../data/dummy';
import { useDataContext } from '../../context/Context';
import { useHistory } from 'react-router';

const Mappings = () => {
  const { ontologyElements, dbElements, loadingOntology, loadingDB, token } = useDataContext();
  const history = useHistory();

  if (!token) history.push("/login");

  return (
    <MappingPage>
      <StepCard expanded number={1} title={'Database Elements'} description={'Elements in the DB connection'}>
        <DBDataDisplay data={dbElements} />
      </StepCard>
      <StepCard expanded number={2} title={'Ontologies Elements'} description={'Elements in your .owls and URIs'}>
        <OntoDataDisplay data={ontologyElements} loading={loadingOntology} />
      </StepCard>
      <StepCard expanded number={3} title={'Your current mappings'} description={'Your actual mappings'}>
        <MappingList data={dataMapping} loading={loadingDB} />
      </StepCard>
    </MappingPage>
  );
};

export default Mappings;