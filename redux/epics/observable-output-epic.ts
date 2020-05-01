import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { codeInputSelectors } from '../modules/code-input-module';
import {
  ObservableOutputAction,
  observableOutputActions,
} from '../modules/observable-output-module';
import { ModuleEpic } from '../types';

const fetchOutputEpic: ModuleEpic<ObservableOutputAction> = (action$, state$, services) =>
  action$.pipe(
    filter(isActionOf(observableOutputActions.request)),
    withLatestFrom(state$),
    map(([, state]) => codeInputSelectors.getEditorSource(state.codeInput)),
    switchMap(code =>
      services.fetchFiddleOutput(code).pipe(
        map(output => observableOutputActions.receiveSuccess(output)),
        catchError(err => of(observableOutputActions.receiveError(err.message))),
      ),
    ),
  );

export default fetchOutputEpic;
