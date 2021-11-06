import React, { useState } from "react";
import styled from "styled-components";
import MappingPage from "../../components/MappingPage";
import StepCard from "../../components/StepCard";

import DBDataDisplay from "../../components/DBDataDisplay";
import OntoDataDisplay from "../../components/OntoDataDisplay";
import MappingList from "../../components/MappingList";
import Spinner from "../../components/Spinner";
import { dataMapping } from "../../data/dummy";
import { useDataContext } from "../../context/Context";
import { useHistory } from "react-router";
import Graph from "react-graph-vis";
import { palette } from "../../theme/palette";
import { v4 as uuidv4 } from "uuid";
import GraphReference from "../Download/GraphReference";
import { SpinnerContainer } from "../Download/Download.styled";

const Mappings = () => {
  const {
    ontologyElements,
    dbElements,
    loadingOntology,
    loadingOntologyGraph,
    loadingDB,
    token,
    graphToShow,
    showGraphModal,
    setShowGraphModal,
    setGraphToShow,
  } = useDataContext();

  const history = useHistory();
  const [simulation, setSimulation] = useState(false);

  const options = {
    edges: {
      color: "#000000",
      arrows: {
        to: false,
      },
      font: {
        face: "RobotoBold",
      },
      length: 250,
    },
    nodes: {
      shape: "box",
      color: "rgb(51, 102, 204)",
      margin: 6,
      physics: simulation,
      font: {
        color: "white",
        face: "Roboto",
      },
    },
  };

  if (!token) history.push("/login");

  return (
    <MappingPage>
      <StepCard
        expanded
        number={1}
        title={"Database Elements"}
        description={"Elements in the DB connection"}
      >
        <DBDataDisplay data={dbElements} />
      </StepCard>
      <StepCard
        expanded
        number={2}
        title={"Context Elements"}
        description={"Elements in your .owls and URIs"}
      >
        <OntoDataDisplay data={ontologyElements} loading={loadingOntology} />
      </StepCard>
      <StepCard
        expanded
        number={3}
        title={"Current Mappings"}
        description={"Your actual mappings"}
      >
        <MappingList data={dataMapping} loading={loadingDB} />
      </StepCard>
      <Modal show={showGraphModal}>
        <Container>
          <Cross
            onClick={() => {
              setShowGraphModal(false);
              setGraphToShow(null);
            }}
          >
            X
          </Cross>
          <LeftContainer>
            <ToggleButton onClick={() => setSimulation(!simulation)}>
              Toggle animation
            </ToggleButton>
            <GraphReference mappingProcess />
          </LeftContainer>
          {loadingOntologyGraph ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : (
            graphToShow && (
              <Graph key={uuidv4()} graph={graphToShow} options={options} />
            )
          )}
        </Container>
      </Modal>
    </MappingPage>
  );
};

export default Mappings;

export const Modal = styled.div`
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  position: fixed;
  z-index: 800;
  background: white;
  height: 85vh;
  width: 80vw;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 0.75rem;
  overflow: hidden;
  color: rgba(0, 0, 139, 0.7);
  display: flex;
`;

export const Cross = styled.span`
  padding: 10px;
  position: absolute;
  top: 10px;
  cursor: pointer;
  right: 10px;
  z-index: 10001;
`;

const ToggleButton = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 40px;
  width: 90%;
  max-width: 200px;
  background-color: white;
  color: ${palette.alpha600};
  border: 1px solid ${palette.alpha600};
`;

const LeftContainer = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  justify-content: space-between;
`;
