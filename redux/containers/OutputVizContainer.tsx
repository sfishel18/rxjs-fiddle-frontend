import React from 'react';
import OutputViz from '../../components/OutputViz';
import useResource from '../hooks/use-resource';
import { observableOutputSelectors } from '../modules/observable-output-module';

const OutputVizContainer: React.FC = () => {
  const outputResource = useResource(
    state => observableOutputSelectors.getOutput(state.observableOutput),
  );
  return <OutputViz output={outputResource ? outputResource.read() : null} />;
};

export default OutputVizContainer;
