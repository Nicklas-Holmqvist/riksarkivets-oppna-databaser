import { LuX } from '@metamist/lucide-react';
import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface SearchesProps {
  value: string;
  count: number;
}

interface SearchHistoryProps {
  localHistory: SearchesProps[] | null;
  handleHistoryEvent: (oldSearch: string) => void;
  setShowHistory: (showHistory: boolean) => void;
  removeOneFromLocalStorage: (value: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  localHistory,
  handleHistoryEvent,
  setShowHistory,
  removeOneFromLocalStorage,
}) => {
  return (
    <>
      {localHistory !== null ? (
        <List>
          <h4>Senaste 10 sökningarna:</h4>
          {localHistory.map((search: SearchesProps) => (
            <ListItem key={search.value}>
              <ListText
                onClick={() => {
                  handleHistoryEvent(search.value);
                  setShowHistory(false);
                }}
              >
                {search.value} - {search.count} träffar
              </ListText>
              <LuX
                style={{ cursor: 'pointer' }}
                onClick={() => removeOneFromLocalStorage(search.value)}
                color="black"
                size={18}
              />
            </ListItem>
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
  box-shadow: 2px 2px 5px var(--color-light-grey);
  @media (max-width: 800px) {
    margin: 0;
    width: auto;
    right: 1rem;
    left: 1rem;
    padding-bottom: 0;
  }
  h4 {
    padding-bottom: 0.5rem;
    text-align: left;
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &:last-child {
    padding-bottom: 0;
  }
`;

const ListText = styled.p`
  font-style: italic;
  text-align: left;
  padding-bottom: 0.4rem;
  cursor: pointer;
  @media (max-width: 800px) {
    padding-bottom: 0.8rem;
  }
  :hover {
    font-weight: 600;
  }
`;
