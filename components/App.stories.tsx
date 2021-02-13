import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import mockApi from '../mocks/mock-api';
import ApiStore from '../stores/ApiStore';
import App from './App';

export default {
  decorators: [
    (storyFn: React.FC) => <RecoilRoot>{storyFn({})}</RecoilRoot>,
    (storyFn: React.FC) => <ApiStore api={mockApi}>{storyFn({})}</ApiStore>,
    (storyFn: React.FC) => <ChakraProvider>{storyFn({})}</ChakraProvider>,
  ],
  title: 'App',
};

export const defaultState = () => <App />;
