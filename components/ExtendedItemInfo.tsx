import styled, { keyframes } from 'styled-components';
import React, { useEffect, useState } from 'react';

import LoaderText from './LoaderText';
import { KurhusetListItem } from '../types/KurhusetIOstersund';

interface ExtendedItemInfoProps {
  id: number;
  database: string;
}

const ExtendedItemInfo: React.FC<ExtendedItemInfoProps> = ({
  id,
  database,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<KurhusetListItem[] | []>([]);
  const [difference, setDifference] = useState<any>();

  function controlValidText(text: string) {
    if (text === undefined) return '-';
    if (text.length === 0) return '-';
    else return text;
  }

  useEffect(() => {
    async function getItem() {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          database,
          id,
        }),
      };
      const response = await fetch('/api/post', options);
      const data = await response.json();
      setItem(data.data);
      setLoading(false);
      const inskrivningsdatum: any = new Date(
        data.data[0].date_of_enrollment
      ).getTime();
      const utskrivningsdatum: any = new Date(
        data.data[0].discharge_date
      ).getTime();
      setDifference(
        (utskrivningsdatum - inskrivningsdatum) / (1000 * 3600 * 24)
      );
      return data;
    }
    getItem();
  }, [database, id]);

  return (
    <StyledExtendedSection>
      {loading && Object.keys(item).length === 0 ? (
        <LoaderText text={'Laddar information...'} />
      ) : (
        <>
          <h3>
            <StyledSpan>Nummer {item[0].number}</StyledSpan>,{' '}
            {item[0].first_name}{' '}
            {item[0].last_name !== undefined ? item[0].last_name : ''}
          </h3>
          <StyledInformationSection>
            <StyledInformationContainer>
              <StyledParagraph>
                <StyledSpan>Inskrivningsdatum: </StyledSpan>
                {controlValidText(item[0].date_of_enrollment)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Titel: </StyledSpan>
                {controlValidText(item[0].title)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Ålder: </StyledSpan>
                {controlValidText(item[0].age)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Familj: </StyledSpan>
                {controlValidText(item[0].family)}
              </StyledParagraph>
            </StyledInformationContainer>
            <StyledInformationContainer>
              <StyledParagraph>
                <StyledSpan>Socken: </StyledSpan>
                {controlValidText(item[0].parish)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Hemort: </StyledSpan>
                {controlValidText(item[0].village)}
              </StyledParagraph>
            </StyledInformationContainer>
          </StyledInformationSection>
          <hr />
          <StyledInformationSection>
            <StyledInformationContainer>
              <StyledParagraph>
                <StyledSpan>Sjukdom: </StyledSpan>
                {controlValidText(item[0].disease)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Beskrivning: </StyledSpan>
                {controlValidText(item[0].disease_description)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Behandling: </StyledSpan>
                {controlValidText(item[0].disease_treatment)}
              </StyledParagraph>
            </StyledInformationContainer>
          </StyledInformationSection>
          <hr />
          <StyledInformationSection>
            <StyledInformationContainer>
              <StyledParagraph>
                <StyledSpan>Utskrivningsdatum: </StyledSpan>
                {controlValidText(item[0].discharge_date)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Anmärkning: </StyledSpan>
                {controlValidText(item[0].observation)}
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
                {controlValidText(item[0].discharge_status)}
              </StyledParagraph>
            </StyledInformationContainer>
          </StyledInformationSection>
          <hr />
          <StyledInformationSection>
            <StyledInformationContainer>
              <StyledParagraph>
                <StyledSpan>Arkiv: </StyledSpan>
                {controlValidText(item[0].arkiv)}
              </StyledParagraph>
              <StyledParagraph>
                <StyledSpan>Volym: </StyledSpan>
                {item[0].volume}
              </StyledParagraph>
            </StyledInformationContainer>
          </StyledInformationSection>
        </>
      )}
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
  transition: all ease 0.1s
  animation: ${animateExtendedSection} 0.5s forwards;
`;

const StyledInformationSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  transition: all ease 0.2s;
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
