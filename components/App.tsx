import * as React from 'react';
import CodeEditorContainer from '../redux/containers/CodeEditorContainer';
import OutputVizContainer from '../redux/containers/OutputVizContainer';

interface Props {
  onRunFiddle: () => any;
}

export default class extends React.Component<Props> {
  public render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1 0 50% ', display: 'flex', flexDirection: 'column' }}>
          <div>
            <button onClick={this.props.onRunFiddle}>Run</button>
          </div>
          <CodeEditorContainer />
        </div>
        <div style={{ flex: '1 0 50% ' }}>
          <OutputVizContainer />
        </div>
      </div>
    );
  }
}
