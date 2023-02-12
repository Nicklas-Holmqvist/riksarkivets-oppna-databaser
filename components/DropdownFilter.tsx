import React from 'react';
import styled from 'styled-components';

interface SearchableFilterProps {
  data: string[];
  id: string;
}

const DropdownFilter: React.FC<SearchableFilterProps> = ({ data, id }) => {
  return (
    <StyledForm onSubmit={(event) => event.preventDefault()}>
      <label id={id}>{id}</label>
      <select name={id} id={id}>
        {data.map((dropdownValue) => (
          <option key={dropdownValue}>{dropdownValue}</option>
        ))}
      </select>
    </StyledForm>
  );
};

export default DropdownFilter;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  @media (max-width: 550px) {
    width: 100%;
    padding: 0.5rem 0;
  }
  label {
    padding: 0.2rem 0;
  }
  select {
    width: 15rem;
    padding: 0.2rem;
    @media (max-width: 550px) {
      width: 100%;
    }
  }
`;
