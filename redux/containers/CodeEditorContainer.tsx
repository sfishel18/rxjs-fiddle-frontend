import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from '../../components/CodeEditor';
import { codeInputActions, codeInputSelectors } from '../modules/code-input-module';
import { CombinedState } from '../types';

const CodeEditorContainer: React.FC = () => {
  const editorState = useSelector((state: CombinedState) =>
    codeInputSelectors.getEditorState(state.codeInput),
  );
  const dispatch = useDispatch();
  const onChange = React.useCallback(
    newState => dispatch(codeInputActions.updateEditorState(newState)),
    [dispatch, codeInputActions.updateEditorState],
  );

  return <CodeEditor editorState={editorState} onChange={onChange} />;
};

export default CodeEditorContainer;
