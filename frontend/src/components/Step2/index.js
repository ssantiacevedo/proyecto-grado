import React, { Fragment, useEffect } from "react";
import { Step2Container, Text, Input, Label } from "./Step2.styled";
import { palette } from "../../theme/palette";

const Step2 = ({
  setUploaded,
  dbName,
  setDbName,
  dbPort,
  setDbPort,
  dbPass,
  setDbPass,
  dbUser,
  setDbUser,
}) => {
  useEffect(() => {
    if (dbName.length && dbPass.length && dbUser.length) {
      setUploaded(true);
    } else {
      setUploaded(false);
    }
  }, [dbName, dbPass, dbUser, dbPort]);

  return (
    <Step2Container>
      <Fragment>
        <Label>
          Database Name <span style={{ color: palette.darkRed }}>*</span>
        </Label>
        <Input
          placeholder="Name"
          value={dbName}
          onChange={(e) => setDbName(e.target.value)}
          required
        />
        <Label>Database Port</Label>
        <Input
          placeholder="5432"
          value={dbPort}
          type="number"
          onChange={(e) => setDbPort(e.target.value)}
        />
        <Label>
          Database User <span style={{ color: palette.darkRed }}>*</span>
        </Label>
        <Input
          placeholder="User"
          value={dbUser}
          onChange={(e) => setDbUser(e.target.value)}
          required
        />
        <Label>
          Database Password <span style={{ color: palette.darkRed }}>*</span>
        </Label>
        <Input
          type="password"
          placeholder="Password"
          value={dbPass}
          onChange={(e) => setDbPass(e.target.value)}
          required
        />
      </Fragment>
    </Step2Container>
  );
};

export default Step2;
