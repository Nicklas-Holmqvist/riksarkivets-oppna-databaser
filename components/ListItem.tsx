import React from 'react';
import styled from 'styled-components';

interface ListItemProps {
  data: Person[];
}

interface Person {
  id: number;
  nummer: number;
  inskrivningsdatum: string;
  förnamn: string;
  efternamn: string;
  ålder: string;
  titel: string;
  by: string;
  socken: string;
  hemort?: string;
  sjukdom: string;
  utskrivningsdatum: string;
  utskrivningsstatus: string;
  vårdtid?: string;
  anmärkning: string;
  arkiv: string;
  volym: number;
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  return (
    <Table>
      <TableHeading>
        <HeadingItem className="number">Nr</HeadingItem>
        <HeadingItem className="name">Namn</HeadingItem>
        <HeadingItem className="Inskrivningsdatum">Inskrivning</HeadingItem>
        <HeadingItem className="age">Ålder</HeadingItem>
        <HeadingItem className="parish">Sjukdom</HeadingItem>
        <HeadingItem className="discharge-date">Uskrivning</HeadingItem>
        <HeadingItem className="discharge-status">Status</HeadingItem>
      </TableHeading>
      <TableRowSection>
        {data.map((person, index) => (
          <TableRow key={index}>
            <RowItem className="number">{person.nummer}</RowItem>
            <RowItem className="name">
              {person.förnamn + ' ' + person.efternamn}
            </RowItem>
            <RowItem className="inskrivningsdatum">
              {person.inskrivningsdatum}
            </RowItem>
            <RowItem className="age">{person.ålder}</RowItem>
            <RowItem className="parish">{person.sjukdom}</RowItem>
            <RowItem className="discharge-date">
              {person.utskrivningsdatum}
            </RowItem>
            <RowItem className="discharge-status">
              {person.utskrivningsstatus}
            </RowItem>
          </TableRow>
        ))}
      </TableRowSection>
    </Table>
  );
};

export default ListItem;

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

const TableRow = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0.4rem 0;
  margin: 0.2rem 0;
  background-color: #fff;
  border-radius: 0.2rem;
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
