import { ContentState, EditorState } from 'draft-js';
import * as React from 'react';
import CodeEditor from './CodeEditor';

interface Props {
  editorState: EditorState;
  onEditorContentChange: (content: EditorState) => any;
}

export default class extends React.Component<Props> {
  public render() {
    return (
      <div style={{ height: 500 }}>
        <CodeEditor
          editorState={this.props.editorState}
          onChange={this.props.onEditorContentChange}
        />
      </div>
    );
  }
}
