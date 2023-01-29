import React from 'react';
import styled from 'styled-components';

interface NoSearchResultProps {}

const NoSearchResult: React.FC<NoSearchResultProps> = () => {
  return <StyledSection>Hittade inget sökresultat!</StyledSection>;
};

export default NoSearchResult;

const StyledSection = styled.section`
  width: 100%;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
