import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import App from '../components/App';
import { useAtoms } from '../stores/atoms-store';

const AppContainer: React.FC = () => {
  const { editorStateAtom, editorStateSubmittedAtom, editorStateOptionsAtom } = useAtoms();

  const [editorState, setEditorState] = useRecoilState(editorStateAtom);
  const setEditorStateSubmitted = useSetRecoilState(editorStateSubmittedAtom);
  const onRunFiddle = useCallback(() => setEditorStateSubmitted(editorState), [
    setEditorStateSubmitted,
    editorState,
  ]);

  const editorStateExamples = useRecoilValue(editorStateOptionsAtom);
  const onExampleSelect = useCallback(
    (selectedId: string) => {
      const selectedExample = editorStateExamples.find(({ id }) => id === selectedId);
      if (selectedExample) {
        setEditorState(selectedExample.value);
      }
    },
    [editorStateExamples, setEditorState],
  );

  return (
    <App
      onRunFiddle={onRunFiddle}
      examples={editorStateExamples}
      onExampleSelect={onExampleSelect}
    />
  );
};

export default AppContainer;
