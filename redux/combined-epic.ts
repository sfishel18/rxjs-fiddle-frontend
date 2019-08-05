import { combineEpics } from 'redux-observable';
import observableOutputEpic from './epics/observable-output-epic';

export default combineEpics(observableOutputEpic);
