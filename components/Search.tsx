import React from 'react';
import styled, { css } from 'styled-components';

import search from '../public/search.svg';
import { Icon } from './Icon';

interface styledTextInput {
  noResult: boolean;
}

interface SearchProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  placeholder: string;
  noResult: boolean;
  maxLength: number;
}

const Search: React.FC<SearchProps> = ({
  onInputChange,
  searchValue,
  placeholder,
  noResult,
  maxLength,
}) => {
  return (
    <StyledForm onSubmit={(event) => event.preventDefault()}>
      <StyledTextInput
        type="text"
        value={searchValue}
        onChange={(event) => onInputChange(event)}
        maxLength={maxLength}
        placeholder={placeholder}
        autoFocus
        noResult={noResult}
      />
      <StyledSearchIcon>
        <Icon src={search} alt="start" size={18} />
      </StyledSearchIcon>
    </StyledForm>
  );
};

export default Search;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  @media (max-width: 800px) {
    padding: 0 1rem;
  }
`;

const StyledTextInput = styled.input<styledTextInput>`
  width: 18.75rem;
  padding: 0.8rem 1rem;
  color: grey;
  background-color: white;
  border: none;
  border-radius: 0.2rem;
  font-size: 1rem;
  @media (max-width: 800px) {
    width: 100%;
  }
  ::placeholder {
    color: grey;
    font-size: 1rem;
  }
  ${({ noResult }) =>
    noResult
      ? css`
          :focus {
            outline: 2px solid #e8a621;
          }
        `
      : css`
          :focus {
            outline: 2px solid red;
          }
        `};
`;

const StyledSearchIcon = styled.div`
  align-self: center;
  margin-left: -1.8rem;
  padding-right: 0.8rem;
`;
