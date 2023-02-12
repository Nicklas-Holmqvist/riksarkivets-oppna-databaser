import React from 'react';
import styled, { css } from 'styled-components';

interface styledTextInput {
  noResult: boolean;
}

interface SearchProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchEvent: () => void;
  searchValue: string;
  placeholder: string;
  noResult: boolean;
  maxLength: number;
}

const Search: React.FC<SearchProps> = ({
  onInputChange,
  handleSearchEvent,
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
      <StyledButton
        onClick={searchValue.length === 0 ? undefined : handleSearchEvent}
      >
        Sök
      </StyledButton>
    </StyledForm>
  );
};

export default Search;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  border-radius: 0.2rem;
  @media (max-width: 800px) {
    padding: 0 1rem;
  }
`;

const StyledTextInput = styled.input<styledTextInput>`
  width: 18.75rem;
  padding: 0.6rem 1rem;
  color: grey;
  background-color: white;
  border: none;
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

const StyledButton = styled.button`
  padding: 0.2rem 0.6rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
  background-color: #0d5c91;
  color: white;
  min-width: 80px;
  border: 1px solid #0d5c91;
  text-align: center;
  transition: all ease 0.2s;
  :active {
    background-color: white;
    color: #0d5c91;
  }
`;
