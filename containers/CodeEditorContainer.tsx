import React from 'react';
import { useRecoilState } from 'recoil';
import CodeEditor from '../components/CodeEditor';
import { useAtoms } from '../stores/atoms-store';

const CodeEditorContainer: React.FC = () => {
  const { editorStateAtom } = useAtoms();
  const [editorState, setEditorState] = useRecoilState(editorStateAtom);
  return <CodeEditor editorState={editorState} onChange={setEditorState} />;
};

export default CodeEditorContainer;
