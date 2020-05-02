import { Grommet } from 'grommet';
import React from 'react';
import styled from 'styled-components';
import CodeEditorContainer from '../redux/containers/CodeEditorContainer';
import OutputVizContainer from '../redux/containers/OutputVizContainer';

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
    <div style={{ flex: '1 0 50% ' }}>
      <OutputVizContainer />
    </div>
  </StyledGrommet>
);

export default App;
