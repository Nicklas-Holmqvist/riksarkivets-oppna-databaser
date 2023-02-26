import styled, { css } from 'styled-components';
import React, { useState } from 'react';

import ExtendedItemInfo from './ExtendedItemInfo';
import { KurhusetIOstersund } from '../types/KurhusetIOstersund';

interface TableRowProps {
  active: boolean;
}

interface StyledButtonProps {
  active: boolean;
}
interface MobileListItemProps {
  person: KurhusetIOstersund;
}

const MobileListItem: React.FC<MobileListItemProps> = ({ person }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <TableRowSection>
      <TableRow active={open} onClick={() => setOpen(!open)}>
        <RowItem>
          <StyledSpan>Nr: </StyledSpan>
          {person.number}
        </RowItem>
        <RowItem>
          <StyledSpan>Namns: </StyledSpan>
          {person.first_name + ' '}
          {person.last_name !== undefined ? person.last_name : ''}
        </RowItem>
        <RowItem>
          <StyledSpan>Inskrivning: </StyledSpan>
          {person.date_of_enrollment}
        </RowItem>
        <RowItem>
          <StyledSpan>Ålder: </StyledSpan>
          {person.age}
        </RowItem>
        <RowItem>
          <StyledSpan>Sjukdom: </StyledSpan>
          {person.disease}
        </RowItem>
        <RowItem>
          <StyledSpan>Utskrivning: </StyledSpan>
          {person.discharge_date}
        </RowItem>
        <RowItem>
          <StyledSpan>Status: </StyledSpan>
          {person.discharge_status}
        </RowItem>
        <StyledButton active={open} onClick={() => setOpen(!open)}>
          {open ? 'Stäng' : 'Läs mer'}
        </StyledButton>
      </TableRow>
      {open ? <ExtendedItemInfo information={person} /> : undefined}
    </TableRowSection>
  );
};

export default MobileListItem;

const TableRowSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 1s ease-in;
`;

const TableRow = styled.div<TableRowProps>`
  flex-direction: column;
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
          border: 2px solid #0d5c91;
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
  z-index: 100;
`;

const RowItem = styled.span`
  width: 100%;
  padding: 0.2rem 0;
`;

const StyledSpan = styled.span`
  font-weight: 700;
`;

const StyledButton = styled.button<StyledButtonProps>`
  position: absolute;
  right: 1rem;
  bottom: 0.8rem;
  padding: 0.2rem 0.6rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
  min-width: 80px;
  border: 1px solid #0d5c91;
  border-radius: 0.2rem;
  text-align: center;
  ${({ active }) =>
    active
      ? css`
          background-color: #0d5c91;
          color: white;
        `
      : css`
      border: 1px solid #0d5c91;
          }
        `};
`;
