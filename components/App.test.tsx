import initStoryshots from '@storybook/addon-storyshots';
import React from 'react';

const mockReact = React;

jest.mock(
    '../redux/containers/CodeEditorContainer',
    () => (props: {}) => mockReact.createElement('CodeEditorContainer', props),
);
jest.mock(
    '../redux/containers/OutputVizContainer',
    () => (props: {}) => mockReact.createElement('OutputVizContainer', props),
);

initStoryshots({
  storyKindRegex: /^App$/,
});
