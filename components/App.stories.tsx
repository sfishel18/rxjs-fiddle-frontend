import { noop } from 'lodash';
import React from 'react';
import mockApi from '../mocks/mock-api';
import AtomsStore from '../stores/atoms-store';
import App from './App';

export default {
  decorators: [(storyFn: React.FC) => <AtomsStore api={mockApi}>{storyFn({})}</AtomsStore>],
  title: 'App',
};

export const defaultState = () => <App onRunFiddle={noop} />;
