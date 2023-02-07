import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import search from '../public/search.svg';
import reset from '../public/reset.svg';
import { Icon } from './Icon';

interface SearchProps {
  handleSearchEvent: (searchValue: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearchEvent }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    if (searchValue.length < 1) return handleSearchEvent('');
    if (searchValue.length >= 3) return handleSearchEvent(searchValue);
  }, [handleSearchEvent, searchValue]);

  return (
    <StyledForm>
      <StyledTextInput
        type="text"
        value={searchValue}
        onChange={handleChange}
        maxLength={25}
        placeholder="Sök på namn"
      />
      {searchValue.length > 0 ? (
        <StyledResetIcon onClick={() => setSearchValue('')}>
          <Icon src={reset} alt="reset" size={14} />
        </StyledResetIcon>
      ) : (
        <StyledSearchIcon>
          <Icon src={search} alt="start" size={14} />
        </StyledSearchIcon>
      )}
    </StyledForm>
  );
};

export default Search;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const StyledTextInput = styled.input`
  width: 18.75rem;
  padding: 0.5rem 0.8rem;
  color: grey;
  background-color: white;
  border: none;
  border-radius: 0.2rem;
  ::placeholder {
    color: grey;
  }
`;

const StyledSearchIcon = styled.div`
  align-self: center;
  margin-left: -1.5rem;
`;

const StyledResetIcon = styled(StyledSearchIcon)`
  cursor: pointer;
`;
