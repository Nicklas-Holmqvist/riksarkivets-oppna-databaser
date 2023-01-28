import React, { useState } from 'react';
import styled from 'styled-components';

import { Person } from './TableList';
import ExtendedItemInfo from './ExtendedItemInfo';

interface ListItemProps {
  person: Person;
}

const ListItem: React.FC<ListItemProps> = ({ person }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <TableRowSection>
      <TableRow onClick={() => setOpen(!open)}>
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

const TableRow = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0.6rem 0;
  margin: 0.2rem 0;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 2px 2px 5px lightgrey;
  z-index: 1000;
`;

const RowItem = styled.span`
  width: 100%;
  :nth-child(1) {
    padding-left: 0.7rem;
    min-width: 80px;
    max-width: 80px;
  }
  :nth-child(2) {
    padding-left: 0.5rem;
    min-width: 116px;
  }
  :nth-child(3) {
    padding-left: 0.5rem;
    min-width: 116px;
  }
  :nth-child(4) {
    padding-left: 0.5rem;
    min-width: 76px;
  }
  :nth-child(5) {
    padding-left: 0.5rem;
    min-width: 116px;
  }
  :nth-child(6) {
    padding-left: 0.5rem;
    min-width: 166px;
  }
  :nth-child(7) {
    padding-left: 0.5rem;
    min-width: 91px;
  }
  :nth-child(8) {
    padding-left: 0.5rem;
    min-width: 166px;
  }
  :nth-child(9) {
    padding-left: 0.5rem;
    min-width: 166px;
  }
`;
