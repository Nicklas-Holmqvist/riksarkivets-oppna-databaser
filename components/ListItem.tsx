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
  padding: 0.6rem 0;
  margin: 0.2rem 0;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 2px 2px 5px lightgrey;
  z-index: 1000;
`;

const RowItem = styled.span`
  width: 100%;
  padding-left: 0.8rem;
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
  :nth-child(8) {
    max-width: 120px;
  }
`;
