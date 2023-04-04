import styled, { css } from 'styled-components';
import React, { useState } from 'react';

import ExtendedItemInfo from './ExtendedItemInfo';
import { KurhusetList } from '../types/KurhusetIOstersund';

interface TableRowProps {
  active: boolean;
}
interface StyledButtonProps {
  active: boolean;
}
interface ListItemProps {
  person: KurhusetList;
  database: string;
}

const ListItem: React.FC<ListItemProps> = ({ person, database }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <TableRowSection>
      <TableRow active={open} onClick={() => setOpen(!open)}>
        <RowItem>{person.number}</RowItem>
        <RowItem>
          {person.first_name + ' '}
          {person.last_name !== undefined ? person.last_name : ''}
        </RowItem>
        <RowItem>{person.date_of_enrollment}</RowItem>
        <RowItem>
          {person.age === undefined
            ? undefined
            : person.age.length >= 8
            ? person.age.slice(0, 5) + '...'
            : person.age}
        </RowItem>
        <RowItem>
          {person.disease === undefined
            ? undefined
            : person.disease.length >= 15
            ? person.disease.slice(0, 12) + '...'
            : person.disease}
        </RowItem>
        <RowItem>{person.discharge_date}</RowItem>
        <RowItem>
          {person.discharge_status === undefined
            ? undefined
            : person.discharge_status.length >= 10
            ? person.discharge_status.slice(0, 8) + '...'
            : person.discharge_status}
        </RowItem>
        <StyledButton active={open} onClick={() => setOpen(!open)}>
          {open ? 'Stäng' : 'Läs mer'}
        </StyledButton>
      </TableRow>
      {open ? (
        <ExtendedItemInfo id={person.list_order} database={database} />
      ) : undefined}
    </TableRowSection>
  );
};

export default ListItem;

const TableRowSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 1s ease-in;
`;

const TableRow = styled.div<TableRowProps>`
  position: relative;
  display: flex;
  padding: 0.8rem 0.8rem;
  margin: 0.2rem 0;
  background-color: var(--color-white);
  border-radius: 0.2rem;
  cursor: pointer;
  transition: transform ease 0.05s;
  ${({ active }) =>
    active
      ? css`
          border: 2px solid var(--color-blue);
          box-shadow: 2px 2px 5px var(--color-light-grey);
          transform: scaleZ(5);
        `
      : css`
          box-shadow: unset;
          :hover {
            box-shadow: 2px 2px 5px var(--color-light-grey);
            transform: scaleZ(5);
          }
        `};
  z-index: 100;
`;

const RowItem = styled.span`
  width: 100%;
  :nth-child(1) {
    width: 50px;
  }
  :nth-child(2) {
    max-width: 300px;
  }
  :nth-child(3) {
    max-width: 140px;
  }
  :nth-child(4) {
    max-width: 90px;
  }
  :nth-child(5) {
    max-width: 140px;
  }
  :nth-child(6) {
    max-width: 140px;
  }
  :nth-child(7) {
    max-width: 120px;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  position: absolute;
  right: 1rem;
  top: 0.7rem;
  padding: 0.2rem 0.6rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: 400;
  min-width: 80px;
  border: 1px solid var(--color-blue);
  border-radius: 0.2rem;
  text-align: center;
  ${({ active }) =>
    active
      ? css`
          background-color: var(--color-blue);
          color: var(--color-white);
        `
      : css`
      border: 1px solid var(--color-blue);
          }
        `};
`;
