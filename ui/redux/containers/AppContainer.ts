import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import App from '../../components/App';
import { counterActions, counterSelectors } from '../modules/counter-module';
import { CombinedState } from '../types';

const mapStateToProps = (state: CombinedState) => ({
  history: counterSelectors.getHistory(state.counter),
  value: counterSelectors.getValue(state.counter),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDecrement: (value: number) => dispatch(counterActions.decrement(value)),
  onIncrement: (value: number) => dispatch(counterActions.increment(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
