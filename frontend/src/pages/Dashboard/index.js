import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../axios";
import DashboardPage from "../../components/DashboardPage";
import StepCard from "../../components/StepCard";
import Spinner from "../../components/Spinner";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";
import DashboardCard from "../../components/DashboardCard";

const Dashboard = () => {
  const { clearAllData, setMappedElements, setIsMapping, setStepsAmount, getMappingProcess, mappingProcess } = useDataContext();

  useEffect(() => {
    getMappingProcess();
  }, []);

  const history = useHistory();

  const handleCreateNew = () => {
    clearAllData();
    history.push("/home");
  };

  const handleLoad = () => {
    // setear todo lo que tengo de info 
    // ver el tema de setear files, uri y db connection
    history.push("/home");
  };
  
  console.log(mappingProcess);
  return (
    <DashboardPage>
      <StepCard
        expanded
        number={null}
        title={"Click an existing mapping to load it and edit it"}
      >
        <DashboardCard handleCreateNew={handleCreateNew} process={mappingProcess} />
      </StepCard>
    </DashboardPage>
  );
};

export default Dashboard;
