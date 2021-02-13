import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import 'prismjs/themes/prism-dark.css';
import React, { memo } from 'react';
import { ViewModel } from '../hooks/use-view-model';

type Props = Pick<ViewModel, 'editorState' | 'setEditorState'>;

const CodeEditor: MemoizedFC<Props> = memo(props => {
  return <Editor editorState={props.editorState} onChange={props.setEditorState} />;
});

export default CodeEditor;
