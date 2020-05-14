import initStoryshots from '@storybook/addon-storyshots';
import React from 'react';

jest.mock(
    '../redux/containers/CodeEditorContainer',
    () => (props: {}) => <div data-mock="CodeEditorContainer" {...props} />,
);
jest.mock(
    '../redux/containers/OutputVizContainer',
    () => (props: {}) => <div data-mock="OutputVizContainer" {...props} />,
);

initStoryshots({
  storyKindRegex: /^App$/,
});
