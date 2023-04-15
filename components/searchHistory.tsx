import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SearchHistoryProps {
  searches: string[];
  handleHistoryEvent: (oldSearch: string) => void;
  setShowHistory: (showHistory: boolean) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searches,
  handleHistoryEvent,
  setShowHistory,
}) => {
  return (
    <List>
      <h4>Senaste sökningarna:</h4>
      {searches.map((search) => (
        <ListText
          key={search}
          onClick={() => {
            handleHistoryEvent(search);
            setShowHistory(false);
          }}
        >
          {search}
        </ListText>
      ))}
    </List>
  );
};

export default SearchHistory;

const animateList = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const List = styled.div`
  position: absolute;
  width: 29rem;
  top: 2.8rem;
  margin-left: 0.5rem;
  padding: 1rem;
  z-index: 500;
  background-color: var(--color-white);
  animation: ${animateList} 0.5s forwards;
  h4 {
    padding-bottom: 0.5rem;
    text-align: left;
  }
`;

const ListText = styled.p`
  font-style: italic;
  text-align: left;
  padding-bottom: 0.2rem;
  cursor: pointer;
`;
