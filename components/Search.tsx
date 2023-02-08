import React from 'react';
import styled from 'styled-components';

import search from '../public/search.svg';
import reset from '../public/reset.svg';
import { Icon } from './Icon';

interface SearchProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetEvent: () => void;
  searchValue: string;
}

const Search: React.FC<SearchProps> = ({
  onInputChange,
  handleResetEvent,
  searchValue,
}) => {
  return (
    <StyledForm>
      <StyledTextInput
        type="text"
        value={searchValue}
        onChange={(event) => onInputChange(event)}
        maxLength={25}
        placeholder="Sök på namn"
      />
      {searchValue.length > 0 ? (
        <StyledResetIcon onClick={handleResetEvent}>
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
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const StyledTextInput = styled.input`
  width: 18.75rem;
  padding: 0.5rem 0.8rem;
  color: grey;
  background-color: white;
  border: none;
  border-radius: 0.2rem;
  @media (max-width: 480px) {
    width: 100%;
  }
  ::placeholder {
    color: grey;
  }
`;

const StyledSearchIcon = styled.div`
  align-self: center;
  margin-left: -1.5rem;
  padding-right: 0.7rem;
`;

const StyledResetIcon = styled(StyledSearchIcon)`
  cursor: pointer;
`;
