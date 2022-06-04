import React from 'react';
import Header from '../Header';

import { Wizard, WizardPage, WizardCard } from './DownloadPage.styled';

const Page  = ({
  children,
  cardWidth,
}) => {
  return (
    <Wizard>
      <Header />
      <WizardPage>
        <WizardCard width={cardWidth}>{children}</WizardCard>
      </WizardPage>
    </Wizard>
  );
};

export default Page;