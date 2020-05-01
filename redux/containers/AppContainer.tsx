import React from 'react';
import { useDispatch } from 'react-redux';
import App from '../../components/App';
import { observableOutputActions } from '../modules/observable-output-module';

const AppContainer: React.FC = () => {
  const dispatch = useDispatch();
  const onRunFiddle = React.useCallback(() => dispatch(observableOutputActions.request()), [
    dispatch,
    observableOutputActions.request,
  ]);
  return <App onRunFiddle={onRunFiddle} />;
};

export default AppContainer;
