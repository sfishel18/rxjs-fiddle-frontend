import * as React from 'react';

interface Props {
  value: number;
  history: number[];
  onIncrement: (value: number) => any;
  onDecrement: (value: number) => any;
}

export default class extends React.Component<Props> {
  public render() {
    return (
      <React.Fragment>
        <h1 onClick={this.onClick}>Hi there...</h1>
        <h3>Visits: {this.props.value}</h3>
        <p>{this.props.history.join(', ')}</p>
      </React.Fragment>
    );
  }

  private onClick: React.MouseEventHandler = e => {
    if (e.metaKey) {
      this.props.onDecrement(1);
    } else {
      this.props.onIncrement(1);
    }
  };
}
