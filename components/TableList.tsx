import React from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';

interface TableListProps {
  data: Person[];
}

export interface Person {
  id: number;
  nummer: number;
  inskrivningsdatum: string;
  förnamn: string;
  efternamn: string;
  ålder: string;
  titel: string;
  familj: string;
  by: string;
  socken: string;
  sjukdom: string;
  sjukdomsbeskrivning: string;
  sjukdomsbehandling: string;
  utskrivningsdatum: string;
  utskrivningsstatus: string;
  vårdtid: string;
  anmärkning: string;
  arkiv: string;
  volym: number;
}

const TableList: React.FC<TableListProps> = ({ data }) => {
  return (
    <Table>
      <TableHeading>
        <HeadingItem>Nr</HeadingItem>
        <HeadingItem>Namn</HeadingItem>
        <HeadingItem>Inskrivning</HeadingItem>
        <HeadingItem>Ålder</HeadingItem>
        <HeadingItem>Sjukdom</HeadingItem>
        <HeadingItem>Uskrivning</HeadingItem>
        <HeadingItem>Status</HeadingItem>
      </TableHeading>
      <TableRowSection>
        {data.map((person) => (
          <div key={person.id}>
            <ListItem person={person} />
          </div>
        ))}
      </TableRowSection>
    </Table>
  );
};

export default TableList;

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableHeading = styled.div`
  display: flex;
  width: 100%;
`;

const TableRowSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeadingItem = styled.span`
  font-weight: bold;
  padding-bottom: 0.5rem;
  width: 100%;
  :nth-child(1) {
    padding-left: 0.5rem;
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
