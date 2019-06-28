import { combineEpics } from 'redux-observable';
import codeInputEpic from './epics/code-input-epic';

export default combineEpics(codeInputEpic);
