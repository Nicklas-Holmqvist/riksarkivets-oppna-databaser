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
        <HeadingItem className="title">Titel</HeadingItem>
        <HeadingItem className="age">Ålder</HeadingItem>
        <HeadingItem className="parish">Socken</HeadingItem>
        <HeadingItem className="village">Hemort</HeadingItem>
        <HeadingItem className="care-time">Vårdtid</HeadingItem>
        <HeadingItem className="discharge-date">Utskrivningsdatum</HeadingItem>
        <HeadingItem className="discharge-status">
          Utskrivningsstatus
        </HeadingItem>
      </TableHeading>
      <TableRowSection>
        {data.map((person, index) => (
          <TableRow key={index}>
            <RowItem className="number">{person.nummer}</RowItem>
            <RowItem className="name">
              {person.förnamn + ' ' + person.efternamn}
            </RowItem>
            <RowItem className="title">{person.titel}</RowItem>
            <RowItem className="age">{person.ålder}</RowItem>
            <RowItem className="parish">{person.socken}</RowItem>
            <RowItem className="village">{person.by}</RowItem>
            <RowItem className="care-time">{person.vårdtid}</RowItem>
            <RowItem className="discharge-date">
              {person.utskrivningsdatum}
            </RowItem>
            <RowItem className="discharge-status">
              {person.utskrivningsstatus}
            </RowItem>
            <button>^</button>
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
  width: 90%;
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
    min-width: 56px;
  }
  :nth-child(2) {
    padding-left: 0.5rem;
    min-width: 216px;
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
    margin-right: 1rem;
    min-width: 166px;
  }
`;

const RowItem = styled.span`
  width: 100%;
  :nth-child(1) {
    padding-left: 0.5rem;
    min-width: 56px;
  }
  :nth-child(2) {
    padding-left: 0.5rem;
    min-width: 216px;
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
    margin-right: 1.2rem;
    min-width: 166px;
  }
`;
