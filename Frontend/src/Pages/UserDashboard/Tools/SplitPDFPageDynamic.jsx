import React from 'react';
import DynamicPDFToolPage from '../Components/common/DynamicPDFToolPage';
import { splitConfig } from '../Components/common/PDFToolConfigs';

const SplitPDFPageDynamic = () => {
  return <DynamicPDFToolPage config={splitConfig} />;
};

export default SplitPDFPageDynamic;