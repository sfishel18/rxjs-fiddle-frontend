import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import PrismDecorator from 'draft-js-prism';
import { once } from 'lodash';
import Prism from 'prismjs';
import React, { useContext } from 'react';
import { atom, selector } from 'recoil';
import { Api } from '../api';
import { FiddleOutput } from '../types';

const prismDecorator = new PrismDecorator({
  defaultSyntax: 'javascript',
  prism: Prism,
});

const createAtoms = once((api: Api) => {
  const editorStateAtom = atom<EditorState>({
    default: EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
            key: '',
            text: `interval(1000).pipe(
            take(4),
            map(x => {
            if (x > 2) {
                throw new Error("oh noes");
            }
            return x * 10;
            })
        )
        .subscribe(
            x => console.log(x)
        );`,
            type: 'code-block',
          },
        ],
        entityMap: {},
      }),
      // tslint:disable-next-line:no-any
      prismDecorator as any,
    ),
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

  return { editorStateAtom, editorStateSubmittedAtom, fiddleOutputSelector };
});

type Atoms = ReturnType<typeof createAtoms>;

const AtomsContext = React.createContext<Atoms>((null as unknown) as Atoms);

const AtomsStore: React.FC<{ api: Api }> = props => {
  const atoms = createAtoms(props.api);
  return <AtomsContext.Provider value={atoms}>{props.children}</AtomsContext.Provider>;
};

export default AtomsStore;

export const useAtoms = () => useContext(AtomsContext);
