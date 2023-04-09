import styled, { keyframes } from 'styled-components';
import React, { useEffect, useState } from 'react';

import LoaderText from './loaders/LoaderText';
import { KurhusetListItem } from '../types/KurhusetIOstersund';

interface ExtendedItemInfoProps {
  id: number;
  databaseName: string;
}

const ExtendedItemInfo: React.FC<ExtendedItemInfoProps> = ({
  id,
  databaseName,
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
          databaseName,
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
  }, [databaseName, id]);

  return (
    <Section>
      {loading && Object.keys(item).length === 0 ? (
        <LoaderText text={'Laddar information...'} />
      ) : (
        <>
          <h3>
            <Span>Nummer {item[0].number}</Span>, {item[0].full_name}
          </h3>
          <InformationSection>
            <InformationContainer>
              <Paragraph>
                <Span>Inskrivningsdatum: </Span>
                {controlValidText(item[0].date_of_enrollment)}
              </Paragraph>
              <Paragraph>
                <Span>Titel: </Span>
                {controlValidText(item[0].title)}
              </Paragraph>
              <Paragraph>
                <Span>Ålder: </Span>
                {controlValidText(item[0].age)}
              </Paragraph>
              <Paragraph>
                <Span>Familj: </Span>
                {controlValidText(item[0].family)}
              </Paragraph>
            </InformationContainer>
            <InformationContainer>
              <Paragraph>
                <Span>Socken: </Span>
                {controlValidText(item[0].parish)}
              </Paragraph>
              <Paragraph>
                <Span>Hemort: </Span>
                {controlValidText(item[0].village)}
              </Paragraph>
            </InformationContainer>
          </InformationSection>
          <hr />
          <InformationSection>
            <InformationContainer>
              <Paragraph>
                <Span>Sjukdom: </Span>
                {controlValidText(item[0].disease)}
              </Paragraph>
              <Paragraph>
                <Span>Beskrivning: </Span>
                {controlValidText(item[0].disease_description)}
              </Paragraph>
              <Paragraph>
                <Span>Behandling: </Span>
                {controlValidText(item[0].disease_treatment)}
              </Paragraph>
            </InformationContainer>
          </InformationSection>
          <hr />
          <InformationSection>
            <InformationContainer>
              <Paragraph>
                <Span>Utskrivningsdatum: </Span>
                {controlValidText(item[0].discharge_date)}
              </Paragraph>
              <Paragraph>
                <Span>Anmärkning: </Span>
                {controlValidText(item[0].observation)}
              </Paragraph>
            </InformationContainer>
            <InformationContainer>
              <Paragraph>
                <Span>Vårdtid: </Span>

                {difference + ' dagar'}
              </Paragraph>
            </InformationContainer>
            <InformationContainer>
              <Paragraph>
                <Span>Utskrivningsstatus: </Span>
                {controlValidText(item[0].discharge_status)}
              </Paragraph>
            </InformationContainer>
          </InformationSection>
          <hr />
          <InformationSection>
            <InformationContainer>
              <Paragraph>
                <Span>Arkiv: </Span>
                {controlValidText(item[0].arkiv)}
              </Paragraph>
              <Paragraph>
                <Span>Volym: </Span>
                {item[0].volume}
              </Paragraph>
            </InformationContainer>
          </InformationSection>
        </>
      )}
    </Section>
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

const Section = styled.div`
  width: 97%;
  top: 20rem;
  margin: 0 auto;
  margin-top: -0.2rem;
  margin-bottom: 0.3rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-blue);
  border-radius: 0.2rem;
  transition: all ease 0.1s
  animation: ${animateExtendedSection} 0.5s forwards;
`;

const InformationSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  transition: all ease 0.2s;
`;

const InformationContainer = styled.div`
  width: 20rem;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Paragraph = styled.p`
  padding: 0.2rem 0;
`;

const Span = styled.span`
  font-weight: 700;
`;
