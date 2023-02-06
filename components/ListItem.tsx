import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Person } from './TableList';
import ExtendedItemInfo from './ExtendedItemInfo';

interface TableRowProps {
  active: boolean;
}
interface ListItemProps {
  person: Person;
}

const ListItem: React.FC<ListItemProps> = ({ person }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <TableRowSection>
      <TableRow active={open} onClick={() => setOpen(!open)}>
        <RowItem>{person.nummer}</RowItem>
        <RowItem>
          {person.förnamn + ' '}
          {person.efternamn !== undefined ? person.efternamn : ''}
        </RowItem>
        <RowItem>{person.inskrivningsdatum}</RowItem>
        <RowItem>{person.ålder}</RowItem>
        <RowItem>{person.sjukdom}</RowItem>
        <RowItem>{person.utskrivningsdatum}</RowItem>
        <RowItem>{person.utskrivningsstatus}</RowItem>
        <StyledButton onClick={() => setOpen(!open)}>
          {open ? 'Stäng' : 'Läs mer'}
        </StyledButton>
      </TableRow>
      {open ? <ExtendedItemInfo information={person} /> : undefined}
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
  padding: 0.6rem 0.8rem;
  margin: 0.2rem 0;
  background-color: #fff;
  border-radius: 0.2rem;
  cursor: pointer;
  ${({ active }) =>
    active
      ? css`
          box-shadow: 2px 2px 5px lightgrey;
          transform: scaleZ(5);
        `
      : css`
          box-shadow: unset;
          :hover {
            box-shadow: 2px 2px 5px lightgrey;
            transform: scaleZ(5);
          }
        `};

  z-index: 1000;
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

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
  min-width: 80px;
`;
