import React from 'react';
import DynamicPDFToolPage from '../Components/common/DynamicPDFToolPage';
import { mergeConfig } from '../Components/common/PDFToolConfigs';

const MergePDFPageDynamic = () => {
  return <DynamicPDFToolPage config={mergeConfig} />;
};

export default MergePDFPageDynamic;