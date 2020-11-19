import dedent from 'dedent';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import PrismDecorator from 'draft-js-prism';
import { once } from 'lodash';
import Prism from 'prismjs';
import React, { useContext } from 'react';
import { atom, RecoilRoot, selector } from 'recoil';
import { Api } from '../api';
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

const createAtoms = once((api: Api) => {
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

  const fiddleOutputSelector = selector<FiddleOutput | null>({
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
  });

  return {
    editorStateOptionsAtom,
    editorStateAtom,
    editorStateSubmittedAtom,
    fiddleOutputSelector,
  };
});

type Atoms = ReturnType<typeof createAtoms>;

const AtomsContext = React.createContext<Atoms>((null as unknown) as Atoms);

const AtomsStore: React.FC<{ api: Api }> = props => {
  const atoms = createAtoms(props.api);
  return (
    <RecoilRoot>
      <AtomsContext.Provider value={atoms}>{props.children}</AtomsContext.Provider>
    </RecoilRoot>
  );
};

export default AtomsStore;

export const useAtoms = () => useContext(AtomsContext);
