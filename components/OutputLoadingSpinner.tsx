import styled from '@emotion/styled';
import React from 'react';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const OutputLoadingSpinner: React.FC = () => (
  <StyledWrapper>
    <span>Loading...</span>
  </StyledWrapper>
);

export default OutputLoadingSpinner;
