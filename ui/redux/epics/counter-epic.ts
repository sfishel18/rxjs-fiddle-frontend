import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import {
  CounterAction,
  counterActions,
  counterSelectors,
} from '../modules/counter-module';
import { ModuleEpic } from '../types';

const contrivedEpic: ModuleEpic<CounterAction> = (action$, state$, { log }) =>
  action$.pipe(
    filter(isActionOf(counterActions.increment)),
    withLatestFrom(state$),
    tap(([action, state]) =>
      log(
        `you incremented by ${
          action.payload
        } when the value was ${counterSelectors.getValue(state.counter)}`,
      ),
    ),
    map(([, state]) =>
      counterActions.pushToHistory(counterSelectors.getValue(state.counter)),
    ),
  );

export default contrivedEpic;
