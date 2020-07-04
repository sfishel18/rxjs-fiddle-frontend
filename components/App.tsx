import { Grommet } from 'grommet';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import CodeEditorContainer from '../redux/containers/CodeEditorContainer';
import OutputVizContainer from '../redux/containers/OutputVizContainer';
import OutputErrorBoundary from './OutputErrorBoundary';
import OutputLoadingSpinner from './OutputLoadingSpinner';

interface Props {
  onRunFiddle: () => void;
}

const StyledGrommet = styled(Grommet)`
  display: flex;
`;

const App: React.FC<Props> = props => (
  <StyledGrommet plain>
    <div style={{ flex: '1 0 50% ', display: 'flex', flexDirection: 'column' }}>
      <div>
        <button onClick={props.onRunFiddle}>Run</button>
      </div>
      <CodeEditorContainer />
    </div>
    <div style={{ flex: '1 0 50%', position: 'relative' }}>
      <Suspense fallback={<OutputLoadingSpinner />}>
        <OutputErrorBoundary>
          <OutputVizContainer />
        </OutputErrorBoundary>
      </Suspense>
    </div>
  </StyledGrommet>
);

export default App;
