import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DownloadPage from "../../components/DownloadPage";
import StepCard from "../../components/StepCard";
import Spinner from "../../components/Spinner";
import DownloadCard from "../../components/DownloadCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";
import { v4 as uuidv4 } from "uuid";
import { palette } from "../../theme/palette";
import Graph from "react-graph-vis";

const Download = () => {
  const { getOntologyForDownload, loadingOntology, token, graph, file } =
    useDataContext();
  const [simulation, setSimulation] = useState(false);
  const history = useHistory();

  if (!token) history.push("/login");

  const handleDownload = () => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "OntologyGenerated.owl");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const graphToShow = graph
    ? {
        nodes: graph?.nodes,
        edges: graph?.edges,
      }
    : null;

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

  return (
    <DownloadPage>
      <div>
        <CardContainer>
          <Title>Download and preview your extended context</Title>
          <SubTitle>
            Click on the download button to request and visualize your extended
            context
          </SubTitle>
          <DownloadCard
            loading={loadingOntology}
            handleDownload={handleDownload}
          />
          {graphToShow && !loadingOntology && (
            <ToggleButton
              style={{ marginTop: "5rem" }}
              onClick={() => setSimulation(!simulation)}
            >
              Toggle Animation
            </ToggleButton>
          )}
        </CardContainer>

        <StyledCardContainer>
          <ReferenceTitle>Reference table:</ReferenceTitle>
          <ReferenceContainer>
            <MappedClass />
            <Label>Mapped Class</Label>
          </ReferenceContainer>
          <ReferenceContainer>
            <NotMappedClass />
            <Label>Not Mapped Class</Label>
          </ReferenceContainer>
          <ReferenceContainer>
            <MappedProperties />
            <Label>Mapped Property</Label>
          </ReferenceContainer>
          <ReferenceContainer>
            <NotMappedProperties />
            <Label>Not Mapped Property</Label>
          </ReferenceContainer>
          <ReferenceContainer>
            <DataProperties />
            <Label>Data Property Range</Label>
          </ReferenceContainer>
          <ReferenceContainer>
            <SubClass />
            <Label>SubClass</Label>
          </ReferenceContainer>
          <ReferenceContainer>
            <TotalMappingSameAs />
            <Label>TotalMappingSameAs</Label>
          </ReferenceContainer>
        </StyledCardContainer>
      </div>

      {loadingOntology ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        graphToShow && (
          <>
            <Graph key={uuidv4()} graph={graphToShow} options={options} />
          </>
        )
      )}
    </DownloadPage>
  );
};

export default Download;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 7rem;
  justify-content: center;
  width: 100%;
  margin: auto;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0.5%;
  margin-top: 4rem;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 50px 10px;
  overflow-y: hidden;
  height: fit-content;
  max-height: 80vh;
`;

const Title = styled.div`
  font-family: "RobotoBold";
  font-size: 18px;
  text-align: center;
`;

const SubTitle = styled.div`
  font-family: "Roboto";
  font-size: 15px;
  text-align: center;
  margin-top: 10px;
  color: ${palette.black};
`;

const ToggleButton = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 40px;
  width: 90%;
  margin: 0 auto;
  max-width: 200px;
  margin-top: 20px;
  background-color: white;
  color: ${palette.alpha600};
  border: 1px solid ${palette.alpha600};
`;

const ReferenceContainer = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  grid-template-columns: 1.5rem 1fr;
  grid-column-gap: 20px;
`;

const MappedClass = styled.div`
  height: 15px;
  background-color: #5dbb63;
  border-radius: 5px;
`;

const NotMappedClass = styled.div`
  height: 15px;
  background-color: rgb(51, 102, 204);
  border-radius: 5px;
`;

const MappedProperties = styled.div`
  height: 2px;
  background-color: #5dbb63;
`;

const NotMappedProperties = styled.div`
  height: 2px;
  background-color: black;
`;

const DataProperties = styled.div`
  height: 15px;
  background-color: #ffff00;
  border-radius: 5px;
`;

const SubClass = styled.div`
  border: 1px dashed black;
`;

const ReferenceTitle = styled.span`
  margin-bottom: 5px;
`;

const TotalMappingSameAs = styled.div`
  height: 2px;
  background-color: #CC5500;
`;

const StyledCardContainer = styled(CardContainer)`
  padding: 10px;
`;

const Label = styled.span`
  font-family: "Roboto";
  font-size: 15px;
  text-align: left;
  color: ${palette.black};
`;