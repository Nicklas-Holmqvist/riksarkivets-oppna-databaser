import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';
import MobileListItem from './MobileListItem';

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
  const [mobileView, setMobileView] = useState<boolean>(false);

  const changeMobileView = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 800) setMobileView(true);
    else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', changeMobileView);
  });

  useEffect(() => {
    changeMobileView();
  }, []);

  return (
    <Table>
      {!mobileView ? (
        <TableHeading>
          <HeadingItem>Nr</HeadingItem>
          <HeadingItem>Namn</HeadingItem>
          <HeadingItem>Inskrivning</HeadingItem>
          <HeadingItem>Ålder</HeadingItem>
          <HeadingItem>Sjukdom</HeadingItem>
          <HeadingItem>Uskrivning</HeadingItem>
          <HeadingItem>Status</HeadingItem>
        </TableHeading>
      ) : undefined}
      <TableRowSection>
        {data.map((person) => (
          <div key={person.id}>
            {mobileView ? (
              <MobileListItem person={person} />
            ) : (
              <ListItem person={person} />
            )}
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
  padding-left: 0.8rem;
  padding-bottom: 0.3rem;
`;

const TableRowSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 800px) {
    padding: 0 1rem;
  }
`;

const HeadingItem = styled.span`
  font-weight: bold;
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
  @media (max-width: 1024px) {
    :nth-child(7) {
      padding-right: 8.5rem;
    }
  }
`;
