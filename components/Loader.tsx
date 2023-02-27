import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <StyledContainer>
      <StyledLoader></StyledLoader>
    </StyledContainer>
  );
};

export default Loader;

const KeyframesSpinner = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLoader = styled.div`
width: 3rem;
height: 3rem;
border-top: 0.1rem solid rgb(20, 20, 20);
border-radius: 50%;
transition: all;
animation: ${KeyframesSpinner} 1s linear infinite;
}
`;
