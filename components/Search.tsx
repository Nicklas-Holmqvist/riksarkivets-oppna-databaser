import React from 'react';
import { LuX } from '@metamist/lucide-react';
import styled, { css } from 'styled-components';

interface styledTextInput {
  noResult: boolean;
}

interface SearchProps {
  onInputChange: (value: string) => void;
  handleSearchEvent: () => void;
  handleResetEvent: () => void;
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
  searchValue,
  placeholder,
  helper,
  noResult,
  maxLength,
}) => {
  return (
    <StyledForm onSubmit={(event) => event.preventDefault()}>
      <StyledSearchSection>
        <StyledTextInput
          type="text"
          value={searchValue}
          onChange={(event) => onInputChange(event.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          noResult={noResult}
        />

        <StyledButton
          onClick={searchValue.length === 0 ? undefined : handleSearchEvent}
        >
          Sök
        </StyledButton>
        <StyledReset onClick={handleResetEvent}>
          {searchValue.length === 0 ? undefined : (
            <LuX color="black" size={18} />
          )}
        </StyledReset>
      </StyledSearchSection>
      <StyledHelper>{helper}</StyledHelper>
    </StyledForm>
  );
};

export default Search;

const StyledForm = styled.form`
  border-radius: 0.2rem;
  width: 30rem;
  margin: 0 auto;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
const StyledSearchSection = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledTextInput = styled.input<styledTextInput>`
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

const StyledReset = styled.button`
  background-color: var(--color-white);
  border: none;
  padding-top: 0.2rem;
  cursor: pointer;
  width: 0;
  transform: translateX(-7rem);
`;

const StyledButton = styled.button`
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
const StyledHelper = styled.p`
  font-size: 0.8rem;
  padding: 0.5rem 0.6rem;
  text-align: left;
  color: var(--color-grey);
  @media (max-width: 800px) {
    width: 100%;
    padding: 0.5rem 0 1rem 0;
  }
`;
