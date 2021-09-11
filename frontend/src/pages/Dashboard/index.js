import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DashboardPage from "../../components/DashboardPage";
import StepCard from "../../components/StepCard";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../context/Context";
import DashboardCard from "../../components/DashboardCard";

const Dashboard = () => {
  const { clearAllData, getMappingProcess, mappingProcess, getMappingProcessDetail, setUuid, token } = useDataContext();
  const history = useHistory();

  if (!token) history.push("/login");

  useEffect(() => {
    getMappingProcess();
  }, []);


  const handleCreateNew = () => {
    clearAllData();
    const uuidV4 = uuidv4();
    setUuid(uuidV4);
    history.push("/home");
  };

  const handleLoad = (uuid) => {
    getMappingProcessDetail(uuid);
  };
  
  return (
    <DashboardPage>
      <StepCard
        expanded
        number={null}
        title={"Click an existing mapping to load it and edit it"}
      >
        <DashboardCard handleLoad={handleLoad} handleCreateNew={handleCreateNew} processes={mappingProcess} />
      </StepCard>
    </DashboardPage>
  );
};

export default Dashboard;
