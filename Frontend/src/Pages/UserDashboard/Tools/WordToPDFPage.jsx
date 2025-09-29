import React from 'react';
import DynamicPDFToolPage from '../Components/DynamicPDFToolPage';
import { wordToPDFConfig } from '../Components/PDFToolConfigs';

const WordToPDFPageDynamic = () => {
  return <DynamicPDFToolPage config={wordToPDFConfig} />;
};

export default WordToPDFPageDynamic;