import React, { useState } from "react";
import styled from "styled-components";
import CardPage from "../../components/CardPage";
import StepCard from "../../components/StepCard";
import Spinner from "../../components/Spinner";
import DownloadCard from "../../components/DownloadCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";

const Download = () => {
  const { getOntologyForDownload, loadingOntology } = useDataContext();

  const history = useHistory();

  const handleDownload = () => {
    getOntologyForDownload();
  };

  return (
    <CardPage>
      <div />
      <StepCard
        number={1}
        title={"Download your extended ontology"}
        description={"Click on the download button to request your ontology"}
      >
        {loadingOntology ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <DownloadCard handleDownload={handleDownload} />
        )}
        <div />
      </StepCard>
    </CardPage>
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
