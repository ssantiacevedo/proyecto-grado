import React from "react";
import styled from "styled-components";
import DownloadPage from "../../components/DownloadPage";
import StepCard from "../../components/StepCard";
import Spinner from "../../components/Spinner";
import DownloadCard from "../../components/DownloadCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";
import { palette } from "../../theme/palette";
import Graph from "react-graph-vis";

const Download = () => {
  const { getOntologyForDownload, loadingOntology, token } = useDataContext();

  const history = useHistory();

  if (!token) history.push("/login");

  const handleDownload = () => {
    getOntologyForDownload();
  };

  // los mapeados van con color verde
  // las obj property mapeadas van en verde y con width 2
  const graph = {
    nodes: [
      { id: 1, label: "Pizza", title: "node 1 tootip text" },
      {
        id: 2,
        label: "Topping",
        title: "node 2 tootip text",
        color: "#5dbb63",
      },
      { id: 3, label: "Node 3", color: "#5dbb63" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 4" },
      { id: 6, label: "Node 5", color: "#5dbb63" },
      { id: 7, label: "Node 5" },
      { id: 8, label: "Node 5" },
      { id: 9, label: "Node 5" },
      { id: 10, label: "Node 5" },
      { id: 11, label: "Node 5" },
      { id: 12, label: "Node 5" },
      {
        id: 13,
        label: "Node 5",
        title: "node 5 tootip text",
        color: "#5dbb63",
      },
    ],
    edges: [
      { from: 1, to: 2, label: "Object Prop 1" },
      { from: 1, to: 3 },
      { from: 2, to: 3, color: "#5dbb63", width: 2 },
      { from: 2, to: 5 },
      { from: 2, to: 10 },
      { from: 9, to: 6 },
      { from: 8, to: 7 },
    ],
  };

  const options = {
    edges: {
      color: "#000000",
      arrows: {
        to: false,
      },
      font: {
        face: "RobotoBold",
      },
    },
    nodes: {
      shape: "circle",
      color: "rgb(51, 102, 204)",
      margin: 5,
      font: {
        color: "white",
        face: "Roboto",
      },
    },
  };

  return (
    <DownloadPage>
      <StepCard
        number={1}
        title={"Download your extended context"}
        description={
          "Click on the download button to request and visualize your extended context"
        }
      >
        {loadingOntology ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <>
            <DownloadCard handleDownload={handleDownload} />
          </>
        )}
      </StepCard>
      {loadingOntology ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Graph graph={graph} options={options} />
      )}
    </DownloadPage>
  );
};

export default Download;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20rem;
  justify-content: center;
  width: 100%;
`;
