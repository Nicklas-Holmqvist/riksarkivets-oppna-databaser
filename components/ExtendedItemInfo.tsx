import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Person } from './TableList';

interface ExtendedItemInfoProps {
  information: Person;
}

const ExtendedItemInfo: React.FC<ExtendedItemInfoProps> = ({ information }) => {
  return (
    <StyledExtendedSection>
      <h3>
        <StyledSpan>Nummber {information.nummer}</StyledSpan>,{' '}
        {information.förnamn}{' '}
        {information.efternamn != undefined ? information.efternamn : ''}
      </h3>
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Inskrivningsdatum: </StyledSpan>
            {information.inskrivningsdatum != undefined
              ? information.inskrivningsdatum
              : '-'}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Titel: </StyledSpan>
            {information.titel != undefined ? information.titel : '-'}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Ålder: </StyledSpan>
            {information.ålder != undefined ? information.ålder : '-'}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Familj: </StyledSpan>
            {information.familj != undefined ? information.familj : '-'}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Socken: </StyledSpan>
            {information.socken != undefined ? information.socken : '-'}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Hemort: </StyledSpan>
            {information.by != undefined ? information.by : '-'}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <hr />
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Sjukdom: </StyledSpan>
            {information.sjukdom != undefined ? information.sjukdom : '-'}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Beskrivning: </StyledSpan>
            {information.sjukdomsbeskrivning != undefined
              ? information.sjukdomsbeskrivning
              : '-'}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Behandling: </StyledSpan>
            {information.sjukdomsbehandling != undefined
              ? information.sjukdomsbeskrivning
              : '-'}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <hr />
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsdatum: </StyledSpan>
            {information.utskrivningsdatum != undefined
              ? information.utskrivningsdatum
              : '-'}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Anmärkning: </StyledSpan>
            {information.anmärkning != undefined ? information.anmärkning : '-'}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Vårdtid: </StyledSpan>
            {information.vårdtid != undefined ? information.vårdtid : '-'}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsdatum: </StyledSpan>
            {information.utskrivningsstatus != undefined
              ? information.utskrivningsstatus
              : '-'}
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
