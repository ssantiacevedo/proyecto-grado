import React, { Fragment, useEffect } from "react";
import { Step2Container, Text, Input, Label } from "./Step2.styled";

const Step2 = ({
  setUploaded,
  dbName,
  setDbName,
  dbPass,
  setDbPass,
  dbUser,
  setDbUser,
}) => {

  useEffect(() => {
    if(dbName.length && dbPass.length && dbUser.length) {
      setUploaded(true);
    } else {
      setUploaded(false);
    }
  }, [dbName, dbPass, dbUser]);

  return (
    <Step2Container>
      <Text>Upload your Database</Text>
      <Fragment>
        <Label>Database Name</Label>
        <Input
          placeholder="Name"
          value={dbName}
          onChange={(e) => setDbName(e.target.value)}
        />
        <Label>Database User</Label>
        <Input
          placeholder="User"
          value={dbUser}
          onChange={(e) => setDbUser(e.target.value)}
        />
        <Label>Database Password</Label>
        <Input
          type="password"
          placeholder="Password"
          value={dbPass}
          onChange={(e) => setDbPass(e.target.value)}
        />
      </Fragment>
    </Step2Container>
  );
};

export default Step2;
