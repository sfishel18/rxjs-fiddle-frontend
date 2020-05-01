import * as React from 'react';
import { useDispatch } from 'react-redux';
import App from '../../components/App';
import { observableOutputActions } from '../modules/observable-output-module';

export default () => {
  const dispatch = useDispatch();
  const onRunFiddle = React.useCallback(() => dispatch(observableOutputActions.request()), [
    dispatch,
    observableOutputActions.request,
  ]);
  return <App onRunFiddle={onRunFiddle} />;
};
