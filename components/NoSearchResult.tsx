import React from 'react';
import styled from 'styled-components';

interface NoSearchResultProps {}

const NoSearchResult: React.FC<NoSearchResultProps> = () => {
  return <StyledSection>Din sökning gav inget resultat!</StyledSection>;
};

export default NoSearchResult;

const StyledSection = styled.section`
  width: 100%;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;
