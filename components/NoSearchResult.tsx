import React from 'react';
import styled from 'styled-components';

interface NoSearchResultProps {}

const NoSearchResult: React.FC<NoSearchResultProps> = () => {
  return <SearchSection>Din sökning gav inget resultat!</SearchSection>;
};

export default NoSearchResult;

const SearchSection = styled.section`
  width: 100%;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;
