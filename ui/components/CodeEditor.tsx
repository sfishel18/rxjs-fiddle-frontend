import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import 'prismjs/themes/prism.css';
import * as React from 'react';

interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => any;
}

export default class extends React.Component<Props> {
  public render() {
    return <Editor editorState={this.props.editorState} onChange={this.onChange} />;
  }

  private onChange = (editorState: EditorState) => this.props.onChange(editorState);
}
