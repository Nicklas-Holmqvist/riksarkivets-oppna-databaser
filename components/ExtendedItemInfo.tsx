import React from 'react';
import styled from 'styled-components';
import { Person } from './TableList';

interface ExtendedItemInfoProps {
  information: Person;
}

const ExtendedItemInfo: React.FC<ExtendedItemInfoProps> = ({ information }) => {
  return (
    <StyledExtendedSection>
      <h3>
        <StyledSpan>Nummber {information.nummer}</StyledSpan>,{' '}
        {information.förnamn} {information.efternamn}
      </h3>
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Inskrivningsdatum: </StyledSpan>
            {information.inskrivningsdatum}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Titel: </StyledSpan>
            {information.titel}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Ålder: </StyledSpan>
            {information.ålder}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Familj: </StyledSpan>
            {information.familj}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Socken: </StyledSpan>
            {information.socken}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Hemort: </StyledSpan>
            {information.by}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Sjukdom: </StyledSpan>
            {information.sjukdom}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Beskrivning: </StyledSpan>
            {information.sjukdomsbeskrivning}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Behandling: </StyledSpan>
            {information.sjukdomsbehandling}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsdatum: </StyledSpan>
            {information.utskrivningsdatum}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Anmärkning: </StyledSpan>
            {information.anmärkning}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Vårdtid: </StyledSpan>
            {information.vårdtid}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsdatum: </StyledSpan>
            {information.utskrivningsstatus}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
    </StyledExtendedSection>
  );
};

export default ExtendedItemInfo;

const StyledExtendedSection = styled.div`
  width: 97%;
  margin: 0 auto;
  margin-top: -0.2rem;
  margin-bottom: 0.3rem;
  padding: 0.5rem 1rem;
  background-color: white;
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
