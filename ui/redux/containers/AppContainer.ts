import App from "../../components/App";
import { actions } from "../modules/counter-module";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CombinedState } from "../combined-reducer";

const mapStateToProps = (state: CombinedState) => ({
  value: state.counter.value
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onIncrement: (value: number) => dispatch(actions.increment(value)),
  onDecrement: (value: number) => dispatch(actions.decrement(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
