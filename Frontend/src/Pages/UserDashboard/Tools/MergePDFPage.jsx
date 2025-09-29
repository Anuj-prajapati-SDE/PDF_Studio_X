import React from 'react';
import DynamicPDFToolPage from '../Components/DynamicPDFToolPage';
// import { simplifiedMergeConfig } from '../Components/PDFToolConfigs';
import { mergeConfig } from '../Components/PDFToolConfigs';

const MergePDFPageDynamic = () => {
  

  return <DynamicPDFToolPage config={mergeConfig} />;
};

export default MergePDFPageDynamic;