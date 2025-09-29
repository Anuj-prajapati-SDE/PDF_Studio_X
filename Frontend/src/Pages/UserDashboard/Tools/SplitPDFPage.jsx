import React from 'react';
import DynamicPDFToolPage from '../Components/DynamicPDFToolPage';
import { splitConfig } from '../Components/PDFToolConfigs';

const SplitPDFPageDynamic = () => {
  return <DynamicPDFToolPage config={splitConfig} />;
};

export default SplitPDFPageDynamic; 