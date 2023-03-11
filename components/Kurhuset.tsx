import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

interface KurhusetProps {}

const Kurhuset: React.FC<KurhusetProps> = () => {
  return (
    <Article>
      <ImageContent>
        <Image
          src="/kurhuset_ritning_stor.jpg"
          alt="Kurhuset i Östersund"
          width={411}
          height={500}
        />
      </ImageContent>
      <InformationContent>
        <h2>Vårdade på Kurhuset i Östersund</h2>
        <TextContent>
          <Paragraph>
            Vid riksdagen 1815 togs så beslut att anslå medel för att inrätta
            särskilda kurhus, ofta i anslutning till lasarettinrättningar, med
            avsikt att försöka utrota den veneriska smittan i riket. Enligt
            Kungl. Maj:ts instruktion skulle de veneriskt smittade hållas
            åtskilda från andra sjuka vid lasarettet.
          </Paragraph>
          <Paragraph>
            Riksarkivet innehavet ett patientregister som innehåller nära på
            3000 inskrivna patienter mellan 1817-1866 och det är fritt fram till
            att använda datan. I denna informationsmängd finns de vårdade
            registrerade med inskrivningsdatum, namn, hemort, yrke och givetvis
            sjukdom. Dessutom finns sjukdomsbeskrivningar, vårdmetoder m.m. i
            data.
          </Paragraph>
          <Paragraph>
            Så jag har städat lite i datan och skapat ett eget sökbart register
            av det hela. Det jag finns mest intressant i datan är att titel
            benämns på de flesta patienter. De här titlarna finner man sällan i
            kyrkans Husförhörslängder och är guld värt för släktforskare eller
            för folk som är allmänt intresserad vad för folk som blev inlagda på
            kurhuset. Även hembygd som jag döpt till socken i registret är
            intressant. För söker man tex. på Stockholm får man upp de som hörde
            hemma där men även en italienare blev inlagd för Hypochondria i mars
            månad 1865. Tycker det är helt oväntat och är man tillräckligt
            nyfiken kanske man t.o.m söker vidare med den informationen man
            nyligen hittat.
          </Paragraph>
          <Paragraph>
            Sök gärna runt lite bland datan och undras över hur det ibland kan
            gått så illa som det gjort. Eller gå till Riksarkivets sida för att
            läsa lite mer om arkivet.
          </Paragraph>
        </TextContent>
        <ButtonContainer>
          <PrimaryButton
            text="Sök i registret"
            href="/kurhuset-i-ostersund?page=1"
          />
          <SecondaryButton
            text="Gå till Riksarkivet"
            href="https://riksarkivet.se/psidata/vardade-pa-kurhuset"
          />
        </ButtonContainer>
      </InformationContent>
    </Article>
  );
};

export default Kurhuset;

const Article = styled.article`
  display: flex;
  background-color: white;
  margin-bottom: 2rem;
  padding: 5rem 0;
  @media (max-width: 800px) {
    padding: 3rem 1rem;
  }
`;

const ImageContent = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const InformationContent = styled.div`
  width: 50%;
  @media (max-width: 1000px) {
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width: 680px) {
    width: 100%;
  }
`;

const TextContent = styled.div`
  padding: 1rem 0 1.5rem 0;
`;

const Paragraph = styled.p`
  max-width: 60ch;
  padding-bottom: 0.8rem;
  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

const ButtonContainer = styled.article`
  button {
    margin-right: 1rem;
  }
`;
