import React from 'react';
import styled from 'styled-components';

interface SearchableFilterProps {
  data: string[];
  id: string;
  onDropdownChange: (id: string, value: string) => void;
  reset: (id: string, value: string) => void;
}

const DropdownFilter: React.FC<SearchableFilterProps> = ({
  data,
  id,
  onDropdownChange,
  reset,
}) => {
  return (
    <StyledDiv>
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
    </StyledDiv>
  );
};

export default DropdownFilter;

const StyledDiv = styled.div`
  display: flex;
  padding: 1rem 0;
  width: 20%;
  @media (max-width: 680px) {
    width: 100%;
    padding: 0.5rem 0;
  }
  label {
    padding: 0.2rem 0.5rem 0.2rem 0;
    text-align: right;
    font-size: 0.8rem;
    width: 3.5rem;
    font-weight: 600;
  }
  select {
    padding: 0.2rem;
    @media (max-width: 680px) {
      width: 100%;
    }
  }
`;
