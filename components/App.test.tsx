import initStoryshots from '@storybook/addon-storyshots';
import React from 'react';

const mockReact = React;

jest.mock('../hooks/use-view-model', () => () => ({
  examples: [],
  submitEditorState: () => {},
}));

jest.mock('./CodeEditor', () => (props: {}) => mockReact.createElement('CodeEditor', props));
jest.mock('./OutputViz', () => (props: {}) => mockReact.createElement('OutputViz', props));

initStoryshots({
  storyKindRegex: /^App$/,
});
