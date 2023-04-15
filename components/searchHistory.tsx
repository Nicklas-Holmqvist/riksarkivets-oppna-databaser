import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface SearchesProps {
  value: string;
  count: number;
}

interface SearchHistoryProps {
  searches: SearchesProps[];
  handleHistoryEvent: (oldSearch: string) => void;
  setShowHistory: (showHistory: boolean) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searches,
  handleHistoryEvent,
  setShowHistory,
}) => {
  return (
    <>
      {searches !== null ? (
        <List>
          <h4>Senaste 10 sökningarna:</h4>
          {searches.map((search: SearchesProps) => (
            <ListText
              key={search.value}
              onClick={() => {
                handleHistoryEvent(search.value);
                setShowHistory(false);
              }}
            >
              {search.value} - {search.count} träffar
            </ListText>
          ))}
        </List>
      ) : null}
    </>
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
  padding: 0.5rem 1rem 0.1rem 1rem;
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
  padding-bottom: 0.4rem;
  cursor: pointer;
  :hover {
    font-weight: 600;
  }
`;
