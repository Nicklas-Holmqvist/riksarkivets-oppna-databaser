import Head from 'next/head';
import styled from 'styled-components';
import Hero from '../components/Hero';
import Kurhuset from '../components/Kurhuset';

export default function Home() {
  return (
    <>
      <Head>
        <title>Riksarkivet nedladdningsbara datamängder</title>
        <meta name="description" content="Skapad av Nicklas Holmqvist" />
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
