import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import App from '../../components/App';
import { codeInputActions, codeInputSelectors } from '../modules/code-input-module';
import { CombinedState } from '../types';

const mapStateToProps = (state: CombinedState) => ({
  editorState: codeInputSelectors.getEditorState(state.codeInput),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onEditorContentChange: editorState => dispatch(codeInputActions.updateEditorState(editorState)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
