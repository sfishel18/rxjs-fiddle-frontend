import React from 'react';
import { useSelector } from 'react-redux';
import OutputViz from '../../components/OutputViz';
import { observableOutputSelectors } from '../modules/observable-output-module';
import { CombinedState } from '../types';

const OutputVizContainer: React.FC = () => {
  const output = useSelector((state: CombinedState) =>
    observableOutputSelectors.getOutput(state.observableOutput),
  );
  return <OutputViz output={output} />;
};

export default OutputVizContainer;
