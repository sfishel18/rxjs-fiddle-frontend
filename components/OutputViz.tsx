import * as React from 'react';

interface Props {
  output: any[];
}

export default class extends React.Component<Props> {
  public render() {
    return <pre>{JSON.stringify(this.props.output, null, 2)}</pre>;
  }
}
