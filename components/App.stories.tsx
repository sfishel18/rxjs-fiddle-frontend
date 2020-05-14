import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../redux/create-store';
import App from './App';

export default {
    decorators: [(storyFn: React.FC) => <Provider store={createStore()}>{storyFn({})}</Provider>],
    title: 'App',
 };

export const defaultState = () => <App onRunFiddle={noop} />;
