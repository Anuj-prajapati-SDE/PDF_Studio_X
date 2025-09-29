import React from 'react';
import DynamicPDFToolPage from '../Components/DynamicPDFToolPage';
import { createPDFConfig } from '../Components/PDFToolConfigs';

const CreatePDFDynamicPage = () => {
  return <DynamicPDFToolPage config={createPDFConfig} />;
};

export default CreatePDFDynamicPage;