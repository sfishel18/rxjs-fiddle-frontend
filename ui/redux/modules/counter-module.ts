import { createStandardAction, ActionType, getType } from "typesafe-actions";

const increment = createStandardAction("rxjs-fiddle/counter/INCREMENT")<
  number
>();

const decrement = createStandardAction("rxjs-fiddle/counter/DECREMENT")<
  number
>();

export const actions = { increment, decrement };

type Action = ActionType<typeof actions>;

interface State {
  readonly value: number;
}

const defaultState: State = { value: 0 };

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case getType(increment):
      return { ...state, value: state.value + action.payload };
    case getType(decrement):
      return { ...state, value: state.value - action.payload };
    default:
      return state;
  }
};
