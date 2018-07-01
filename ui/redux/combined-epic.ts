import { combineEpics } from 'redux-observable';
import counterEpic from './epics/counter-epic';

export default combineEpics(counterEpic);
