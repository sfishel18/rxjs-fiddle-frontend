import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import 'prismjs/themes/prism.css';
import * as React from 'react';

interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => any;
}

export default (props: Props) => {
  return <Editor editorState={props.editorState} onChange={props.onChange} />;
};
