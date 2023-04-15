import { LuX } from '@metamist/lucide-react';
import styled, { css } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';

import SearchHistory, { SearchesProps } from './searchHistory';

interface styledTextInput {
  noResult: boolean;
}

interface SearchProps {
  onInputChange: (value: string) => void;
  handleSearchEvent: () => void;
  handleResetEvent: () => void;
  handleHistoryEvent: (oldSearch: string) => void;
  searchValue: string;
  placeholder: string;
  helper: string;
  noResult: boolean;
  maxLength: number;
}

const Search: React.FC<SearchProps> = ({
  onInputChange,
  handleSearchEvent,
  handleResetEvent,
  handleHistoryEvent,
  searchValue,
  placeholder,
  helper,
  noResult,
  maxLength,
}) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const searches: SearchesProps[] = JSON.parse(
    `${localStorage.getItem('searchHistory')}`
  );

  function handleClickEvent(event: string) {
    if (event === 'search') {
      handleSearchEvent();
    } else if (event === 'reset') {
      handleResetEvent();
    }
    setShowHistory(false);
  }

  function removeOneFromLocalStorage(value: string) {
    const indexOfLocalStorage = searches.findIndex((search: any) => {
      return search.value === value;
    });
    searches.splice(indexOfLocalStorage, 1);
    if (searches.length === 0)
      return localStorage.setItem('searchHistory', JSON.stringify(null));
    else return localStorage.setItem('searchHistory', JSON.stringify(searches));
  }

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [historyRef]);

  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <SearchSection ref={historyRef}>
        <TextInput
          type="text"
          value={searchValue}
          onChange={(event) => onInputChange(event.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          noResult={noResult}
          onFocus={() => setShowHistory(true)}
        />

        <Button
          onClick={
            searchValue.length === 0
              ? undefined
              : () => handleClickEvent('search')
          }
        >
          Sök
        </Button>
        <ResetButton onClick={() => handleClickEvent('reset')}>
          {searchValue.length === 0 ? undefined : (
            <LuX color="black" size={18} />
          )}
        </ResetButton>
      </SearchSection>
      <HelperText>{helper}</HelperText>
      {showHistory && history !== null ? (
        <SearchHistory
          searches={searches}
          handleHistoryEvent={handleHistoryEvent}
          setShowHistory={setShowHistory}
          removeOneFromLocalStorage={removeOneFromLocalStorage}
        />
      ) : null}
    </Form>
  );
};

export default Search;

const Form = styled.form`
  position: relative;
  border-radius: 0.2rem;
  width: 30rem;
  margin: 0 auto;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
const SearchSection = styled.div`
  display: flex;
  justify-content: center;
`;

const TextInput = styled.input<styledTextInput>`
  width: 24rem;
  padding: 0.6rem 1rem;
  color: var(--color-var(--color-grey));
  background-color: var(--color-white);
  border: none;
  font-size: 1rem;
  @media (max-width: 800px) {
    width: 100%;
  }
  ::placeholder {
    color: var(--color-var(--color-grey));
    font-size: 1rem;
  }
  ${({ noResult }) =>
    noResult
      ? css`
          :focus {
            outline: 2px solid var(--color-gold);
          }
        `
      : css`
          :focus {
            outline: 2px solid red;
          }
        `};
`;

const ResetButton = styled.button`
  background-color: var(--color-white);
  border: none;
  padding-top: 0.2rem;
  cursor: pointer;
  width: 0;
  transform: translateX(-7rem);
`;

const Button = styled.button`
  padding: 0.2rem 0.6rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: 400;
  background-color: var(--color-blue);
  color: var(--color-white);
  min-width: 80px;
  border: 1px solid var(--color-blue);
  text-align: center;
  transition: all ease 0.2s;
  :active {
    background-color: var(--color-white);
    color: var(--color-blue);
  }
`;
const HelperText = styled.p`
  font-size: 0.8rem;
  padding: 0.5rem 0.6rem;
  text-align: left;
  color: var(--color-grey);
  @media (max-width: 800px) {
    width: 100%;
    padding: 0.5rem 0 1rem 0;
  }
`;
