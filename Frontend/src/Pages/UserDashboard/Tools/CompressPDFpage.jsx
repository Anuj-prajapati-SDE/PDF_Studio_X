import React from 'react';
import DynamicPDFToolPage from '../Components/DynamicPDFToolPage';
import { compressConfig } from '../Components/PDFToolConfigs';

const CompressPDFPageDynamic = () => {
  return <DynamicPDFToolPage config={compressConfig} />;
};

export default CompressPDFPageDynamic;  