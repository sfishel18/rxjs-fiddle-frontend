import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import PrismDecorator from 'draft-js-prism';
import { once } from 'lodash';
import Prism from 'prismjs';
import { useCallback } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { Api } from '../api';
import { useApi } from '../stores/ApiStore';
import { FiddleOutput } from '../types';

// tslint:disable-next-line: no-var-requires
const simpleExampleText = require('raw-loader!./sample-editor-states/simple-with-error.js').default;
// tslint:disable-next-line: no-var-requires
const mergingExampleText = require('raw-loader!./sample-editor-states/merging-example.js').default;

const prismDecorator = new PrismDecorator({
  defaultSyntax: 'javascript',
  prism: Prism,
});

const createEditorState = (text: string) =>
  EditorState.createWithContent(
    convertFromRaw({
      blocks: [
        {
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '',
          text,
          type: 'code-block',
        },
      ],
      entityMap: {},
    }),
    // tslint:disable-next-line:no-any
    prismDecorator as any,
  );

const editorStateExamples = [
  {
    label: 'Simple Example',
    id: 'simple-example',
    value: createEditorState(simpleExampleText),
  },
  {
    label: 'Merging Example',
    id: 'merging-example',
    value: createEditorState(mergingExampleText),
  },
];

const editorStateOptionsAtom = atom({
  default: editorStateExamples,
  key: 'editor-state-examples',
});

const editorStateAtom = atom<EditorState>({
  default: editorStateExamples[0].value,
  key: 'editor-state',
});

const editorStateSubmittedAtom = atom<EditorState | null>({
  default: null,
  key: 'editor-state-submitted',
});

const getFiddleOutputSelector = once((api: Api) =>
  selector<FiddleOutput | null>({
    get: async ({ get }) => {
      const fiddleSource = get(editorStateSubmittedAtom);
      if (!fiddleSource) {
        return null;
      }
      return await api.fetchFiddleOutput(
        convertToRaw(fiddleSource.getCurrentContent())
          .blocks.map(block => block.text)
          .join('\n'),
      );
    },
    key: 'fiddle-output',
  }),
);

const useViewModel = () => {
  const api = useApi();
  const [editorState, setEditorState] = useRecoilState(editorStateAtom);
  const setEditorStateSubmitted = useSetRecoilState(editorStateSubmittedAtom);
  const examples = useRecoilValue(editorStateOptionsAtom);
  const fiddleOutputLoadable = useRecoilValueLoadable(getFiddleOutputSelector(api));

  const submitEditorState = useCallback(() => setEditorStateSubmitted(editorState), [
    setEditorStateSubmitted,
    editorState,
  ]);
  const selectExample = useCallback(
    (selectedId: string) => {
      const selectedExample = examples.find(({ id }) => id === selectedId);
      if (selectedExample) {
        setEditorState(selectedExample.value);
      }
    },
    [examples, setEditorState],
  );

  return {
    editorState,
    setEditorState,
    setEditorStateSubmitted,
    examples,
    submitEditorState,
    selectExample,
    fiddleOutputLoadable,
  };
};

export type ViewModel = ReturnType<typeof useViewModel>;

export default useViewModel;
