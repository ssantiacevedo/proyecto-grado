import React from 'react';

import MappingPage from '../../components/MappingPage';
import StepCard from '../../components/StepCard';

import DBDataDisplay from '../../components/DBDataDisplay';
import OntoDataDisplay from '../../components/OntoDataDisplay';
import MappingList from '../../components/MappingList';
import { dataMapping } from '../../data/dummy';
import { useDataContext } from '../../context/Context';

const Mappings = () => {
  const { ontologyElements, dbElements, loadingOntologyUri, loadingOntologyFile, loadingDB } = useDataContext();
  const loading = loadingOntologyUri || loadingOntologyFile;
  return (
    <MappingPage>
      <StepCard expanded number={1} title={'Database Elements'} description={'Elements in your .owls and URIs'}>
        <DBDataDisplay data={dbElements} />
      </StepCard>
      <StepCard expanded number={2} title={'Ontologies Elements'} description={'Elements in the DB connection'}>
        <OntoDataDisplay data={ontologyElements} loading={loading} />
      </StepCard>
      <StepCard expanded number={3} title={'Your current mappings'} description={'Your actual mappings'}>
        <MappingList data={dataMapping} loading={loadingDB} />
      </StepCard>
    </MappingPage>
  );
};

export default Mappings;