import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchProps {
  handleSearchEvent: (searchValue: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearchEvent }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }
  return (
    <form
      onSubmit={(event: React.ChangeEvent<SubmitEventInit>) => {
        event.preventDefault();
        handleSearchEvent(searchValue);
      }}
    >
      <label>
        <StyledTextInput
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="Sök på person"
        />
      </label>
      <StyledButtonInput type="submit" value="Sök" />
    </form>
  );
};

export default Search;

const StyledTextInput = styled.input`
  box-sizing: border-box;
  border: none;
  border-bottom: solid 1px black;
  padding: 0.5rem 0.8rem;
`;

const StyledButtonInput = styled.input`
  border: none;
  background-color: white;
  padding: 0.5rem 0.5rem;
  border-bottom: solid 1px black;
  cursor: pointer;
`;
