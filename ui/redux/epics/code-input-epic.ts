import { filter, ignoreElements } from 'rxjs/operators';
import { isActionOf } from '../../../node_modules/typesafe-actions';
import { CodeInputAction, codeInputActions } from '../modules/code-input-module';
import { ModuleEpic } from '../types';

const codeInputEpic: ModuleEpic<CodeInputAction> = action$ =>
  action$.pipe(
    filter(isActionOf(codeInputActions.updateEditorState)),
    ignoreElements(),
  );

export default codeInputEpic;
