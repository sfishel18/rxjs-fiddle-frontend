import React from 'react';
import { useRecoilValue } from 'recoil';
import OutputViz from '../components/OutputViz';
import { useAtoms } from '../stores/atoms-store';

const OutputVizContainer: React.FC = () => {
  const { fiddleOutputSelector } = useAtoms();
  return <OutputViz output={useRecoilValue(fiddleOutputSelector)} />;
};

export default OutputVizContainer;
