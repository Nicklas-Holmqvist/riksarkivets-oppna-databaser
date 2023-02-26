import React from 'react';
import styled, { keyframes } from 'styled-components';

import { KurhusetIOstersund } from '../types/KurhusetIOstersund';

interface ExtendedItemInfoProps {
  information: KurhusetIOstersund;
}

const ExtendedItemInfo: React.FC<ExtendedItemInfoProps> = ({ information }) => {
  const inskrivningsdatum = new Date(information.date_of_enrollment).getTime();
  const utskrivningsdatum = new Date(information.discharge_date).getTime();
  const difference =
    (utskrivningsdatum - inskrivningsdatum) / (1000 * 3600 * 24);

  function controlValidText(text: string) {
    if (text === undefined) return '-';
    if (text.length === 0) return '-';
    else return text;
  }

  return (
    <StyledExtendedSection>
      <h3>
        <StyledSpan>Nummer {information.number}</StyledSpan>,{' '}
        {information.first_name}{' '}
        {information.last_name !== undefined ? information.last_name : ''}
      </h3>
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Inskrivningsdatum: </StyledSpan>
            {controlValidText(information.date_of_enrollment)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Titel: </StyledSpan>
            {controlValidText(information.title)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Ålder: </StyledSpan>
            {controlValidText(information.age)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Familj: </StyledSpan>
            {controlValidText(information.family)}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Socken: </StyledSpan>
            {controlValidText(information.parish)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Hemort: </StyledSpan>
            {controlValidText(information.village)}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <hr />
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Sjukdom: </StyledSpan>
            {controlValidText(information.disease)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Beskrivning: </StyledSpan>
            {controlValidText(information.disease_description)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Behandling: </StyledSpan>
            {controlValidText(information.disease_treatment)}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <hr />
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsdatum: </StyledSpan>
            {controlValidText(information.discharge_date)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Anmärkning: </StyledSpan>
            {controlValidText(information.observation)}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Vårdtid: </StyledSpan>

            {difference + ' dagar'}
          </StyledParagraph>
        </StyledInformationContainer>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Utskrivningsstatus: </StyledSpan>
            {controlValidText(information.discharge_status)}
          </StyledParagraph>
        </StyledInformationContainer>
      </StyledInformationSection>
      <hr />
      <StyledInformationSection>
        <StyledInformationContainer>
          <StyledParagraph>
            <StyledSpan>Arkiv: </StyledSpan>
            {controlValidText(information.arkiv)}
          </StyledParagraph>
          <StyledParagraph>
            <StyledSpan>Volym: </StyledSpan>
            {information.volume}
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
  border: 1px solid #0d5c91;
  border-radius: 0.2rem;
  animation: ${animateExtendedSection} 0.5s forwards;
`;

const StyledInformationSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledInformationContainer = styled.div`
  width: 20rem;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const StyledParagraph = styled.p`
  padding: 0.2rem 0;
`;

const StyledSpan = styled.span`
  font-weight: 700;
`;
