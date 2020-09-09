import * as React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  color: red;
`;

class OutputErrorBoundary extends React.Component<{}, { hasError: boolean; error: Error | null }> {
  public static getDerivedStateFromError(error: Error) {
    return {
      error,
      hasError: true,
    };
  }

  // public state: { hasError: boolean, error: Error | null } = { hasError: false, error: null };
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public render() {
    if (this.state.hasError && this.state.error !== null) {
      return (
        <StyledWrapper>
          <span>{this.state.error.message}</span>
        </StyledWrapper>
      );
    }
    return this.props.children;
  }
}

export default OutputErrorBoundary;
