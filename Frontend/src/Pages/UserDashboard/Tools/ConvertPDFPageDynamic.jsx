import React from 'react';
import DynamicPDFToolPage from '../Components/DynamicPDFToolPage';
import { convertConfig } from '../Components/PDFToolConfigs';

const ConvertPDFPageDynamic = () => {
  return <DynamicPDFToolPage config={convertConfig} />;
};

export default ConvertPDFPageDynamic;