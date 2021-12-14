import React, { useState, useMemo } from "react";
import styled from "styled-components";
import DownloadPage from "../../components/DownloadPage";
import Spinner from "../../components/Spinner";
import DownloadCard from "../../components/DownloadCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";
import { v4 as uuidv4 } from "uuid";
import {
  SpinnerContainer,
  CardContainer,
  Title,
  SubTitle,
  ToggleButton,
} from "./Download.styled";
import Graph from "react-graph-vis";
import GraphReference from "./GraphReference";

const Download = () => {
  const { loadingOntology, token, graph, file } = useDataContext();
  const [simulation, setSimulation] = useState(false);
  const [network, setNetwork] = useState(null);
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

  const handleZoomIn = () => {
    network.moveTo({
      scale: network.getScale() + 0.2,
      animation: {
        duration: 300,
        easingFunction: "easeInOutQuad",
      },
    });
  };

  const handleZoomOut = () => {
    network.moveTo({
      scale: network.getScale() - 0.2,
      animation: {
        duration: 300,
        easingFunction: "easeInOutQuad",
      },
    });
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

  const graphComponent = useMemo(
    () => (
      <Graph
        key={uuidv4()}
        graph={graphToShow}
        options={options}
        getNetwork={(network) => setNetwork(network)}
      />
    ),
    [graph]
  );

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
        <GraphReference />
      </div>

      {loadingOntology ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        graphToShow && (
          <>
            {graphComponent}
            <ZoomContainer>
              <ZoomInButton onClick={handleZoomIn}>+</ZoomInButton>
              <ZoomOutButton onClick={handleZoomOut}>-</ZoomOutButton>
            </ZoomContainer>
          </>
        )
      )}
    </DownloadPage>
  );
};

export default Download;

export const ZoomContainer = styled.div`
  padding: 10px;
  position: absolute;
  cursor: pointer;
  bottom: 62px;
  right: 10px;
  flex-direction: column;
  display: flex;
  z-index: 10001;
`;

export const ZoomInButton = styled.button`
  padding: 10px;
  cursor: pointer;
  z-index: 10001;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  touch-action: manipulation;
  border: 1px solid #004a82;
  color: #004a82;
`;

export const ZoomOutButton = styled.button`
  padding: 10px;
  cursor: pointer;
  z-index: 10001;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  touch-action: manipulation;
  border: 1px solid #004a82;
  color: #004a82;
`;
