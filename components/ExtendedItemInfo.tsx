import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Person } from './TableList';

interface ExtendedItemInfoProps {
  information: Person;
}

const ExtendedItemInfo: React.FC<ExtendedItemInfoProps> = ({ information }) => {
  const inskrivningsdatum = new Date(information.inskrivningsdatum).getTime();
  const utskrivningsdatum = new Date(information.utskrivningsdatum).getTime();
  const difference =
    (utskrivningsdatum - inskrivningsdatum) / (1000 * 3600 * 24);

  function controlValidText(text: string) {
    if (text === undefined) return '-';
    else return text;
  }

  return (
    <StyledExtendedSection>
      <h3>
        <StyledSpan>Nummer {information.nummer}</StyledSpan>,{' '}
        {information.förnamn}{' '}
        {information.efternamn !== undefined ? information.efternamn : ''}
      </h3>
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Inskrivningsdatum: </StyledSpan>
            {controlValidText(information.inskrivningsdatum)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Titel: </StyledSpan>
            {controlValidText(information.titel)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Ålder: </StyledSpan>
            {controlValidText(information.ålder)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Familj: </StyledSpan>
            {controlValidText(information.familj)}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Socken: </StyledSpan>
            {controlValidText(information.socken)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Hemort: </StyledSpan>
            {controlValidText(information.by)}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <hr />
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Sjukdom: </StyledSpan>
            {controlValidText(information.sjukdom)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Beskrivning: </StyledSpan>
            {controlValidText(information.sjukdomsbeskrivning)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Behandling: </StyledSpan>
            {controlValidText(information.sjukdomsbehandling)}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <hr />
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsdatum: </StyledSpan>
            {controlValidText(information.utskrivningsdatum)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Anmärkning: </StyledSpan>
            {controlValidText(information.anmärkning)}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Vårdtid: </StyledSpan>
            {information.vårdtid != undefined
              ? information.vårdtid
              : difference + ' dagar'}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsstatus: </StyledSpan>
            {controlValidText(information.utskrivningsstatus)}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
    </StyledExtendedSection>
  );
};

export default ExtendedItemInfo;

const animateExtendedSection = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const StyledExtendedSection = styled.div`
  width: 97%;
  top: 20rem;
  margin: 0 auto;
  margin-top: -0.2rem;
  margin-bottom: 0.3rem;
  padding: 0.5rem 1rem;
  background-color: white;
  animation: ${animateExtendedSection} 0.5s forwards;
`;

const StyledInformationSection = styled.div`
  display: flex;
`;

const StyledInformationContainer = styled.div`
  width: 100%;
  max-width: 20rem;
`;

const StyledParagraph = styled.p`
  padding: 0.3rem 0;
`;

const StyledSpan = styled.span`
  font-weight: 700;
`;
