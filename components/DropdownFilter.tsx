import React from 'react';
import styled from 'styled-components';

interface SearchableFilterProps {
  data: string[];
  id: string;
  onDropdownChange: (id: string, value: string) => void;
}

const DropdownFilter: React.FC<SearchableFilterProps> = ({
  data,
  id,
  onDropdownChange,
}) => {
  return (
    <Container>
      <label id={id}>{id}:</label>
      <select
        name={id}
        id={id}
        onChange={(event) =>
          onDropdownChange(event.target.name, event.target.value)
        }
      >
        <option value="reset" selected>
          Välj {id}
        </option>
        {data.map((dropdownValue) => (
          <option key={dropdownValue}>{dropdownValue}</option>
        ))}
      </select>
    </Container>
  );
};

export default DropdownFilter;

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
  width: 15rem;
  @media (max-width: 690px) {
    width: 100%;
    padding: 0.5rem 0;
  }
  label {
    padding: 0.2rem 0.5rem 0.2rem 0;
    text-align: right;
    font-size: 0.8rem;
    font-weight: 600;
  }
  select {
    padding: 0.2rem;
    width: 13rem;
    @media (max-width: 680px) {
      width: 100%;
    }
  }
`;
