import Head from 'next/head';
import styled from 'styled-components';
import Hero from '../components/Hero';
import Kurhuset from '../components/Kurhuset';

export default function Home() {
  return (
    <>
      <Head>
        <title>Historiska databaser | Skapat av Nicklas Holmqvist</title>
        <meta
          name="description"
          content="En samling av sökbara databaser som har bearbetats från Riksarkivets nedladdningsbara datamängder. Skapad av Nicklas Holmqvist som driver bloggen Glömd Värld"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledMain>
        <Hero />
        <Kurhuset />
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  width: 100%;
  @media (max-width: 800px) {
    padding-top: 4.5rem;
  }
`;
