import React, { useState } from "react";
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
        <GraphReference />
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
