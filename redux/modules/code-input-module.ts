import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import PrismDecorator from 'draft-js-prism';
import Prism from 'prismjs';
import { ActionType, createStandardAction, getType } from 'typesafe-actions';

const prismDecorator = new PrismDecorator({
  defaultSyntax: 'javascript',
  prism: Prism,
});

const updateEditorState = createStandardAction('rxjs-fiddle/code-input/UPDATE_EDITOR_STATE')<
  EditorState
>();

export const codeInputActions = { updateEditorState };

export type CodeInputAction = ActionType<typeof codeInputActions>;

interface State {
  readonly editorState: EditorState;
}

const defaultState: State = {
  editorState: EditorState.createWithContent(
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
    prismDecorator,
  ),
};

export default (state: State = defaultState, action: CodeInputAction): State => {
  switch (action.type) {
    case getType(updateEditorState):
      return { ...state, editorState: action.payload };
    default:
      return state;
  }
};

const getEditorState = (state: State) => state.editorState;

const getEditorSource = (state: State) =>
  convertToRaw(state.editorState.getCurrentContent())
    .blocks.map(block => block.text)
    .join('\n');

export const codeInputSelectors = { getEditorState, getEditorSource };
