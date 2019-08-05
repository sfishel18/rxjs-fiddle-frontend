import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import App from '../../components/App';
import { observableOutputActions } from '../modules/observable-output-module';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRunFiddle() {
    dispatch(observableOutputActions.request());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
