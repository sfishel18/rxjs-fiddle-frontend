import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import App from '../components/App';
import { useAtoms } from '../stores/atoms-store';

const AppContainer: React.FC = () => {
  const { editorStateAtom, editorStateSubmittedAtom } = useAtoms();
  const editorState = useRecoilValue(editorStateAtom);
  const setEditorStateSubmitted = useSetRecoilState(editorStateSubmittedAtom);
  const onRunFiddle = useCallback(() => setEditorStateSubmitted(editorState), [
    setEditorStateSubmitted,
    editorState,
  ]);
  return <App onRunFiddle={onRunFiddle} />;
};

export default AppContainer;
