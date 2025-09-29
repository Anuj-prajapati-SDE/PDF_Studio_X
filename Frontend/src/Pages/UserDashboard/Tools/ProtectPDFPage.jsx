import React from 'react';
import DynamicPDFToolPage from '../Components/DynamicPDFToolPage';
import {protectConfig } from '../Components/PDFToolConfigs';

const ProtectPDFPageDynamic = () => {
  return <DynamicPDFToolPage config={protectConfig} />;
};

export default ProtectPDFPageDynamic;