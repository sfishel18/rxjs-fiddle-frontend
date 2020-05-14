import { Editor, EditorState } from 'draft-js';
// TODO these next two imports break storybook
import 'draft-js/dist/Draft.css';
import 'prismjs/themes/prism.css';
import React from 'react';

interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const CodeEditor: React.FC<Props> = props => {
  return <Editor editorState={props.editorState} onChange={props.onChange} />;
};

export default CodeEditor;
