import { connect } from 'react-redux';
import OutputViz from '../../components/OutputViz';
import { observableOutputSelectors } from '../modules/observable-output-module';
import { CombinedState } from '../types';

const mapStateToProps = (state: CombinedState) => ({
  output: observableOutputSelectors.getOutput(state.observableOutput),
});

export default connect(mapStateToProps)(OutputViz);
